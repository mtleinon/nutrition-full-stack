const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const jsonSecret = require("../secrets/finelliConfig").jsonSecret;
const mySqlUtils = require('../database/mySqlUsersUtils');

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
