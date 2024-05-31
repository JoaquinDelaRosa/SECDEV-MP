"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const user_1 = __importDefault(require("../controllers/user"));
const router = express.Router();
router.get('/all', user_1.default.all);
// router.get('/all', validateToken, validateRole(ALL_ROLES), controller.all);
// router.get('/id', validateToken, validateRole(ALL_ROLES), controller.id);
// router.post('/create', validateToken, validateRole([Roles.ADMIN, Roles.VIEW_EDIT]), controller.create);
// router.post('/update', validateToken, validateRole([Roles.ADMIN, Roles.VIEW_EDIT]), controller.update);
// router.delete('/delete', validateToken, validateRole([Roles.ADMIN, Roles.VIEW_EDIT]), controller.remove);
// router.get('/filter', validateToken, validateRole(ALL_ROLES), controller.filter);
exports.default = router;
