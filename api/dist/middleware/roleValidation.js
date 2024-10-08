"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../repository/user");
const authConfig_1 = require("../config/authConfig");
const inputValidation_1 = require("./inputValidation");
const validateRole = (allowedRoles) => {
    return (req, res, next) => {
        const sessionId = (0, inputValidation_1.validateRequired)(res.locals.jwt.id, inputValidation_1.baseValidation);
        const csrf = (0, inputValidation_1.validateRequired)(req.cookies.csrf, inputValidation_1.baseValidation);
        user_1.UserRepository.getUserFromSession(sessionId, csrf)
            .then((user) => {
            if (user == undefined) {
                res.status(401).json({
                    message: "No session"
                });
                res.end();
            }
            else if (allowedRoles.includes(user.Role)) {
                // After this refresh the csrf token for non-view requests
                if (req.method != "GET") {
                    user_1.UserRepository.refreshCSRF(sessionId)
                        .then((csrf) => {
                        res.cookie('csrf', csrf, authConfig_1.COOKIE_SETTINGS);
                        next();
                    })
                        .catch((err) => {
                        throw err;
                    });
                }
                else {
                    next();
                }
            }
            else {
                res.status(403).json({
                    message: 'You do not have permission to access this function'
                });
            }
        })
            .catch((err) => {
            // TODO: Possibly change this
            console.log(err);
            res.status(403).json({
                message: 'You do not have permission to access this function'
            });
        });
    };
};
exports.default = validateRole;
