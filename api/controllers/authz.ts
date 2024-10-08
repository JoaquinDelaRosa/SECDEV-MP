import express = require('express');
import Bcrypt = require('bcryptjs');
import { RoleIds } from '../models/enum';
import { UserRepository } from '../repository/user';
import { UserRow } from '../models/user';
import { validatePassword, validateName, validateUsername, validateMobileNumber, validateEmail, validateRequired, validateAlphaNumeric, validateOptional, baseValidation } from '../middleware/inputValidation';
import jwtDecode from 'jwt-decode';
import logger from '../utils/logger';
import { LogLevel } from '../config/logConfig';
import { initializeSession, signToken } from '../utils/tokenUtils';
import { COOKIE_SETTINGS } from '../config/authConfig';

const SALT_ROUNDS = 14;

const register = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const salt = Bcrypt.genSaltSync(SALT_ROUNDS);
        const password = validateRequired(req.body.password, validatePassword);
        const user: UserRow = {
            FirstName: validateRequired(req.body.firstName, validateName),
            LastName: validateRequired(req.body.lastName, validateName),
            Username: validateRequired(req.body.username, validateUsername),
            MobileNumber: validateRequired(req.body.mobileNumber, validateMobileNumber),
            Email: validateRequired(req.body.email, validateEmail),
            Salt: salt,
            Password: Bcrypt.hashSync(password, salt),
            Role: RoleIds.VIEW
        };

        UserRepository.register(user)
            .then((result) => {
                if (result === undefined) {
                    throw new Error(`Failed to register user ${user.Username}`);
                }
                res.status(200).end();
                logger.log(LogLevel.AUDIT, `User registered: ${user.Username}`);
            })
            .catch((err) => {
                logger.log(LogLevel.ERRORS, `Error registering user: ${err.message}`);
                next(err);
            });
    } catch (err) {
        logger.log(LogLevel.ERRORS, `Error in register function: ${err.message}`);
        next(err);
    }
};

const login = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const username = validateRequired(req.body.username, validateUsername);

        UserRepository.retrieveByUsername(username)
            .then((user) => {
                if (user) {
                    Bcrypt.compare(req.body.password, user.Password, async (error, result) => {
                        if (!result) {
                            logger.log(LogLevel.DEBUG, `Failed login attempt for user: ${username}`);
                            res.json({
                                auth: false,
                                message: "Username and Password do not match!"
                            }).end();
                        } else if (result) {
                            const data = await initializeSession(user);
                            await signToken(data, (err, token, refreshToken) => {
                                if (err) {
                                    logger.log(LogLevel.ERRORS, `Error signing token for user: ${username}, ${err.message}`);
                                    res.json({
                                        auth: false,
                                        message: err.message,
                                        error: err,
                                    });
                                    next(err);
                                } else if (token && refreshToken) {
                                    res.cookie('jwt', refreshToken, COOKIE_SETTINGS);
                                    res.cookie('jwtacc', token, COOKIE_SETTINGS);
                                    res.cookie('csrf', data.csrf, COOKIE_SETTINGS);
                                    logger.log(LogLevel.AUDIT, `User logged in: ${username}`);
                                    res.json({
                                        auth: true,
                                        message: "Authenticated",
                                        token: token,
                                        success: true,
                                    }).status(200).end();
                                }
                            });
                        } else if (error) {
                            logger.log(LogLevel.ERRORS, `Error comparing passwords for user: ${username}, ${error.message}`);
                            res.json({
                                auth: false,
                                message: "Username and Password do not match",
                            }).end();
                        }
                    });
                } else {
                    logger.log(LogLevel.DEBUG, `Failed login attempt for non-existing user: ${username}`);
                    res.json({
                        auth: false,
                        error: "Username and Password do not match",
                    }).end();
                }
            })
            .catch((error) => {
                logger.log(LogLevel.ERRORS, `Error retrieving user: ${username}, ${error.message}`);
                res.json({
                    auth: false,
                    error: error
                });
                next(error);
            });
    } catch (err) {
        logger.log(LogLevel.ERRORS, `Error in login function for user: ${req.body.username}, ${err.message}`);
        next(err);
    }
};

const handshake = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sessionId = validateRequired(res.locals.jwt.id, baseValidation);

        UserRepository.getUserFromSession(sessionId)
            .then((value) => {
                res.json(value || undefined).end();
            })
            .catch((err) => {
                logger.log(LogLevel.ERRORS, `Error in handshake function for session: ${sessionId}, ${err.message}`);
                next(err);
            });
    } catch (err) {
        logger.log(LogLevel.ERRORS, `Error in handshake function for session: ${res.locals.jwt.id}, ${err.message}`);
        next(err);
    }
};

const logout = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const token = req.cookies.jwt;
        const sessionId: any = validateRequired(jwtDecode(token)["id"], baseValidation);
        UserRepository
            .deleteSession(sessionId)
            .then((v) => {
                res.clearCookie("jwt")
                    .clearCookie("jwtacc")
                    .clearCookie("csrf")
                    .status(200).end();
                logger.log(LogLevel.AUDIT, `User logged out: ${sessionId}`);
            })
            .catch((err) => {
                logger.log(LogLevel.ERRORS, `Error in logout function for session: ${sessionId}, ${err.message}`);
                next(err);
            });

    } catch (err) {
        logger.log(LogLevel.ERRORS, `Error in logout function: ${err.message}`);
        next(err);
    }
};

export default { register, login, logout, handshake };
