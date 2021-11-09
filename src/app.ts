import * as express from 'express';

import { loaders } from './loaders';
import { UserService } from './services/userService';

const amountOfPredefinedUsers = 10;

const startServer = async () => {
    const app = express();

    await loaders(app);

    await UserService.createPredefinedUsers(amountOfPredefinedUsers);

    app.listen(process.env.PORT, () => console.log(`App is listening on port ${process.env.PORT}!`));
};

startServer();
