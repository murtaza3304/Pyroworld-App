import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState, useEffect} from 'react';

export function useAuth() {
  const [user, setUser] = useState('init');
  const [tokens, setTokens] = useState('init');
  const setCred = async () => {
    const tokens = await AsyncStorage.getItem('tokens');
    const user = await AsyncStorage.getItem('user');
    if (tokens && user) {
      setTokens(JSON.parse(tokens));
      setUser(JSON.parse(tokens));
    }
  };
  useEffect(() => {
    setCred();
  }, []);
  return {user, tokens};
}
