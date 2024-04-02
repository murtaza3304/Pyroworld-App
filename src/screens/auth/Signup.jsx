import React from 'react';
import {
  StyleSheet,
  useColorScheme,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image
} from 'react-native';
import {logo} from '../../assets/images';

function SignUp({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: isDarkMode ? '#000' : '#fff'},
      ]}>
      <Image source={logo} style={{width: 100, height: 100}} />

      <Text style={[styles.title, {color: isDarkMode ? '#fff' : '#000'}]}>
        Sign Up
      </Text>
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
      />
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
      />
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
        secureTextEntry={true}
      />
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
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.signUpButton} onPress={()=>navigation.navigate("Login")}>
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>
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
    width: '90%',
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  signUpButton: {
    width: '50%',
    height: 50,
    borderRadius: 50,
    backgroundColor: '#28a745',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SignUp;
