import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTab from './BottomTab';
import {useTheme} from '../assets/theme/Theme';
import setting from '../screens/app/Profile/setting';
import Authstack from './Authstack';
const Stack = createNativeStackNavigator();
function AppStack() {
  const theme = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {backgroundColor: theme.background},
      }}>
      <Stack.Screen name="App" component={BottomTab} />
      <Stack.Screen name="setting" component={setting} />
      <Stack.Screen name="AuthStack" component={Authstack} />
    </Stack.Navigator>
  );
}
export default AppStack;