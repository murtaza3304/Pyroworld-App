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

function BottomTab() {
  const theme = useTheme();
  return (
    <View
      style={{
        justifyContent: 'center',
        position: 'absolute',
        width: '100%',
        bottom: 5,
        height: '100%',
        borderRadius: 20,
        backgroundColor: 'transparent',
      }}>
      <Tab.Navigator
        tabBarOptions={{
          keyboardHidesTabBar: true,
          style: {height: 50},
        }}
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: theme.background,
            height: 70,
            borderRadius: 15,
            width: '96%',
            outline: 'none',
            borderTopWidth: 0,
            margin: 0,
            padding: 0,
            alignSelf: 'center',
            elevation:0
        
          },

          tabBarIcon: ({color, size, focused}) => {
            const iconName = focused
              ? assets.nav['active' + route.name.toLowerCase()]
              : assets.nav[route.name.toLowerCase()].replace(
                  /{{fillColor}}/g,
                  theme.text,
                );

            return (
              <View
                style={[
                  theme.flex.column,
                  {
                    borderRadius: 12,
                    width: '62%',
                    padding: 2,
                  },
                ]}>
                <SvgXml
                  xml={iconName}
                  width={23}
                  height={24}
                  fill={'#ffffff'}
                />
                <Text
                  style={{fontSize: 12, color: focused ? theme.blue : theme.text}}>
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
