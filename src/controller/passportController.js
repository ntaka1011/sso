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
      console.log("🚀 ~ file: passportController.js:14 ~ res:", res);

      if (res && +res.EC === 0) {
        return done(null, res.DT);
      } else {
        return done(null, false, { message: res.EM });
      }
    })
  );
};

module.exports = { configPassPort };
