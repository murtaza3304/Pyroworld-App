import React, { useState } from 'react';
import {
  StyleSheet,
  useColorScheme,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native';
import { logo } from '../../assets/images';
import { useTheme } from '../../assets/theme/Theme';
import { fonts } from '../../assets/fonts';
import { SvgXml } from 'react-native-svg';
import { assets } from '../../assets/images/assets';

function SignUp({ navigation }) {
  const isDarkMode = useColorScheme() === 'dark';
  const theme = useTheme();
  const [secureMode, setSecureMode] = useState(true);
  const [confirmPasswordSecure, setConfirmPasswordSecure] = useState(true);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const TogglePassword = () => {
    setSecureMode(!secureMode);
  };

  const toggleConfirmSecure = () => {
    setConfirmPasswordSecure(!confirmPasswordSecure);
  };

  const handleSignUp = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    } else {
      setEmailError('');
    }

    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      return;
    } else {
      setPasswordError('');
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match.');
      return;
    } else {
      setConfirmPasswordError('');
    }

    navigation.navigate('EmailAuthantication')
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? '#000' : '#fff', paddingTop: 50 },
      ]}
    >
      <Image
        source={logo}
        style={{ width: 100, height: 100, marginBottom: 6 }}
      />
      <View style={{ width: 96, justifyContent: 'center' }}>
        <Text
          style={[
            styles.title,
            {
              color: isDarkMode ? '#fff' : '#000',
            },
          ]}
        >
          SIGN UP
        </Text>
      </View>
      <ScrollView style={{ width: '100%', height: '100%' }} showsVerticalScrollIndicator={false}>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: isDarkMode ? '#333' : '#ddd',
              color: isDarkMode ? '#fff' : '#000',
            },
          ]}
          placeholder="Full Name"
          placeholderTextColor={isDarkMode ? '#888' : '#666'}
          value={fullName}
          onChangeText={setFullName}
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
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
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

        <View style={{ width: '100%' }}>
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
            secureTextEntry={secureMode}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            style={{
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center',
              right: 10,
              top: 12,
            }}
            onPress={TogglePassword}
          >
            <SvgXml xml={secureMode ? assets.closeEye : assets.openEye} />
          </TouchableOpacity>
        </View>
        {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}

        <View style={{ width: '100%' }}>
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
            secureTextEntry={confirmPasswordSecure}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity
            style={{
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center',
              right: 10,
              top: 12,
            }}
            onPress={toggleConfirmSecure}
          >
            <SvgXml
              xml={confirmPasswordSecure ? assets.closeEye : assets.openEye}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.signUpButton}
          onPress={handleSignUp}
        >
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>
        <View style={{ marginTop: 10, flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
          <Text
            style={{
              color: isDarkMode ? '#fff' : '#000',
              marginRight: 6,
              fontFamily: fonts.regular,
            }}
          >
            Already have an account
          </Text>

          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={[styles.textStyle, { color: theme.blue }]}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  signUpButton: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    width: 75,
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

export default SignUp;
