import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import User from "./models/UserModel.js";
import dotenv from "dotenv";
dotenv.config();

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET, // Make sure to define this in your .env file
};

const strategy = new JwtStrategy(jwtOptions, (jwtPayload, done) => {
  User.findById(jwtPayload.id)
    .then((user) => {
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    })
    .catch((err) => {
      done(err, false);
    });
});

passport.use(strategy);

export default passport;
