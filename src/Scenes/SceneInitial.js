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
import { SideMenu } from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';
import * as actions from '../rdx-actions';
import * as C from '../Compo';
import SideMenuMain from './SideMenu';


class SceneInitial extends Component {
  constructor(props) {
    super(props);
    console.log('\n\n\n\n\n ====== ====== ====== ======  [[ SceneMain :: constructor ]] 앱 시작.....\n');
    this.props.actInit();
    this.state = {
      isOpen: false
    };
    this.toggleSideMenu = this.toggleSideMenu.bind(this)
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
    //Actions.debugMainUX();
    this.setState({ isOpen: false });
  }

  toggleSideMenu() {
    console.log(` >>>>>> toggleSideMenu() :: ${this.state.isOpen}`);
    this.setState({ isOpen: !this.state.isOpen });
  }

  onSideMenuChange(isOpen: boolean) {
    console.log(` >>>>>> onSideMenuChange() :: Force to >>> ${isOpen}`);
    this.setState({ isOpen });
  }

  ////////////////////////////////////////////////////   _//////////////////_   render
  render() {
    console.log('\n ====== ====== ====== ======  [[ SceneMain :: render ]]');
    const { baseSty } = this.props.main;
    console.log('render');

    return (
      <SideMenu
        openMenuOffset={304 * C.screenRatio}
        isOpen={this.state.isOpen}
        menuPosition={'left'}
        onChange={this.onSideMenuChange.bind(this)}
        menu={<SideMenuMain />}
      >
        {this.renderMain()}
      </SideMenu>
    );
  }

  renderMain() {
    // onPressCallback, txtSty, text, margin
    return (
      <View style={esty.mainContainer} >
        <C.StatusBar />
        {/* -------------------------  -------------------------  분리선.. ... */}
        <C.MnButton
          text={'MENU'}
          onPressCallback={this.toggleSideMenu.bind(this)}
        />

        <Text style={esty.nameText}>실제 받는 금액 비교 </Text>

      </View>
    );
  }

  // toggle() {
  //   //console.log('toggle');
  //   this.setState({
  //     isOpen: !this.state.isOpen,
  //   });
  // }

  updateMenuState(isOpen) {
    //console.log(`updateMenuState   >> isOpen ${isOpen}`);
    this.setState({ isOpen, });
  }
}

const esty = EStyleSheet.create({
  mainContainer: {
    flex: 100, width: '100%', backgroundColor: '#FFF'
  },
  topContainer: {
    flex: 0, height: '172 * $scrRt',
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
