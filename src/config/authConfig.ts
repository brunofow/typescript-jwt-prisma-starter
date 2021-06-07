require("dotenv-safe").config();
import passport from "passport";
import passportJwt from "passport-jwt";
import prisma from "../utils/prisma";

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET,
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    const user = await prisma.users.findUnique({
      where: { id: jwt_payload.id },
    });
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }

    
  })
);

const initialize = () => {
  return passport.initialize();
};

const authenticate = () => {
  return passport.authenticate("jwt");
};

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user: any, done) {
  done(null, user);
});

export default {
  initialize,
  authenticate
}