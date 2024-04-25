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
import {SvgXml} from 'react-native-svg';
import {assets} from '../../assets/images/assets';
import {useTheme} from '../../assets/theme/Theme';
import {fonts} from '../../assets/fonts';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import {logo} from '../../assets/images';
import {resetPassword} from '../../api';
import { resetPasswordValidation } from '../../validations';


const ResetAuthCode = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const theme = useTheme();
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
      [field]: "",
    }));
  };

  const renderPasswordFields = () => {
    if (formData?.token?.length !== 4) {
      return null;
    }

    const handleSubmit = async () => {
      const {confirmPassword,...rest} = formData;

      const rejection = resetPasswordValidation(rest);
      if (Object.keys(rejection)?.length > 0) {
        setErrors(rejection);
        return;
      } else {
        try {
          const {confirmPassword,...rest} = formData;
          await resetPassword(rest);
          navigation.navigate('Login');
        } catch (error) {
          console.log('error', error);
        }
      }
    };

    return (
      <View
        style={[
          styles.container,
          {backgroundColor: isDarkMode ? '#000' : '#fff', marginTop: 30},
        ]}>
        <Text
          style={{
            color: isDarkMode ? '#fff' : '#000',
            fontFamily: fonts.bold,
            fontSize: 22,
            marginVertical: 20,
          }}>
          Set Password
        </Text>
        <View style={{width: '100%'}}>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: isDarkMode ? '#333' : '#ddd',
                color: isDarkMode ? '#fff' : '#000',
              },
            ]}
            placeholder="Password"
            placeholderTextColor={isDarkMode ? '#888' : '#666'}
            // secureTextEntry={true}
            value={formData.password}
            onChangeText={text => handleChange('password', text)}
          />
        </View>

        <Text style={styles.errorText}>{errors?.password}</Text>

        <View style={{width: '100%'}}>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: isDarkMode ? '#333' : '#ddd',
                color: isDarkMode ? '#fff' : '#000',
              },
            ]}
            placeholder="Confirm Password"
            placeholderTextColor={isDarkMode ? '#888' : '#666'}
            // secureTextEntry={true}
            value={formData.confirmPassword}
            onChangeText={text => handleChange('confirmPassword', text)}
          />
        </View>

        <Text style={styles.errorText}>{errors?.confirmPassword}</Text>
        <TouchableOpacity
          style={[styles.BtnStyle, {backgroundColor: '#007bff', width: '100%'}]}
          onPress={handleSubmit}>
          <Text
            style={{
              color: 'white',
              fontFamily: fonts.bold,
              fontSize: 18,
            }}>
            Verify
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: isDarkMode ? '#000' : '#fff',
        paddingTop: 10,
      }}>
      <TouchableOpacity onPress={() => navigation.navigate('PasswordReset')}>
        <SvgXml xml={assets.back} />
      </TouchableOpacity>
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 30,
        }}>
        <Text
          style={{
            color: isDarkMode ? '#fff' : '#000',
            fontFamily: fonts.bold,
            fontSize: 22,
          }}>
          Email Verification
        </Text>
        <Text
          style={{
            color: isDarkMode ? '#fff' : '#000',
            fontFamily: fonts.regular,
          }}>
          Please enter the four digit code sent to your
        </Text>
        <Text
          style={{color: isDarkMode ? '#fff' : '#000', fontFamily: fonts.bold}}>
          Mail
        </Text>
      </View>
      <View
        style={{
          width: '100%',
          height: 50,
          width: '100%',
          alignItems: 'center',
          marginTop: 20,
        }}>
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
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
        }}>
        <Text
          style={{
            color: isDarkMode ? '#fff' : '#000',
            marginRight: 4,
            fontFamily: fonts.regular,
          }}>
          Didn't Receive a code
        </Text>
        <TouchableOpacity>
          <Text style={{color: theme.blue, fontFamily: fonts.bold}}>
            Try Again
          </Text>
        </TouchableOpacity>
      </View>

      {renderPasswordFields()}

      <View
        style={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 14,
        }}>
        <Text
          style={{
            color: isDarkMode ? '#fff' : '#000',
            fontFamily: fonts.regular,
            fontSize: 13,
          }}>
          By continuing you are indicating that you accept our
        </Text>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              borderBottomWidth: 1,
              borderColor: isDarkMode ? '#fff' : '#000',
              marginRight: 5,
            }}>
            <Text
              style={{
                color: isDarkMode ? '#fff' : '#000',
                fontFamily: fonts.regular,
                fontSize: 13,
              }}>
              Terms of use
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              color: isDarkMode ? '#fff' : '#000',
              fontFamily: fonts.regular,
              fontSize: 13,
            }}>
            and our
          </Text>
          <TouchableOpacity
            style={{
              borderBottomWidth: 1,
              borderColor: isDarkMode ? '#fff' : '#000',
              marginLeft: 5,
            }}>
            <Text
              style={{
                color: isDarkMode ? '#fff' : '#000',
                fontFamily: fonts.regular,
                fontSize: 13,
              }}>
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
