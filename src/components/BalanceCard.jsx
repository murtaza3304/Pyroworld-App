import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {assets} from '../assets/images/assets';
import {useTheme} from '../assets/theme/Theme';
import {SvgXml} from 'react-native-svg';

const BalanceCard = () => {
  const theme = useTheme();
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
      marginVertical: 35,
    },
  });
  return (
    <View style={styles.balancecard}>
      <Text style={{fontSize: 15, color: theme.text}}>Estimated Balance</Text>
      <View
        style={{
          ...theme.flex.fullRow,
          justifyContent: 'flex-start',
          width: '100%',
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
        <Text style={{fontSize: 35, color: theme.blue}}>3000</Text>
        <Text
          style={{
            backgroundColor: theme.chip,
            fontSize: 12,
            paddingHorizontal: 10,
            paddingVertical: 5,
            marginLeft: 10,
            borderRadius: 30,
            color: 'white',
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
        <Text style={{fontSize: 16, color: theme.blue}}>$1224</Text>
        <Text
          style={{
            fontSize: 10,
            paddingHorizontal: 10,
            color: theme.text,
          }}>
          {'(Today)'}
        </Text>
      </View>
      <View
        style={{
          ...theme.flex.fullRow,
          justifyContent: 'space-between',
          width: '100%',
          paddingHorizontal:30,
        }}>
        <View style={{...theme.flex.row}}>
          <SvgXml xml={assets.profit} style={{marginRight:10}} />
          <View style={{...theme.flex.column}}>
            <Text style={{fontSize:24,color:theme.text}}>$50</Text>
            <Text style={{fontSize:16,color:theme.blue}}>Profit</Text>
          </View>
        </View>
         <View style={{...theme.flex.row}}>
          <SvgXml xml={assets.balanceCard.image} style={{marginRight:10}} />
          <View style={{...theme.flex.column}}>
            <Text style={{fontSize:24,color:theme.text}}>$3000</Text>
            <Text style={{fontSize:16,color:theme.blue}}>Available</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default BalanceCard;
