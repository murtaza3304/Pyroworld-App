import AsyncStorage from '@react-native-async-storage/async-storage';

const getItem = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error retrieving item:', error);
    return null;
  }
};

export { getItem };
