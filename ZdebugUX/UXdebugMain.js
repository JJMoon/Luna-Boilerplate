/**
 * React Native Boilerplate by MOOON
 * github.com/JJMoon/Luna-Boilerplate.git
 *
 * src / ZdebugUX / UXdebugMain.js
 *
 * Created by Jongwoo Moon on 2017. 6. 21..
 */
'use strict';

import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, LayoutAnimation,
  TouchableOpacity, ActivityIndicator, Scroll } from 'react-native';

class UXdebugMain extends Component {
  constructor(props) {
    super(props);
    console.log('\n\n\n\n\n ====== ====== ====== ======  [[ UXdebugMain  :: constructor ]]  .....\n');
    this.state = {
    };
  }

  ////////////////////////////////////////////////////   _//////////////////_   component life cycle
  componentWillUpdate() {
  }

  componentWillMount() {
    console.log('\n ====== ====== ====== ======  [[ SceneMain :: componentWillMount ]]');
  }

  componentWillUnmount() {
    console.log('\n\n\n\n\n ====== ====== ====== ======  [[ SceneMain :: unmount ]] ...\n');
  }

  componentDidMount() {
  }

  ////////////////////////////////////////////////////   _//////////////////_   render
  render() {
    return (
        <ScrollView style={sty.scrollView} >
          {/* -------------------------  -------------------------  분리선.. ... */}


          <Text> Initial Scene </Text>

        </ScrollView>


    );
  }
}

const sty = StyleSheet.create({
  scrollView: {
    flex: 100,
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#FFF0'
  },
  backgroundImage: {
    alignItems: 'stretch', justifyContent: 'center', margin: 0, marginTop: 0,
    flex: 1, alignSelf: 'stretch', width: null, height: null,
    resizeMode: 'stretch', // or 'stretch'
  },
  bottom3button: {
    flex: 5, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center',
    marginHorizontal: 20
  },
  rowContainer: { flexDirection: 'row', alignSelf: 'stretch' },
  seperateLine: { height: 2, backgroundColor: '#AAAAAA' },
  bttnView: { flex: 3, alignItems: 'center' },
});

export default UXdebugMain;
// connect() 에서 함수를 리턴하면 거기에 SceneConnect 를 전달함..
