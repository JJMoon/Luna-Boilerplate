/**
 * React Native Boilerplate by MOOON
 * github.com/JJMoon/Luna-Boilerplate.git
 *
 * src / App.js
 *
 * Created by Jongwoo Moon on 2017. 6. 20..
 */

import React, { Component } from 'react';
//import { View, Text, Button } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, Scene } from 'react-native-router-flux';
import reducers from './rdx-reducers';

import SceneInitial from './Scenes/SceneInitial';
import UXdebugMain from './ZdebugUX/UXdebugMain';

class App extends Component {
  render() {
    return (
      <Provider store={createStore(reducers)}>
      <Router>
        <Scene key="root">
          <Scene key="sceneInitial" component={SceneInitial} title="Initial" initial hideNavBar />
          <Scene key="debugMainUX" component={UXdebugMain} title="Ux Test" hideNavBar />
        </Scene>
      </Router>
    </Provider>
    );
  }
}

export default App;
