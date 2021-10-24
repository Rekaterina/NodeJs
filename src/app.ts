import * as express from 'express';
import { router as userRouter } from './users/user.router';

const app = express();

app.use(express.json());

app.use('/user', userRouter);

app.listen(process.env.PORT, () => console.log(`App is listening on port ${process.env.PORT}!`));
