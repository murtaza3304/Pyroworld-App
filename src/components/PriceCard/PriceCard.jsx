import {View, Text, StyleSheet, Dimensions, useColorScheme} from 'react-native';
import {useTheme} from '../../assets/theme/Theme';
import {Svg, SvgXml} from 'react-native-svg';
import {getLogo} from '../../assets/images';
import Chart from './Chart';
import {fonts} from '../../assets/fonts';
import {color} from 'react-native-reanimated';

export default function PriceCard({data, layout, wallet}) {
  const isDarkMode = useColorScheme() === 'dark'
  console.log(getLogo(data.symbol));
  const theme = useTheme();
  const styles = StyleSheet.create({
    card: {
      height: layout ? 72 : 150,
      width: layout
        ? Dimensions.get('window').width * 0.95
        : Dimensions.get('window').width * 0.4,
      ...theme.flex.column,
      flexDirection: layout ? 'row' : 'column',
      justifyContent: layout ? 'space-between' : 'space-between',
      backgroundColor: theme.itembg,
      margin: 10,
      borderRadius: 20,
      paddingHorizontal: layout && 10,
      overflow: 'hidden',
      
shadowOffset: {
	width: 0,
	height: 1,
},
shadowOpacity: 0.22,
shadowRadius: 2.22,

elevation: 2,
    },

    head: {
      ...theme.flex.row,
      justifyContent: 'flex-start',
      width: layout ? '30%' : '80%',
      alignItems: layout && 'flex-start',
      marginTop: 10,
      paddingHorizontal: layout ? 2 : 1,
      marginRight: layout && 10,
    },
  });
  return (
    <View style={[styles.card, {shadowColor: isDarkMode  ? '#fff' : '#000'}]}>
      <View style={styles.head}>
        <SvgXml
          xml={getLogo(data.symbol.toLowerCase())}
          height={40}
          width={40}
        />
        <View style={{marginHorizontal: 3}}>
          <Text style={{color: theme.blue, fontSize: 18, width: 128}}>
            {data.name}
          </Text>
          <Text style={{color: theme.gray, fontSize: 12}}>{data.symbol}</Text>
          {wallet && layout && (
            <Text
              style={{
                fontSize: 10,
                color: theme.text,
                marginTop: 5,
                fontFamily: fonts.semibold,
              }}>
              Today's PNL
            </Text>
          )}
        </View>
      </View>
      {!wallet && layout && (
        <Chart
          width={Dimensions.get('window').width * 0.3}
          height={75}
          nature={data.increasePercentage < 0 ? 'low' : 'high'}
          layout={layout}
        />
      )}
      {!wallet ? (
        <View
          style={{
            ...theme.flex.row,
            alignItems: 'flex-end',
            flexDirection: layout && 'column',
          }}>
          <Text style={{fontSize: layout ? 18 : 22, color: theme.text}}>
            ${data.price}
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: data.increasePercentage < 0 ? theme.red : theme.green,
            }}>
            {data.increasePercentage > 0
              ? '+'.concat(data.increasePercentage)
              : data.increasePercentage}
            %
          </Text>
        </View>
      ) : (
        <View
          style={{
            ...theme.flex.row,
            flexDirection: layout && 'column',
            width: layout && '25%',
            alignItems: 'flex-end',
          }}>
          <Text style={{fontSize: layout ? 18 : 22, color: theme.text}}>
            {data.amount}
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: theme.gray,
            }}>
            {data.usdtValue}
          </Text>
          <Text style={{fontSize: 10}}>
            +10.2$
          </Text>
        </View>
      )}

      {!wallet && !layout && (
        <View style={{ height: 40, marginBottom: 9, paddingBottom: 10}}>
          
          <Chart
            width={Dimensions.get('window').width * 0.7}
            height={50}
            nature={data.increasePercentage < 0 ? 'low' : 'high'}
          />
        </View>
      )}
    </View>
  );
}
