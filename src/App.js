/**
 * React Native Boilerplate by MOOON
 * github.com/JJMoon/Luna-Boilerplate.git
 *
 * src / App.js
 *
 * Created by Jongwoo Moon on 2017. 6. 20..
 */

import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
// import { NavigationActions } from 'react-navigation';
// import SecondView from './Compo/SecondView';

class App extends Component {
  static navigationOptions = {
    title: 'Welcome'
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>
          Initial Setting
        </Text>
        <Button
          onPress={() => navigate('SecVw' )}
          title="Let's go to Second view title... ? "
        />
      </View>
    );
  }
}

export default App;
