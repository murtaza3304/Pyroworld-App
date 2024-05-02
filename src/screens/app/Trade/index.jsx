import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  TextInput,
  ScrollView,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import {useTheme} from '../../../assets/theme/Theme';
import {SvgXml} from 'react-native-svg';
import {assets} from '../../../assets/images/assets';
import {getLogo} from '../../../assets/images';
import CandleChart from '../../../components/CandleChart';
import {fonts} from '../../../assets/fonts';
import TradeDetail from '../../../components/TradeDetail';
import {Dropdown} from 'react-native-element-dropdown';
import BuyModal from './BuyModal';
import SellModal from './SellModal';

const Trade = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const theme = useTheme();
  const [activeButton, setActiveButton] = useState('Chart');
  const [activeBtn, setActiveBtn] = useState('Buy');
  const [price, setPrice] = useState(0);
  const [priceBtc, setPriceBtc] = useState(0);
  const [showCandleChart, setShowCandleChart] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Limit');
  const [isBuyModalVisible, setBuyModalVisible] = useState(false);
  const [isSellModalVisible, setSellModalVisible] = useState(false);


  const handleButtonPress = buttonName => {
    setActiveButton(buttonName);
    if (buttonName === 'OrderBook') {
      setShowCandleChart(false);
    } else {
      setShowCandleChart(true);
    }
  };
  const toggleModal = () => {
    setSelectedOption('Limit');
    setIsModalVisible(!isModalVisible);
  };
  const handleModalOption = option => {
    setSelectedOption(option);
    setIsModalVisible(false);
  };
  const toggleBuyButton = () => {
    setBuyModalVisible(!isBuyModalVisible);
  };

  const toggleSellButton = () => {
    setSellModalVisible(!isSellModalVisible);
  };

  const styles = StyleSheet.create({
    container: {
      ...theme.flex.fullColumn,
      backgroundColor: theme.background,
      justifyContent: 'flex-start',
      // marginBottom: 10
      flex: 1,
    },
    header: {
      ...theme.flex.row,
      width: '90%',
      justifyContent: 'flex-start',
      marginTop: 20,
    },
    valueBox: {
      ...theme.flex.row,
      justifyContent: 'space-between',
      width: '90%',
      marginVertical: 15,
    },
    infoBox: {
      ...theme.flex.row,
      width: '38%',
      justifyContent: 'space-between',
    },
    contantContainer: {
      flex: 1,
      paddingHorizontal: 20,
      paddingBottom: 10,
    },
    BtnStyle: {
      backgroundColor: 'green',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 20,
      paddingVertical: 7,
      borderRadius: 6,
    },
    percentage: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 20,
      paddingVertical: 5,
      borderRadius: 8,
    },
    PercentageText: {
      textAlign: 'center',
      justifyContent: 'center',
      fontFamily: fonts.regular,
    },
    button: {
      backgroundColor: 'green',
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      width: '20%',
      borderRadius: 12,
      marginTop: 20,
      marginLeft: 10,
    },
    buttonText: {
      color: 'white',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      paddingHorizontal: 20,
      borderTopEndRadius: 12,
      borderTopStartRadius: 12,
      alignItems: 'center',
      width: '100%',
      position: 'absolute',
      bottom: 0,
      height: 400,
    },
    modalText: {
      fontSize: 18,
      marginBottom: 20,
    },
    closeButton: {
      padding: 10,
      borderRadius: 8,
      width: '100%',
      alignItems: 'flex-end',
      position: 'absolute',
      right: 0,
      top: 0,
    },
    closeButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
  });
  return (
    <>
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
          <View style={{...theme.flex.column, alignItems: 'flex-end'}}>
            <Text
              style={{
                color: theme.text,
                fontSize: 20,
                fontFamily: fonts.regular,
              }}>
              $72,509
            </Text>
            <Text
              style={{
                color: theme.green,
                fontSize: 10,
                fontFamily: fonts.regular,
              }}>
              + 17.0 (9.77%)
            </Text>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{width: '100%'}}>
          {showCandleChart ? <CandleChart /> : <TradeDetail />}

          <View
            style={[
              styles.contantContainer,
              {backgroundColor: theme.background},
            ]}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <TouchableOpacity
                style={[
                  styles.BtnStyle,
                  {
                    backgroundColor:
                      activeButton === 'OrderBook' ? theme.blue : theme.gray,
                  },
                ]}
                onPress={() => handleButtonPress('OrderBook')}>
                <Text
                  style={{
                    color: '#fff',

                    fontFamily: fonts.regular,
                  }}>
                  OrderBook
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.BtnStyle,
                  {
                    backgroundColor:
                      activeButton === 'Chart' ? theme.blue : theme.gray,
                  },
                ]}
                onPress={() => handleButtonPress('Chart')}>
                <Text
                  style={{
                    color: '#fff',
                    fontFamily: fonts.regular,
                  }}>
                  Chart
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.BtnStyle,
                  {
                    backgroundColor:
                      activeButton === 'Info' ? theme.blue : theme.gray,
                  },
                ]}
                onPress={() => handleButtonPress('Info')}>
                <Text
                  style={{
                    color: '#fff',

                    fontFamily: fonts.regular,
                  }}>
                  Info
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            height: 100,
            justifyContent: 'flex-end',
            paddingTop: 30,
            paddingHorizontal: 20
          }}>
          <TouchableOpacity
            onPress={() => toggleBuyButton()}
            style={{
              backgroundColor: 'green',
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              width: '30%',
              borderRadius: 12,
              marginTop: 20,
              marginRight: 2,
              
            }}>
            <Text style={{color: theme.text}}>Buy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => toggleSellButton()}
            style={{
              backgroundColor: 'red',
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              width: '30%',
              borderRadius: 12,
              marginTop: 20,
              marginLeft: 2
            }}>
            <Text style={{color: theme.text}}>Sell</Text>
          </TouchableOpacity>
        </View>
      </View>

      
      <BuyModal isVisible={isBuyModalVisible} onClose={toggleBuyButton} />
      <SellModal isVisible={isSellModalVisible} onClose={toggleSellButton} />

      {/* Limit Modal */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}>
        <View
          style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
          <View
            style={{
              backgroundColor: isDarkMode ? '#000' : '#fff',
              padding: 20,
              borderRadius: 10,
            }}>
            <TouchableOpacity onPress={() => handleModalOption('Market')}>
              <Text
                style={{
                  color: isDarkMode ? '#fff' : '#000',
                  fontFamily: fonts.regular,
                  textAlign: 'center',
                }}>
                Market
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleModalOption('Limit')}>
              <Text
                style={{
                  color: isDarkMode ? '#fff' : '#000',
                  fontFamily: fonts.regular,
                  textAlign: 'center',
                }}>
                Limit
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleModalOption('Stop/Loss')}>
              <Text
                style={{
                  color: isDarkMode ? '#fff' : '#000',
                  fontFamily: fonts.regular,
                  textAlign: 'center',
                }}>
                Stop/Loss
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={toggleModal}
              style={{position: 'absolute', right: 5, top: 5}}>
              <SvgXml xml={assets.back} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Trade;
