
import { users } from "../data/usersData";

export const getUsers = async () => {
  return users;
};

export const getUserById = async (id) => {
  return users.find(u => u._id === id);
};
