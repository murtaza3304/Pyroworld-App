import React, {useState, useEffect} from 'react';
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
    for (let i = 0; i < 10; i++) {
      // Generate random values within wider ranges
      const open = randomInRange(10, 100); // wider range
      const high = randomInRange(open, 100); // wider range
      const low = randomInRange(0, open); // wider range
      const close = randomInRange(low, high);
      randomData.push({value: [open, high, low, close]});
    }
    return randomData;
  };
  console.log(generateRandomData());

  const [data, setData] = useState([
    {value: [18, 94, 17, 89]},
    {value: [40, 47, 23, 39]},
    {value: [21, 72, 20, 71]},
    {value: [58, 65, 22, 24]},
    {value: [34, 75, 18, 41]},
    {value: [66, 78, 50, 68]},
    {value: [65, 78, 5, 22]},
    {value: [82, 96, 21, 50]},
    {value: [74, 86, 55, 58]},
    {value: [45, 91, 45, 91]},
  ]);
  const [scale, setScale] = useState(1);
  const [chartHeight, setChartHeight] = useState(200); // Initial height
  const [selectedCandle, setSelectedCandle] = useState(); // Initial height

  useEffect(() => {
    const calculateChartHeight = () => {
      // Find the highest and lowest points on the chart
      const lowestPrice = Math.min(...data.map(item => item.value[2]));
      const highestPrice = Math.max(...data.map(item => item.value[1]));

      // Calculate the height based on the price range
      const priceRange = highestPrice - lowestPrice;
      const minHeight = 200; // Minimum height for the chart
      const maxHeight = 200; // Maximum height for the chart
      const newHeight =
        minHeight + (maxHeight - minHeight) * (priceRange / 300); // Adjust 300 according to your preference

      // Update the chart height
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
    const candleWidth = 10 * scale; // Adjust width based on scale
    const spaceBetweenCandles = 15 * scale; // Adjust spacing based on scale

    const handleCandlePress = index => {
      if (onCandlePress) {
        onCandlePress(data[index]);
      }
    };

    const chartWidth = data.length * spaceBetweenCandles; // Calculate total chart width

    return (
      <ScrollView
        horizontal
        onScrollEndDrag={() => onCandlePress(null)} // Reset selected candle when the user finishes dragging
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
          <View style={{height: chartHeight, flexDirection: 'row'}}>
            <YAxis
              data={data.flatMap(item => item.value)} // Flatten the data array to get all values
              contentInset={{top: 20, bottom: 20}}
              svg={{fontSize: 10, fill: 'grey'}}
              numberOfTicks={5}
              formatLabel={value => `${value}`}
            />
            <View style={{flex: 1, marginLeft: 10}}>
              <Candlestick data={data} onCandlePress={setSelectedCandle} />
            </View>
          </View>
          <View
            style={{
              height: '40%',
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
