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
import EStyleSheet from 'react-native-extended-stylesheet';

import * as actions from '../rdx-actions';
import * as C from '../Compo';
import * as CU from '../CompoUnit';
import { genFunctionObj } from '../Util';

class SceneInitial extends Component {
  constructor(props) {
    super(props);
    console.log('\n\n\n\n\n ====== ====== ====== ======  [[ SceneMain :: constructor ]] 앱 시작.....\n');
    this.props.actInit();
    //this.state = { cnt: 0 };
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
    console.log('\n ====== ====== ====== ======  [[ SceneInitial :: componentDidMount ]]');
    this.setState({ isOpen: false });
    // setTimeout(() => {
    //   this.refs.rtxt001.measure((fx, fy, width, height, px, py) => {
    //     this.refs.ani01.startShowUp(py + height);
    //   });
    // }, 500);
  }

  renderMain() {
    return (
      <View style={esty.mainContainer} >

        <View style={{ flex: 3 }} />
        {/* -------------------------  -------------------------  분리선.. ... */}
        <C.MnButton
          text={'MENU'}
          onPressCallback={this.props.toggleSideMenu}
        />
        <C.MnButton
          text={'>> UI TEST Scene'}
          onPressCallback={Actions.debugMainUX}
        />
        
        <Text ref="rtxt001" style={esty.nameText}> 이름 텍스트 스타일 </Text>

        <View style={{ flex: 20 }} />

        <C.AniNaviView
          ref="ani01" refObj={this.refs.rtxt001}
          content={
            <C.MnButton
              text={'.. Disappear ..'}
              onPressCallback={genFunctionObj(this.refs.ani01, 'disappear')}
            />
          }
        />

      </View>
    );
  }

  render() {
    return (<CU.MnSideMenu main={this.renderMain()} />);
  }
}

const esty = EStyleSheet.create({
  mainContainer: {
    flex: 100, width: '100%', backgroundColor: '#FFF'
  },
  topContainer: {
    flex: 1, height: '172 * $scrRt',
    backgroundColor: '$pale_gray'
  },
  nameText: {
    flex: 1, fontSize: '$fontSzTitle', padding: '10 * $scrRt',
    color: '$navy', textAlign: 'center',
  },

});

const mapStateToProps = (state) => {
  return {
    main: state.main,
  };
};

export default connect(mapStateToProps, actions)(SceneInitial);
