import { getUserByGoogleId } from "../models/user/users.model.js";

export async function authCheck(req, res, next) {
  const isAuthenticated = req.isAuthenticated() && req.user;
  if (!isAuthenticated) {
    return res.status(401).json({
      error: "User is not Authenticated",
    });
  }

  const user = await getUserByGoogleId(req.user);

  if (req.body?.userId && user?.userId !== req.body.userId) {
    return res.status(403).json({
      error: "User is not Authorized for this action",
    });
  }

  next();
}
