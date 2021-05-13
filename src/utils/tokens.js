import jwt from "jsonwebtoken";

const generateToken = (data) => {
  delete data.exp;
  const token = jwt.sign(data, process.env.REACT_APP_STORAGE_JWT_KEY, {
    expiresIn: 1800000, // Half an hour (1000 * 60 * 30)
  });
  return { token };
};

const verifyToken = (token) => {
  const data = jwt.verify(token, process.env.REACT_APP_STORAGE_JWT_KEY);
  return { data };
};

const tokens = {
  generateToken,
  verifyToken,
};

export default tokens;
