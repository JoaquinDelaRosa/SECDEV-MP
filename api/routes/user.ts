import express = require('express');
import controller from '../controllers/user'
import authz from '../controllers/authz'
import validateRole from '../middleware/roleValidation';
import validateToken from '../middleware/authValidation';
import { ALL_ROLES, RoleIds, Roles } from '../models/enum';

const router = express.Router();
const multer = require('multer');
const uploadHandler = multer();

router.get('/all', validateToken, validateRole([RoleIds.ADMIN]), controller.all);
router.get('/id', validateToken, validateRole([RoleIds.ADMIN]), controller.id);
router.post('/create', validateToken, validateRole([RoleIds.ADMIN]), controller.create);
router.post('/update', validateToken, validateRole([RoleIds.ADMIN]), controller.update);
router.delete('/delete', validateToken, validateRole([RoleIds.ADMIN]), controller.remove);
router.post('/upload', validateToken, validateRole([RoleIds.ADMIN, RoleIds.VIEW, RoleIds.VIEW_EDIT]), uploadHandler.single("image"), controller.upload)
router.get('/filter', validateToken, validateRole([RoleIds.ADMIN, RoleIds.VIEW, RoleIds.VIEW_EDIT]), controller.filter);

export default router;

