/**
 * React Native Boilerplate by MOOON
 * github.com/JJMoon/Luna-Boilerplate.git
 *
 * src / rdx-reducers / index.js
 *
 * Created by Jongwoo Moon on 2017. 6. 20..
 */

import { combineReducers } from 'redux';
import rdxMainReducer from './rdxMainReducer';

export default combineReducers({
  main: rdxMainReducer

});
