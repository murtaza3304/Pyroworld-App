import React, {useState} from 'react';
import {View, Text, ScrollView, Dimensions} from 'react-native';
import {Svg, Rect, Line} from 'react-native-svg';
import {
  PinchGestureHandler,
  State,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {AreaChart, XAxis, YAxis, Grid} from 'react-native-svg-charts';
import * as shape from 'd3-shape';

const {width} = Dimensions.get('window');

const CandleChart = () => {
  const randomInRange = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);

  // Generate random data
  const generateRandomData = () => {
    const randomData = [];
    for (let i = 0; i < 50; i++) {
      // Generate random values within wider ranges
      const open = randomInRange(10, 100); // wider range
      const high = randomInRange(open, 130); // wider range
      const low = randomInRange(0, open); // wider range
      const close = randomInRange(low, high);
      randomData.push({value: [open, high, low, close]});
    }
    return randomData;
  };

  const [data, setData] = useState(generateRandomData());
  const [scale, setScale] = useState(1);

  const handlePinch = event => {
    const newScale = event.nativeEvent.scale;
    if (event.nativeEvent.state === State.ACTIVE) {
      setScale(newScale);
    }
  };

  const Candlestick = ({data, onCandlePress}) => {
    const candleWidth = 10 * scale; // Adjust width based on scale
    const spaceBetweenCandles = 15 * scale; // Adjust spacing based on scale

    const handleCandlePress = index => {
      if (onCandlePress) {
        onCandlePress(data[index]);
      }
    };

    const chartWidth = data.length * spaceBetweenCandles; // Calculate total chart width

    return (
      <ScrollView horizontal>
        <Svg height={'50%'} width={chartWidth}>
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
    <GestureHandlerRootView >
      <PinchGestureHandler onGestureEvent={handlePinch}>
        <View style={{flex: 0,height:500}}>
          <View style={{height: '50%', flexDirection: 'row'}}>
            <YAxis
              data={data.flatMap(item => item.value)} // Flatten the data array to get all values
              contentInset={{top: 20, bottom: 20}}
              svg={{fontSize: 10, fill: 'grey'}}
              numberOfTicks={5}
              formatLabel={value => `${value}`}
            />
            <View style={{flex: 1, marginLeft: 10}}>
              <ScrollView horizontal>
                <Candlestick data={data} />
              </ScrollView>
            </View>
          </View>
          <View
            style={{
              height: '50%',
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}>
            <XAxis
              style={{marginHorizontal: -10}}
              data={data.map((_, index) => index)} // Map indices for X-axis
              formatLabel={index => data[index].value[0]} // Use the open price as label
              contentInset={{left: 10, right: 10}}
              svg={{fontSize: 10, fill: 'black'}}
            />
          </View>
        </View>
      </PinchGestureHandler>
    </GestureHandlerRootView>
  );
};

export default CandleChart;
