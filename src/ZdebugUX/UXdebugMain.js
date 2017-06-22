/**
 * React Native Boilerplate by MOOON
 * github.com/JJMoon/Luna-Boilerplate.git
 *
 * src / ZdebugUX / UXdebugMain.js
 *
 * Created by Jongwoo Moon on 2017. 6. 21..
 */
'use strict';

import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, LayoutAnimation,
  TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import * as actions from '../rdx-actions';
import * as CL from '../Compo/MnColor';

class UXdebugMain extends Component {
  constructor(props) {
    super(props);
    console.log('\n\n\n\n\n ====== ====== ====== ======  [[ UXdebugMain  :: constructor ]]  .....\n');
    this.state = {
    };
  }

  ////////////////////////////////////////////////////   _//////////////////_   component life cycle
  componentWillUpdate() {
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
    const { baseSty } = this.props.main;

    const spacer = <View style={{ flex: 2, margin: 5 }} />;

    return (
        <ScrollView style={sty.scrollView} >
          {/* -------------------------  -------------------------  분리선.. ... */}
          {spacer}
          {spacer}

          <Text style={baseSty.txtTitle}> Initial Scene </Text>

          {spacer}

          <Button
            large
            buttonStyle={{ flex: 5, backgroundColor: CL.navy, borderRadius: 5 }}
            textStyle={{ textAlign: 'center' }}
            title={'Go to sceneLogin'}
            onPress={() => console.log(' Pressed !! ')}
          />

          {spacer}

          <Button
            icon={{ name: 'cached', size: 22 }}
            buttonStyle={{ flex: 5, backgroundColor: CL.navy, borderRadius: 5 }}
            textStyle={{ textAlign: 'center' }}
            title={'Welcome '}
            onPress={() => console.log(' Pressed !! ')}
          />
        </ScrollView>
    );
  }
}
// icon ::
const sty = StyleSheet.create({
  scrollView: {
    flex: 100,
    backgroundColor: '#DFF'
    //alignItems: 'stretch', justifyContent: 'center',
  },
});

const mapStateToProps = (state) => {
  return {
    main: state.main,
  };
};

export default connect(mapStateToProps, actions)(UXdebugMain);
// connect() 에서 함수를 리턴하면 거기에 SceneConnect 를 전달함..
