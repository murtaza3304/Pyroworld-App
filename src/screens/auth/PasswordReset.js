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
    navigation.navigate('ResetAuthCode');
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: isDarkMode ? '#000' : '#fff', paddingTop: 50},
      ]}>
      <Image source={logo} style={{width: 100, height: 100, marginBottom: 6}} />
      <View style={{width: 140, justifyContent: 'center'}}>
        <Text
          style={[
            styles.title,
            {
              color: isDarkMode ? '#fff' : '#000',
            },
          ]}>
          Enter Email
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
          placeholder="Email"
          placeholderTextColor={isDarkMode ? '#888' : '#666'}
          keyboardType="email-address"
          value={formData.email}
          name="email"
          onChangeText={text => handleChange('email', text)}
        />
        {<Text style={styles.errorText}>{errors?.email}</Text>}

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
            Already have an account
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

export default PasswordReset;
