import express from 'express';
import routes from '../routes';
import { isNotLoggedIn, isLoggedIn } from '../controllers/middlewares';
import { postJoin, postLogin, logout } from '../controllers/authController';
import passport from 'passport';

const authRouter = express.Router();

authRouter.post(routes.join, isNotLoggedIn, postJoin);
authRouter.post(routes.login, isNotLoggedIn, postLogin);
authRouter.get(routes.logout, isLoggedIn, logout);
authRouter.get(routes.kakao, passport.authenticate('kakao'));
authRouter.get(routes.kakaoCallback, passport.authenticate('kakao', {
  failureRedirect: routes.root,
}), (req, res) => res.redirect(routes.root));


export default authRouter;


