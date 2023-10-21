import { getUserByGoogleId } from "../../models/user/users.model.js";

async function httpGetUserByGoogleId(req, res) {
  const user = await getUserByGoogleId(req.user);

  if (user) {
    res.status(200).json(user);
  } else {
    res
      .status(404)
      .json({ error: `User with Google ID ${req.user} does not exist` });
  }
}

export { httpGetUserByGoogleId };
