import axios from 'axios';
import Url from '../url';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const register = async body => {
  console.log(Url, 'urlllllllllll');
  try {
    const res = await axios.post(`${Url}/auth/register`, body);
    if (res)
      await AsyncStorage.setItem('tokens', JSON.stringify(res.data.tokens));
    await AsyncStorage.setItem('user', JSON.stringify(res.data.user));
    return res.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error; // Rethrow the error to handle it outside
  }
};

export const signin = async body => {
  console.log(Url, 'urlllllllllll');
  try {
    const res = await axios.post(`${Url}/auth/login`, body);
    await AsyncStorage.setItem('tokens', JSON.stringify(res.data.tokens));
    await AsyncStorage.setItem('user', JSON.stringify(res.data.user));
    return res.data;
  } catch (error) {
    return error.message;
  }
};



export const forgetPassword = async body => {
  try {
    const res = await axios.post(`${Url}/auth/forgot-password`, body);
    return res;
    // return res.data;
  } catch (error) {
    return error.message;
  }
};

export const logout = async navigation => {
  await AsyncStorage.removeItem('token');
  await AsyncStorage.removeItem('user');
  navigation.navigate('Login');
};

export const  resetPassword= async body  => {
  try {
    const res = await axios.post(`${Url}/auth/reset-password`, body);
    console.log("response",res)
    return res.data; 
  } catch (error) {
    console.error('Error sending OTP:.........', error);
    throw error;
  }
};

