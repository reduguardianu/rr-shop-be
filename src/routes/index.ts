import { Router } from 'express';

import { checkJwt } from '../middlewares/check-jwt';
import { checkRole } from '../middlewares/check-role';
import { adminRoutes } from './admin';
import { authRouter } from './auth';
import { categoryRouter } from './category';
import { emailRouter } from './email';
import { orderRouter } from './order';
import { payURouter } from './pay-u';
import { productRouter } from './product';
import { promoCodeRouter } from './promo-code';

export const routes = Router();

const jwtAdmin = [checkJwt, checkRole(['ADMIN'])];

routes.use('/admin', jwtAdmin, adminRoutes);

routes.use('/auth', authRouter);
routes.use('/category', categoryRouter);
routes.use('/email', emailRouter);
routes.use('/order', orderRouter);
routes.use('/pay-u', payURouter);
routes.use('/product', productRouter);
routes.use('/promo-code', promoCodeRouter);
