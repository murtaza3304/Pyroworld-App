import {StyleSheet, Text, View, TouchableOpacity, Image, FlatList, useColorScheme} from 'react-native';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import {assets} from '../../../assets/images/assets';
import {fonts} from '../../../assets/fonts/index';
import {useTheme} from '../../../assets/theme/Theme';

const Setting = ({navigation}) => {
  const theme = useTheme();
  const data = [
    {
      name: 'Notification',
      icon: assets.notificationSetting,
    },
    {
      name: 'Language',
      icon: assets.Language,
    },
    {
      name: 'Dark or Light Theme',
      icon: assets.DarkLightMode,
    },
    {
      name: 'Privacy Policy',
      icon: assets.privacyPolicy,
    },
  ];
  return (
    <View style={[styles.mainContainer,{backgroundColor: theme.background}]}>
      <View style={styles.header}>
        <TouchableOpacity
          style={{borderRadius: 100}}
          onPress={() => {
            navigation.navigate('BottomTab');
          }}>
          <SvgXml xml={assets.back} />
        </TouchableOpacity>
        <Text style={styles.textStyle}>Settings</Text>
      </View>
      <View style={styles.contentContainer}>
        <Image
          source={require('../../../assets/images/premiumbg.png')}
          style={styles.rightImage}
        />
        <View style={styles.content}>
          <Text
            style={{
              fontSize: 16,
              color: 'white',
              marginBottom: 10,
              fontFamily: fonts.semibold,
            }}>
            This is The Only way to create app.
          </Text>
          <TouchableOpacity style={styles.PremiumBtn}>
            <Text style={{color: 'black'}}>Get Premium</Text>
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Image
            source={require('../../../assets/images/premium.png')}
            style={styles.PremiumImage}
          />
        </View>
      </View>
      <View
        style={{
          height: 80,
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          style={[styles.BtnStyle, {backgroundColor: "#21BF73"}]}>
          <Text
            style={{
              fontSize: 16,
              color: 'white',
              fontFamily: fonts.semibold,
            }}>
            Register
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.BtnStyle, {backgroundColor: "#38B6FF"}]}>
          <Text
            style={{
              fontSize: 16,
              color: 'white',
              fontFamily: fonts.semibold,
            }}>
            Sign in
          </Text>
        </TouchableOpacity>
      </View>
      <View>
      <FlatList
        contentContainerStyle={{width: '100%', marginTop: 10}}
        data={data}
        renderItem={({item}) => (
          <TouchableOpacity
            style={{
              ...theme.flex.row,
              width: '100%',
              height: 60,
              justifyContent: 'space-between',
              paddingHorizontal: 15,
            }}
           
          >
            <View style={{...theme.flex.row, justifyContent: 'flex-start'}}>
              <SvgXml xml={item.icon}  />
              <Text style={{fontSize: 20, color: theme.text, marginLeft: 20}}>
                {item.name}
              </Text>
            </View>
            <SvgXml xml={assets.settingsBack}/>
          </TouchableOpacity>
        )}
      />
      </View>
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 20,
    flex: 1
  },
  header: {
    width: '100%',
    marginTop: 20,
    flexDirection: 'row',
  },
  textStyle: {
    fontSize: 20,
    color: 'black',
    marginLeft: 10,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 20,
  },
  rightImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  content: {
    position: 'absolute',
    width: 100,
    paddingHorizontal: 10,
    height: '100%',
    width: '50%',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  PremiumBtn: {
    backgroundColor: 'white',
    padding: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    width: 135,
    height: 35,
  },
  PremiumImage: {
    position: 'absolute',
    right: 10,
    height: 118,
    width: 88,
  },
  BtnStyle: {
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 23,
  },
});
