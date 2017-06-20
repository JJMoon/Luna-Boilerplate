/**
 * React Native Boilerplate by MOOON
 * github.com/JJMoon/Luna-Boilerplate.git
 *
 * src / Compo / SecondView.js
 *
 * Created by Jongwoo Moon on 2017. 6. 20..
 */

import React, { Component } from 'react';
import { View, Text } from 'react-native';

class SecondView extends Component {
  static navigationOptions = {
    title: 'Second View'
  };
  render() {
    return (
      <View>
        <Text>
          This is the Second View !!!
        </Text>
      </View>
    );
  }
}

export default SecondView;
