import * as express from 'express';

import { router as userRouter } from '../api/routers/user';
import { router as groupRouter } from '../api/routers/group';

export const expressLoader = (app: express.Application) => {
    app.use(express.json());
    app.use('/user', userRouter);
    app.use('/group', groupRouter);
};
