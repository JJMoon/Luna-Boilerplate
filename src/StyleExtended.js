import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const { width, height } = Dimensions.get('window');
const ratio = (16 * (width / height)),
  screenRatio = (ratio < 9 ? width / 9 : height / 16) / (360 / 9);
console.log(`\n   Screen: ${width}x${height} screenRatio : ${screenRatio}`);

const fntSz = { ttl: 20, big: 16, norm: 14, sml: 12 };

const baseTxt = { flex: 1, textAlign: 'center', color: 'navy' };

EStyleSheet.build({
  // Screen Props
  $fullWid: width, $fullHgt: height, $halfWid: 0.5 * width,
  $scrRt: screenRatio,
  $fontSzTitle: fntSz.ttl * '$scrRt', //big: unit * 16, norm: unit * 14, sml: unit * 12 };
  $fontSzBig: fntSz.big * '$scrRt',

  // Styles
  $txtBig: { ...baseTxt, fontSize: fntSz.big },
  $white: '#fff',
  $navy: '#292767',
  $bluey_gray: '#a0a7b8',
  $facebook: '#4262a3',
  $leafy_green: '#56bc37',
  $purple: '#5451a6',
  $pale_gray: '#e5e7ec',
  $sky_blue: '#22b1dd',
  $border: '#dbdbdb',
});
