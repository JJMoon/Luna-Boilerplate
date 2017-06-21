/**
 * React Native Boilerplate by MOOON
 * github.com/JJMoon/Luna-Boilerplate.git
 *
 * src / Scenes / sceneInitial.js
 *
 * Created by Jongwoo Moon on 2017. 6. 21..
 */
'use strict';

import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, LayoutAnimation,
  TouchableOpacity, ActivityIndicator } from 'react-native';
  import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actions from '../rdx-actions';
//const mdl = new M.SettingModule();

class SceneInitial extends Component {
  constructor(props) {
    super(props);
    console.log('\n\n\n\n\n ====== ====== ====== ======  [[ SceneMain :: constructor ]] 앱 시작.....\n');
    this.props.actInit();
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
    Actions.debugMainUX();
  }

  ////////////////////////////////////////////////////   _//////////////////_   render
  render() {
    console.log('\n ====== ====== ====== ======  [[ SceneMain :: render ]]');
    const { baseSty } = this.props.main;
    console.log('render');
    return (

        <View style={sty.container} >
          <View style={{ flex: 1 }} />
          {/* -------------------------  -------------------------  분리선.. ... */}
          <Text style={baseSty.txtTitle}>실제 받는 금액 비교 </Text>
          <Text style={baseSty.txtNorm}> baseSty.txtNorm </Text>
          <Text style={baseSty.txtSml}> 폰트 Size : 12 글자임... </Text>
          <Text style={baseSty.txtNorm}> Norm  text ::  fontSize : 14 </Text>
          <Text style={baseSty.txtSml}> baseSty.txtSml </Text>
          <Text style={baseSty.txtSml}> baseSty.txtSml </Text>
          <Text style={baseSty.txtSml}> baseSty.txtSml </Text>
        </View>
    );
  }

  toggle() {
    //console.log('toggle');
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  updateMenuState(isOpen) {
    //console.log(`updateMenuState   >> isOpen ${isOpen}`);
    this.setState({ isOpen, });
  }
}

const sty = StyleSheet.create({
  container: {
    flex: 100, alignItems: 'stretch',
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

const mapStateToProps = (state) => {
  return {
    main: state.main,
  };
};

export default connect(mapStateToProps, actions)(SceneInitial);
// connect() 에서 함수를 리턴하면 거기에 SceneConnect 를 전달함..
