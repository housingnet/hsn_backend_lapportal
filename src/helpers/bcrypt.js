import bcrypt from "bcryptjs";

export const hashPassword = (password) => {
  var salt = bcrypt.genSaltSync(5);
  return bcrypt.hashSync(password, salt);
};

export const comparePassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};
