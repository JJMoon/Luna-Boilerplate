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
import SelfNaviCompo from '../ZdebugUX/AniView';

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
    setTimeout(() => {
      this.refs.rtxt001.measure((fx, fy, width, height, px, py) => {
        console.log(`${py} + ${height}`);
        this.refs.ani01.startShowUp(py + height);
      });
    }, 500);
  }

  renderMain() {
    // onPressCallback={this.toggleSideMenu.bind(this)}

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


        <Text ref="rtxt001" style={esty.nameText}>실제 받는 금액 비교 </Text>

        <SelfNaviCompo />



        <C.AniNaviView
          ref="ani01"
          content={<Text style={esty.nameText}> Swipe </Text>}

          refCompo={this.refs.rtxt001}
          top={400}

        />

        {console.log(' end of render')}

        <View style={{ flex: 30 }} />

      </View>
    );
  }

  render() {
    return (<CU.MnSideMenu main={this.renderMain()} />);
  }
}

const esty = EStyleSheet.create({
  mainContainer: {
    flex: 100, width: '100%', backgroundColor: '#FAF'
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
// connect() 에서 함수를 리턴하면 거기에 SceneConnect 를 전달함..
