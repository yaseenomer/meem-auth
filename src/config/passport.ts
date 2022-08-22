import passport from "passport";
import pasportJwt, { ExtractJwt } from "passport-jwt";
import { User,  UserDoc  } from "../models/user";
import { NativeError } from "mongoose";

const JwtStrategy = pasportJwt.Strategy;

passport.serializeUser<any, any>((req, user, done) => done(undefined, user));

passport.deserializeUser((id, done) =>
    User.findById(id, (err: NativeError, user: UserDoc) => done(err, user))
);

passport.use(
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: "asdfghj",
        },
        (payload, done) => {
            User.findOne({ id: payload.id }, (err: NativeError, user: UserDoc) => {
                if (err) return done(err, false)
                if (user) return done(undefined, user)
                return done(undefined, false)
            })
        }
    )
);
