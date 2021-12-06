import * as express from 'express';

import { router as userRouter } from '../api/routers/user';
import { router as groupRouter } from '../api/routers/group';
import { router as userGroupRouter } from '../api/routers/userGroup';

export const expressLoader = (app: express.Application) => {
    app.use(express.json());
    app.use('/user', userRouter);
    app.use('/group', groupRouter);
    app.use('/userGroup', userGroupRouter);
};
