import axios from "axios";

const authApi = axios.create({
  baseURL: process.env.REACT_APP_AUTH_API_URL,
});

export const signIn = async ({ identifier, password }) => {
  try {
    const { data: response } = await authApi.post("http://localhost/signin", {
      identifier,
      password,
    });
    return { user: response.user, token: response.token };
  } catch (error) {
    console.error(error.response.data.error);
    throw error.response.data;
  }
};

export const signUp = async ({
  username,
  email,
  password,
  confirmPassword,
}) => {
  try {
    const { data: response } = await authApi.post("signup", {
      username,
      email,
      password,
      confirmPassword,
    });
    return { user: response.user, token: response.token };
  } catch (error) {
    console.error(error.response.data.error);
    throw error.response.data;
  }
};
