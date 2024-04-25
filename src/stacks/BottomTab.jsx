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
import {Text, View, useColorScheme} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const isDarkMode = useColorScheme === 'dark';

function BottomTab() {
  const theme = useTheme();
  return (
    <View
      style={{
        backgroundColor: isDarkMode ? '#fff' : '#0a1224',
        position: 'absolute',
        width: '100%',
        bottom: 0,
        height: '100%',
      }}>
      <Tab.Navigator
        tabBarOptions={{
          keyboardHidesTabBar: true,
          style: {height: 60},
        }}
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: '#0a1220',
            height: 74,
            border: 'none',
            outline: 'none',
            borderTopWidth: 0,
            margin: 0,
            padding: 0,
            elevation: 3,
            borderTopEndRadius: 5,
            borderTopStartRadius: 5,
          },

          tabBarIcon: ({color, size, focused}) => {
            // const iconName =  assets.nav[route.name.toLowerCase()];
            const iconName = focused
              ? assets.nav['active' + route.name.toLowerCase()]
              : assets.nav[route.name.toLowerCase()];
            const fillColor = focused ? theme.blue : theme.background;
            const bgColor = focused ? theme.blue : '#0a1220';

            return (
              <View
                style={[
                  theme.flex.column,
                  {
                    backgroundColor: '#0a1220',
                    borderRadius: 12,
                    width: '62%',
                    padding: 2,
                  },
                ]}>
                <SvgXml xml={iconName} width={23} height={24} />
                <Text
                  style={{fontSize: 12, color: focused ? theme.blue : 'white'}}>
                  {route.name}
                </Text>
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
    </View>
  );
}

export default BottomTab;
