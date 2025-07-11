import axios from "axios";
import { PROD_URL } from "../assets/constants";
import { Quiz } from "../types/Quiz";

const dataServer = axios.create({
  baseURL: PROD_URL,
  timeout: 10000,
  maxBodyLength: Infinity,
  maxContentLength: Infinity,
});



// LOGIN API
export const Login = async ({ email, password }) => {
  try {
    const response = await dataServer.post(`/api/login`, {
      email,
      password,
    });

    if (response.status === 200) {
      console.log("login response is  ",response)
      const { token, refreshToken, role } = response.data;
      localStorage.setItem("token", token);

      return { accessToken: token, refreshToken, role };
    }
  } catch (error) {
    if (error.response) {
      const statusCode = error.response.status;
      return statusCode;
    }

    console.error("Network error:", error);
    return null;
  }
};

export const AdminLogin = async ({ email, password }) => {
  try {
    const response = await dataServer.post(`/api/Adminlogin`, {
      email,
      password,
    });

    if (response.status === 200) {
      const { token, refreshToken, role } = response.data;
      localStorage.setItem("token", token);

      return { accessToken: token, refreshToken, role };
    }
  } catch (error) {
    if (error.response) {
      const statusCode = error.response.status;
      return statusCode;
    }

    console.error("Network error:", error);
    return null;
  }
};

// SIGNUP API
export const Signup = async ({ name,email, password }) => {
  try {
    const response = await dataServer.post(`/api/signup`, {
      name,
      email,
      password,
    });

    if (response.status === 200) {
      const { token, refreshToken, role } = response.data;
      return { accessToken: token, refreshToken, role };
    }
  } catch (error) {
    if (error.response) {
      const statusCode = error.response.status;
      return statusCode;
    }

    console.error("Network error:", error);
    return null;
  }
};

//  LOGOUT
export const logoutUser = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  sessionStorage.clear();
  window.location.href = "/";
};

// Protected GET API Example
export const getProtectedData = async () => {
  try {
    const response = await dataServer.get(`/api/validate`);
    return response.data;
  } catch (error) {
    console.error("Validation error:", error);
    return null;
  }
};

export const fetchQuizzes = async () => {
  try {
    const response = await dataServer.get("/api/quizzes");
    return response.data.quizzes;
  } catch (error) {
    console.error("Failed to fetch quizzes:", error);
    return [];
  }
};

export const createQuiz = async (quiz: Quiz) => {
  try {
    const response = await dataServer.post("/api/quizzes", quiz);
    return response.data.quiz;
  } catch (error) {
    console.error("Failed to create quiz:", error);
    throw error;
  }
};

export const updateQuizById = async (quiz: Quiz) => {
  try {
    const response = await dataServer.put(`/api/quizzes/${quiz.id}`, quiz);
    return response.data.quiz;
  } catch (error) {
    console.error("Failed to update quiz:", error);
    throw error;
  }
};

export const deleteQuizById = async (id: number) => {
  try {
   const response= await dataServer.delete(`/api/quizzes/${id}`);
    return response.data.message;
  } catch (error) {
    console.error("Failed to delete quiz:", error);
    throw error;
  }
};
export default dataServer;
