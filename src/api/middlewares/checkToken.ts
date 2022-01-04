import * as express from 'express';
import * as jwt from 'jsonwebtoken';

import { CONFIG } from '../../config/config';
import { STATUS_CODE, STATUS_MESSAGE } from '../constants';
import { ApiError } from './errorsHandler';

export function checkToken(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const token = req.headers['x-access-token'] as string;
        if (!token) {
            throw new ApiError(STATUS_CODE.UNAUTHORIZED, STATUS_MESSAGE.UNAUTHORIZED_ERROR);
        }

        return jwt.verify(token, CONFIG.JWT_SECRET!, (error) => {
            if (error) {
                throw new ApiError(STATUS_CODE.FORBIDDEN, STATUS_MESSAGE.FORBIDDEN_ERROR);
            }
            return next();
        });
    } catch (error) {
        return next(error);
    }
}
