import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/app/Home';
import Market from '../screens/app/Market';
import Trade from '../screens/app/Trade';
import Profile from '../screens/app/Profile';
import Wallet from '../screens/app/Wallet';
import {SvgXml} from 'react-native-svg';
import {assets} from '../assets/images/assets';
import {useTheme} from '../assets/theme/Theme';
import {Text, View} from 'react-native';

const Tab = createBottomTabNavigator();

function BottomTab() {
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#0a1220",
          height: 74,
          border: 'none',
          outline: 'none',
          borderTopWidth: 0,
          margin: 0,
          padding: 0,
          elevation: 3,
          borderRadius: 5,
        },
        tabBarIcon: ({color, size, focused}) => {
          const iconName = assets.nav[route.name.toLowerCase()];
          const fillColor = focused ? theme.blue : theme.background;

          return (
            <View style={theme.flex.column}>
              <SvgXml
                xml={iconName}
                width={23}
                height={24}
                fill={theme.blue}
              />
              <Text style={{fontSize: 12}}>{route.name}</Text>
            </View>
          );
        },
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Market" component={Market} />
      <Tab.Screen name="Trade" component={Trade} />
      <Tab.Screen name="Wallet" component={Wallet} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default BottomTab;
