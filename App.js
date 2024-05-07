import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Authstack from './src/stacks/Authstack';
import {useTheme} from './src/assets/theme/Theme';
import {StatusBar, View} from 'react-native';

import SplashScreen from './src/screens/SplashScreen/SplashScreen';
import {MyProvider as ContextProvider} from './src/context';

function App() {
  const theme = useTheme();
  const [splashVisible, setSplashVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setSplashVisible(false);
    }, 3000);
  }, []);

  return (
    <ContextProvider>
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
    </ContextProvider>
  );
}

export default App;
