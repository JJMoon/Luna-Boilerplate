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
      return { ...state };
    default:
      return state;
  }
};
