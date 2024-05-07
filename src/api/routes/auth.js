import axios from 'axios';
import Url from '../url';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiInstance from '../interceptor';

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
  try {
    const res = await axios.post(`${Url}/auth/login`, body);
    await AsyncStorage.setItem('tokens', JSON.stringify(res.data.tokens));
    await AsyncStorage.setItem('user', JSON.stringify(res.data.user));
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const forgetPassword = async body => {
  try {
    const res = await axios.post(`${Url}/auth/forgot-password`, body);
    return res.data;
  } catch (error) {
    return error.message;
  }
};

export const logout = async navigation => {
  await AsyncStorage.removeItem('tokens');
  await AsyncStorage.removeItem('user');
  navigation.navigate('Authstack');
  navigation.reset();
};

export const resetPassword = async body => {
  try {
    const res = await axios.post(`${Url}/auth/reset-password`, body);
    // console.log('response', res);
    return res.data;
  } catch (error) {
    // console.error('Error sending OTP:.........', error);
    throw error;
  }
};
export const emailVerification = async () => {
  try {
    const res = await apiInstance.post(`${Url}/auth/send-verification-email`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const verifyEmail = async code => {
  try {
    const res = await apiInstance.post(
      `${Url}/auth/verify-email?token=${code}`,
    );
    console.log(res, 'ressssssssss');
    let user = await AsyncStorage.getItem('user');
    user = JSON.parse(user);
    user.isEmailVerified = true;
    await AsyncStorage.setItem('user', JSON.stringify(user));
    return res.data;
  } catch (error) {
    throw error;
  }
};
