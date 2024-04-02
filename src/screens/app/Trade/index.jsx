import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {useTheme} from '../../../assets/theme/Theme';
import {SvgXml} from 'react-native-svg';
import {assets} from '../../../assets/images/assets';
import {getLogo} from '../../../assets/images';
import CandleChart from '../../../components/CandleChart';

const Trade = () => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    container: {
      ...theme.flex.fullColumn,
      backgroundColor: theme.background,
      justifyContent: 'flex-start',
    },
    header: {
      ...theme.flex.row,
      width: '90%',
      justifyContent: 'flex-start',
      marginTop: 35,
    },
    valueBox: {
      ...theme.flex.row,
      justifyContent: 'space-between',
      width: '90%',
      marginVertical: 30,
    },
    infoBox: {
      ...theme.flex.row,
      width: '38%',
      justifyContent: 'space-between',
    },
  });
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{...theme.flex.row}}>
          <SvgXml
            xml={assets.tradeHeader}
            style={{marginRight: 10}}
            color={theme.blue}></SvgXml>
        </View>
        <Text style={{fontSize: 20, color: theme.text}}>Trade</Text>
      </View>
      <View style={styles.valueBox}>
        <View style={styles.infoBox}>
          <SvgXml xml={getLogo('btc')} />
          <View>
            <Text style={{fontSize: 14, color: theme.gray}}>
              <Text style={{color: theme.blue}}>BTC</Text>/USDT
            </Text>
            <Text style={{color: theme.gray, fontSize: 12}}>Vol 2.08B</Text>
          </View>
          <SvgXml xml={assets.down} />
        </View>
        <View style={{...theme.flex.column,alignItems:"flex-end"}}>
          <Text style={{color:theme.text,fontSize:20}}>$72,509</Text>
          <Text style={{color:theme.green,fontSize:10}}>+ 17.0 (9.77%)</Text>
        </View>
      </View>
      <CandleChart/>

    </View>
  );
};

export default Trade;
