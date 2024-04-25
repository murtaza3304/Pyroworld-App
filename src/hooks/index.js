import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState, useEffect} from 'react';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [tokens, setTokens] = useState(null);
  const [loading, setLoading] = useState(true);
  const setCred = async () => {
    const tokenss = await AsyncStorage.getItem('tokens');
    const userss = await AsyncStorage.getItem('user');
    if (tokenss && userss) {
      setTokens(JSON.parse(tokenss));
      setUser(JSON.parse(userss));
      setLoading(false);
    } else {
      setTokens(false);
      setUser(false);
      setLoading(false);
    }
  };
  useEffect(() => {
    setCred();
  }, []);
  return {user, tokens, isEmailVerified: user?.isEmailVerified, loading};
}
