import userSchema from "./userSchema.js";

// Create user
export const createUser = (obj) => {
  return userSchema(obj).save();
};

//Fetch User
export const fetchUser = () => {
  return userSchema.find();
};
