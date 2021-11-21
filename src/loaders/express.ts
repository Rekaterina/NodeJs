import * as express from 'express';

import { router as userRouter } from '../api/routers/user';

export const expressLoader = (app: express.Application) => {
    app.use(express.json());
    app.use('/user', userRouter);
};
