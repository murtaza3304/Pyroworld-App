// BuyModal.js

import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {useColorScheme} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {assets} from '../../../assets/images/assets';
import {useTheme} from '../../../assets/theme/Theme';
import {fonts} from '../../../assets/fonts';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Dropdown} from 'react-native-element-dropdown';
import Slider from '@react-native-community/slider';

const BuyModal = ({isVisible, onClose}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const theme = useTheme();
  const [activeBtn, setActiveBtn] = useState('Buy');
  const [price, setPrice] = useState(0);
  const [priceBtc, setPriceBtc] = useState(0);
  const [selectedValue, setSelectedValue] = useState(null);
  const [spotValue, setSpotValue] = useState(null);

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
  // const toggleModal = () => {
  //   setSelectedOption('Limit');
  //   setIsModalVisible(!isModalVisible);
  // };
  const data = [
    {label: 'Option 1', value: '1'},
    {label: 'Option 2', value: '2'},
    {label: 'Option 3', value: '3'},
  ];
  const spotData = [
    {label: 'Lose', value: '1'},
    {label: 'Limit', value: '2'},
    {label: 'Profit', value: '3'},
  ];

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View
          style={[styles.modalContent, {backgroundColor: theme.background, borderTopColor: isDarkMode? '#fff' : '#000', borderTopWidth: 1, borderTopRightRadius: 10, borderTopEndRadius: 10}]}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <SvgXml xml={isDarkMode ? assets.CrossWhite : assets.CrossButton} />
          </TouchableOpacity>
          <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              justifyContent: 'space-between',
              width: '100%',
              alignItems: 'center',
              marginTop: 40,
            }}>
            {/* Buy/Sell Buttons */}
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                backgroundColor: theme.gray,
                borderRadius: 8,
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: activeBtn === 'Buy' ? 'green' : theme.gray,
                  paddingHorizontal: 20,
                  width: '50%',
                  paddingVertical: 10,
                  borderRadius: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => handleBtn('Buy')}>
                <Text style={{color: '#fff', fontFamily: fonts.regular}}>
                  Buy
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: activeBtn === 'Sell' ? 'red' : theme.gray,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 8,
                  width: '50%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => handleBtn('Sell')}>
                <Text style={{color: '#fff', fontFamily: fonts.regular}}>
                  Sell
                </Text>
              </TouchableOpacity>
            </View>

            {/* Limit/Spot Buttons */}
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <Dropdown
                style={{
                  width: '45%',
                  marginTop: 10,
                  backgroundColor: theme.gray,
                  paddingHorizontal: 20,
                  borderRadius: 6,
                  paddingVertical: 3,
                }}
                selectedTextStyle={{color: '#fff'}}
                label="Select Limit"
                placeholderStyle={{color: '#fff'}}
                placeholder="Limit"
                labelField="label"
                valueField="value"
                containerStyle={{width: '45%', borderRadius: 12}}
                data={data}
                value={selectedValue}
                onChange={value => setSelectedValue(value)}
                labelStyle={{
                  fontSize: 18,
                  // color: 'blue',
                  fontWeight: 'bold',
                  backgroundColor: 'green',
                  width: '50%',
                }}
                itemTextStyle={{
                  fontSize: 12,
                  color: 'black',
                }}
              />
              <Dropdown
                style={{
                  width: '45%',
                  marginTop: 10,
                  backgroundColor: theme.gray,
                  paddingHorizontal: 20,
                  borderRadius: 6,
                }}
                selectedTextStyle={{color: ' #fff'}}
                label="Spot Value"
                placeholder="Spot"
                placeholderStyle={{color: '#fff'}}
                labelField="label"
                valueField="value"
                containerStyle={{width: '50%', borderRadius: 12}}
                data={spotData}
                value={spotValue}
                onChange={value => setSpotValue(value)}
                labelStyle={{
                  fontSize: 18,
                  color: 'blue',
                  fontWeight: 'bold',
                  backgroundColor: 'green',
                  width: '50%',
                }}
                itemTextStyle={{
                  fontSize: 12,
                  color: 'black',
                }}
              />
            </View>
          </View>

          {/* Price Inputs */}
          <View style={styles.inputContainer}>
            <View
              style={[
                styles.inputRow,
                {backgroundColor: theme.gray, borderRadius: 8},
              ]}>
              <TouchableOpacity
                style={styles.controlButton}
                onPress={() => decrementPrice()}>
                <Text
                  style={[
                    styles.controlButtonText,
                    {
                      paddingHorizontal: 10,
                      borderRightWidth: 1,
                      borderRightColor: '#fff',
                    },
                  ]}>
                  -
                </Text>
              </TouchableOpacity>
              <TextInput
                style={styles.input}
                placeholder="Price (USDT)"
                value={price === 0 ? '' : price.toString()}
                keyboardType="numeric"
                onChangeText={text => {
                  setPrice(parseFloat(text) || 0);
                }}
                placeholderTextColor={'#fff'}
              />
              <TouchableOpacity
                style={styles.controlButton}
                onPress={() => incrementPrice()}>
                <Text
                  style={[
                    styles.controlButtonText,
                    {
                      paddingHorizontal: 10,
                      borderLeftWidth: 1,
                      borderLeftColor: '#fff',
                    },
                  ]}>
                  +
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={[
                styles.inputRow,
                {backgroundColor: theme.gray, borderRadius: 8},
              ]}>
              <TouchableOpacity
                style={styles.controlButton}
                onPress={() => decrementPriceBtc()}>
                <Text
                  style={[
                    styles.controlButtonText,
                    {
                      paddingHorizontal: 10,
                      borderRightWidth: 1,
                      borderRightColor: '#fff',
                    },
                  ]}>
                  -
                </Text>
              </TouchableOpacity>
              <TextInput
                style={styles.input}
                placeholder="Amount (BTC)"
                value={priceBtc === 0 ? '' : priceBtc.toString()}
                keyboardType="numeric"
                onChangeText={text => {
                  setPriceBtc(parseFloat(text) || 0);
                }}
                placeholderTextColor={'#fff'}
              />
              <TouchableOpacity
                style={styles.controlButton}
                onPress={() => incrementPriceBtc()}>
                <Text
                  style={[
                    styles.controlButtonText,
                    {
                      paddingHorizontal: 10,
                      borderLeftWidth: 1,
                      borderLeftColor: '#fff',
                    },
                  ]}>
                  +
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* slider */}
          <Slider
            style={{
              width: '100%',
              height: 40,
              marginTop: 65,
            }}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor={isDarkMode? '#fff' : '#000'}
            maximumTrackTintColor={isDarkMode ? 'grey' : 'grey'}
            thumbTintColor={isDarkMode ? '#fff' : '#000'}
            
          />

          {/* Total and Available */}
          <View style={styles.totalContainer}>
            <View style={styles.totalInfo}>
              <Text
                style={[
                  styles.totalText,
                  {color: isDarkMode ? '#fff' : '#000'},
                ]}>
                Total
              </Text>
              <Text style={[styles.totalValue, {color: theme.blue}]}>
                0.0 BTC
              </Text>
            </View>
            <View style={styles.totalInfo}>
              <Text
                style={[
                  styles.totalText,
                  {color: isDarkMode ? '#fff' : '#000'},
                ]}>
                Available
              </Text>
              <Text style={[styles.totalValue, {color: theme.blue}]}>
                0.0 BTC
              </Text>
            </View>
          </View>

          {/* Buy/Sell Button */}
          <TouchableOpacity
            style={[
              styles.actionButton,
              {backgroundColor: activeBtn === 'Buy' ? 'green' : 'red'},
            ]}
            onPress={() => handleBtn(activeBtn === 'Buy' ? 'Sell' : 'Buy')}>
            <Text style={styles.actionButtonText}>{activeBtn}</Text>
          </TouchableOpacity>
          </ScrollView>
        </View>
        
      </View>
    </Modal>
  );
};

const styles = {
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
  closeButton: {
    padding: 10,
    borderRadius: 8,
    width: '100%',
    alignItems: 'flex-end',
    position: 'absolute',
    right: 0,
    top: 0,
  },
  inputContainer: {
    width: '100%',
    height: 60,
    marginTop: 10,
    borderRadius: 8,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 7,
    borderRadius: 8,
  },
  controlButton: {
    width: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlButtonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: fonts.bold,
  },
  input: {
    width: '70%',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: '#fff',
  },
  totalContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  totalInfo: {
    flexDirection: 'column',
  },
  totalText: {
    fontFamily: fonts.semibold,
  },
  totalValue: {
    fontFamily: fonts.semibold,
  },
  actionButton: {
    width: '100%',
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,


  },
  actionButtonText: {
    color: '#fff',
  },
};

export default BuyModal;
