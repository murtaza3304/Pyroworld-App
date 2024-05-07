import { View, Image, useColorScheme} from 'react-native';
import React from 'react';
import { useTheme } from '../../../assets/theme/Theme';
import LoaderKit from 'react-native-loader-kit'

const Loading = ({navigation}) => {
  const theme = useTheme()
  return (
    <View
      style={{
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <LoaderKit
      LineScalePulseOut
        style={{width: 50, height: 50}}
        name={'BallPulse'}
        color={theme.text}
      />
    </View>
  );
};

export default Loading;
