// import {StyleSheet, Text, View, Image, Animated} from 'react-native';
// import React, {useEffect, useRef, useState} from 'react';
// import {fonts} from '../../assets/fonts';
// import {useTheme} from '@react-navigation/native';

// const SplashScreen = () => {
//   const theme = useTheme();
//   const text = 'Pyroworld';
//   const textWithSpace = 'Pyroworld';
//   const textLength = textWithSpace.length;
//   const typingSpeed = 100;
//   const delayBeforeStart = 0;

//   const [typedText, setTypedText] = useState('');

//   useEffect(() => {
//     setTimeout(startTypingAnimation, delayBeforeStart);
//   }, []);

//   const startTypingAnimation = () => {
//     let currentIndex = 0;
//     const typingInterval = setInterval(() => {
//       setTypedText(textWithSpace.slice(0, currentIndex + 1));
//       currentIndex++;
//       if (currentIndex === textLength) {
//         clearInterval(typingInterval);
//       }
//     }, typingSpeed);
//   };

//   return (
//     <View
//       style={{
//         width: '100%',
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//       }}>
//       <Image
//         source={require('../../assets/images/logo.png')}
//         style={{width: '50%', height: '25%'}}
//       />
//       <View>
//         <Text
//           style={{
//             fontFamily: fonts.bold,
//             fontSize: 30,
//             color: theme.text,
//           }}>
//           {typedText}
//         </Text>
//       </View>
//     </View>
//   );
// };

// export default SplashScreen;

// const styles = StyleSheet.create({});
// import SNSMobileSDK from '@sumsub/react-native-mobilesdk-module';

// // ...
// const SplashScreen = () => {
//   let launchSNSMobileSDK = () => {
//     // From your backend get an access token for the applicant to be verified.
//     // The token must be generated with `levelName` and `userId`,
//     // where `levelName` is the name of a level configured in your dashboard.
//     //
//     // The sdk will work in the production or in the sandbox environment
//     // depend on which one the `accessToken` has been generated on.
//     let accessToken = 'your_access_token';

//     let snsMobileSDK = SNSMobileSDK.init(accessToken, () => {
//       return fetch(`${Url}/sumsub/token`, {
//         method: 'GET',
//       }).then(resp => {
//         // return a fresh token from here
//         return 'new_access_token';
//       });
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

//     snsMobileSDK
//       .launch()
//       .then(result => {
//         console.log('SumSub SDK State: ' + JSON.stringify(result));
//       })
//       .catch(err => {
//         console.log('SumSub SDK Error: ' + JSON.stringify(err));
//       });
//   };
// };

import React, {useEffect} from 'react';
import {View, Button} from 'react-native';
import SNSMobileSDK from '@sumsub/react-native-mobilesdk-module';
import {getToken} from '../../api';

const SplashScreen = () => {
 

  const launchSNSMobileSDK = async () => {
    // From your backend, get an access token for the applicant to be verified.
    // The token must be generated with `levelName` and `userId`,
    // where `levelName` is the name of a level configured in your dashboard.
    //
    // The SDK will work in the production or in the sandbox environment
    // depending on which one the `accessToken` has been generated on.
    let accessToken = `_act-sbx-jwt-eyJhbGciOiJub25lIn0.eyJqdGkiOiJfYWN0LXNieC0zMzE2OGQwOS1jYTg5LTRiZWQtYTkyZi0zMjRmNzQ5ZDU2MmIiLCJ1cmwiOiJodHRwczovL2FwaS5zdW1zdWIuY29tIn0.`;

    try {
      let snsMobileSDK = SNSMobileSDK.init(accessToken, async () => {
        try {
          const response = await fetch(`${Url}/sumsub/token`, {
            method: 'GET',
          });
          const newAccessToken = await response.text();
          return "_act-sbx-jwt-eyJhbGciOiJub25lIn0.eyJqdGkiOiJfYWN0LXNieC0zMzE2OGQwOS1jYTg5LTRiZWQtYTkyZi0zMjRmNzQ5ZDU2MmIiLCJ1cmwiOiJodHRwczovL2FwaS5zdW1zdWIuY29tIn0.";
        } catch (error) {
          console.log('Error fetching new access token:', error);
          throw error;
        }
      })
        .withHandlers({
          onStatusChanged: event => {
            console.log(
              'onStatusChanged: [' +
                event.prevStatus +
                '] => [' +
                event.newStatus +
                ']',
            );
          },
          onLog: event => {
            console.log('onLog: [Idensic] ' + event.message);
          },
        })
        .withDebug(true)
        .withLocale('en') // Optional, for cases when you need to override the system locale
        .build();

      const result = await snsMobileSDK.launch();
      console.log('SumSub SDK State: ' + JSON.stringify(result));
    } catch (error) {
      console.log('SumSub SDK Error: ' + JSON.stringify(error));
    }
  };
  const gett = async () => {
    const resp = await getToken();
    console.log('sdfsdfsdfsdfsdfsdfsd................',resp);
  };
  useEffect(() => {
    console.log('sdfsdfsdfsdfsdfsdfsd');
    gett();
  }, []);

  return (
    <View>
      <Button title="Launch SumSub SDK" onPress={launchSNSMobileSDK} />
    </View>
  );
};

export default SplashScreen;
