"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const customer_1 = __importDefault(require("../controllers/customer"));
const router = express.Router();
router.get('/all', customer_1.default.all);
router.get('/id', customer_1.default.id);
router.post('/create', customer_1.default.create);
router.post('/update', customer_1.default.update);
// router.get('/all', validateToken, validateRole(ALL_ROLES), controller.all);
// router.get('/id', validateToken, validateRole(ALL_ROLES), controller.id);
// router.post('/create', validateToken, validateRole([Roles.ADMIN, Roles.VIEW_EDIT]), controller.create);
// router.post('/update', validateToken, validateRole([Roles.ADMIN, Roles.VIEW_EDIT]), controller.update);
// router.delete('/delete', validateToken, validateRole([Roles.ADMIN, Roles.VIEW_EDIT]), controller.remove);
// router.get('/filter', validateToken, validateRole(ALL_ROLES), controller.filter);
exports.default = router;
