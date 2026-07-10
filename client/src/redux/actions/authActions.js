import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api'
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: 'AUTH_START' });
    const { data } = await API.post('/auth/register', { name, email, password });
    dispatch({
      type: 'AUTH_SUCCESS',
      payload: data
    });
  } catch (error) {
    dispatch({
      type: 'AUTH_FAIL',
      payload: error.response?.data?.error || 'Registration failed'
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: 'AUTH_START' });
    const { data } = await API.post('/auth/login', { email, password });
    dispatch({
      type: 'AUTH_SUCCESS',
      payload: data
    });
  } catch (error) {
    dispatch({
      type: 'AUTH_FAIL',
      payload: error.response?.data?.error || 'Login failed'
    });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    const { data } = await API.get('/auth/me');
    dispatch({
      type: 'LOAD_USER',
      payload: data
    });
  } catch (error) {
    console.error('Failed to load user');
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: 'LOGOUT' });
};
