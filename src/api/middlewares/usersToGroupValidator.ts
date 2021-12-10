import * as express from 'express';
import * as joi from 'joi';

import { STATUS_CODE } from '../constants';
import { ApiError } from './errorsHandler';
import { getErrorResponse } from './helpers';

const schema = joi.object({
    groupId: joi.string().required(),
    userIds: joi.array().items(joi.string().required()).required(),
});

export function validateUsersToGroup() {
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
