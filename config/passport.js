const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mySqlUtils = require('../database/mySqlUsersUtils');

let jsonSecret;
if (process.env.NODE_ENV === 'development') {
  jsonSecret = require("../secrets/secrets").jsonSecret;
  console.debug('development jsonSecret =', jsonSecret);
} else {
  jsonSecret = process.env.JSON_SECRET
  console.debug('production jsonSecret =', jsonSecret);
}

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jsonSecret
};

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, async (jwtPayload, done) => {
      const userId = jwtPayload.data.userId;
      const { result } = await mySqlUtils.getUsers(userId);
      if (result.length === 1) {
        return done(null, { userId });
      } else {
        console.error('userId in JWT not found from database:', userId);
        return done(null, false);
      }
    })
  );
};
