import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import {View, Text, Dimensions} from 'react-native';
import {useTheme} from '../../assets/theme/Theme';

export default function Chart({width, height, nature, layout}) {
  const theme = useTheme();
  return (
    <View
      style={{
        ...theme.flex.row,
        width: width,
        height: height,
        marginBottom: 0,
        marginRight:20
      }}>
      <LineChart
        data={{
          datasets: [
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
              ],
            },
          ],
        }}
        width={layout ? width * 1.7 : width*1.2}
        withInnerLines={false} // from react-native
        withOuterLines={false}
        transparent={true}
        height={height}
        strokeWidth={2}
        withShadow={layout&&false}
        chartConfig={{
          color: (opacity = 1) =>
            `${nature === 'high' ? theme.green : theme.red}`,
          style: {
            borderRadius: 16,
            margin: 0,
            padding: 0,
          },
          propsForDots: {
            r: '0',
          },
          propsForLabels: {
            display: 'none',
          },
          strokeWidth: 3,
        }}
        bezier
        style={{
          borderRadius: 16,
          marginRight: 50,
        }}
      />
    </View>
  );
}
