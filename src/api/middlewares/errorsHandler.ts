import * as express from 'express';

import { IError } from '../../interfaces/IError';
import { logger } from '../../loggers/logger';
import { STATUS_CODE, STATUS_MESSAGE } from '../constants';

export class ApiError implements IError {
    constructor(public code: number, public message: string) {}
}

export function errorsHandler(error: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
    const { method, url, params, body } = req;
    const args = { ...body, ...params };
    if (error instanceof ApiError) {
        logger.error(
            `Method: ${method}, Error Code: ${error.code}, Error Message: ${
                error.message
            }, URL: ${url}, Arguments: ${JSON.stringify(args)}`,
        );
        res.status(error.code).send(error.message);
    } else {
        logger.error(error);
        res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send(STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
}
