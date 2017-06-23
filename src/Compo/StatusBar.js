/**
 * React Native Boilerplate by MOOON
 * github.com/JJMoon/Luna-Boilerplate.git
 *
 * src / Compo / StatusBar.js
 *
 * Created by Jongwoo Moon on 2017. 6. 22..
 */

import React, { Component } from 'react';
import { View, Platform, StyleSheet } from 'react-native';

class StatusBar extends Component {
  renderIosBar() {
    return (
      <View
        style={{ flex: 0, height: 20, backgroundColor: 'white' }}
      />
    );
  }

  render() {
    if (Platform.OS === 'ios') {
      return this.renderIosBar();
    }
    return null;
  }
}

export default StatusBar;
