import axios from "../../config/axios";
const API_URL = "/user/";

const register = async (userData) => {
  const response = await axios.post(API_URL + "register", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);

  if (response?.data) {
    localStorage.setItem("user", JSON.stringify(response?.data));
  }
  return response?.data;
};

const forgotPassword = async ({ email }) => {
  const response = await axios.post(API_URL + "forgot", email);

  return response.data;
};

const resetPassword = async ({ password }) => {
  const response = await axios.post(
    API_URL + "resetPassword/" + password.id,
    password
  );

  return response.data;
};

export const logout = () => {
  localStorage.removeItem("user");
};
const authService = {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
};
export default authService;
