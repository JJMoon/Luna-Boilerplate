/**
 * React Native Boilerplate by MOOON
 * github.com/JJMoon/Luna-Boilerplate.git
 *
 * src / rdx-reducers / rdxMainReducers.js
 *
 * Created by Jongwoo Moon on 2017. 6. 21..
 */

import { Dimensions, StyleSheet } from 'react-native';

const initState = {
  loggedIn: false,
  screen: { width: 10, height: 10, unit: 5 },
  baseSty: { txtTitle: null, txtNorm: null }
};

export default (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'actInit':
      const { width, height } = Dimensions.get('window');
      // 16:9 기준. 폭의 1/360.
      const ratio = (16 * (width / height)), unit = (ratio < 9 ? width / 9 : height / 16) / 360;
      console.log(`\n rdxMainReducer >${type} Screen: ${width}x${height} r:${ratio} unit : ${unit}`);

      const fontSz = { title: unit * 20, norm: unit * 14, sml: unit * 12 };

      // StyleSheet
      const baseSty = StyleSheet.create({
        txtTitle: { fontSize: fontSz.title, textAlign: 'center', margin: 2, alignSelf: 'center' },
        txtNorm: { fontSize: fontSz.norm, textAlign: 'center', margin: 2, alignSelf: 'center' },
      });
      console.log(baseSty);
      return { ...state, scr: { width, height, unit }, baseSty };
    default:
      return state;
  }
};
