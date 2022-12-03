import bcrypt from "bcryptjs";

export const hashPassword = (password) => {
  var salt = bcrypt.genSaltSync(5);
  return bcrypt.hashSync(password, salt);
};
