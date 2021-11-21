import * as express from 'express';
import * as joi from 'joi';

import { STATUS_CODE } from '../constants';

const schema = joi.object({
    login: joi.string().required().alphanum().min(3).max(30).required(),

    password: joi
        .string()
        .required()
        .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/),

    age: joi.number().required().integer().min(4).max(130),
});

function getErrorResponse(
    errorDetails: joi.ValidationErrorItem[],
): Pick<joi.ValidationErrorItem, 'message' | 'path'>[] {
    return errorDetails.map(({ path, message }) => {
        return { path, message };
    });
}

export function validateUser() {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const { error } = schema.validate(req.body, {
            abortEarly: false,
            allowUnknown: false,
        });

        console.log(error, 'error');

        if (error?.isJoi) {
            return res.status(STATUS_CODE.BAD_REQUEST).json(getErrorResponse(error.details));
        }
        return next();
    };
}
