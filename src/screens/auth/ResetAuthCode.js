import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
  TextInput,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {assets} from '../../assets/images/assets';
import {useTheme} from '../../assets/theme/Theme';
import {fonts} from '../../assets/fonts';
import {color, greaterThan} from 'react-native-reanimated';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';

const ResetAuthCode = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const theme = useTheme();
  const [code, setCode] = useState('');
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
          Please enter the four degit code send to
        </Text>
        <View style={{flexDirection: 'row', fontFamily: fonts.bold}}>
          <Text
            style={{
              color: isDarkMode ? '#fff' : '#000',
              fontFamily: fonts.bold,
              marginRight: 4,
            }}>
            1234@gmail.com
          </Text>
          <Text
            style={{
              color: isDarkMode ? '#fff' : '#000',
              fontFamily: fonts.regular,
            }}>
            Through SMS
          </Text>
        </View>
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
          value={code}
          cellSpacing={10}
          codeLength={4}
          onTextChange={text => setCode(text, console.log('......', text))}
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
            Resend Code
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 2,
        }}>
        <Text
          style={{color: isDarkMode ? '#fff' : '#000', fontFamily: fonts.bold}}>
          Wrong Email
        </Text>
      </View>
      <View>
        <TouchableOpacity
          style={[styles.BtnStyle, {backgroundColor: '#007bff'}]}
          onPress={() => navigation.navigate('NewPassword')}>
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
          By continuining you are indicating that you accept our
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
    marginTop: 20,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
});
