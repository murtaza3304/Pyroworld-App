import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
  TextInput,
  Alert,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {assets} from '../../assets/images/assets';
import {useThemeClasses, useTheme} from '../../assets/theme/Theme';
import {fonts} from '../../assets/fonts';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import {verifyEmail, emailVerification, logout} from '../../api';
import {useAuth} from '../../hooks';
import Loading from '../app/Profile/Loading';

const EmailAuthantication = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const {user, tokens, loading} = useAuth();
  const theme = useTheme();
  const themeClasses = useThemeClasses();
  useThemeClasses;
  const [code, setCode] = useState('');
  const handleSubmit = async () => {
    if (code.length === 4) {
      try {
        await verifyEmail(code);
        navigation.navigate('AppStack');
      } catch (error) {
        console.log('erorr', error);
        Alert.alert('fail');
      }
    }
  };
  useEffect(() => {
    if (!loading) {
      if (!user && !tokens) {
        navigation.navigate('Login');
      } else if (user && tokens && !user?.isEmailVerified) {
        emailVerification();
      }
    }
  }, [user, tokens, loading]);
  useEffect(() => {
    if (user?.isEmailVerified) {
      navigation.navigate('AppStack');
    }
  }, [user]);

  // return !user ? (
  //   <Loading />
  // ) : (

  return (
    !user?.isEmailVerified && (
      <View
        className={`flex h-full flex flex-col justify-start items-center ${themeClasses.sheetColor} p-7`}>
        <View className="flex justify-center items-center mt-[100px]">
          <Text className={`font-bold text-2xl ${themeClasses.textColor}`}>
            Email Verification
          </Text>
          <Text className={` text-md ${themeClasses.textColor}`}>
            Please enter the four degit code send to your Email
          </Text>
        </View>
        <View className={`flex w-full h-[50px] jusfify-center items-center mt-3`}>
          <SmoothPinCodeInput
            textStyle={{color: isDarkMode ? '#fff' : '#000', fontSize: 30}}
            cellSize={50}
            cellStyle={{
              borderBottomWidth: 2,
              borderColor: 'gray',
            }}
            cellStyleFocused={{
              borderColor: isDarkMode ? '#fff' : '#000',
            }}
            value={code}
            cellSpacing={10}
            codeLength={4}
            onTextChange={text => setCode(text)}
          />
        </View>
        <View className={'flex flex-row mt-3'}>
          <Text className={`${themeClasses.textColor}`}>
            Didn't Receive a code?
          </Text>
          <TouchableOpacity onPress={emailVerification}>
            <Text className={`${themeClasses.blueText} font-bold ml-1`}>
              Resend Code
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          className={`flex w-full h-[46px] justify-center items-center ${themeClasses.blueBg} mt-5 rounded-lg`}
          onPress={handleSubmit}
          disabled={code.length !== 4}>
          <Text
            className='text-white text-lg font-bold'>
            Verify
          </Text>
        </TouchableOpacity>
      
      </View>
    )
  );
  // );
};

export default EmailAuthantication;

const styles = StyleSheet.create({
  OptTextInput: {
    marginTop: 30,
    borderRadius: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'grey',
  },
  BtnStyle: {
    marginTop: 20,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
});
