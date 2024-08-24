import jwt from "jsonwebtoken";

export const generateJWToken = async (payload) => {
  return await jwt.sign({ payload }, process.env.SECRET_KEY);
};

export const authenticationToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorization" });
  }
  await jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Invalid Token!" });
    } else {
      req.user = user;
      next();
    }
  });
};
