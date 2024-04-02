import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import {logo} from '../../../assets/images';
import {useTheme} from '../../../assets/theme/Theme';
import {SvgXml} from 'react-native-svg';
import {assets} from '../../../assets/images/assets';
import PriceCard from '../../../components/PriceCard/PriceCard';
import {cryptoData} from './data';
import {BalanceCard} from '../../../components';

function Home() {
  const theme = useTheme();

  const styles = StyleSheet.create({
    view: {
      ...theme.flex.fullColumn,
      width: '100%',
      backgroundColor: theme.background,
      justifyContent: 'flex-start',
      paddingTop: 50,
    },
    card: {
      width: '90%',
      height: 52,
      ...theme.flex.row,
      justifyContent: 'space-between',
    },
    text: {
      color: theme.text,
      fontSize: 14,
      ...theme.flex.row,
    },
    picture: {
      width: 52,
      height: 52,
    },
    cardTextBox: {
      flex: 0,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    icons: {
      ...theme.flex.row,
      width: 50,
      justifyContent: 'space-between',
    },
    balancecard: {
      width: '90%',
      height: 160,
      ...theme.flex.column,
      backgroundColor: theme.itembg,
      alignItems: 'flex-start',
      padding: 20,
      borderRadius: 20,
      marginVertical: 35,
    },
  });

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      alwaysBounceVertical={false}>
      <View style={styles.view}>
        {/* card */}
        <View style={styles.card}>
          <View style={styles.cardTextBox}>
            <SvgXml xml={assets.picture} />
            <View style={{marginHorizontal: 8}}>
              <View style={theme.flex.fullRow}>
                <Text style={styles.text}>Hey, Good Morning...</Text>
                <SvgXml xml={assets.hello} />
              </View>
              <Text style={{...styles.text, fontSize: 18}}>Joshua!</Text>
            </View>
          </View>
          <View style={styles.icons}>
            <SvgXml xml={assets.notification} fill={theme.text} />
            <SvgXml xml={assets.settings} fill={theme.text} />
          </View>
        </View>
        {/* /balanceCard */}
        <BalanceCard />

        <View
          contentContainerStyle={{
            ...theme.flex.row,
            flexWrap: 'wrap',
            width: '100%',
            justifyContent: 'center',
          }}>
          <View
            style={{
              ...theme.flex.row,
              justifyContent: 'space-between',
              marginHorizontal: 15,
            }}>
            <Text style={{fontSize: 20, color: theme.text}}>
              Trending Coins
            </Text>
            <Text style={{fontSize: 16, color: theme.blue}}>See all</Text>
          </View>
          <FlatList
            data={cryptoData}
            contentContainerStyle={{
              ...theme.flex.row,
              flexWrap: 'wrap',
              width: '100%',
              justifyContent: 'space-between',
            }}
            renderItem={({item}) => <PriceCard data={item} />}
          />
        </View>
      </View>
    </ScrollView>
  );
}

export default Home;
