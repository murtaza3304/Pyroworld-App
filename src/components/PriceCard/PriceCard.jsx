import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {useTheme} from '../../assets/theme/Theme';
import {Svg, SvgXml} from 'react-native-svg';
import {getLogo} from '../../assets/images';
import Chart from './Chart';

export default function PriceCard({data, layout, wallet}) {
  console.log(getLogo(data.symbol));
  const theme = useTheme();
  const styles = StyleSheet.create({
    card: {
      height: layout ? 90 : 172,
      width: layout ? Dimensions.get('window').width * 0.95 : 172,

      ...theme.flex.column,
      flexDirection: layout ? 'row' : 'column',
      justifyContent: layout ? 'space-between' : 'space-between',
      backgroundColor: theme.itembg,
      margin: 10,
      borderRadius: 20,

      paddingHorizontal: layout && 10,
      overflow: 'hidden',
    },
    head: {
      ...theme.flex.row,
      justifyContent: 'flex-start',
      width: layout ? '30%' : '70%',
      alignItems: layout && 'flex-start',
      marginVertical: 19,
      paddingHorizontal: layout ? 2 : 10,
      marginRight: layout && 10,
    },
  });
  return (
   
      <View style={styles.card}>
        <View style={styles.head}>
          <SvgXml
            xml={getLogo(data.symbol.toLowerCase())}
            height={40}
            width={40}
          />
          <View style={{marginHorizontal: 0}}>
            <Text style={{color: theme.text, fontSize: 20}}>{data.name}</Text>
            <Text style={{color: theme.gray, fontSize: 12}}>{data.symbol}</Text>
            {wallet && layout && (
              <Text style={{fontSize: 10,color:theme.text,marginTop:10}}>Today's PNL</Text>
            )}
          </View>
        </View>
        {!wallet && layout && (
          <Chart
            width={Dimensions.get('window').width * 0.3}
            height={55}
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
                : data.increasePercentage}{' '}
              %
            </Text>
          </View>
        ) : (
          <View
            style={{
              ...theme.flex.row,
              flexDirection: layout && 'column',
              width: layout && '25%',
              alignItems:"flex-end"
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
            <Text style={{fontSize:10,color:theme.green,marginTop:10}}>
              +10.2$
            </Text>
          </View>
        )}

        {!wallet && !layout && (
          <Chart
            width={Dimensions.get('window').width * 0.7}
            height={54}
            nature={data.increasePercentage < 0 ? 'low' : 'high'}
          />
        )}
      </View>
     
  );
}
