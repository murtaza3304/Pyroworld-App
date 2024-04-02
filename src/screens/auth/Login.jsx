import React from 'react';
import { StyleSheet, useColorScheme, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { logo } from '../../assets/images';
import { fonts } from '../../assets/fonts';

function Login({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';


  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#fff' }]}>
      <Image source={logo} style={{width:100, height:100}}/>
      <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#000',fontFamily:fonts.bold }]}>Login to Pyroworld</Text>
      <TextInput
        style={[styles.input, { backgroundColor: isDarkMode ? '#333' : '#ddd', color: isDarkMode ? '#fff' : '#000' }]}
        placeholder="Email"
        placeholderTextColor={isDarkMode ? '#888' : '#666'}
        keyboardType="email-address"
      />
      <TextInput
        style={[styles.input, { backgroundColor: isDarkMode ? '#333' : '#ddd', color: isDarkMode ? '#fff' : '#000' }]}
        placeholder="Password"
        placeholderTextColor={isDarkMode ? '#888' : '#666'}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.loginButton} onPress={()=>navigation.navigate("Register")}>
        <Text style={styles.loginButtonText}>Login</Text>
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
    marginVertical: 50,
  
  },
  input: {
    width: '90%',
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  loginButton: {
    width: '50%',
    height: 50,
    borderRadius: 50,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Login;
