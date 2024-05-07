import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/auth/Login';
import SignUp from '../screens/auth/Signup';
import BottomTab from './BottomTab';
import setting from '../screens/app/Profile/setting';
import EmailAuthantication from '../screens/auth/EmailAuthantication';
import PasswordReset from '../screens/auth/PasswordReset';
import ResetAuthCode from '../screens/auth/ResetAuthCode';
import {useAuth} from '../hooks';

import {useEffect} from 'react';
import AppStack from './Appstack';
import Loading from '../screens/app/Profile/Loading';
import {useLoading} from '../context';
import SplashScreen from '../screens/SplashScreen/SplashScreen';

const Stack = createNativeStackNavigator();

function Authstack() {
  const {user, tokens, loading} = useAuth();
  const {loading: contextLoading} = useLoading();
  useEffect(() => {}, [user, tokens, loading, contextLoading]);
  console.log("loadinggggggggg",loading)

  return loading ? (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Loading" component={Loading} />
    </Stack.Navigator>
  ) : (!user && !tokens) || !user.isEmailVerified ? (
    <Stack.Navigator
      initialRouteName={
        user && user?.isEmailVerified ? 'EmailAuthantication' : 'Login'
      }
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen
        name="EmailAuthantication"
        component={EmailAuthantication}
      />

      <Stack.Screen name="PasswordReset" component={PasswordReset} />
      <Stack.Screen name="ResetAuthCode" component={ResetAuthCode} />
      <Stack.Screen name="AppStack" component={AppStack} />
    </Stack.Navigator>
  ) : (
    <AppStack />
  );
}

export default Authstack;
