import { Router } from 'express';
import signUpService from '../domain/signUp.service';
import dashboardService from '../domain/dasboard.service';

const router = Router();

router.post('/signIn', signUpService.signInHandler);
router.post('/signUp', signUpService.signUpHandler);
router.get('/dashboard/:id', dashboardService.dashboardHandler);

export default router;