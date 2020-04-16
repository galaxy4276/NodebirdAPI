import passport from 'passport';
import bcrypt from 'bcrypt';
import routes from '../routes';
import { User } from '../models';

export const postJoin = async (req, res, next) => {
  const {
    body: { email, nick, password },
  } = req;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      req.flash('joinError', '이미 가입된 이메일입니다.');
      return res.redirect(routes.join);
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email,
      nick,
      password: hash,
    });
    return res.redirect(routes.root);
  } catch (error) {
    console.error(error);
    return next(error);
  }
};


export const postLogin = (req, res, next) => {
  passport.authenticate('local', (error, user, info) => {
    if (error) {
      console.error(error);
      return next(error);
    }
    if (!user) {
      req.flash('loginError', info.message);
      return res.redirect(routes.root);
    }
    return req.login(user, (error) => {
      if (error) {
        console.error(error);
        return next(error);
      }
      return res.redirect(routes.root);
    });
  })(req, res, next);
};


export const logout = (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect(routes.root);
};


export const kakaoCallback = async (accessToken, refreshToken, profile, done) => {
  console.log(User);
  try {
    const exUser = await User.findOne({ where: { snsId: profile.id, provider: 'kakao' }});
    if (exUser) done(null, exUser);
    else {
      const newUser = await User.create({
        email: profile._json && profile._json.kaccount_email,
        nick: profile.displayName,
        snsId: profile._id,
        provider: 'kakao',
      });
      done(null, newUser);  
    }
  } catch(error) {
    console.error(error);
    done(error);
  }
};
