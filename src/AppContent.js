/**
 * React Native Boilerplate by MOOON
 * github.com/JJMoon/Luna-Boilerplate.git
 *
 * src / App.js
 *
 * Created by Jongwoo Moon on 2017. 6. 20..
 */

import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { connect } from 'react-redux';
import { Router, Scene } from 'react-native-router-flux';
import { SideMenu } from 'react-native-elements';
import * as actions from './rdx-actions';
import reducers from './rdx-reducers';
import SceneInitial from './Scenes/SceneInitial';
import SceneEmailInput from './Scenes/SceneEmailInput';
import UXdebugMain from './ZdebugUX/UXdebugMain';
import SideMenuMain from './Scenes/SideMenuMain';
import * as C from './Compo';

class AppContent extends Component {
  constructor(props) {
    super(props);
    //this.state = {  isOpen: false};

    //this.props.actSetSideMenu(this.toggleSideMenu);
    //this.toggleSideMenu = this.toggleSideMenu.bind(this)
  }

  // toggleSideMenu() {
  //   console.log(` >>>>>> toggleSideMenu() :: ${this.state}`);
  //   this.setState({ isOpen: !this.state.isOpen });
  // }
  //
  // onSideMenuChange(isOpen: boolean) {
  //   console.log(` >>>>>> onSideMenuChange() :: Force to >>> ${isOpen}`);
  //   this.setState({ isOpen });
  // }
  renderRouter() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="sceneInitial" component={SceneInitial} title="Initial" initial hideNavBar />
          <Scene key="debugMainUX" component={UXdebugMain} title="Ux Test" hideNavBar />
          <Scene key="authEmailInput" component={SceneEmailInput} title="Email Input" hideNavBar />
        </Scene>
      </Router>
    );
  }

  render() {
    console.log('  App Content :: render ');
    const { isSideMenuOpen, sceneSetup } = this.props.main;
    let scenes = null;
    if (!sceneSetup) {
      scenes = this.renderRouter();
      this.props.setScenes();
    }
    return (
      <SideMenu
        isOpen={isSideMenuOpen}
        onChange={this.props.changeSideMenu.bind(this)}
        menu={SideMenuMain}
      >
        {this.renderRouter()}
      </SideMenu>

    );
  }
}


const mapStateToProps = (state) => {
  return {
    main: state.main,
  };
};

export default connect(mapStateToProps, actions)(AppContent);

//export default AppContent;
