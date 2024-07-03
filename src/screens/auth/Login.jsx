import React, {useState} from 'react';
import {
  StyleSheet,
  useColorScheme,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {useTheme, useThemeClasses} from '../../assets/theme/Theme';
import {SvgXml} from 'react-native-svg';
import {assets} from '../../assets/images/assets';
import {signin} from '../../api';
import {signinValidation} from '../../validations';
import {logo} from '../../assets/images';

function Login({navigation}) {
  const theme = useThemeClasses();
  const themeNature = useTheme();
  const [isSecureMode, setSecureMode] = useState(true);
  const [isLoading, setLoading] = useState(false);

  const handleEmail = text => {
    setEmail(text);
    setEmailError('');
  };

  const handlePassword = text => {
    setPassword(text);
    setPasswordError('');
  };

  const showPassword = () => {
    setSecureMode(!isSecureMode);
  };

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const handleLogin = async () => {
    const error = signinValidation(formData);
    setLoading(true);
    if (Object.keys(error).length > 0) {
      setErrors(error);
      setLoading(false);
      return;
    } else {
      try {
        const response = await signin(formData);
        setLoading(true);
        if (response) {
          setFormData({
            email: '',
            password: '',
          });

          navigation.navigate('EmailAuthantication');
        } else {
          navigation.navigate('EmailAuthantication');
        }
        setLoading(false);
      } catch (error) {
        setErrors({
          email: 'Invalid Credentials',
          password: 'Invalid Credentials',
        });
        setLoading(false);
      }
    }
  };

  const handleChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    setErrors(prev => ({
      ...prev,
      [name]: '',
    }));
  };
  const forgetPassword = () => {
    navigation.navigate('PasswordReset');
  };
  // FingerPrint Authantication

  // const authenticateWithFingerprint = async () => {
  //   const rnBiometrics = new ReactNativeBiometrics();

  //   try {
  //     const { biometryType } = await rnBiometrics.isSensorAvailable();

  //     if (biometryType === BiometryTypes.Biometrics) {
  //       const result = await rnBiometrics.simplePrompt({
  //         promptMessage: 'Scan your fingerprint to proceed',
  //         cancelButtonText: 'Cancel',
  //       });

  //       if (result.success) {
  //         console.log('Fingerprint authentication successful');
  //       } else {
  //         console.log('Fingerprint authentication failed or canceled');
  //       }
  //     } else {
  //       console.log('Biometric authentication is not available.');
  //     }
  //   } catch (error) {
  //     console.error('An error occurred during biometric authentication:', error);
  //   }
  // };

  // authenticateWithFingerprint();

  return (
    <View
      className={`flex justify-start h-full items-center p-7 ${theme.sheetColor}`}>
      <View className="flex justify-center items-center mb-[50px] mt-[100px] ">
        <Image source={logo} className="w-[100px] h-[100px]" />
        <Text className={`text-3xl ${theme.textColor} font-bold`}>
          Welcome Back!
        </Text>
        <Text className={`text-md ${theme.textColor}`}>
          Please Sign In to your Account
        </Text>
      </View>

      <TextInput
        className={`w-full  my-[4px] border p-2 rounded-lg ${theme.border} ${theme.textColor} `}
        autoCompleteType={false}
        placeholder="Email or Phone Number"
        placeholderTextColor={'gray'}
        value={formData.email}
        onChangeText={text => handleChange('email', text)}
      />
      <Text className={`flex justify-start ${theme.redColor} w-full text-left`}>
        {errors?.email}
      </Text>

      <View className="w-full mb-3">
        <TextInput
          className={`w-full my-1 border rounded-lg p-2 border-solid ${theme.border} ${theme.textColor}`}
          placeholder="Password"
          secureTextEntry={isSecureMode}
          placeholderTextColor={'gray'}
          value={formData.password}
          onChangeText={text => handleChange('password', text)}
        />
        <View className="flex">
          <Text className={`flex justify-start ${theme.redColor}`}>
            {errors?.password}
          </Text>
          <TouchableOpacity
            className="absolute right-1"
            onPress={() => forgetPassword()}>
            <Text className={`font-bold ${theme.blueText}`}>
              Forget Password
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          className="absolute right-4 top-4"
          onPress={showPassword}>
          <SvgXml xml={isSecureMode ? assets.openEye : assets.closeEye} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        className={`${theme.blueBg} h-[50px] flex justify-center items-center rounded-lg mt-3 w-full`}
        onPress={handleLogin}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <Text className="text-white font-bold text-lg">Login</Text>
        )}
      </TouchableOpacity>
      <View className="flex flex-row mt-3">
        <Text className={`text-[14px] ${theme.textColor}`}>
          Don't have an account?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text className={` ${theme.blueText} font-bold mx-1`}>Sign up</Text>
        </TouchableOpacity>
      </View>

      {/* <Text className={`${theme.textGray} mt-3`}>OR</Text>
      
      <TouchableOpacity
        className={`w-full flex mt-5 flex-row justify-center items-center border border-solid ${theme.border} h-10 rounded-lg`}
        onPress={() => navigation.navigate('SignUp')}>
        <Image source={google} className="w-5 h-5 mx-1" />
        <Text className={`px-1 ${theme.textColor} font-bold text-md`}>
          Continue with Google
        </Text>
      </TouchableOpacity> */}
    </View>
  );
}

export default Login;
