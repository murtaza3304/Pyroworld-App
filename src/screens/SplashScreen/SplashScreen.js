import {StyleSheet, Text, View, Image, Animated} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {fonts} from '../../assets/fonts';
import {useTheme} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native'; // Import useNavigation hook

const SplashScreen = () => {
  return (
    <View
      style={{
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        source={require('../../assets/images/logo.png')}
        style={{width: '50%', height: '25%'}}
      />
    </View>
  );
};

export default SplashScreen;
