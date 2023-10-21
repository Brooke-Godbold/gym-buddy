import passport from "passport";

function storeReturnPath(req, res, next) {
  if (req.query.return) {
    req.session = {
      return: req.query.return,
    };
  }
  next();
}

const googleOauthLogin = passport.authenticate("google", {
  scope: ["email"],
});

const handleGoogleOauthCallback = passport.authenticate("google", {
  session: true,
});

function handleOauthRedirect(req, res) {
  const redirect = req.session?.return || "/";
  delete req.session?.return;
  res.redirect(`http://localhost:5173${redirect}`);
}

function logout(req, res) {
  req.logout();
  return res.status(200).json({ ok: true });
}

function getIsAuthenticated(req, res) {
  return res.status(200).json({
    isAuthenticated: req.isAuthenticated(),
  });
}

export {
  storeReturnPath,
  googleOauthLogin,
  handleGoogleOauthCallback,
  handleOauthRedirect,
  logout,
  getIsAuthenticated,
};
