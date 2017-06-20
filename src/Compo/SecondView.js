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
  static navigationOptions = ({ navigation }) => ({
    title: ` This is from <${navigation.state.params.txt}>`
  });
  render() {
    const { params } = this.props.navigation.state;
    return (
      <View>
        <Text>
          This is the Second View !!! {params.txt}
        </Text>
      </View>
    );
  }
}

export default SecondView;
