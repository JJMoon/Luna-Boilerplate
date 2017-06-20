/**
 * React Native Boilerplate by MOOON
 * github.com/JJMoon/Luna-Boilerplate.git
 *
 * src / AppWithNavigator.js
 *
 * Created by Jongwoo Moon on 2017. 6. 20..
 */

import { StackNavigator } from 'react-navigation';
import App from './App';
import SecondView from './Compo/SecondView';

const AppWithNavigator = StackNavigator({
  Home: { screen: App },
  SecVw: { screen: SecondView }
});

export default AppWithNavigator;
