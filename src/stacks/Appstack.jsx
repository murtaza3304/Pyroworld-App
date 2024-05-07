import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTab from './BottomTab';
import { useTheme } from '../assets/theme/Theme';
import Setting from '../screens/app/Profile/setting';
import Authstack from './Authstack'; 
import FaceRecognition from '../Kyc/FaceRecognition';
import SplashScreen from '../screens/SplashScreen/SplashScreen';

const Stack = createNativeStackNavigator();

function AppStack() {
  const theme = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.background },
      }}>
      <Stack.Screen name='FaceRecognition' component={FaceRecognition} />
      <Stack.Screen name="BottomTab" component={BottomTab} />
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen name="Authstack" component={Authstack} />
    </Stack.Navigator>
  );
}

export default AppStack;
