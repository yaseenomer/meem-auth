import express from 'express';
import { json } from 'body-parser';
import { errorHandlerMiddleware, NotFoundError } from '@meemsd/common'
import "express-async-errors"
import { signupUserRouter  } from './routes/signupUser';
import { signinRouter } from './routes/signInUser';
import * as passportConfig from "./config/passport";
import session from 'express-session';
import { SESSION_SECRET } from './utils/secret.util';
import { cookie } from 'express-validator';
import { currentUserRouter } from './routes/currentUser';
import { changePasswordRouter } from './routes/changePassword';

import cookieSession from 'cookie-session';

import cors from 'cors';




const app = express();

app.use(json());

app.use(cors());

app.use(cookieSession({
   signed: false,
   secure: false,
   maxAge: 24 * 60 * 60 * 1000
    }));

app.use(session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {secure: true}
}));


app.all('/', (req, res) => res.send('auth  service!') )


app.use('/api/users', signupUserRouter);

app.use('/api/users', signinRouter);

app.use('/api/users', currentUserRouter);

app.use('/api/users', changePasswordRouter);

app.all('*', () => { throw new NotFoundError() })


app.use(errorHandlerMiddleware);

export { app };



