import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import {useTheme} from '../../../assets/theme/Theme';
import {assets} from '../../../assets/images/assets';
import {SvgXml} from 'react-native-svg';

const Profile = () => {
  const theme = useTheme();
  const data = [
    {
      name: 'Billing/Payment',
      icon: assets.profileAssets.billing,
    },
    {
      name: 'Settings',
      icon: assets.profileAssets.settings,
    },
    {
      name: 'FAQ',
      icon: assets.profileAssets.faq,
    },
    {
      name: 'Wallet',
      icon: assets.profileAssets.wallet,
    },
  ];

  const styles = StyleSheet.create({
    view: {
      ...theme.flex.fullColumn,
      backgroundColor: theme.background,
      justifyContent: 'flex-start',
    },
  });
  return (
    <View style={styles.view}>
      <View
        style={{
          ...theme.flex.row,
          width: '90%',
          justifyContent: 'flex-start',
          marginTop: 30,
        }}>
        <SvgXml xml={assets.profileIcon} />
        <Text style={{fontSize: 25, color: theme.text, marginLeft: 10}}>
          Profile
        </Text>
      </View>
      <View
        style={{
          ...theme.flex.row,
          justifyContent: 'flex-start',
          width: '90%',
          marginTop: 30,
        }}>
        <SvgXml xml={assets.profileImage} />
        <View
          style={{
            ...theme.flex.column,
            marginLeft: 25,
            alignItems: 'flex-start',
          }}>
          <Text style={{fontSize: 25, color: theme.text}}>Joshua</Text>
          <Text style={{fontSize: 15, color: theme.gray}}>
            Joshua@gmail.com
          </Text>
        </View>
      </View>
      <FlatList
      contentContainerStyle={{width:"100%",marginTop:50}}
        data={data}
        renderItem={({item}) => (
          <TouchableOpacity style={{...theme.flex.row,width:"100%",height:60,justifyContent:"space-between",paddingHorizontal:15}}>
            <View style={{...theme.flex.row,justifyContent:"flex-start"}}>
              <SvgXml xml={item.icon} />
              <Text style={{fontSize:20,color:theme.text,marginLeft:20}}>{item.name}</Text>
            </View>
            <SvgXml xml={assets.settingsBack} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Profile;
