import * as cors from 'cors';
import * as express from 'express';

import { router as userRouter } from '../api/routers/user';
import { router as groupRouter } from '../api/routers/group';
import { router as userGroupRouter } from '../api/routers/userGroup';
import { router as loginRouter } from '../api/routers/login';

import { errorsHandler } from '../api/middlewares/errorsHandler';
import { logger, requestLogger } from '../loggers/logger';
import { checkToken } from '../api/middlewares/checkToken';

export const expressLoader = (app: express.Application) => {
    app.use(express.json());
    app.use(cors());

    app.use(requestLogger);

    app.use('/login', loginRouter);

    app.use(checkToken);

    app.use('/user', userRouter);
    app.use('/group', groupRouter);
    app.use('/userGroup', userGroupRouter);

    app.use(errorsHandler);

    process.on('uncaughtException', (error: Error) => {
        logger.error(error);
        process.exit();
    });

    process.on('unhandledRejection', (error: Error) => {
        logger.error(error);
        process.exit();
    });
};
