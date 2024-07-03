import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, Dimensions, ImageBackground} from 'react-native';
import {Svg, Rect, Line} from 'react-native-svg';
import {
  PinchGestureHandler,
  State,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {AreaChart, XAxis, YAxis, Grid} from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import { BaseNavigationContainer } from '@react-navigation/native';

const {width} = Dimensions.get('window');

const CandleChart = () => {
  const randomInRange = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);

 
  const generateRandomData = () => {
    const randomData = [];
    for (let i = 0; i < 50; i++) {
     
      const open = randomInRange(10, 100); 
      const high = randomInRange(open, 100); 
      const low = randomInRange(0, open); 
      const close = randomInRange(low, high);
      randomData.push({value: [open, high, low, close]});
    }
    return randomData;
  };

  const data = generateRandomData()
  const [scale, setScale] = useState(1);
  const [chartHeight, setChartHeight] = useState(200);
  const [selectedCandle, setSelectedCandle] = useState(); 

  useEffect(() => {
    const calculateChartHeight = () => {
      const lowestPrice = Math.min(...data.map(item => item.value[2]));
      const highestPrice = Math.max(...data.map(item => item.value[1]));

      const priceRange = highestPrice - lowestPrice;
      const minHeight = 200; 
      const maxHeight = 300; 
      const newHeight =
        minHeight + (maxHeight - minHeight) * (priceRange / 300); 

      setChartHeight(newHeight);
    };

    calculateChartHeight();
  }, [data]);

  const handlePinch = event => {
    const newScale = event.nativeEvent.scale;
    if (event.nativeEvent.state === State.ACTIVE) {
      setScale(newScale);
    }
  };

  const Candlestick = ({data, onCandlePress}) => {
    const candleWidth = 10 * scale; 
    const spaceBetweenCandles = 15 * scale; 

    const handleCandlePress = index => {
      if (onCandlePress) {
        onCandlePress(data[index]);
      }
    };

    const chartWidth = data.length * spaceBetweenCandles; 

    return (
      <ScrollView
        horizontal
        onScrollEndDrag={() => onCandlePress(null)} 
      >
        <Svg height={chartHeight} width={chartWidth}>
          {data.map((item, index) => {
            const candleHeight = Math.abs(item.value[1] - item.value[2]);
            const candleX = index * spaceBetweenCandles;
            const candleOpen = item.value[0];
            const candleClose = item.value[3];
            const topCornerY = Math.max(candleOpen, candleClose);
            const bottomCornerY = Math.min(candleOpen, candleClose);
            const candleCenterX = candleX + candleWidth / 2;
            const candleColor =
              candleOpen < candleClose ? '#22e352' : '#e32225';

            return (
              <View
                key={index}
                style={{height: '100%', justifyContent: 'flex-end'}}>
                {/* Candle body */}
                <Rect
                  x={candleX}
                  y={bottomCornerY}
                  width={candleWidth}
                  height={candleHeight}
                  fill={candleColor}
                  onPress={() => handleCandlePress(index)}
                />
                {/* Candle wick */}
                <Line
                  x1={candleCenterX}
                  y1={item.value[1]}
                  x2={candleCenterX}
                  y2={topCornerY}
                  stroke={candleColor}
                  strokeWidth={1}
                />
                <Line
                  x1={candleCenterX}
                  y1={item.value[2]}
                  x2={candleCenterX}
                  y2={bottomCornerY}
                  stroke={candleColor}
                  strokeWidth={1}
                />
              </View>
            );
          })}
        </Svg>
      </ScrollView>
    );
  };

  return (
    <GestureHandlerRootView>
      <PinchGestureHandler onGestureEvent={handlePinch}>
        <View style={{flex: 0, height: chartHeight}}>
        <View style={{ flexDirection: 'row', flex: 1, paddingRight: 10 }}>
  <View style={{ flex: 1, marginRight: 10 }}>
    <Candlestick data={data} onCandlePress={setSelectedCandle} />
  </View>
  <YAxis
    data={data.flatMap(item => item.value)} 
    contentInset={{ top: 20, bottom: 20, }}
    svg={{ fontSize: 10, fill: 'grey', dy: 15}}
    numberOfTicks={5}
    formatLabel={value => `${value}`}
  />
</View>

          <View
            style={{
              height: '40%',
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}>
            <XAxis
              style={{marginHorizontal: -10}}
              data={data.map((_, index) => index)}
              formatLabel={index => data[index].value[0]} 
              contentInset={{left: 10, right: 10}}
              svg={{fontSize: 10, fill: 'black'}}
            />
          </View>
          {selectedCandle && (
            <View style={{position: 'absolute', bottom: 20, left: 20}}>
              <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 5}}>
                Candle Information
              </Text>
              <Text>Open: {selectedCandle.value[0]}</Text>
              <Text>High: {selectedCandle.value[1]}</Text>
              <Text>Low: {selectedCandle.value[2]}</Text>
              <Text>Close: {selectedCandle.value[3]}</Text>
            </View>
          )}
        </View>
      </PinchGestureHandler>
    </GestureHandlerRootView>
  );
};

export default CandleChart;
