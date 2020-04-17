import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import morgan from 'morgan';
import session from 'express-session';
import flash from 'connect-flash';
import dotenv from 'dotenv';
dotenv.config();

import { sequelize } from './models';
import passportConfig from './passport';

import authRouter from './routes/authRouter';
import indexRouter from './routes/indexRouter';


const app = express();
sequelize.sync();
passportConfig(passport);


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('port', process.env.PORT || 8002);


app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRouter);
app.use('/', indexRouter);


app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});


app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});


app.listen(app.get('port'), () => {
  console.log(`${app.get('port')} 번 포트에서 대기 중..`);
});
