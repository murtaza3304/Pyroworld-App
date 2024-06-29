import logo from './logo.png';
import google from './google.png';
import {crypto} from './crypto';

const getLogo = symbol => {
  return crypto[symbol];
};

export {logo, google, getLogo};
