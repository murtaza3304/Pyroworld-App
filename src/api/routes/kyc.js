import { Alert } from 'react-native';
import apiInstance from '../interceptor';
import Url from '../url';

export const getToken = async () => {
  console.log('Function called.....'); 
  try {
    const res = await apiInstance.get(`${Url}/sumsub/token`);
    console.log('Response:', res);
    console.log('Response Data:', res.data);
    return res.data;
  } catch (error) {
    console.error('Error fetching token:', error);
    Alert.alert('Error', 'Error fetching token');
    throw error; 
  }
};
