import jwt from "jsonwebtoken";

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
      employeeId: user.employeeId
    },
    process.env.JWT_SECRET
    // No expiresIn → token never expires
  );
};

export default generateToken;
