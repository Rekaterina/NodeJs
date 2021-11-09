import * as express from 'express';

import { expressLoader } from './express';
import { sequelizeLoader } from './sequelize';

export const loaders = async (app: express.Application) => {
    await Promise.all([expressLoader(app), sequelizeLoader()]);
};
