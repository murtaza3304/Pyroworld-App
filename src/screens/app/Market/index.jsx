import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  useColorScheme,
} from 'react-native';
import {useTheme} from '../../../assets/theme/Theme';
import {assets} from '../../../assets/images/assets';
import {SvgXml} from 'react-native-svg';
import {cryptoData} from '../Home/data';
import PriceCard from '../../../components/PriceCard/PriceCard';
import filterCryptoDataByCategory from '../../../utils/filters';
import {useState, useEffect} from 'react';
import { fonts } from '../../../assets/fonts';


const categories = ['All', 'Gainers', 'Losers', 'Favourites'];
const data = {
  dataHeaders: ['Market Cap', '24h Volume', 'BTC Dominance'],
  values: [
    {
      market_cap: '$ 2.5B',
      percentage: 9.45,
    },
    {
      market_cap: '$ 219B',
      percentage: 9.45,
    },
    {
      market_cap: '60%',
      percentage: 9.45,
    },
  ],
};

export default function Market() {
  const isDarkMode = useColorScheme() === 'dark'
  const theme = useTheme();
  const [filter, setFilter] = useState('all');
  useEffect(() => {}, [filter]);

  const styles = StyleSheet.create({
    screen: {
      ...theme.flex.fullColumn,
      backgroundColor: theme.background,
      justifyContent: 'flex-start',
    },
    header: {
      ...theme.flex.row,
      width: '90%',
      justifyContent: 'space-between',
      marginTop: 20,
    },
  });
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      alwaysBounceVertical={false}>
      <View style={styles.screen}>
        <View style={styles.header}>
          <View style={{...theme.flex.column, alignItems: 'flex-start'}}>
            <Text style={{fontSize: 30, color: theme.text, fontFamily : fonts.semibold}}>
              Market is Down
            </Text>
            <Text style={{fontSize: 15, color: theme.gray, fontFamily: fonts.regular}}>
              In the past 24 hours
            </Text>
          </View>
          <View style={{...theme.flex.row}}>
            <SvgXml
              xml={isDarkMode ? assets.search: assets.darkmodesearch}
              style={{marginHorizontal: 10}}
              color={theme.blue}/>
            <SvgXml xml={isDarkMode? assets.edit : assets.editdarkmode}/>
          </View>
        </View>
        
        <FlatList
          contentContainerStyle={{
            ...theme.flex.row,
            justifyContent: 'space-between',
            width: '90%',
            marginVertical: 15,
            paddingVertical: 5
          }}
          data={categories}
          renderItem={({item}) => (
            <TouchableOpacity
              style={[{
                height: 40,
                borderRadius: 10,
                backgroundColor:
                  filter === item.toLocaleLowerCase()
                    ? theme.blue
                    : theme.itembg,
                ...theme.flex.row,
                
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.23,
shadowRadius: 2.62,

elevation: 4,
              }, {shadowColor: isDarkMode? '#fff': '#000'} ]}
              onPress={e => setFilter(item.toLocaleLowerCase())}>
              <Text style={{paddingHorizontal: 15, color: isDarkMode? '#fff' : '#000'}}>{item}</Text>
            </TouchableOpacity>
          )}
        />
        <FlatList
          contentContainerStyle={{
            ...theme.flex.row,
            justifyContent: 'space-between',
            width: '90%',
            marginVertical: 15,
          }}
          data={data.dataHeaders}
          renderItem={({item, index}) => (
            <View
              style={{
                ...theme.flex.column,
                height: 60,
                justifyContent: 'space-between',
              }}>
              <Text style={{fontSize: 13, color: theme.blue}}>{item}</Text>
              <Text style={{fontSize: 18, color: theme.text}}>
                {data.values[index].market_cap}
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  color:
                    data.values[index].percentage > 0 ? theme.green : theme.red,
                }}>
                {data.values[index].percentage > 0
                  ? '+'.concat(data.values[index].percentage).concat('%')
                  : data.values[index].percentage.concat('%')}
              </Text>
            </View>
          )}
        />
        <FlatList
          data={filterCryptoDataByCategory(cryptoData, filter)}
          contentContainerStyle={{
            ...theme.flex.row,
            flexWrap: 'wrap',
            width: '100%',
            justifyContent: 'space-between',
            // backgroundColor: 'green',
          }}
          renderItem={({item}) => <PriceCard data={item} layout={true} />}
        />
      </View>
    </ScrollView>
  );
}
