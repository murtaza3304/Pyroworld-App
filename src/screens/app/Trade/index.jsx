import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  TextInput,
  ScrollView,
  Modal
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

  const handleBtn = btnName => {
    setActiveBtn(btnName);
  };
  const incrementPrice = () => {
    setPrice(price + 1);
  };
  const decrementPrice = () => {
    if (price > 0) {
      setPrice(price - 1);
    }
  };
  const incrementPriceBtc = () => {
    setPriceBtc(priceBtc + 1);
  };
  const decrementPriceBtc = () => {
    if (priceBtc > 0) {
      setPriceBtc(priceBtc - 1);
    }
  };
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
  const handleModalOption = (option) => {
    setSelectedOption(option);
    setIsModalVisible(false); 
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

        <ScrollView showsVerticalScrollIndicator={false}>
          {showCandleChart ? <CandleChart /> : <TradeDetail />}
          <View
            style={[
              styles.contantContainer,
              {backgroundColor: isDarkMode ? '#000' : '#fff'},
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
                      activeButton === 'OrderBook'
                        ? theme.blue
                        : isDarkMode
                        ? '#202832'
                        : '#F5F5F5',
                  },
                ]}
                onPress={() => handleButtonPress('OrderBook')}>
                <Text
                  style={{
                    color: activeButton === 'OrderBook' ? '#fff' : '#000',
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
                      activeButton === 'Chart'
                        ? theme.blue
                        : isDarkMode
                        ? '#202832'
                        : '#F5F5F5',
                  },
                ]}
                onPress={() => handleButtonPress('Chart')}>
                <Text
                  style={{
                    color: activeButton === 'Chart' ? '#fff' : '#000',
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
                      activeButton === 'Info'
                        ? theme.blue
                        : isDarkMode
                        ? '#202832'
                        : '#F5F5F5',
                  },
                ]}
                onPress={() => handleButtonPress('Info')}>
                <Text
                  style={{
                    color: activeButton === 'Info' ? '#fff' : '#000',
                    fontFamily: fonts.regular,
                  }}>
                  Info
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  style={{
                    backgroundColor:
                      activeBtn === 'Buy'
                        ? 'green'
                        : isDarkMode
                        ? '#202832'
                        : '#F5F5F5',
                    paddingHorizontal: 20,
                    paddingVertical: 8,
                    borderTopLeftRadius: 8,
                    borderBottomLeftRadius: 8,
                  }}
                  onPress={() => handleBtn('Buy')}>
                  <Text
                    style={{
                      color: activeBtn === 'Buy' ? '#fff' : '#000',
                      fontFamily: fonts.regular,
                    }}>
                    Buy
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor:
                      activeBtn === 'Sell'
                        ? 'red'
                        : isDarkMode
                        ? '#202832'
                        : '#F5F5F5',
                    paddingHorizontal: 20,
                    paddingVertical: 8,
                    borderTopRightRadius: 8,
                    borderBottomRightRadius: 8,
                  }}
                  onPress={() => handleBtn('Sell')}>
                  <Text
                    style={{
                      color: activeBtn === 'Sell' ? '#fff' : '#000',
                      fontFamily: fonts.regular,
                    }}>
                    Sell
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: isDarkMode ? '#202832' : '#F5F5F5',
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                    borderRadius: 8,
                  }}
                  onPress={toggleModal}>
                  <Text
                    style={{
                      color: isDarkMode ? '#fff' : '#000',
                      fontFamily: fonts.regular,
                      marginRight: 10,
                    }}>
                    Limit
                  </Text>
                  <SvgXml
                    xml={assets.limit}
                    fill={isDarkMode ? '#fff' : '#000'}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                width: '100%',
                backgroundColor: isDarkMode ? '#202832' : '#F5F5F5',
                height: 40,
                marginTop: 10,
                borderRadius: 8,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={{
                  width: '15%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 30,
                  borderRightColor: 'grey',
                  borderRightWidth: 1,
                }}
                onPress={() => decrementPrice()}>
                <Text
                  style={{
                    color: isDarkMode ? '#fff' : 'grey',
                    fontSize: 14,
                    fontFamily: fonts.bold,
                  }}>
                  -
                </Text>
              </TouchableOpacity>
              <TextInput
                style={{
                  width: '70%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  color: isDarkMode ? '#fff' : '#000',
                }}
                placeholder="Price (USDT)"
                value={price === 0 ? '' : price.toString()}
                keyboardType="numeric"
                onChangeText={text => {
                  setPrice(parseFloat(text) || 0);
                }}
                placeholderTextColor="grey"
              />
              <TouchableOpacity
                style={{
                  width: '15%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 30,
                  borderLeftWidth: 1,
                  borderLeftColor: 'grey',
                }}
                onPress={() => incrementPrice()}>
                <Text
                  style={{
                    color: isDarkMode ? '#fff' : 'grey',
                    fontSize: 14,
                    fontFamily: fonts.bold,
                  }}>
                  +
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: '100%',
                backgroundColor: isDarkMode ? '#202832' : '#F5F5F5',
                height: 40,
                marginTop: 10,
                borderRadius: 8,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={{
                  width: '15%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 30,
                  borderRightColor: 'grey',
                  borderRightWidth: 1,
                }}
                onPress={() => decrementPriceBtc()}>
                <Text
                  style={{
                    color: isDarkMode ? '#fff' : 'grey',
                    fontSize: 14,
                    fontFamily: fonts.bold,
                  }}>
                  -
                </Text>
              </TouchableOpacity>
              <TextInput
                style={{
                  width: '70%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  color: isDarkMode ? '#fff' : '#000',
                }}
                placeholder="Amount (BTC)"
                value={priceBtc === 0 ? '' : priceBtc.toString()}
                keyboardType="numeric"
                onChangeText={text => {
                  setPriceBtc(parseFloat(text) || 0);
                }}
                placeholderTextColor="grey"
              />
              <TouchableOpacity
                style={{
                  width: '15%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 30,
                  borderLeftWidth: 1,
                  borderLeftColor: 'grey',
                }}
                onPress={() => incrementPriceBtc()}>
                <Text
                  style={{
                    color: isDarkMode ? '#fff' : 'grey',
                    fontSize: 14,
                    fontFamily: fonts.bold,
                  }}>
                  +
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
                marginTop: 10,
              }}>
              <TouchableOpacity
                style={[styles.percentage, {backgroundColor: '#6C757D'}]}>
                <Text
                  style={[
                    {color: isDarkMode ? '#fff' : '#fff'},
                    styles.PercentageText,
                  ]}>
                  25%
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.percentage, {backgroundColor: '#6C757D'}]}>
                <Text
                  style={[
                    {color: isDarkMode ? '#fff' : '#fff'},
                    styles.PercentageText,
                  ]}>
                  50%
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.percentage, {backgroundColor: '#6C757D'}]}>
                <Text
                  style={[
                    {color: isDarkMode ? '#fff' : '#fff'},
                    styles.PercentageText,
                  ]}>
                  75%
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.percentage, {backgroundColor: '#6C757D'}]}>
                <Text
                  style={[
                    {color: isDarkMode ? '#fff' : '#fff'},
                    styles.PercentageText,
                  ]}>
                  100%
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <View style={{}}>
                <Text
                  style={{
                    color: isDarkMode ? '#fff' : '#000',
                    fontFamily: fonts.semibold,
                  }}>
                  Total
                </Text>
                <Text style={{color: theme.blue, fontFamily: fonts.semibold}}>
                  Available
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    color: isDarkMode ? '#fff' : '#000',
                    fontFamily: fonts.semibold,
                  }}>
                  0.0 BTC
                </Text>
                <Text style={{color: theme.blue, fontFamily: fonts.semibold}}>
                  0.0 BTC
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={{
                width: '100%',
                backgroundColor:
                  activeBtn === 'Buy'
                    ? 'green'
                    : activeBtn === 'Sell'
                    ? 'red'
                    : isDarkMode
                    ? '#202832'
                    : '#F5F5F5',
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 12,
                borderRadius: 8,
                marginTop: 10,
              }}
              onPress={() => handleBtn(activeBtn === 'Buy' ? 'Sell' : 'Buy')}>
              <Text style={{color: '#fff'}}>{activeBtn}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    <Modal
  animationType="slide"
  transparent={true}
  visible={isModalVisible}
  onRequestClose={toggleModal}
>
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
    <View
      style={{
        backgroundColor: isDarkMode ? '#000' : '#fff',
        padding: 20,
        borderRadius: 10,
      }}
    >
      <TouchableOpacity onPress={() => handleModalOption('Market')}>
        <Text style={{ color: isDarkMode ? '#fff' : '#000', fontFamily: fonts.regular, textAlign: 'center' }}>Market</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleModalOption('Limit')}>
        <Text style={{ color: isDarkMode ? '#fff' : '#000', fontFamily: fonts.regular, textAlign: 'center' }}>Limit</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleModalOption('Stop/Loss')}>
        <Text style={{ color: isDarkMode ? '#fff' : '#000', fontFamily: fonts.regular, textAlign: 'center' }}>Stop/Loss</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={toggleModal} style={{ position: 'absolute', right: 5, top: 5 }}>
        <SvgXml xml={assets.back} />
      </TouchableOpacity>
    </View>
  </View>
</Modal>


    </>
  );
};

export default Trade;
