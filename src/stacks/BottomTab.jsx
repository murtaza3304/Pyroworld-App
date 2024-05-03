// import React from 'react';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import Home from '../screens/app/Home';
// import Market from '../screens/app/Market';
// import Trade from '../screens/app/Trade';
// import Profile from '../screens/app/Profile';
// import Wallet from '../screens/app/Wallet';
// import {SvgXml} from 'react-native-svg';
// import {assets} from '../assets/images/assets';
// import {useTheme} from '../assets/theme/Theme';
// import {Text, View, useColorScheme} from 'react-native';
// import {useIsFocused} from '@react-navigation/native';

// const Tab = createBottomTabNavigator();
// const isDarkMode = useColorScheme === 'dark';

// function BottomTab() {
//   const theme = useTheme();
//   return (
//     <View
//       style={{
//         backgroundColor: isDarkMode ? '#fff' : '#0a1224',
//         position: 'absolute',
//         width: '100%',
//         bottom: 0,
//         height: '100%',
//       }}>
//       <Tab.Navigator
//         tabBarOptions={{
//           keyboardHidesTabBar: true,
//           style: {height: 60},
//         }}
//         screenOptions={({route}) => ({
//           headerShown: false,
//           tabBarShowLabel: false,
//           tabBarStyle: {
//             backgroundColor: '#0a1220',
//             height: 74,
//             border: 'none',
//             outline: 'none',
//             borderTopWidth: 0,
//             margin: 0,
//             padding: 0,
//             elevation: 3,
//             borderTopEndRadius: 5,
//             borderTopStartRadius: 5,
//           },

//           tabBarIcon: ({color, size, focused}) => {
//             // const iconName =  assets.nav[route.name.toLowerCase()];
//             const iconName = focused
//               ? assets.nav['active' + route.name.toLowerCase()]
//               : assets.nav[route.name.toLowerCase()];
//             const fillColor = focused ? theme.blue : theme.background;
//             const bgColor = focused ? theme.blue : '#0a1220';

//             return (
//               <View
//                 style={[
//                   theme.flex.column,
//                   {
//                     backgroundColor: '#0a1220',
//                     borderRadius: 12,
//                     width: '62%',
//                     padding: 2,
//                   },
//                 ]}>
//                 <SvgXml xml={iconName} width={23} height={24} />
//                 <Text
//                   style={{fontSize: 12, color: focused ? theme.blue : 'white'}}>
//                   {route.name}
//                 </Text>
//               </View>
//             );
//           },
//         })}>
//         <Tab.Screen name="Home" component={Home} />
//         <Tab.Screen name="Market" component={Market} />
//         <Tab.Screen name="Trade" component={Trade} />
//         <Tab.Screen name="Wallet" component={Wallet} />
//         <Tab.Screen name="Profile" component={Profile} />
//       </Tab.Navigator>
//     </View>
//   );
// }

// export default BottomTab;

import React, {useEffect} from 'react';
import {View, Button} from 'react-native';
import SNSMobileSDK from '@sumsub/react-native-mobilesdk-module';
import {getToken} from '../api';

const SplashScreen = () => {
  // const launchSNSMobileSDK = async () => {
  //   // From your backend, get an access token for the applicant to be verified.
  //   // The token must be generated with `levelName` and `userId`,
  //   // where `levelName` is the name of a level configured in your dashboard.
  //   //
  //   // The SDK will work in the production or in the sandbox environment
  //   // depending on which one the `accessToken` has been generated on.
  //   let accessToken = `_act-sbx-jwt-eyJhbGciOiJub25lIn0.eyJqdGkiOiJfYWN0LXNieC0zMzE2OGQwOS1jYTg5LTRiZWQtYTkyZi0zMjRmNzQ5ZDU2MmIiLCJ1cmwiOiJodHRwczovL2FwaS5zdW1zdWIuY29tIn0.`;

  //   try {
  //     let snsMobileSDK = SNSMobileSDK.init(accessToken, async () => {
  //       try {
  //         const response = await fetch(`${Url}/sumsub/token`, {
  //           method: 'GET',
  //         });
  //         const newAccessToken = await response.text();
  //         return '_act-sbx-jwt-eyJhbGciOiJub25lIn0.eyJqdGkiOiJfYWN0LXNieC0zMzE2OGQwOS1jYTg5LTRiZWQtYTkyZi0zMjRmNzQ5ZDU2MmIiLCJ1cmwiOiJodHRwczovL2FwaS5zdW1zdWIuY29tIn0.';
  //       } catch (error) {
  //         console.log('Error fetching new access token:', error);
  //         throw error;
  //       }
  //     })
  //       .withHandlers({
  //         // Optional callbacks you can use to get notified of the corresponding events
  //         onStatusChanged: event => {
  //           console.log(
  //             'onStatusChanged: [' +
  //               event.prevStatus +
  //               '] => [' +
  //               event.newStatus +
  //               ']',
  //           );
  //         },
  //         onLog: event => {
  //           console.log('onLog: [Idensic] ' + event.message);
  //         },
  //       })
  //       .withDebug(true)
  //       .withLocale('en') // Optional, for cases when you need to override the system locale
  //       .build();

  //     const result = await snsMobileSDK.launch();
  //     console.log('SumSub SDK State: ' + JSON.stringify(result));
  //   } catch (error) {
  //     console.log('SumSub SDK Error: ' + JSON.stringify(error));
  //   }
  // };
  getToken();

  return (
    <View>
      <Button title="Launch SumSub SDK" />
    </View>
  );
};

export default SplashScreen;
