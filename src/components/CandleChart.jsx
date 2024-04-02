import { View } from 'react-native';
import WebView from 'react-native-webview';



const ifUri = `<iframe style="background-color:transparent"  width="100%" height="100%" src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_9a971&symbol=${'PANCAKESWAP:BKPTWBNB_C57997'}&interval=D&range=YTD&hidelegend=1&hidesidetoolbar=1&symboledit=1&saveimage=1&toolbarbg=f1f3f6&studies=%5B%5D&theme=dark&style=1&timezone=Etc%2FUTC&withdateranges=1&showpopupbutton=1&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&showpopupbutton=1&locale=en&utm_source=crypto-vest-test.netlify.app&utm_medium=widget&utm_campaign=chart&utm_term=BTCUSDT#%7B%22page-uri%22%3A%22crypto-vest-test.netlify.app%2Fdashboard%2Ftrade%2Fbtc%22%7D" frameborder="0"></iframe>`;

// const data = [
//   {
//     timestamp: 1625945400000,
//     open: 33575.25,
//     high: 33600.52,
//     low: 33475.12,
//     close: 33520.11,
//   },
//   {
//     timestamp: 1625946300000,
//     open: 33545.25,
//     high: 33560.52,
//     low: 33510.12,
//     close: 33520.11,
//   },
//   {
//     timestamp: 1625947200000,
//     open: 33510.25,
//     high: 33515.52,
//     low: 33250.12,
//     close: 33250.11,
//   },
//   {
//     timestamp: 1625948100000,
//     open: 33215.25,
//     high: 33430.52,
//     low: 33215.12,
//     close: 33420.11,
//   },
// ];

function CandleChart() {
  return (
    // <CandlestickChart.Provider data={data}>
    //   <CandlestickChart>
    //     <CandlestickChart.Candles />
    //   </CandlestickChart>
    // </CandlestickChart.Provider>
    <View
            style={{
              marginTop: 15,
              width: '100%',
              height: 200,
            }}>
            <WebView
              setBuiltInZoomControls={true}
              style={{
                backgroundColor: 'transparent',
              }}
              originWhitelist={['*']}
              javaScriptEnabled={true}
              source={{
                html: ifUri,
              }}
              textZoom={170}
              // scalesPageToFit={true}
              // setDisplayZoomControls={true}
            />
          </View>
  );
}
export default CandleChart;
