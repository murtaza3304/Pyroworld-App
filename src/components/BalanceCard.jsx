import {View, Text, StyleSheet, useColorScheme} from 'react-native';
import React from 'react';
import {assets} from '../assets/images/assets';
import {useTheme} from '../assets/theme/Theme';
import {SvgXml} from 'react-native-svg';
import { fonts } from '../assets/fonts';

const BalanceCard = () => {
  const theme = useTheme();
  const isDarkMode = useColorScheme() === 'dark'
  const styles = StyleSheet.create({
    balancecard: {
      width: '90%',
      height: 160,
      ...theme.flex.column,
      backgroundColor: theme.itembg,
      alignItems: 'flex-start',
      justifyContent:"flex-start",
      paddingHorizontal:20,
      paddingVertical:10,
      borderRadius: 20,
      marginVertical: 20,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      
      elevation: 2,
    },
  });
  return (
    <View style={[styles.balancecard, {shadowColor: isDarkMode  ? '#fff' : '#000'}]}>
      <Text style={{fontSize: 15, color: theme.text, fontFamily: fonts.medium}}>Estimated Balance</Text>
      <View
        style={{
          ...theme.flex.fullRow,
          justifyContent: 'flex-start',
          width: '100%',
          alignItems: 'center',
          justifyContent:'flex-start'
        }}>
        <Text
          style={{
            fontSize: 25,
            ...theme.flex.row,
            marginRight: 5,
            color: theme.blue,
          }}>
          $
        </Text>
        <Text style={{fontSize: 30, color: theme.blue, fontFamily: fonts.regular}}>3000</Text>
        <Text
          style={{
            backgroundColor: theme.chip,
            fontSize: 12,
            paddingHorizontal: 10,
            paddingVertical: 5,
            marginLeft: 10,
            borderRadius: 30,
            color: 'white',
            fontFamily: fonts.regular
          }}>
          810% <SvgXml xml={assets.up} />
        </Text>
      </View>
      <View
        style={{
          ...theme.flex.fullRow,
          justifyContent: 'flex-start',
          width: '100%',
        }}>
        <Text style={{fontSize: 16, color: theme.blue, fontFamily: fonts.regular}}>$1224</Text>
        <Text
          style={{
            fontSize: 10,
            paddingHorizontal: 10,
            color: theme.text,
            fontFamily: fonts.regular
          }}>
          {'(Today)'}
        </Text>
      </View>
      <View
        style={{
          ...theme.flex.fullRow,
          justifyContent: 'space-between',
          width: '100%',
          paddingHorizontal:20,
        }}>
        <View style={{...theme.flex.row}}>
          <SvgXml xml={assets.profit} style={{marginRight:8}} />
          <View style={{...theme.flex.column}}>
            <Text style={{fontSize:24,color:theme.text, fontFamily: fonts.regular, marginTop: 10}}>$50</Text>
            <Text style={{fontSize:16,color:theme.blue, fontFamily: fonts.regular}}>Profit</Text>
          </View>
        </View>
         <View style={{...theme.flex.row}}>
          <SvgXml xml={assets.balanceCard.image} style={{marginRight:8}} />
          <View style={{...theme.flex.column}}>
            <Text style={{fontSize:24,color:theme.text, fontFamily: fonts.regular, marginTop: 10}}>$3000</Text>
            <Text style={{fontSize:16,color:theme.blue, fontFamily: fonts.regular}}>Available</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default BalanceCard;
