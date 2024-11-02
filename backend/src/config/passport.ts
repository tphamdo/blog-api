import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import L from '../lib/logger';
import * as db from '../db/queries';
import { validPassword } from '../lib/password';

passport.use(
  new LocalStrategy(async function verify(
    username: string,
    password: string,
    done: Function,
  ) {
    L.log('verify local strategy');
    L.log(username);
    L.log(password);

    const user = await db.getUserByUsername(username);
    if (!user) {
      return done(null, false, { message: 'That username does not exist' });
    }

    if (!validPassword(password, user.password, user.salt)) {
      return done(null, false, { message: 'Incorrect password' });
    }

    return done(null, user);
  }),
);

var jwt_opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.PRIVATE_KEY || '',
}
passport.use(new JwtStrategy(jwt_opts, async (jwt_payload, done) => {
  L.log("inside jwt strategy");
  L.log(jwt_payload);

  const user = await db.getUserById(jwt_payload.id);
  if (!user) return done(new Error("Could not find user"), false);
  return done(null, user);
}));
