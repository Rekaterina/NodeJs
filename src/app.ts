import * as express from 'express';

import { loaders } from './loaders';
import { logger } from './loggers/logger';
import { GroupDbService } from './services/groupDbService';
import { UserDbService } from './services/userDbService';

const amountOfPredefinedUsers = 10;
const amountOfPredefinedGroups = 5;
const userService = new UserDbService();
const groupService = new GroupDbService();

const startServer = async () => {
    const app = express();

    await loaders(app);

    await Promise.all([
        userService.createPredefinedUsers(amountOfPredefinedUsers),
        groupService.createPredefinedGroups(amountOfPredefinedGroups),
    ]);

    app.listen(process.env.PORT, () => logger.info(`App is listening on port ${process.env.PORT}!`));
};

startServer();
