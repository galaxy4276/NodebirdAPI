import localStrategy from 'passport-local';
import bcrypt from 'bcrypt';
import { User } from '../models';

const localStgy = passport => {
  passport.use(new localStrategy({
    usernameField: 'email',
    passwordField: 'password', // req.body의 속성을 작성해주면 됨
  }, async (email, password, done) => {
    try {
      const exUser = await User.findOne({ where: { email }});
      if (exUser) {
        const result = await bcrypt.compare(password, exUser.password);
        if (result) {
          done(null, exUser);
        } else {
          done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
        }
      } else {
        done(null, false, { message: '가입되지 않은 회원입니다.' });
      }
    } catch (error) {
      console.error(error); 
      done(error);
    }
  }));
};

export default localStgy;