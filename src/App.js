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
import { Provider } from 'react-redux';
import { Router, Scene } from 'react-native-router-flux';

import StyleExtendedImportOnly from './StyleExtended'; // EStyleSheet.build.
import reducers from './rdx-reducers';
import SceneInitial from './Scenes/SceneInitial';
import SceneEmailInput from './Scenes/SceneEmailInput';
import UXdebugMain from './ZdebugUX/UXdebugMain';

class App extends Component {
  render() {
    return (
      <Provider store={createStore(reducers)}>
        <Router>
          <Scene key="root">
            <Scene key="sceneInitial" component={SceneInitial} title="Initial"   hideNavBar />
            <Scene key="debugMainUX" component={UXdebugMain} title="Ux Test" initial hideNavBar />
            <Scene key="authEmailInput" component={SceneEmailInput} title="Email Input"  hideNavBar />
          </Scene>
        </Router>
      </Provider>
    );
  }
}

export default App;
