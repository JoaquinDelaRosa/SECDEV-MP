"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const vehicle_1 = __importDefault(require("../controllers/vehicle"));
const roleValidation_1 = __importDefault(require("../middleware/roleValidation"));
const authValidation_1 = __importDefault(require("../middleware/authValidation"));
const enum_1 = require("../models/enum");
const router = express.Router();
router.get('/all', authValidation_1.default, (0, roleValidation_1.default)([enum_1.RoleIds.ADMIN, enum_1.RoleIds.VIEW_EDIT, enum_1.RoleIds.VIEW]), vehicle_1.default.all);
router.get('/id', authValidation_1.default, (0, roleValidation_1.default)([enum_1.RoleIds.ADMIN, enum_1.RoleIds.VIEW_EDIT, enum_1.RoleIds.VIEW]), vehicle_1.default.id);
router.post('/create', authValidation_1.default, (0, roleValidation_1.default)([enum_1.RoleIds.ADMIN, enum_1.RoleIds.VIEW_EDIT]), vehicle_1.default.create);
router.post('/update', authValidation_1.default, (0, roleValidation_1.default)([enum_1.RoleIds.ADMIN, enum_1.RoleIds.VIEW_EDIT]), vehicle_1.default.update);
router.delete('/delete', authValidation_1.default, (0, roleValidation_1.default)([enum_1.RoleIds.ADMIN, enum_1.RoleIds.VIEW_EDIT]), vehicle_1.default.remove);
router.get('/filter', authValidation_1.default, (0, roleValidation_1.default)([enum_1.RoleIds.ADMIN, enum_1.RoleIds.VIEW_EDIT, enum_1.RoleIds.VIEW]), vehicle_1.default.filter);
// router.get('/count', validateToken, validateRole(ALL_ROLES), controller.count);
exports.default = router;
