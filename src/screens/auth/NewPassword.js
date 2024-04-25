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
import {SvgXml} from 'react-native-svg';
import {assets} from '../../assets/images/assets';
import {register} from '../../api';
import {signUpValidation} from '../../validations';
import AsyncStorage from '@react-native-async-storage/async-storage';

function NewPassword({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';
  const theme = useTheme();
  const [secureMode, setSecureMode] = useState(true);
  const [confirmPasswordSecure, setConfirmPasswordSecure] = useState(true)
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    password: '',
    confirmPassword: '',
  });

  const TogglePassword = () => {
    setSecureMode(!secureMode);
  };

  const toggleConfirmSecure = () => {
    setConfirmPasswordSecure(!confirmPasswordSecure);
  };


  const handleSignUp = async () => {
    navigation.navigate('Login')
  };
  
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: isDarkMode ? '#000' : '#fff', paddingTop: 50},
      ]}>
      <Image source={logo} style={{width: 100, height: 100, marginBottom: 6, }} />
      <View style={{width: 220, justifyContent: 'center'}}>
        <Text
          style={[
            styles.title,
            {
              color: isDarkMode ? '#fff' : '#000',
            },
          ]}>
          RESET PASSWORD
        </Text>
      </View>
      <ScrollView
        style={{width: '100%', height: '100%'}}
        showsVerticalScrollIndicator={false}>

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
            secureTextEntry={secureMode}
            value={formData.password}
            onChangeText={text => handleChange('password', text)}
          />
          <TouchableOpacity
            style={{
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center',
              right: 10,
              top: 15,
            }}
            onPress={TogglePassword}>
            <SvgXml xml={secureMode ? assets.closeEye : assets.openEye} />
          </TouchableOpacity>
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
            secureTextEntry={confirmPasswordSecure}
            value={formData.confirmPassword}
            onChangeText={text => handleChange('confirmPassword', text)}
          />
          <TouchableOpacity
            style={{
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center',
              right: 10,
              top: 15,
            }}
            onPress={toggleConfirmSecure}>
            <SvgXml
              xml={confirmPasswordSecure ? assets.closeEye : assets.openEye}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.errorText}>{errors?.confirmPassword}</Text>

        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.signUpButtonText}>Reset Password</Text>
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
            Back to
          </Text>

          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={[styles.textStyle, {color: theme.blue}]}>Login</Text>
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

export default NewPassword;
