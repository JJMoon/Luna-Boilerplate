import EStyleSheet from 'react-native-extended-stylesheet';

import * as C from './Compo';

EStyleSheet.build({
  // Screen Props
  $fullWid: C.width, $fullHgt: C.height, $halfWid: 0.5 * C.width,
  $scrRt: C.screenRatio,
  $fntTtl: 20, $fntBig: 16, $fntNrm: 14, $fntSml: 12,
  $fontSzTitle: '$fntTtl * $scrRt', $fontSzBig: '$fntBig * $scrRt',
  $fontSzNorm: '$fntNrm * $scrRt', $fontSzSml: '$fntSml * $scrRt',

  // Color
  $white: '#fff', $navy: '#292767', $bluey_gray: '#a0a7b8',
  $facebook: '#4262a3', $leafy_green: '#56bc37',
  $purple: '#5451a6', $pale_gray: '#e5e7ec',
  $sky_blue: '#22b1dd', $border: '#dbdbdb',
});
