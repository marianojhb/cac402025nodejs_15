import { generateToken } from "../utils/token-generator.js";
import authModel  from "../models/auth.model.js";

const validateUserCredentials = async (credential) => {
  const user = await authModel.findUserByEmail(credential.email);
   if (user && user.password === credential.password) {
    const token = generateToken(user);
    return token;
  } else {
    console.error("Error validating user credentials");
    return false;
  }
}

const authService = {
    validateUserCredentials
};

export default authService;

