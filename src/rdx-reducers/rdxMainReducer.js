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
  loggedIn: true,
  isSideMenuOpen: false,
  scr: { width: 10, height: 10, unit: 5 },
  baseSty: { txtTitle: null, txtNorm: null }
};

export default (state = initState, action) => {
  const { type, payload } = action;
  const { isSideMenuOpen } = state;

  console.log(`  reducer :: ${type}`);

  switch (type) {
    case 'actInit':
      return { ...state };
    case 'toggleSideMenu':
      console.log(`    toggleSideMenu ${isSideMenuOpen}`);
      return { ...state, isSideMenuOpen: !isSideMenuOpen };
    case 'changeSideMenu':
      return { ...state, isSideMenuOpen: payload };
    default:
      return state;
  }
};
