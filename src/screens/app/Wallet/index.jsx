import {View, Text, StyleSheet, ScrollView, FlatList} from 'react-native';
import React from 'react';
import {useTheme} from '../../../assets/theme/Theme';
import {SvgXml} from 'react-native-svg';
import {assets} from '../../../assets/images/assets';
import {BalanceCard, PriceCard} from '../../../components';
import { walletData } from './data';

const Wallet = () => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    main: {
      ...theme.flex.fullColumn,
      backgroundColor: theme.background,
      justifyContent: 'flex-start',
    },
  });
  return (
    <ScrollView>
      <View style={styles.main}>
        <View
          style={{
            ...theme.flex.row,
            justifyContent: 'space-between',
            width: '90%',
            marginTop: 40,
          }}>
          <View style={{...theme.flex.row}}>
            <SvgXml xml={assets.back} />
            <Text style={{fontSize: 25, marginLeft: 5, color: theme.text}}>
              Wallet
            </Text>
          </View>
          <SvgXml xml={assets.search} />
        </View>
        <BalanceCard />
        <View style={{...theme.flex.row,width:"90%",justifyContent:'flex-start'}}>
          <Text style={{fontSize:25,color:theme.text}}>Balances</Text>
        </View>
        <FlatList
          data={walletData}
          contentContainerStyle={{
            ...theme.flex.row,
            flexWrap: 'wrap',
            width: '100%',
            justifyContent: 'space-between',
          }}
          renderItem={({item}) => <PriceCard data={item} layout={true} wallet={true} />}
        />
      </View>
    </ScrollView>
  );
};

export default Wallet;
