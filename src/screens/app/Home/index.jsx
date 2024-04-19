import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  useColorScheme
} from 'react-native';
import {useTheme} from '../../../assets/theme/Theme';
import {SvgXml} from 'react-native-svg';
import {assets} from '../../../assets/images/assets';
import PriceCard from '../../../components/PriceCard/PriceCard';
import {cryptoData} from './data';
import {BalanceCard} from '../../../components';
import {fonts} from '../../../assets/fonts';

function Home({navigation}) {
  const theme = useTheme();
  const isDarkMode = useColorScheme() === 'dark'
  const numColumns = 2;

  const styles = StyleSheet.create({
    view: {
      ...theme.flex.fullColumn,
      width: '100%',
      backgroundColor: theme.background,
      justifyContent: 'flex-start',
      paddingTop: 30,
    },
    card: {
      width: '90%',
      height: 40,
      ...theme.flex.row,
      justifyContent: 'space-between',
    
    },
    text: {
      color: theme.text,
      fontSize: 10,
      ...theme.flex.row,
      // backgroundColor: 'red'
      fontFamily: fonts.regular,
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
              <Text
                style={{
                  ...styles.text,
                  fontSize: 18,
                  fontFamily: fonts.semibold,
                }}>
                Joshua!
              </Text>
            </View>
          </View>
          <View style={styles.icons}>
            <TouchableOpacity>
              <SvgXml xml={ isDarkMode? assets.notificationdarkmode : assets.notificationlightmode}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('setting')}>
              <SvgXml xml={isDarkMode? assets.SettingDarkMode : assets.settings}/>
            </TouchableOpacity>
          </View>
        </View>
        {/* /balanceCard */}
        <BalanceCard />
        <View
          style={{
            ...theme.flex.row,
            justifyContent: 'space-between',
            marginHorizontal: 15,
            width: '85%',
            marginBottom: 6,
          }}>
          <Text
            style={{
              fontSize: 20,
              color: theme.text,
              fontFamily: fonts.regular,
            }}>
            Trending Coins
          </Text>
          <Text style={{fontSize: 16, color: theme.blue}}>See all</Text>
        </View>

        <FlatList
          data={cryptoData}
          numColumns={numColumns}
          contentContainerStyle={{
            ...theme.flex.row,
            flexWrap: 'wrap',
            width: '100%',
            justifyContent: 'space-between',
          }}
          renderItem={({item}) => <PriceCard data={item} />}
        />
      </View>
    </ScrollView>
  );
}

export default Home;
