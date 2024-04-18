import React, { useState } from 'react';
import {
  StyleSheet,
  useColorScheme,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { logo } from '../../assets/images';
import { fonts } from '../../assets/fonts';
import { useTheme } from '../../assets/theme/Theme';
import { SvgXml } from 'react-native-svg';
import { assets } from '../../assets/images/assets';

function Login({ navigation }) {
  const isDarkMode = useColorScheme() === 'dark';
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSecureMode, setSecureMode] = useState(true);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleEmail = (text) => {
    setEmail(text);
    setEmailError('');
  };

  const handlePassword = (text) => {
    setPassword(text);
    setPasswordError('');
  };

  const showPassword = () => {
    setSecureMode(!isSecureMode);
  };

  const validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleLogin = () => {
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 6 characters long');
      return;
    }
    navigation.navigate('App');
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? '#000' : '#fff' },
      ]}
    >
      <Image source={logo} style={{ width: 100, height: 100 }} />
      <Text
        style={[
          styles.title,
          {
            color: theme.text,
            fontFamily: fonts.bold,
            width: '100%',
            textAlign: 'center',
          },
        ]}
      >
        SIGN IN
      </Text>
      <Text style={styles.errorText}>{emailError}</Text>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: isDarkMode ? '#333' : '#ddd',
            color: isDarkMode ? '#fff' : '#000',
          },
        ]}
        placeholder="Email"
        placeholderTextColor={isDarkMode ? '#888' : '#666'}
        value={email}
        onChangeText={handleEmail}
      />
      <Text style={styles.errorText}>{passwordError}</Text>
      <View style={{ width: '100%' , marginBottom: 25}}>
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
          value={password}
          onChangeText={handlePassword}
        />
        <TouchableOpacity
          style={{ position: 'absolute', right: 10, top: 15 }}
          onPress={showPassword}
        >
          <SvgXml xml={isSecureMode ? assets.openEye : assets.closeEye} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={[styles.loginButtonText, { width: 50 }]}>Login</Text>
      </TouchableOpacity>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 20,
          flexDirection: 'row',
        }}
      >
        <Text
          style={[
            styles.textStyle,
            {
              color: isDarkMode ? '#fff' : '#000',
            },
          ]}
        >
          Don't have an account
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={[styles.textStyle, { color: theme.blue }]}>Sign up</Text>
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
  },
  errorText: {
    color: 'red',
    marginTop: 5,
    alignSelf: 'flex-start',
  },
});

export default Login;
