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
import {logo} from '../../assets/images';
import {fonts} from '../../assets/fonts';
import {useTheme} from '../../assets/theme/Theme';
import {SvgXml} from 'react-native-svg';
import {assets} from '../../assets/images/assets';
import {signin} from '../../api';
import {signinValidation} from '../../validations';

function Login({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';
  const theme = useTheme();
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
    if (Object.keys(error).length > 0) {
      setErrors(error);
      return;
    } else {
      try {
        const response = await signin(formData);
        setFormData({
          email: '',
          password: '',
        });
        navigation.navigate('App');
      } catch (error) {
        console.log(error);
      }
    }
  };

  console.log(errors, 'eeeee');

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

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: isDarkMode ? '#000' : '#fff'},
      ]}>
      <Image source={logo} style={{width: 100, height: 100}} />
      <Text
        style={[
          styles.title,
          {
            color: theme.text,
            fontFamily: fonts.bold,
            width: '100%',
            textAlign: 'center',
          },
        ]}>
        SIGN IN
      </Text>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: isDarkMode ? '#333' : '#ddd',
            color: isDarkMode ? '#fff' : '#000',
          },
        ]}
        autoCompleteType={false}
        placeholder="Email"
        placeholderTextColor={isDarkMode ? '#888' : '#666'}
        value={formData.email}
        onChangeText={text => handleChange('email', text)}
      />
      <Text style={styles.errorText}>{errors?.email}</Text>

      <View
        style={{
          width: '100%',
          marginBottom: 25,
          marginTop: 6,
          borderRadius: 8,
        }}>
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
          secureTextEntry={isSecureMode}
          value={formData.password}
          onChangeText={text => handleChange('password', text)}
        />
        <View style={{flexDirection: 'row', width: '100%'}}>
          <Text style={styles.errorText}>{errors?.password}</Text>
          <TouchableOpacity
            style={{
              position: 'absolute',
              backgroundColor: 'green',
              width: '100%',
            }}
            onPress={() => forgetPassword()}>
            <Text
              style={{
                fontSize: 12,
                color: theme.blue,
                fontFamily: fonts.semibold,
                position: 'absolute',
                right: 0,
              }}>
              Forget Password
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{position: 'absolute', right: 10, top: 15}}
          onPress={showPassword}>
          <SvgXml xml={isSecureMode ? assets.openEye : assets.closeEye} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <Text style={[styles.loginButtonText, {width: 50}]}>Login</Text>
        )}
      </TouchableOpacity>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 20,
          flexDirection: 'row',
        }}>
        <Text
          style={[
            styles.textStyle,
            {
              color: isDarkMode ? '#fff' : '#000',
            },
          ]}>
          Don't have an account
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={[styles.textStyle, {color: theme.blue}]}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    zIndex: 1,
  },
  loginButton: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  textStyle: {
    fontSize: 14,
    marginRight: 6,
    fontFamily: fonts.regular,
    textAlign:"center"

  },
  errorText: {
    color: 'red',
    marginTop: 0,
    alignSelf: 'flex-start',
    width: '70%',
  },
});

export default Login;
