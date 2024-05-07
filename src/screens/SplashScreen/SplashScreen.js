import { StyleSheet, Text, View, Image, Animated } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { fonts } from '../../assets/fonts';
import { useTheme } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const SplashScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation(); // Initialize navigation object
  const text = 'PYROWORLD';
  const textWithSpace = 'PYROWORLD';
  const textLength = textWithSpace.length;
  const typingSpeed = 100;
  const delayBeforeStart = 0;
  const delayBeforeClose = 2000; 

  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    setTimeout(startTypingAnimation, delayBeforeStart);

    const closeTimeout = setTimeout(() => {
      navigation.navigate('BottomTab');
    }, delayBeforeClose);

    return () => clearTimeout(closeTimeout);
  }, []);

  const startTypingAnimation = () => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      setTypedText(textWithSpace.slice(0, currentIndex + 1));
      currentIndex++;
      if (currentIndex === textLength) {
        clearInterval(typingInterval);
      }
    }, typingSpeed);
  };

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
        style={{ width: '50%', height: '25%' }}
      />
      <View>
        <Text
          style={{
            fontFamily: fonts.bold,
            fontSize: 30,
            color: theme.text,
          }}>
          {typedText}
        </Text>
      </View>
    </View>
  );
};

export default SplashScreen;
