export default function filterCryptoDataByCategory(cryptoData, category) {
  if (category === 'gainers') {
    return cryptoData.filter(crypto => crypto.increasePercentage > 0);
  } else if (category === 'losers') {
    return cryptoData.filter(crypto => crypto.increasePercentage < 0);
  } else if (category === 'all') {
    return cryptoData;
  } else {
    throw new Error(
      "Invalid category specified. Valid categories are 'gainers', 'losers', or 'all'.",
    );
  }
}
