/**
 * React Native Boilerplate by MOOON
 * github.com/JJMoon/Luna-Boilerplate.git
 *
 * src / rdx-reducers / rdxMainReducers.js
 *
 * Created by Jongwoo Moon on 2017. 6. 21..
 */

import { Dimensions } from 'react-native';

const initState = {
  loggedIn: false,
  screen: { width: 10, height: 10, unit: 5 },
};

export default (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'actInit':
      const { width, height } = Dimensions.get('window');
      // 16:9 기준. 폭의 1/360.
      const unit = ((16 * (width / height)) < 9 ? width / 9 : height / 16) / 360;
      console.log(`\n rdxMainReducer ${type} Screen : ${width} X ${height} unit : ${unit}`);
      return { ...state, scr: { width, height, unit } };
    default:
      return state;
  }
};
