import { fileURLToPath } from "url";
import path from "path";
import { promises as fs } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, "../data/users.json");

const getUsers = async () => {
  try {
    const data = await fs.readFile(dataPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading users data:", error);
    throw error;
  }
}

const findUserByEmail = async (email) => {
  try {
    const users = await getUsers();
    return users.find((user) => user.email === email);
  } catch (error) {
    console.error("Error finding user by email:", error);
    throw error;
  }
}

const authModel = {
    getUsers,
    findUserByEmail,
};  

export default authModel;