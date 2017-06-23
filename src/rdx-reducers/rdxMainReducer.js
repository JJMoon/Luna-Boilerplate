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
  scr: { width: 10, height: 10, unit: 5 },
  baseSty: { txtTitle: null, txtNorm: null }
};

export default (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'actInit':
      const { width, height } = Dimensions.get('window');
      // 16:9 기준. 폭의 1/360.
      const ratio = (16 * (width / height)), unit = (ratio < 9 ? width / 9 : height / 16) / (360 / 9);
      console.log(`\n rdxMainReducer >${type} Screen: ${width}x${height} r:${ratio} unit : ${unit}`);

      // StyleSheet
      const fontSz = { title: unit * 20, big: unit * 16, norm: unit * 14, sml: unit * 12 };
      const txtBase = { flex: 1, textAlign: 'center', color: 'navy' };
      //const baseSty = StyleSheet.create({
      const baseSty = {
        txtTitle: { ...txtBase, fontSize: fontSz.title, margin: 2 },
        txtBig: { ...txtBase, fontSize: fontSz.big, margin: 2 },
        txtNorm: { ...txtBase, fontSize: fontSz.norm, margin: 2 },
        txtSml: { ...txtBase, fontSize: fontSz.sml },
      };
      return { ...state, scr: { width, height, unit }, baseSty };
    default:
      return state;
  }
};
