import { Router } from 'express';
import signUpService from '../domain/signUp.service';
import dashboardService from '../domain/dasboard.service';
import jwt from "../utils/JWT";

const router = Router();

router.post('/signIn', signUpService.signInHandler);
router.post('/signUp', signUpService.signUpHandler);
router.get('/dashboard/:id', jwt.authenticateToken, dashboardService.dashboardHandler);

export default router;