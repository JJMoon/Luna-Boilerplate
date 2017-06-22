/**
 * React Native Boilerplate by MOOON
 * github.com/JJMoon/Luna-Boilerplate.git
 *
 * src / Scenes / SceneEmailInput.js
 *
 * Created by Jongwoo Moon on 2017. 6. 22..
 */
'use strict';

import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, LayoutAnimation,
  TouchableOpacity, ActivityIndicator } from 'react-native';
  import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actions from '../rdx-actions';
import NavigateView from '../Compo/NavigateView';
//const mdl = new M.SettingModule();

class SceneEmailInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  ////////////////////////////////////////////////////   _//////////////////_   component life cycle
  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut(); //spring();
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
    console.log('\n ====== ====== ====== ======  [[ SceneMain :: render ]]');
    const { baseSty } = this.props.main;
    console.log('render');

    // NavigateView opt
    const opt = { backBttnArrow: true };

    return (
        <View style={sty.container} >
          <NavigateView
            opt={opt}
          />
          {/* -------------------------  -------------------------  분리선.. ... */}
          <Text style={{ height: 50 }}>실제 받는 금액 비교 </Text>
          <Text style={{ height: 50 }}>실제 받는 금액 비교 </Text>
          <Text style={{ height: 50 }}>실제 받는 금액 비교 </Text>
          <Text style={{ height: 50 }}>실제 받는 금액 비교 </Text>


        </View>
    );
  }

}

const sty = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#23F'
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

const mapStateToProps = (state) => {
  return {
    main: state.main,
  };
};

export default connect(mapStateToProps, actions)(SceneEmailInput);
// connect() 에서 함수를 리턴하면 거기에 SceneConnect 를 전달함..
