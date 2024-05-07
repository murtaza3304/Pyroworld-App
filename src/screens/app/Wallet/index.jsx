import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Button,
  TextInput,
  useColorScheme,
  Image,
} from 'react-native';
import {useTheme} from '../../../assets/theme/Theme';
import {SvgXml} from 'react-native-svg';
import {assets} from '../../../assets/images/assets';
import {BalanceCard, PriceCard} from '../../../components';
import {walletData} from './data';
import Modal from 'react-native-modal';
import {fonts} from '../../../assets/fonts';
import Clipboard from '@react-native-clipboard/clipboard';

const Wallet = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const theme = useTheme();
  const [activeButton, setActiveButton] = useState('Deposit');
  const [isDepositModalVisible, setDepositModalVisible] = useState(false);
  const [isWithdrawModalVisible, setWithdrawModalVisible] = useState(false);
  const [isTransferModalVisible, setTransferModalVisible] = useState(false);
  const [isItemModalVisible, setItemModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isTronModalVisible, setTronModalVisible] = useState(false);
  const [isBNBModalVisible, setBNBModalVisible] = useState(false);
  const [isEthereumModalVisible, setEthereumModalVisible] = useState(false);
  const [isPolygonModalVisible, setPolygonModalVisible] = useState(false);
  const [isAVAXModalVisible, setAVAXModalVisible] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [searchValue, setSearchValue] = useState();
  const [textInput, setTextInput] = useState();

  const styles = StyleSheet.create({
    main: {
      ...theme.flex.fullColumn,
      backgroundColor: theme.background,
      justifyContent: 'flex-start',
    },
    BtnStyle: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 6,
      marginBottom: 15,
    },
    activeBtn: {
      backgroundColor: '#38B6FF',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      margin: 0,
    },
    modalContent: {
      backgroundColor: 'white',
      height: '85%',
      padding: 20,
    },
    button: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 12,
      marginTop: 10,
      borderRadius: 12,
    },
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 0.5,
      borderRadius: 10,
      paddingHorizontal: 10,
      marginVertical: 10,
    },
    icon: {
      width: 20,
      height: 20,
      marginRight: 10,
      tintColor: '#000',
    },
    input: {
      flex: 1,
      height: 40,
      fontSize: 16,
    },
    FlatListcontainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      borderBottomColor: '#ccc',
    },
    image: {
      width: 50,
      height: 50,
      marginRight: 10,
    },
    textContainer: {
      flex: 1,
      flexDirection: 'column',
      marginLeft: 3,
    },
    text: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    number: {
      fontSize: 14,
      color: '#666',
    },
    networkCards: {
      width: '100%',
      marginVertical: 6,
      borderWidth: 0,
      // borderColor: theme.gray,
      borderRadius: 1,
      padding: 10,
      marginTop: 20,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 10,

      elevation: 1,
    },
  });

  const handleButtonPress = buttonName => {
    setActiveButton(buttonName);
    if (buttonName === 'Deposit') {
      setDepositModalVisible(true);
    } else if (buttonName === 'Withdraw') {
      setWithdrawModalVisible(true);
    } else if (buttonName === 'Transfer') {
      setTransferModalVisible(true);
    }
  };

  const toggleDepositModal = () => {
    setDepositModalVisible(!isDepositModalVisible);
  };

  const toggleWithdrawModal = () => {
    setWithdrawModalVisible(!isWithdrawModalVisible);
  };

  const clearSearch = () => {
    setTextInput('');
  };

  const toggleTransferModal = () => {
    setTransferModalVisible(!isTransferModalVisible);
  };
  const handleItemPress = item => {
    setItemModalVisible(true);
    setSelectedItem(item);
  };
  const toggleItemModal = () => {
    setItemModalVisible(!isItemModalVisible);
  };
  const toggleTronModal = () => {
    setTronModalVisible(!isTronModalVisible);
  };

  const toggleBNBModal = () => {
    setBNBModalVisible(!isBNBModalVisible);
  };

  const toggleEthereumModal = () => {
    setEthereumModalVisible(!isEthereumModalVisible);
  };

  const togglePolygonModal = () => {
    setPolygonModalVisible(!isPolygonModalVisible);
  };

  const toggleAVAXModal = () => {
    setAVAXModalVisible(!isAVAXModalVisible);
  };

  const copyToClipboard = text => {
    Clipboard.setString(text);
    setIsCopied(true); // Set isCopied to true after copying

    // Reset isCopied to false after 3 seconds
    setTimeout(() => {
      setIsCopied(false);
    }, 3000); // Adjust the delay as needed
  };
  const handleSearchValue = () => {
    setSearchValue('');
  };
  const data = [
    {
      id: 1,
      image: assets.eth,
      text: 'Ethereum',
      number: '$1209',
    },
    {
      id: 2,
      image: assets.btc,
      text: 'Bitcoin',
      number: '$2509',
    },
  ];

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.main}>
          <View
            style={{
              ...theme.flex.row,
              justifyContent: 'space-between',
              width: '90%',
              marginTop: 20,
            }}>
            <View style={{...theme.flex.row}}>
              {/* <SvgXml xml={assets.back} /> */}
              <Text
                style={{
                  fontSize: 25,
                  marginLeft: 5,
                  color: theme.text,
                }}>
                Wallet
              </Text>
            </View>
            <SvgXml xml={assets.search} />
          </View>
          <BalanceCard />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              width: '90%',
              paddingVertical: 10,
            }}>
            <TouchableOpacity
              style={[
                styles.BtnStyle,
                {backgroundColor: theme.itembg},
                activeButton === 'Deposit' && styles.activeBtn,
              ]}
              onPress={() => handleButtonPress('Deposit')}>
              <Text
                style={{
                  color: theme.text,
                  fontFamily: fonts.semibold,
                  fontSize: 16,
                }}>
                Deposit
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.BtnStyle,
                {backgroundColor: theme.itembg},
                activeButton === 'Withdraw' && styles.activeBtn,
              ]}
              onPress={() => handleButtonPress('Withdraw')}>
              <Text
                style={{
                  color: theme.text,
                  fontFamily: fonts.semibold,
                  fontSize: 16,
                }}>
                Withdraw
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.BtnStyle,
                {backgroundColor: theme.itembg},
                activeButton === 'Transfer' && styles.activeBtn,
              ]}
              onPress={() => handleButtonPress('Transfer')}>
              <Text
                style={{
                  color: theme.text,
                  fontFamily: fonts.semibold,
                  fontSize: 16,
                }}>
                Transfer
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              ...theme.flex.row,
              width: '90%',
              justifyContent: 'flex-start',
            }}>
            <Text style={{fontSize: 25, color: theme.text}}>Balances</Text>
          </View>
          <FlatList
            data={walletData}
            contentContainerStyle={{
              ...theme.flex.row,
              flexWrap: 'wrap',
              width: '100%',
              justifyContent: 'space-between',
            }}
            renderItem={({item}) => (
              <PriceCard data={item} layout={true} wallet={true} />
            )}
          />
        </View>
      </ScrollView>
      {/* Deposit Modal */}
      <Modal
        isVisible={isDepositModalVisible}
        style={styles.modalContainer}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropOpacity={0.5}
        backdropColor="black"
        onBackdropPress={toggleDepositModal}>
        <View
          style={[
            styles.modalContent,
            {
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
              backgroundColor: theme.background,
            },
          ]}>
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: 0,
              padding: 10,
              borderRadius: 50,
            }}
            onPress={toggleDepositModal}>
            <SvgXml xml={isDarkMode ? assets.CrossWhite : assets.CrossButton} />
          </TouchableOpacity>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: 25,
            }}>
            <View style={[styles.container, {borderColor: theme.gray}]}>
              <SvgXml
                xml={isDarkMode ? assets.search : assets.searchlight}
                style={{...styles.icon}}
              />

              <TextInput
                style={styles.input}
                placeholder="Search..."
                placeholderTextColor={theme.gray}
                value={searchValue}
                onChangeText={setSearchValue}
              />
            </View>
            <TouchableOpacity
              style={{padding: 3, marginLeft: 3}}
              onPress={handleSearchValue}>
              <Text style={{color: theme.blue, fontFamily: fonts.bold}}>
                Clear
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView>
            <View>
              <Text
                style={{
                  fontFamily: fonts.bold,
                  color: theme.text,
                  fontSize: 16,
                }}>
                History
              </Text>
            </View>

            <View style={{height: 50}}>
              <FlatList
                data={['Hardcoded Item 1']}
                renderItem={({item}) => (
                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                    }}>
                    <TouchableOpacity
                      style={{
                        backgroundColor: theme.gray,
                        padding: 5,
                        borderRadius: 6,
                        margin: 6,
                      }}>
                      <Text style={{color: theme.text}}>Bitcoin</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        backgroundColor: theme.gray,
                        padding: 5,
                        borderRadius: 6,
                        margin: 6,
                      }}>
                      <Text style={{color: theme.text}}>Ethereum</Text>
                    </TouchableOpacity>
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
            <View>
              <Text
                style={{
                  fontFamily: fonts.bold,
                  color: theme.text,
                  fontSize: 16,
                }}>
                Trending
              </Text>
            </View>
            <View style={{height: 50}}>
              <FlatList
                data={['hardcoded']}
                renderItem={({item}) => (
                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                    }}>
                    <TouchableOpacity
                      style={{
                        backgroundColor: theme.gray,
                        padding: 5,
                        borderRadius: 6,
                        margin: 6,
                      }}>
                      <Text style={{color: theme.text}}>Bitcoin</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        backgroundColor: theme.gray,
                        padding: 5,
                        borderRadius: 6,
                        margin: 6,
                      }}>
                      <Text style={{color: theme.text}}>Ethereum</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        backgroundColor: theme.gray,
                        padding: 5,
                        borderRadius: 6,
                        margin: 6,
                      }}>
                      <Text style={{color: theme.text}}>Tron</Text>
                    </TouchableOpacity>
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
            <FlatList
              data={data}
              renderItem={({item}) => (
                <TouchableOpacity onPress={handleItemPress}>
                  <View style={styles.FlatListcontainer}>
                    <SvgXml xml={item.image} />
                    <View style={styles.textContainer}>
                      <Text style={[styles.text, {color: theme.text}]}>
                        {item.text}
                      </Text>
                      <Text style={[styles.number, {color: theme.text}]}>
                        {item.number}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={item => item.id.toString()}
            />
          </ScrollView>
        </View>
      </Modal>

      {/* Withdraw Modal */}
      <Modal
        isVisible={isWithdrawModalVisible}
        style={styles.modalContainer}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropOpacity={0.5}
        backdropColor="black"
          onBackdropPress={toggleWithdrawModal}>
        <View
          style={[
            styles.modalContent,
            {
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
              backgroundColor: theme.background,
            },
          ]}>
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: 0,
              padding: 10,
              borderRadius: 50,
            }}
            onPress={toggleWithdrawModal}>
            <SvgXml xml={isDarkMode ? assets.CrossWhite : assets.CrossButton} />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: 25,
            }}>
            <View style={styles.container}>
              <SvgXml xml={assets.search} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Search..."
                placeholderTextColor="#F0F0F0"
                value={textInput}
                onChange={() => setTextInput()}
              />
            </View>
            <TouchableOpacity
              style={{padding: 3, marginLeft: 3}}
              onPress={() => clearSearch()}>
              <Text style={{color: theme.blue, fontFamily: fonts.bold}}>
                clear
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text
              style={{
                fontFamily: fonts.bold,
                color: theme.text,
                fontSize: 16,
              }}>
              History
            </Text>
          </View>
          {/* Input Api history here */}
          <View style={{height: 50}}>
            <FlatList
              data={['hardcoded']}
              renderItem={({item}) => (
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                  }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: isDarkMode ? 'grey' : '#000',
                      padding: 5,
                      borderRadius: 6,
                      margin: 6,
                    }}>
                    <Text style={{color: theme.text}}>Bitcoin</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      backgroundColor: isDarkMode ? 'grey' : '#000',
                      padding: 5,
                      borderRadius: 6,
                      margin: 6,
                    }}>
                    <Text style={{color: theme.text}}>Ethereum</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      backgroundColor: isDarkMode ? 'grey' : '#000',
                      padding: 5,
                      borderRadius: 6,
                      margin: 6,
                    }}>
                    <Text style={{color: theme.text}}>TORN</Text>
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          <View>
            <Text
              style={{
                fontFamily: fonts.bold,
                color: theme.text,
                fontSize: 16,
              }}>
              Trending
            </Text>
          </View>
          <View style={{height: 50}}>
            <FlatList
              data={['Hardcoded Item 1']}
              renderItem={({item}) => (
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                  }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: isDarkMode ? 'grey' : '#000',
                      padding: 5,
                      borderRadius: 6,
                      margin: 6,
                    }}>
                    <Text style={{color: theme.text}}>Bitcoin</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      backgroundColor: isDarkMode ? 'grey' : '#000',
                      padding: 5,
                      borderRadius: 6,
                      margin: 6,
                    }}>
                    <Text style={{color: theme.text}}>Ethereum</Text>
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          <FlatList
            data={data}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => handleItemPress(item)}>
                <View style={styles.FlatListcontainer}>
                  <SvgXml xml={item.image} />
                  <View style={styles.textContainer}>
                    <Text style={[styles.text, {color: theme.text}]}>
                      {item.text}
                    </Text>
                    <Text style={[styles.number, {color: theme.text}]}>
                      {item.number}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id.toString()}
          />
         
        </View>
      </Modal>

      {/* Transfer Modal */}
      {/* <Modal
        isVisible={isTransferModalVisible}
        style={styles.modalContainer}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropOpacity={0.5}
        backdropColor="black">
        <View
          style={[
            styles.modalContent,
            {borderTopLeftRadius: 12, borderTopRightRadius: 12},
          ]}>
          <Text style={{color: 'black'}}>Transfer Modal Content</Text>
          <TouchableOpacity
            onPress={toggleTransferModal}
            style={{
              width: '100%',
              backgroundColor: theme.blue,
              marginTop: 12,
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 10,
              borderRadius: 10,
            }}>
            <Text
              style={{
                color: theme.text,
                fontSize: 14,
                fontFamily: fonts.semibold,
              }}>
              Back
            </Text>
          </TouchableOpacity>
        </View>
      </Modal> */}

      {/* ...............Additional Modal or all network modal.......... */}
      <Modal
        isVisible={isItemModalVisible}
        style={styles.modalContainer}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropOpacity={0.5}
        backdropColor="grey"
        onBackdropPress={toggleItemModal}>
        <View
          style={[
            styles.modalContent,
            {
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
              backgroundColor: theme.background,
            },
          ]}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: theme.text,
                  fontFamily: fonts.bold,
                  fontSize: 22,
                }}>
                Choose Network
              </Text>
              <TouchableOpacity onPress={toggleItemModal}>
                <SvgXml xml={assets.back} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={[
                styles.networkCards,
                {
                  shadowColor: theme.text,
                },
              ]}
              onPress={toggleTronModal}>
              <Text
                style={{
                  color: theme.gray,
                  fontFamily: fonts.semibold,
                  fontSize: 16,
                }}>
                TRON(TRC20)
              </Text>
              <Text
                style={{
                  color: theme.gray,
                  fontFamily: fonts.regular,
                }}>
                1 block confirmation/s
              </Text>
              <Text
                style={{
                  color: theme.gray,
                  fontFamily: fonts.regular,
                }}>
                min. deposit 0.01 USDT
              </Text>
              <Text
                style={{
                  color: theme.gray,
                  fontFamily: fonts.regular,
                }}>
                Est. arrival 2 mins
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.networkCards,
                {
                  shadowColor: theme.text,
                },
              ]}
              onPress={toggleBNBModal}>
              <Text
                style={{
                  color: theme.gray,
                  fontFamily: fonts.semibold,
                  fontSize: 16,
                }}>
                BNB Smart Chain(BEP20)
              </Text>
              <Text
                style={{
                  color: theme.gray,
                  fontFamily: fonts.regular,
                }}>
                15 block confirmation/s
              </Text>
              <Text
                style={{
                  color: theme.gray,
                  fontFamily: fonts.regular,
                }}>
                min. deposit 0.01 USDT
              </Text>
              <Text
                style={{
                  color: theme.gray,
                  fontFamily: fonts.regular,
                }}>
                Est. arrival 3 mins
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.networkCards,
                {
                  shadowColor: theme.text,
                },
              ]}
              onPress={toggleEthereumModal}>
              <Text
                style={{
                  color: theme.gray,
                  fontFamily: fonts.semibold,
                  fontSize: 16,
                }}>
                Ethereum(ERC20)
              </Text>
              <Text
                style={{
                  color: theme.gray,
                  fontFamily: fonts.regular,
                }}>
                6 block confirmation/s
              </Text>
              <Text
                style={{
                  color: theme.gray,
                  fontFamily: fonts.regular,
                }}>
                min. deposit 0.00000001 USDT
              </Text>
              <Text
                style={{
                  color: theme.gray,
                  fontFamily: fonts.regular,
                }}>
                Est. arrival 2min
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.networkCards,
                {
                  shadowColor: theme.text,
                },
              ]}
              onPress={togglePolygonModal}>
              <Text
                style={{
                  color: theme.gray,
                  fontFamily: fonts.semibold,
                  fontSize: 16,
                }}>
                Polygon
              </Text>
              <Text
                style={{
                  color: theme.gray,
                  fontFamily: fonts.regular,
                }}>
                200 block confirmation/s
              </Text>
              <Text
                style={{
                  color: theme.gray,
                  fontFamily: fonts.regular,
                }}>
                min. deposit 0.0000001 USDT
              </Text>
              <Text
                style={{
                  color: theme.gray,
                  fontFamily: fonts.regular,
                }}>
                Est. arrival 4 mins
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.networkCards,
                {
                  shadowColor: theme.text,
                },
              ]}
              onPress={toggleAVAXModal}>
              <Text
                style={{
                  color: theme.gray,
                  fontFamily: fonts.semibold,
                  fontSize: 16,
                }}>
                AVAX C-Chain
              </Text>
              <Text
                style={{
                  color: theme.gray,
                  fontFamily: fonts.regular,
                }}>
                12 block confirmation/s
              </Text>
              <Text
                style={{
                  color: theme.gray,
                  fontFamily: fonts.regular,
                }}>
                min. deposit 0.01 USDT
              </Text>
              <Text
                style={{
                  color: theme.gray,
                  fontFamily: fonts.regular,
                }}>
                Est. arrival 2min
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
      {/* TRON Modal */}
      <Modal
        isVisible={isTronModalVisible}
        onBackdropPress={toggleTronModal}
        style={styles.modalContainer}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropOpacity={0.5}
        backdropColor="grey">
        <View
          style={[
            styles.modalContent,
            {
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
              backgroundColor: theme.background,
            },
          ]}>
          <View>
            <View
              style={{
                width: '100%',
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TouchableOpacity onPress={toggleTronModal}>
                <SvgXml xml={assets.back} />
              </TouchableOpacity>
              <View>
                <Text
                  style={{
                    color: theme.text,
                    fontFamily: fonts.semibold,
                    fontSize: 16,
                  }}>
                  Deposit USDT
                </Text>
              </View>
              <View>
                <SvgXml xml={assets.down} />
              </View>
            </View>
            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 20,
              }}>
              <Image
                source={require('../../../assets/images/QRCode.png')}
                style={{height: 200, width: 200}}
              />
            </View>
            <View
              style={{
                width: '100%',
                height: 180,
                borderWidth: 1,
                borderColor: 'grey',
                borderRadius: 10,
                padding: 20,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View>
                  <Text style={{color: 'grey'}}>Network</Text>
                  <Text
                    style={{
                      color: theme.text,
                      fontSize: 16,
                      fontFamily: fonts.regular,
                    }}>
                    BNB Smart Chain(BEP2)
                  </Text>
                  <Text style={{color: 'grey'}}>
                    Contract Information ***98747
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <View>
                  <Text style={{color: 'grey'}}>Deposit Address</Text>
                  <Text
                    style={{
                      color: theme.text,
                      fontSize: 16,
                      fontFamily: fonts.regular,
                      width: 200,
                    }}>
                    TCaT7LSCpWcCF176bQiowq5EHjysyTiMgK
                  </Text>
                </View>
                <View style={{position: 'relative'}}>
                  {isCopied && (
                    <Text
                      style={{
                        position: 'absolute',
                        top: -20,
                        right: 0,
                        zIndex: 1,
                        color: 'green',
                        width: 50,
                      }}>
                      Copied!
                    </Text>
                  )}
                  <TouchableOpacity
                    onPress={() =>
                      copyToClipboard('TCaT7LSCpWcCF176bQiowq5EHjysyTiMgK')
                    }>
                    <SvgXml xml={assets.CopyText} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Wallet;
