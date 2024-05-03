import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Authstack from './src/stacks/Authstack';
import {useTheme} from './src/assets/theme/Theme';
import {StatusBar, View} from 'react-native';

import SplashScreen from './src/screens/SplashScreen/SplashScreen';

function App() {
  const theme = useTheme();
  const [splashVisible, setSplashVisible] = useState(false);

  useEffect(() => {
    // setTimeout(() => {
    //   setSplashVisible(false);
    // }, 3000);
  }, []);

  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor={theme.background}
        barStyle={'light-content'}
      />
      {splashVisible ? (
        <SplashScreen />
      ) : (
        <View style={{flex: 1, marginTop: Platform.OS === 'ios' ? 30 : 0}}>
          <Authstack />
        </View>
      )}
    </NavigationContainer>
  );
}

export default App;
