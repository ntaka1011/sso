import passport from "passport";
import LocalStrategy from "passport-local";
import loginRegisterService from "../service/loginRegisterService";

const configPassPort = () => {
  passport.use(
    new LocalStrategy(async function (username, password, done) {
      const rowsData = {
        valueLogin: username,
        password: password,
      };

      let res = await loginRegisterService.handleUserLogin(rowsData);

      if (res && +res.EC === 0) {
        return done(null, res.DT);
      } else {
        return done(null, false, { message: res.EM });
      }
    })
  );
};

module.exports = { configPassPort };
