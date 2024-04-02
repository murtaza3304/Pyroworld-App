import logo from './logo.png';
import {crypto} from './crypto';

const getLogo = symbol => {
  return crypto[symbol];
};

export {logo, getLogo};
