import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/auth/Login';
import SignUp from '../screens/auth/Signup';
import BottomTab from './BottomTab';
import setting from '../screens/app/Profile/setting';
import EmailAuthantication from '../screens/auth/EmailAuthantication';

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
      

    </Stack.Navigator>
  );
}

export default Authstack;
