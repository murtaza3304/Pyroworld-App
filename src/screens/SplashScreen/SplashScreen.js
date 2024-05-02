import { StyleSheet, Text, View, Image, Animated } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { fonts } from '../../assets/fonts'
import { useTheme } from '@react-navigation/native';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';

const SplashScreen = () => {
    const theme = useTheme();
    const text = "Pyroworld";
    const textWithSpace = "Pyroworld"; 
    const textLength = textWithSpace.length; 
    const typingSpeed = 100; 
    const delayBeforeStart = 0;

    const [typedText, setTypedText] = useState('');


const authenticateWithFingerprint = async () => {
  const rnBiometrics = new ReactNativeBiometrics();

  try {
    const { biometryType } = await rnBiometrics.isSensorAvailable();

    if (biometryType === BiometryTypes.Biometrics) {
      const result = await rnBiometrics.simplePrompt({
        promptMessage: 'Scan your fingerprint to proceed',
        cancelButtonText: 'Cancel',
      });

      if (result.success) {
        console.log('Fingerprint authentication successful');
      } else {
        console.log('Fingerprint authentication failed or canceled');
      }
    } else {
      console.log('Biometric authentication is not available.');
    }
  } catch (error) {
    console.error('An error occurred during biometric authentication:', error);
  }
};

authenticateWithFingerprint();

    useEffect(() => {
        setTimeout(startTypingAnimation, delayBeforeStart);
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
        <View style={{ width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../../assets/images/logo.png')} style={{ width: '50%', height: '25%' }} />
            <View>
                <Text
                    style={{
                        fontFamily: fonts.bold,
                        fontSize: 30,
                        color: theme.text,
                    }}
                >
                    {typedText}
                </Text>
            </View>
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({})







