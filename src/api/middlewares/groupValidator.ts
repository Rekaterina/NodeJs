import * as express from 'express';
import * as joi from 'joi';

import { Permission } from '../../interfaces/IGroup';
import { STATUS_CODE } from '../constants';
import { getErrorResponse } from './helpers';

const schema = joi.object({
    name: joi.string().required().alphanum().min(3).max(30).required(),

    permissions: joi
        .array()
        .items(
            joi
                .string()
                .valid(...Object.values(Permission))
                .required(),
        )
        .required(),
});

export function validateGroup() {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const { error } = schema.validate(req.body, {
            abortEarly: false,
            allowUnknown: false,
        });

        if (error?.isJoi) {
            return res.status(STATUS_CODE.BAD_REQUEST).json(getErrorResponse(error.details));
        }
        return next();
    };
}
