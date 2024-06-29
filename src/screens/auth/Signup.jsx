import React, {useState, useEffect} from 'react';
import {
  useColorScheme,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {useTheme, useThemeClasses} from '../../assets/theme/Theme';
import CountryPicker, {DARK_THEME} from 'react-native-country-picker-modal';
import {signUpValidation} from '../../validations';
import {register} from '../../api';
import {logo} from '../../assets/images';
import {assets} from '../../assets/images/assets';

function SignUp({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';
  const theme = useTheme();
  const themeClasses = useThemeClasses();
  const [secureMode, setSecureMode] = useState({
    eye1: true,
    eye2: true,
  });
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const inputClass = `border mt-2 rounded-lg px-3 border-solid w-full ${themeClasses.border} ${theme.textColor} py-2 mb-2`;
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    country: 'Spain',
    email: '',
    phone: '',
    password: '',
    code: 'ES',
    confirmPassword: '',
    credentialType: '',
    accountType: '',
  });
  console.log('sfsfsfsd', formData);

  // console.log('formData', formData);
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    country: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleSignUp = async () => {
    const {confirmPassword, credentialType, email, phone, code, ...rest} =
      formData;
    if (credentialType === 'email') {
      rest.email = email;
    } else {
      rest.phone === formData.code.concat(formData.phone);
    }

    const errors = signUpValidation(formData, 6);
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    } else {
      setLoading(true);

      try {
        await register(rest);
        navigation.navigate('EmailAuthantication');
        setLoading(false);
      } catch (error) {
        console.error('registration error:', error);
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

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <View className="mb-1 p-5 flex justify-center items-center">
            <Text
              className={`text-3xl text-center font-bold mb-2 ${themeClasses.textColor}`}>
              Which options you want to continue?
            </Text>
            <Text
              className={`text-md text-center ${themeClasses.textColor} mb-10`}>
              Pick one from the given.
            </Text>
            <TouchableOpacity
              onPress={() => {
                setFormData(prev => ({...prev, credentialType: 'email'}));
                setStep(2);
              }}
              className={`flex flex-col  h-[100px] justify-evenly items-center w-full ${themeClasses.blueBg} p-5 mt-14 rounded-lg `}>
              <SvgXml xml={assets.email} width={40} height={40} />
              <Text className={`text-white text-lg font-bold mt-1`}>Email</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`flex  h-[100px] justify-start items-center w-full ${themeClasses.blueBg} p-5 rounded-lg my-5`}
              onPress={() => {
                setFormData(prev => ({...prev, credentialType: 'phone'}));
                setStep(2);
              }}>
              <SvgXml xml={assets.phone} width={40} height={40} />
              <Text className={` text-gray-100 text-lg font-bold mt-1`}>
                Phone Number
              </Text>
            </TouchableOpacity>
          </View>
        );

      case 2:
        return (
          <View className="mb-1 p-5 flex justify-center items-center">
            <Text
              className={`text-3xl text-center font-bold mb-2 ${themeClasses.textColor}`}>
              What kind of account would you like to open?
            </Text>
            <Text
              className={`text-md text-center ${themeClasses.textColor} mb-10`}>
              You can add another account later, too.
            </Text>
            <TouchableOpacity
              onPress={() => {
                setFormData(prev => ({...prev, accountType: 'personal'}));
                setStep(3);
              }}
              className={`flex flex-col  h-[100px] justify-evenly items-center w-full ${themeClasses.blueBg} p-5 mt-14 rounded-lg `}>
              <SvgXml xml={assets.personal} width={40} height={40} />
              <Text className={`text-white text-lg font-bold mt-1`}>
                Personal Account
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`flex  h-[100px] justify-start items-center w-full ${themeClasses.blueBg} p-5 rounded-lg my-5`}
              onPress={() => {
                setFormData(prev => ({...prev, accountType: 'business'}));
                setStep(3);
              }}>
              <SvgXml xml={assets.business} width={40} height={40} />
              <Text className={` text-gray-100 text-lg font-bold mt-1`}>
                Business Account
              </Text>
            </TouchableOpacity>
          </View>
        );
      case 3:
        return (
          <View className="mb-4 flex justify-center items-center">
            <Image source={logo} className="w-[100px] h-[100px]" />

            <Text
              className={`text-3xl font-bold mb-2 ${themeClasses.textColor}`}>
              What's your Name?
            </Text>
            <Text
              className={`text-md text-center ${themeClasses.textColor} mb-10`}>
              This information will later be used for your identity
              verification.
            </Text>
            <View className="w-full">
              <TextInput
                className={inputClass}
                placeholder="First Name"
                placeholderTextColor={'gray'}
                value={formData.name}
                onChangeText={text => handleChange('firstName', text)}
              />
              <Text
                className={`text-red-500 px-2 w-full text-left ${theme.redColor}`}>
                {errors?.firstName}
              </Text>
            </View>
            <View className="w-full">
              <TextInput
                className={inputClass}
                placeholder="Last Name"
                placeholderTextColor={'gray'}
                value={formData.name}
                onChangeText={text => handleChange('lastName', text)}
              />
              <Text
                className={`text-red-500 px-2 w-full text-left ${theme.redColor}`}>
                {errors?.lastName}
              </Text>
            </View>
          </View>
        );
      case 4:
        return (
          <View className="mb-4 flex items-center w-full">
            <Image source={logo} className="w-[100px] h-[100px]" />

            <Text
              className={`text-3xl text-center font-bold mb-2 ${themeClasses.textColor}`}>
              What's your Country?
            </Text>
            <Text
              className={`text-md text-center ${themeClasses.textColor} mb-10`}>
              This information will later be used for your identity
              verification.
            </Text>
            <View
              className={`w-[100%] border p-2 rounded-lg border-gray-200 dark:border-gray-700 `}>
              <CountryPicker
                withFilter
                withFlagButton={true}
                countryCode={formData.code}
                withFlag={true}
                withCallingCode={true}
                withCallingCodeButton={false}
                withCountryNameButton={true}
                theme={isDarkMode ? DARK_THEME : {}}
                onSelect={country => {
                  setFormData(prev => ({
                    ...prev,
                    code: country.cca2,
                    country: country.name,
                    phoneCode: country.callingCode,
                  }));
                }}
              />
            </View>

            <Text
              className={`text-red-500 px-2 w-full text-left ${theme.redColor}`}>
              {errors?.country}
            </Text>
          </View>
        );
      case 5:
        return (
          <View className="mb-4 flex items-center">
            <Image source={logo} className="w-[100px] h-[100px]" />

            <Text
              className={`text-2xl font-bold mb-2  ${themeClasses.textColor}`}>
              Credentials Information
            </Text>
            <Text className="text-md text-center text-gray-500 mb-10 w-[80%]">
              This information will later be used to login into your account
              later on
            </Text>
            {formData.credentialType === 'email' ? (
              <View className="w-full">
                <TextInput
                  className={inputClass}
                  placeholder="Email Address"
                  placeholderTextColor={'gray'}
                  keyboardType="email-address"
                  value={formData.email}
                  onChangeText={text => handleChange('email', text)}
                />
                <Text
                  className={`text-red-500 px-2 w-full text-left ${theme.redColor}`}>
                  {errors?.email}
                </Text>
              </View>
            ) : (
              <View className="w-full">
                <View className="flex flex-row items-center border rounded-lg w-full border-gray-300 mt-4 ">
                  <Text className="p-2 border-r border-gray-400 font-bold">
                    +{formData.phoneCode}
                  </Text>
                  <TextInput
                    placeholder="Enter Phone Number"
                    type="number"
                    placeholderTextColor={'gray'}
                    className="p-2"
                    keyboardType={
                      Platform.OS === 'ios' ? 'numeric' : 'number-pad'
                    }
                    value={formData.phone}
                    onChangeText={text => handleChange('phone', text)}
                  />
                </View>
                <Text
                  className={`text-red-500 px-2 w-full text-left ${theme.redColor}`}>
                  {errors?.email}
                </Text>
              </View>
            )}
          </View>
        );
      case 6:
        return (
          <View className="mb-4 flex items-center p-2">
            <Image source={logo} className="w-[100px] h-[100px]" />

            <Text
              className={`text-2xl font-bold mb-2 ${themeClasses.textColor}`}>
              Set up your password
            </Text>
            <Text className="text-md mb-5 text-gray-400 text-center">
              This information will later be used for your identity
              verification.
            </Text>
            <View className="w-full relative">
              <TextInput
                className={inputClass}
                placeholder="Password"
                placeholderTextColor={isDarkMode ? '#888' : '#666'}
                secureTextEntry={secureMode.eye2}
                value={formData.password}
                onChangeText={text => handleChange('password', text)}
              />
              <TouchableOpacity
                className="absolute right-3 top-5"
                onPress={() =>
                  setSecureMode(prev => ({...prev, eye1: !prev.eye1}))
                }>
                <SvgXml
                  xml={secureMode.eye1 ? assets.closeEye : assets.openEye}
                />
              </TouchableOpacity>
              <Text
                className={`text-red-500 px-2 w-full text-left ${theme.redColor}`}>
                {errors?.password}
              </Text>
            </View>
            <View className="w-full relative">
              <TextInput
                className={inputClass}
                placeholder="Confirm Password"
                placeholderTextColor={isDarkMode ? '#888' : '#666'}
                secureTextEntry={secureMode.eye2}
                value={formData.confirmPassword}
                onChangeText={text => handleChange('confirmPassword', text)}
              />
              <TouchableOpacity
                className="absolute right-3 top-5"
                onPress={() =>
                  setSecureMode(prev => ({...prev, eye2: !prev.eye2}))
                }>
                <SvgXml
                  xml={secureMode.eye2 ? assets.closeEye : assets.openEye}
                />
              </TouchableOpacity>
              <Text
                className={`text-red-500 px-2 w-full text-left ${theme.redColor}`}>
                {errors?.confirmPassword}
              </Text>
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View className={`flex-1 p-5 ${themeClasses.sheetColor}`}>
      {step > 1 && (
        <TouchableOpacity onPress={() => setStep(step - 1)}>
          <SvgXml xml={assets.back} className=" " />
        </TouchableOpacity>
      )}
      <ScrollView showsVerticalScrollIndicator={false} className="mt-[50px]">
        {renderStep()}
        <View className="flex-col justify-between mt-2">
          {step > 2 && step < 6 ? (
            <TouchableOpacity
              className={`bg-blue-500 w-full p-3 rounded-lg ${themeClasses.blueBg}`}
              onPress={() => {
                let errors = signUpValidation(formData, step);
                console.log('errors', errors);
                if (Object.keys(errors).length > 0) {
                  setErrors(errors);
                } else {
                  setStep(step + 1);
                }
              }}>
              <Text className={`text-white text-center font-bold text-lg `}>
                Next
              </Text>
            </TouchableOpacity>
          ) : (
            step === 6 && (
              <TouchableOpacity
                className={`bg-blue-500 p-3 rounded-lg ${themeClasses.blueBg} `}
                onPress={handleSignUp}>
                {loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text className="text-white text-center font-bold text-lg">
                    Sign Up
                  </Text>
                )}
              </TouchableOpacity>
            )
          )}
        </View>
        <View className="mt-2 flex-row justify-center">
          <Text className={themeClasses.textColor}>
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text
              className={`text-blue-500 ${themeClasses.blueText} mx-1 font-bold`}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

export default SignUp;
