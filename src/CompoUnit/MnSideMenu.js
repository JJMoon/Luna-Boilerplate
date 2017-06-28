/**
 * React Native Boilerplate by MOOON
 * github.com/JJMoon/Luna-Boilerplate.git
 *
 * src / SceneBase.js
 *
 * Created by Jongwoo Moon on 2017. 6. 28..
 */
'use strict';

import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, LayoutAnimation,
  TouchableOpacity, ActivityIndicator } from 'react-native';
//import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { SideMenu } from 'react-native-elements';
import * as actions from '../rdx-actions';
import * as C from '../Compo';
import SideMenuMain from '../Scenes/SideMenuMain';

class MnSideMenu extends Component {
  render() {
    const { isSideMenuOpen } = this.props.sideMenu;
    return (
      <SideMenu
        openMenuOffset={304 * C.screenRatio}
        menuPosition={'left'}
        isOpen={isSideMenuOpen}
        onChange={this.props.changeSideMenu}
        menu={<SideMenuMain />}
      >
        {this.props.main}
      </SideMenu>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    sideMenu: state.sideMenu
  };
};

// const MnSideMenu = connect(mapStateToProps, actions)(TheSideMenu);
// export { MnSideMenu };

export default connect(mapStateToProps, actions)(MnSideMenu);
