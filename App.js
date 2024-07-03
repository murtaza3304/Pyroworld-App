import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Authstack from './src/stacks/Authstack';
import {useTheme, useThemeClasses} from './src/assets/theme/Theme';
import {StatusBar, View, Platform} from 'react-native';
import SplashScreen from './src/screens/SplashScreen/SplashScreen';
import {MyProvider as ContextProvider} from './src/context';

function App() {
  const theme = useTheme();
  const themeClasses = useThemeClasses();
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
          backgroundColor={theme === 'dark' ? '#0a1224' : '#FFFFFF'}
          barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        />
        {splashVisible ? (
          <SplashScreen />
        ) : (
          <View
            className={`flex-1 ${themeClasses.sheetColor} mt-${
              Platform.OS === 'ios' ? 8 : 0
            }`}>
            <Authstack />
          </View>
        )}
      </NavigationContainer>
    </ContextProvider>
  );
}

export default App;
