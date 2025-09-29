// middleware/auth.js
import passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";

export const setupFacebookAuth = (app) => {
  passport.use(
    new FacebookStrategy(
      {
        clientID: "442638155098647",
        clientSecret: "82d7a03f12bc3ee5b435009c14707d6b",
        callbackURL: "http://localhost:3002/auth/facebook/callback",
        profileFields: ["id", "displayName", "email"],
      },
      async (accessToken, refreshToken, profile, cb) => {
        // Handle user authentication
        return cb(null, profile);
      }
    )
  );

  app.use(passport.initialize());
  app.use(passport.session());

  // Authentication routes
  app.get(
    "/auth/facebook",
    passport.authenticate("facebook", { scope: ["public_profile"] })
  );

  app.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", { failureRedirect: "/login" }),
    (req, res) => {
      res.redirect("/");
    }
  );
};
