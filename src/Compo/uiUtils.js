import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const ratio = (16 * (width / height)),
  screenRatio = (ratio < 9 ? width / 9 : height / 16) / (360 / 9);
console.log(`\n   Screen: ${width}x${height} screenRatio : ${screenRatio}`);

export { screenRatio, width, height };
