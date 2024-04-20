import axios from 'axios';
import Url from '../url';

export const register = async body => {
  console.log(Url, 'urlllllllllll');
  try {
    const res = await axios.post(`${Url}/auth/register`, body);
    console.log(res,"responseeee");
    return res.data;
  } catch (error) {
    console.error('Error registering user:', error);
  }
};

export const signin = async body => {
  console.log(Url, 'urlllllllllll');
  try {
    const res = await axios.post(`${Url}/auth/login`, body);
    if (res.data) {
      console.log(JSON.parse(data.replace(/\[Object\]/g, '{}')));
      return JSON.parse(data.replace(/\[Object\]/g, '{}'));
    }
  } catch (error) {
    return error.message;
  }
};
