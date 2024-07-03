import { StyleSheet, Text, View, FlatList, useColorScheme } from 'react-native'
import React from 'react'
import { fonts } from '../assets/fonts';
import { useTheme } from '../assets/theme/Theme';

const TradeDetail = () => {
    const isDarkMode = useColorScheme() === 'dark'
    const theme = useTheme();
    const data = [
        { id: '4', price: 63243.40, amount: 0.118523 },
        { id: '5', price: 83243.40, amount: 0.118523 },
        { id: '6', price: 63243.40, amount: 0.118523 },
        { id: '7', price: 63243.40, amount: 0.118523 },
        { id: '8', price: 53243.40, amount: 0.118523 },
        { id: '9', price: 78804.12, amount: 0.153648 },  
        { id: '10', price: 58851.15, amount: 0.150270 },
        { id: '11', price: 55593.98, amount: 0.044312 },
        { id: '12', price: 57554.88, amount: 0.001744 },
        { id: '13', price: 63345.97, amount: 0.015240 },
        { id: '14', price: 70342.79, amount: 0.162142 },
        { id: '15', price: 50290.00, amount: 0.056521 },
        { id: '16', price: 78035.12, amount: 0.188136 },
        { id: '17', price: 77522.71, amount: 0.169108 },
        { id: '18', price: 69243.22, amount: 0.061376 },
        { id: '19', price: 66862.39, amount: 0.157009 },
      ];
      
      const Item = ({ price, amount }) => (  
        <View style={styles.item}>
          <Text style={[styles.price, {color: theme.blue}]}>{price}</Text>
          <Text style={styles.amount}>{amount}</Text>
        </View>
    

      );
      const renderItem = ({ item }) => (
        <Item price={item.price} amount={item.amount} />
      );
  return (
    <View style={styles.container}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20}}>
            <Text style={{color:isDarkMode? '#fff' : '#000', fontFamily: fonts.semibold}}>PRICE</Text>
            <Text style={{color:isDarkMode? '#fff' : '#000', fontFamily: fonts.semibold}}>AMOUNT (BTC)</Text>
            <Text style={{color:isDarkMode? '#fff' : '#000', fontFamily: fonts.semibold}}>PRICE</Text>

        </View>
    <FlatList
    showsVerticalScrollIndicator={false}
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    numColumns={2}

    />
  </View>
   
  )
}

export default TradeDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 200
      },
      item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
          padding: 8,
          paddingHorizontal: 20,
            width: '50%'
        
      },
      price: {
        fontSize: 12,
        fontFamily: fonts.regular,
        
      },
      amount: {
        fontSize: 12,
        fontFamily: fonts.regular
      },
})