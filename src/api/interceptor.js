import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BASE_URL from './url';

// Function to refresh tokens
const refreshTokens = async () => {
  const tokensString = await AsyncStorage.getItem('tokens');
  const tokens = JSON.parse(tokensString);

  try {
    const response = await axios.post(`${BASE_URL}/auth/refresh-tokens`, {
      refreshToken: tokens.refresh.token,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Add a request interceptor to attach the access token to each request
axios.interceptors.request.use(
  async config => {
    const tokensString = await AsyncStorage.getItem('tokens');
    const tokens = JSON.parse(tokensString);
    if (tokens && tokens.access.token) {
      config.headers.Authorization = `Bearer ${tokens.access.token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Add a response interceptor to handle token expiration and refresh the token
axios.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;
    const tokensString = await AsyncStorage.getItem('tokens');
    const tokens = JSON.parse(tokensString);
    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      tokens &&
      tokens.refresh.token
    ) {
      originalRequest._retry = true;
      try {
        const refreshedTokens = await refreshTokens();
        await AsyncStorage.setItem('tokens', JSON.stringify(refreshedTokens));
        originalRequest.headers.Authorization = `Bearer ${refreshedTokens.access.token}`;
        return axios(originalRequest);
      } catch (refreshError) {
        // Handle refresh token error, e.g., redirect to login
        console.error('Refresh token error:', refreshError);
        // For simplicity, you may want to redirect to login page if refresh token fails
        // Example: navigation.navigate('Login');
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default axios;
