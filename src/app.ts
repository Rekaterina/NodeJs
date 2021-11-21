import * as express from 'express';

import { loaders } from './loaders';
import { UserDbService } from './services/userDbService';

const amountOfPredefinedUsers = 10;
const userService = new UserDbService();

const startServer = async () => {
    const app = express();

    await loaders(app);

    await userService.createPredefinedUsers(amountOfPredefinedUsers);

    app.listen(process.env.PORT, () => console.log(`App is listening on port ${process.env.PORT}!`));
};

startServer();
