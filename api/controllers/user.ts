import express = require('express');
import { UserRow } from '../models/user';
import { makeUserArrayView, makeUserView } from '../projections/user';
import { UserQuery, UserRepository } from '../repository/user';
import { validateName, validateUsername, validateMobileNumber, validateEmail, validateInteger, validateImage, validateRole, baseValidation, validateLimit, validateRequired, validateOptional } from '../middleware/inputValidation';
import Bcrypt = require('bcryptjs');
import { getRandom } from '../utils/cryptoUtils';
import logger from '../utils/logger';
import { LogLevel } from '../config/logConfig';
import { log } from 'console';

const all = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    UserRepository.retrieveAll()
        .then((result) => {
            res.json({
                data: makeUserArrayView(result),
                count : result.length 
            });
            logger.log(LogLevel.AUDIT, `Retrieved all users`);
            res.status(200).end();
        })
        .catch((err) => {
            logger.log(LogLevel.ERRORS, `Error retrieving all users: ${err.message}`);
            next(err)
        })
}

const id = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        let id = validateRequired(req.query.id.toString(), validateInteger);
        UserRepository.retrieveById(id)
            .then((result) => {
                if (result.length == 0){
                    res.status(404).end();
                    logger.log(LogLevel.DEBUG, `User not found: ${id}`);
                    return
                }
                res.json(makeUserView(result));
                res.status(200).end();
                logger.log(LogLevel.AUDIT, `User retrieved: ${id}`);
            })
            .catch((err) => {
                logger.log(LogLevel.ERRORS, `Error retrieving user by id: ${err.message}`);
                next(err)
            })
    } catch (error) {
        logger.log(LogLevel.ERRORS, `Error retrieving user by id: ${error.message}`);
        next(error)
    }
}

const SALT_ROUNDS = 14

const create = (req : express.Request, res : express.Response, next: express.NextFunction) => {
    try {
        const salt = Bcrypt.genSaltSync(SALT_ROUNDS)
        const password = getRandom()
        const user : UserRow= {
            FirstName : validateRequired(req.body.firstName, validateName),
            LastName : validateRequired(req.body.lastName, validateName),
            Username : validateRequired(req.body.username, validateUsername),
            MobileNumber : validateRequired(req.body.mobileNumber, validateMobileNumber),
            Email : validateRequired(req.body.email, validateEmail),
            Salt: salt,
            Password : Bcrypt.hashSync(password, salt),
            Role : validateRequired(req.body.role, validateRole)
        }
        
        UserRepository.register(user)
            .then((result) => {
                if (result == undefined){
                    logger.log(LogLevel.ERRORS, `Failed to register user ${user.Username}`)
                    throw new Error(`Failed to register user ${user.Username}`)
                }
                res.status(200).end();
                logger.log(LogLevel.AUDIT, `User registered: ${user.Username}`)
            })
            .catch((err) => {
                logger.log(LogLevel.ERRORS, `Error registering user: ${err.message}`)
                next(err)
            })
    }
    catch (err) {
        logger.log(LogLevel.ERRORS, `Error in register function: ${err.message}`)
        next(err)
    }

}

// req is any so thatwe can get all the files
const upload = async(req  :any, res: express.Response, next : express.NextFunction) => {
    try { 
        const file = await validateImage(req.file as Express.Multer.File).catch((err) => {next(err)})
        const id = res.locals.jwt.id
        const csrf = res.locals.jwt.csrf

        UserRepository.upload(id, csrf, file as Express.Multer.File)
            .then((result) => {
                res.status(200).end
                logger.log(LogLevel.AUDIT, `User uploaded image: ${id}`)})
            .catch((err) => {
                logger.log(LogLevel.ERRORS, `Error uploading image: ${err.message}`)
                next(err)
            })

    } catch (err) {
        logger.log(LogLevel.ERRORS, `Error in upload function: ${err.message}`)
        next(err)
    }
}

const update = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        let user : UserRow= {
            FirstName : validateRequired(req.body.firstName, validateName),
            LastName: validateRequired(req.body.lastName, validateName),
            Username : validateRequired(req.body.username, validateUsername),
            MobileNumber : validateRequired(req.body.mobileNumber, validateMobileNumber),
            Email : validateRequired(req.body.email, validateEmail),
            Role : validateRequired(req.body.role, validateRole)
        }
        let id = validateRequired(req.query.id.toString(), validateInteger)

        UserRepository.update(id, user)
            .then((result) => {
                if (result == undefined){
                    throw new Error(`Failed to update user with id ${id}`)
                }
                res.json(makeUserView({...user, id: result}));
                res.status(200).end();
                logger.log(LogLevel.AUDIT, `User updated: ${id}`);
            })
            .catch((err) => {
                logger.log(LogLevel.ERRORS, `Error updating user with id ${id}: ${err.message}`);
                next(err)
            })
    }
    catch (err) {
        logger.log(LogLevel.ERRORS, `Error in update function: ${err.message}`);
        next(err)
    }
}

const remove = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        let id = validateRequired(req.query.id.toString(), validateInteger)
            .then((result) => {
                if (result == undefined){
                    throw new Error(`Failed to delete user with id ${id}`)
                }
                res.status(200).end();
            })
            .catch((err) => {
                logger.log(LogLevel.ERRORS, `Error deleting user with id ${id}: ${err.message}`);
                next(err)
            })
    }
    catch (err) {
        logger.log(LogLevel.ERRORS, `Error in remove function: ${err.message}`);
        next(err)
    }
}


const filter = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const query = makeQuery(req)
        UserRepository.filter(query)
            .then((result) => {
                res.json({
                    data: makeUserArrayView(result),
                    count : result.length 
                });
                res.status(200).end();
                logger.log(LogLevel.AUDIT, `Filtered users`);
            })
            .catch((err) => {
                logger.log(LogLevel.ERRORS, `Error filtering users: ${err.message}`);
                next(err)
            })
    }
    catch (err) {
        logger.log(LogLevel.ERRORS, `Error in filter function: ${err.message}`);
        next(err)
    }
}

const makeQuery = (req : express.Request) : UserQuery => {
    const name = validateOptional(req.query.name, baseValidation)
    const username = validateOptional(req.query.username, baseValidation)
    const email = validateOptional(req.query.email, baseValidation)
    const mobileNumber = validateOptional(req.query.mobileNumber, baseValidation)
    const role = validateOptional(req.query.role, baseValidation)
    const limit = validateOptional(req.query.limit, validateLimit)
    const skip = validateOptional(req.query.skip, baseValidation)

    return {
        name: (name) ? (name as string) : null,
        username : (username) ? (username as string) : null,
        email: (email) ? (email as string) : null,
        mobileNumber: (mobileNumber) ? (mobileNumber as string) : null,
        role: (role)? (role as string) : null,
        limit: (limit) ? (limit as number) : null,
        skip: (skip) ? (skip as number) : null,
    }
}

export default {all, id, create, upload, update, remove, filter};