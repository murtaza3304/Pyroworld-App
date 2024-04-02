import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTab from './BottomTab';
import {useTheme} from '../assets/theme/Theme';
useTheme;

const Stack = createNativeStackNavigator();

function Authstack() {
  const theme = useTheme();
  return (
    
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {backgroundColor: theme.background},
      }}>
      <Stack.Screen name="App" component={BottomTab} />
    </Stack.Navigator>
  );
}

export default Authstack;
