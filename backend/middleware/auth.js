import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const AuthHead = req.head("Authorization");
  const token =
    AuthHead && AuthHead.startsWith("Bearer ") ? AuthHead.split(" ")[1] : null;

  if (!token) {
    return res.status(200).json({ msg: "no token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(200).json({ msg: "invalid token" });
  }
};

export default auth;
