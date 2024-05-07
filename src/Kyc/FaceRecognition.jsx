import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Alert} from 'react-native';
import {useTheme} from '../assets/theme/Theme';
import {assets} from '../assets/images/assets';
import {fonts} from '../assets/fonts';
import SNSMobileSDK from '@sumsub/react-native-mobilesdk-module';
import {getToken, logout, getStatus} from '../api';
import {SvgXml} from 'react-native-svg';

const FaceRecognition = ({navigation}) => {
  const theme = useTheme();
  const [status, setStatus] = useState();
  const getStatuss = async () => {
    try {
      const status = await getStatus();
      setStatus(status);
    } catch (error) {}
  };

  useEffect(() => {
    if (!status) {
      getStatuss();
      setInterval(() => {
        getStatuss();
      }, 10000);
    }
   
    
  }, []);
  useEffect(() => {
    if (status === 'completed') {
      navigation.navigate('BottomTab');
    }
  }, [status])

  

  const launchSNSMobileSDK = async () => {
    try {
      let accessToken = await getToken();
      // console.log('sdfffffffffffffff', accessToken);
      let snsMobileSDK = SNSMobileSDK.init(accessToken, async () => {
        try {
          const res = await getToken();
          return res;
        } catch (error) {
        }
      })
        .withHandlers({
          onStatusChanged: event => {
            console.log(
              'onStatusChanged: [' +
                event.prevStatus +
                '] => [' +
                event.newStatus +
                ']',
            );
          },
          onLog: event => {
            console.log('onLog: [Idensic] ' + event.message);
          },
        })
        .withDebug(true)
        .withLocale('en') // Optional, for cases when you need to override the system locale
        .build();
      if (accessToken) {
        const result = await snsMobileSDK.launch();
        console.log('SumSub SDK State: ' + JSON.stringify(result));
      }
    } catch (error) {
      console.log('SumSub SDK Error: ' + JSON.stringify(error));
    }
  };
  return (
     (
      <View style={{...styles.container, backgroundColor: theme.background}}>
        {status === 'pending' ? (
          <>
            <SvgXml xml={assets.Waiting} />

            <Text style={[styles.subtitle, {color: theme.text}]}>
              Kyc is being Reviewed
            </Text>
          </>
        ) : status === 'init' ? (
          <>
            <Text style={[styles.title, {color: theme.text}]}>KYC /AML</Text>

            <Text style={[styles.subtitle, {color: theme.text}]}>
              Complete KYC to continue to pyroworld
            </Text>
            <View style={styles.cameraContainer}>
              <SvgXml xml={assets.Kyc} />
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => launchSNSMobileSDK()}
                style={{
                  backgroundColor: theme.blue,
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 45,
                  borderRadius: 8,
                }}>
                <Text style={{color: 'white', fontSize: 16}}>Proceed</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          false
        )}
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    color: '#666',
  },
  cameraContainer: {
    marginBottom: 20,
    width: 150,
    height: 150,
  },
  buttonContainer: {
    width: '80%',
    marginVertical: 20,
  },
});

export default FaceRecognition;
