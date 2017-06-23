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
import { Actions } from 'react-native-router-flux';
import * as actions from '../rdx-actions';
import * as CL from '../Compo/MnColor';
import NavigateView from '../Compo/NavigateView';

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
    const { baseSty, scr } = this.props.main;

    const spacer = <View style={{ padding: 10, backgroundColor: '#BCF' }} />;

    const opt = { backBttnArrow: true, ratio: scr.unit,
      leftBttn: Actions.pop };
    const opt2 = { backBttnArrow: true, ratio: scr.unit,
      leftBttn: () => console.log(' UXdebugMain :: opt2'),
      rightBttn: { text: '전체동의', txtSty: baseSty.txtBig,
      opt: { margin: 5, textAlign: 'left' } }
    };

    return (
        <ScrollView style={sty.scrollView} >
          <NavigateView opt={opt}/>

          <NavigateView opt={opt2}/>


          <Text style={baseSty.txtTitle}> Initial Scene X </Text>

          {spacer}

          <Button
            large
            buttonStyle={{ flex: 5, backgroundColor: CL.navy, borderRadius: 5 }}
            textStyle={{ textAlign: 'center' }}
            title={'Go to scene Email Input'}
            onPress={() => Actions.authEmailInput()}
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
    //backgroundColor: '#DFF'
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
