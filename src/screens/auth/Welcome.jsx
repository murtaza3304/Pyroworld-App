import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {useThemeClasses} from '../../assets/theme/Theme';
import {logo} from '../../assets/images';

function Welcome({navigation}) {
  const themeClasses = useThemeClasses();

  return (
    <View
      className={`flex-1 p-5 justify-start pt-[100px] items-center ${themeClasses.sheetColor}`}>
      <Image source={logo} className="w-[150px] h-[150px]" />
      <View className="items-center mb-10">
        <Text className={`text-3xl font-bold mb-2 ${themeClasses.textColor}`}>
          Welcome Back!
        </Text>
        <Text className={`text-md text-center ${themeClasses.textColor}`}>
          Please enter your details to continue
        </Text>
      </View>
      <View className="flex justify-around mt-5 w-full">
        <TouchableOpacity
          className={`bg-blue-500 flex justify-center items-center rounded-lg ${themeClasses.blueBg} my-2 h-[45px]`}
          onPress={() => navigation.navigate('Login')}>
          <Text className="text-white text-center font-bold text-lg">Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`bg-blue-500 flex justify-center items-center rounded-lg ${themeClasses.blueBg} my-2 h-[45px]`}
          onPress={() => navigation.navigate('SignUp')}>
          <Text className="text-white text-center font-bold text-lg">Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Welcome;
