import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {useThemeClasses} from '../../assets/theme/Theme';
import {forgetPassword} from '../../api';
import {forgetPasswordValidation} from '../../validations';

function PasswordReset({navigation}) {
  const theme = useThemeClasses();
  const [formData, setFormData] = useState({
    email: '',
  });
  const [errors, setErrors] = useState({
    email: '',
  });
  const handleSignUp = async () => {
    const rejection = forgetPasswordValidation(formData);
    if (Object.keys(rejection).length > 0) {
      setErrors(rejection);
      return;
    }

    try {
      await forgetPassword(formData);
      navigation.navigate('ResetAuthCode');
    } catch (error) {
      console.log('error', error);
    }
  };
  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    setErrors(prev => ({
      ...prev,
      [field]: '',
    }));
  };
  return (
    <View
      className={`flex flex-col w-full h-full p-6 justify-start items-center ${theme.sheetColor} `}>
      <View className="flex justify-center items-center mt-[100px] mb-[40px]">
        <Text className={`${theme.textColor} font-bold text-2xl`}>
          Forget Password
        </Text>
        <Text className={`${theme.textColor}  text-md`}>
          Just reset password by entering email
        </Text>
      </View>
      <View className="flex w-full">
        <TextInput
          className={`border-b border-solid ${theme.border} ${theme.textColor}`}
          placeholder="Enter Your Email"
          placeholderTextColor={'gray'}
          keyboardType="email-address"
          value={formData.email}
          onChangeText={text => handleChange('email', text)}
        />
        {
          <Text className={`flex justify-start ${theme.redColor}`}>
            {errors?.email}
          </Text>
        }

        <TouchableOpacity
          className={`${theme.blueBg} h-[45px] flex justify-center items-center rounded-lg`}
          onPress={handleSignUp}>
          <Text className="text-white text-lg font-bold">Confirm</Text>
        </TouchableOpacity>
        <View className="w-full flex flex-row justify-center mt-3">
          <Text className={`${theme.textColor}`}>Already remebered?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text className={`${theme.blueText} font-bold mx-1`}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default PasswordReset;
