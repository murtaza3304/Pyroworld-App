import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/auth/Login';
import SignUp from '../screens/auth/Signup';
import BottomTab from './BottomTab';

const Stack = createNativeStackNavigator();

function Authstack() {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      {/* <Stack.Screen name="App" component={BottomTab}/> */}
      {/* <Stack.Screen name="Home" component={BottomTab}/> */}
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={SignUp} />
    </Stack.Navigator>
  );
}

export default Authstack;
