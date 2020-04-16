import routes from '../routes';


export const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) next();
  else res.status(403).send('로그인 필요');
};

export const isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) next();
  else res.redirect(routes.root);
};

export const localMiddleware = (req, res, next) => {
  if (req.user) {
    res.locals.user = req.user;
    console.log('localMiddlewares send req.user information!')
  }
  next();
};