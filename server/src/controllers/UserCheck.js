import passport from "../JWT.js";

export function verifyUser(req, res, next) {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err || !user) {
      res.status(403).json({ message: "Unauthorized" });
    } else {
      req.user = user;
      next();
    }
  })(req, res, next);
}
