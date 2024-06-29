import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
  TextInput,
  ScrollView,
} from 'react-native';
import {useTheme, useThemeClasses} from '../../assets/theme/Theme';
import {fonts} from '../../assets/fonts';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import {resetPassword} from '../../api';
import {resetPasswordValidation} from '../../validations';

const ResetAuthCode = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const theme = useTheme();
  const themeClasses = useThemeClasses();
  const [formData, setFormData] = useState({
    token: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    password: '',
    confirmPassword: '',
  });

  const handleChange = (field, value) => {
    setFormData(prevState => ({
      ...prevState,
      [field]: value,
    }));
    setErrors(prevState => ({
      ...prevState,
      [field]: '',
    }));
  };

  const renderPasswordFields = () => {
    if (formData?.token?.length !== 4) {
      return null;
    }

    const handleSubmit = async () => {
      const {confirmPassword, ...rest} = formData;

      const rejection = resetPasswordValidation(rest);
      if (Object.keys(rejection)?.length > 0) {
        setErrors(rejection);
        return;
      } else {
        try {
          const {confirmPassword, ...rest} = formData;
          await resetPassword(rest);
          navigation.navigate('Login');
        } catch (error) {
          console.log('error', error);
        }
      }
    };

    return (
      <View className={`flex flex-col w-full p-8 justify-center items-center`}>
        <Text className={`${themeClasses.textColor} text-2xl font-bold my-5`}>
          Set Password
        </Text>
        <View className="w-full">
          <TextInput
            className={`border-b border-solid ${themeClasses.border} ${theme.textColor}`}
            placeholder="Password"
            placeholderTextColor={'gray'}
            // secureTextEntry={true}
            value={formData.password}
            onChangeText={text => handleChange('password', text)}
          />
        </View>

        <Text className={`flex justify-start ${theme.redColor} mb-1`}>
          {errors?.password}
        </Text>

        <View className={`w-full`}>
          <TextInput
            className={`border-b border-solid ${themeClasses.border} ${theme.textColor}`}
            placeholder="Confirm Password"
            placeholderTextColor={isDarkMode ? '#888' : '#666'}
            // secureTextEntry={true}
            value={formData.confirmPassword}
            onChangeText={text => handleChange('confirmPassword', text)}
          />
        </View>

        <Text className={`flex justify-start ${theme.redColor} mb-1 w-full`}>
          {errors?.confirmPassword}
        </Text>
        <TouchableOpacity
          className={`${themeClasses.blueBg} w-full h-[46px] flex justify-center items-center rounded-lg`}
          onPress={handleSubmit}>
          <Text className={`text-white font-bold text-lg`}>Verify</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View
      className={`flex justify-start items-center flex-col ${themeClasses.sheetColor} h-full`}>
      <View className={`flex justify-center items-center mt-[70px] mb-[50px]`}>
        <Text className={`${themeClasses.textColor} font-bold text-2xl`}>
          Email Verification
        </Text>
        <Text className={`${themeClasses.textColor}  text-sm`}>
          Please enter the four digit code sent to your Mail
        </Text>
      </View>
      <View className="w-full h-[80px] flex justify-center items-center">
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
          value={formData?.token}
          cellSpacing={10}
          codeLength={4}
          onTextChange={text => handleChange('token', text)}
        />
      </View>
      <View
        className={`flex flex-row ${formData.token.length > 0 && 'hidden'} `}>
        <Text className={`${themeClasses.textColor} font-md`}>
          Didn't Receive a code?
        </Text>
        <TouchableOpacity>
          <Text className={` font-bold ${themeClasses.blueText}`}>
            Try Again
          </Text>
        </TouchableOpacity>
      </View>

      {renderPasswordFields()}

      <View className="flex justify-center items-center w-full mt-[10px] mb-[50px]">
        <Text className={`${themeClasses.textColor} text-sm`}>
          By continuing you are indicating that you accept our
        </Text>
        <View className="flex w-full flex-row justify-center items-center">
          <TouchableOpacity className="border-b border-solid mr-1 ">
            <Text className={`${themeClasses.textColor} text-sm`}>
              Terms of use
            </Text>
          </TouchableOpacity>
          <Text className={`${themeClasses.textColor} text-sm`}>and our</Text>
          <TouchableOpacity className="border-b border-solid ml-1 ">
            <Text className={`${themeClasses.textColor} text-sm`}>
              Privacy Policy
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ResetAuthCode;

const styles = StyleSheet.create({
  OptTextInput: {
    marginTop: 30,
    borderRadius: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'grey',
  },
  BtnStyle: {
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  textStyle: {
    fontSize: 14,
    marginRight: 6,
    fontFamily: fonts.regular,
  },
  errorText: {
    color: 'red',
    marginTop: 0,
    marginBottom: 6,
    alignSelf: 'flex-start',
  },
});
