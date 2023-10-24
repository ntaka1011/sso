import passport from "passport";
import LocalStrategy from "passport-local";
import loginRegisterService from "../service/loginRegisterService";

const configPassPort = () => {
  passport.use(
    new LocalStrategy(
      {
        passReqToCallback: true,
      },
      async (req, username, password, done) => {
        const rowsData = {
          valueLogin: username,
          password: password,
        };

        const res = await loginRegisterService.handleUserLogin(rowsData);
        console.log("🚀 ~ file: passportController.js:18 ~ res:", res);

        if (res && res.EC === 0) {
          return done(null, res.DT);
        } else {
          return done(null, false, { message: res.EM });
        }
      }
    )
  );
};

const handleLogout = (req, res, next) => {
  req.session.destroy(function (err) {
    res.redirect("/"); //Inside a callback… bulletproof!
  });
};

module.exports = { configPassPort, handleLogout };
