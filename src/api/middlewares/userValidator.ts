import * as express from 'express';
import * as joi from 'joi';

import { STATUS_CODE } from '../constants';
import { ApiError } from './errorsHandler';
import { getErrorResponse } from './helpers';

const schema = joi.object({
    login: joi.string().required().alphanum().min(3).max(30).required(),

    password: joi
        .string()
        .required()
        .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/),

    age: joi.number().required().integer().min(4).max(130),
});

export function validateUser() {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const { error } = schema.validate(req.body, {
                abortEarly: false,
                allowUnknown: false,
            });

            if (error?.isJoi) {
                throw new ApiError(
                    STATUS_CODE.BAD_REQUEST,
                    `Validation error: ${JSON.stringify(getErrorResponse(error.details))}`,
                );
            }
            return next();
        } catch (error) {
            return next(error);
        }
    };
}
