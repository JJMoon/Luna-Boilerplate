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
  WebView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';

import * as actions from '../rdx-actions';
import * as C from '../Compo';
import * as CU from '../CompoUnit';
import { genFunctionObj, genFunctionOfRef } from '../Util';

const webVwContent = require('../WebviewContent/index.html');;

class SceneInitial extends Component {
  constructor(props) {
    super(props);
    console.log('\n\n\n\n\n ====== ====== ====== ======  [[ SceneMain :: constructor ]] 앱 시작.....\n');
    this.props.actInit();
    this.state = { viewCnt: 0 };
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
  }

  additional() {
    console.log('additional');
    this.setState({ viewCnt: 1 });
  }

  getAniView(cnt) {
    switch (cnt) {
      case 0:
        return (<C.AniNaviView
          key="1"
          ref="ani01" refObj={this.refs.rtxt001}
          content={
            <C.MnButton
              text={'.. Disappear ..'}
              onPressCallback={genFunctionObj(this.refs.ani01, 'disappear')}
              additional={() => this.setState({ viewCnt: 1 })} delay={300}
            />
          }
        />);
      case 1:
        return (<C.AniNaviView
          key="3"
          ref="ani02" refObj={this.refs.rtxt001}
          content={
            <C.MnButton
              text={'.. Disappear 2 ..'}
              onPressCallback={genFunctionOfRef(this, 'disappear', 'ani02')}
              additional={() => this.setState({ viewCnt: 2 })} delay={300}
            />
          }
        />);
      default:
        return (<C.AniNaviView
          key="2"
          ref="ani03" refObj={this.refs.rtxt001}
          content={
            <C.MnButton
              text={'.. Second View ..'}
              onPressCallback={genFunctionOfRef(this, 'disappear', 'ani03')}
              additional={null}
            />
          }
        />);
    }
  }

  renderMain() {
    const { viewCnt } = this.state;

    // {this.getAniView(viewCnt)}

    return (
      <View style={esty.mainContainer} >

        <View style={{ flex: 1 }} />
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





      </View>
    );
  }

  renderWebView() {
    return (
      <View style={esty.mainContainer} >

        <View style={{ flex: 1, backgroundColor: '#9EF' }} />
        <View style={{ flex: 30 }}>
          <WebView
            source={webVwContent}

          />
        </View>
      </View>
    );
  } // source={{ uri: 'https://github.com/facebook/react-native' }}

  render() {
    return (<CU.MnSideMenu main={this.renderWebView()} />);
  }
}

const esty = EStyleSheet.create({
  mainContainer: {
    flex: 1, width: '100%', backgroundColor: '#FFF'
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
