import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Authstack from './src/stacks/Authstack';
import AppStack from './src/stacks/Appstack';
import {useTheme} from './src/assets/theme/Theme';
import {StatusBar,View} from 'react-native';
function App() {
  const theme = useTheme();
  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor={theme.background}
        barStyle={'light-content'}
      />
      <View style= {{flex:1,marginTop: Platform.OS === 'ios' ? 30 : 0, }}>
      <Authstack />
      </View>
    </NavigationContainer>
  );
}
export default App;