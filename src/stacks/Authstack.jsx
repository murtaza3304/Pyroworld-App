import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/auth/Login';
import SignUp from '../screens/auth/Signup';
import BottomTab from './BottomTab';
import setting from '../screens/app/Profile/setting';
import EmailAuthantication from '../screens/auth/EmailAuthantication';
import PasswordReset from '../screens/auth/PasswordReset';
import ResetAuthCode from '../screens/auth/ResetAuthCode';
import NewPassword from '../screens/auth/NewPassword';

const Stack = createNativeStackNavigator();

function Authstack() {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      {/* <Stack.Screen name="App" component={BottomTab}/> */}
      {/* <Stack.Screen name="Home" component={BottomTab}/> */}
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="App" component={BottomTab} />
      <Stack.Screen name='setting' component={setting} />
      <Stack.Screen name='EmailAuthantication' component={EmailAuthantication} />
      <Stack.Screen name='PasswordReset' component={PasswordReset} />
      <Stack.Screen name='ResetAuthCode' component={ResetAuthCode} />
      <Stack.Screen name='NewPassword' component={NewPassword} />
      

    </Stack.Navigator>
  );
}

export default Authstack;
