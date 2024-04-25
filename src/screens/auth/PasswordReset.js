import React, {useState} from 'react';
import {
  StyleSheet,
  useColorScheme,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {logo} from '../../assets/images';
import {useTheme} from '../../assets/theme/Theme';
import {fonts} from '../../assets/fonts';
import {forgetPassword} from '../../api';
import {forgetPasswordValidation} from '../../validations';

function PasswordReset({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';
  const theme = useTheme();
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
      style={[
        styles.container,
        {backgroundColor: isDarkMode ? '#000' : '#fff', height: '100%'},
      ]}>
      <View
        style={{
          height: '70%',
          justifyContent: 'center',
          width: '100%',
          alignItems: 'center',
          flexDirection: 'column',
        }}>
        <Image
          source={logo}
          style={{width: 100, height: 100, marginBottom: 6}}
        />
        <View style={{width: 180, justifyContent: 'center'}}>
          <Text
            style={[
              styles.title,
              {
                color: isDarkMode ? '#fff' : '#000',
              },
            ]}>
            Foget Password
          </Text>
        </View>
        <ScrollView
          style={{width: '100%', height: '100%'}}
          showsVerticalScrollIndicator={false}>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: isDarkMode ? '#333' : '#ddd',
                color: isDarkMode ? '#fff' : '#000',
              },
            ]}
            placeholder="Enter Your Email"
            placeholderTextColor={isDarkMode ? '#888' : '#666'}
            keyboardType="email-address"
            value={formData.email}
            onChangeText={text => handleChange('email', text)}
          />
          {<Text style={styles.errorText}>{errors?.email}</Text>}

          <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
            <Text
              style={{
                ...styles.signUpButtonText,
                width: '100%',
                textAlign: 'center',
              }}>
              Confirm
            </Text>
          </TouchableOpacity>
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: isDarkMode ? '#fff' : '#000',
                marginRight: 6,
                fontFamily: fonts.regular,
              }}>
              Already remebered?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={[styles.textStyle, {color: theme.blue}]}>Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingHorizontal: 20,
    height: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  input: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  signUpButton: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    width: 130,
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

export default PasswordReset;
