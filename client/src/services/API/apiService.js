import axios from "axios";
import { getLocalStorageItem, setLocalStorageItem } from "../LocalStorage/localStorageService";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants/constants";

const api = axios.create({
  baseURL: 'http://localhost:8080'
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status > 400 && error.response.status < 500) {
      const refreshToken = getLocalStorageItem(REFRESH_TOKEN);

      const res = await api.post('/token', { token: refreshToken });
      const accessToken = res.data.accessToken;
      setLocalStorageItem(ACCESS_TOKEN, accessToken);

      error.config.headers["Authorization"] = `Bearer ${accessToken}`;
      return axios(error.config);
    } else {
      return Promise.reject(error);
    }
  }
);

api.interceptors.request.use(
  (config) => {
    const accessToken = getLocalStorageItem(ACCESS_TOKEN);
    config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
  });

export const createNote = async (value) => {
  try {
    debugger;
    const response = await api.post('/notes', { title: value });
    return response;
  } catch (error) {
    console.log(error.message);
  };
};

export const getNotes = async () => {
  try {
    const res = await api.get('/notes');
    return res;
  } catch (error) {
    console.log(error.message);
  };
};

export const deleteNote = async (id) => {
  try {
    const res = await api.delete(`/notes/${id}`);
    return res;
  } catch (error) {
    console.log(error.message)
  };
};

export const updateNote = async (id, value) => {
  try {
    const body = { title: value };
    const res = await api.put(`/notes/${id}`, body);
    return res;
  } catch (error) {
    console.log(error.message);
  };
};

export const logIn = async (email, password) => {
  try {
    const body = { email, password };
    const res = await api.post('/signin', body); 
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

export const signUp = async (email, password) => {
  try {
    const body = { email, password };
    const res = await api.post('/signup', body);
    return res;
  } catch (error) {
    console.log(error.message);
  }
};