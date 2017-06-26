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
import { View, StyleSheet, Text, PixelRatio, LayoutAnimation,
  TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import EStyleSheet from 'react-native-extended-stylesheet';

import { base } from '../Styles/Base';
import * as actions from '../rdx-actions';
import * as CL from '../Compo/MnColor';
import NavigateView from '../CompoUnit/NavigateView';

class UXdebugMain extends Component {
  constructor(props) {
    super(props);
    console.log('\n\n\n\n\n ====== ====== ====== ======  [[ UXdebugMain  :: constructor ]]  .....\n');
    console.log(`   PixelRatio :: ${PixelRatio.get()}`);
    this.state = {
    };
  }

  ////////////////////////////////////////////////////   _//////////////////_   component life cycle
  componentWillUpdate() {
  }

  componentWillMount() {
    console.log('\n ====== ====== ====== ======  [[ UXdebugMain :: componentWillMount ]]');
  }

  componentWillUnmount() {
    console.log('\n\n\n\n\n ====== ====== ====== ======  [[ UXdebugMain :: unmount ]] ...\n');
  }

  componentDidMount() {
  }

  ////////////////////////////////////////////////////   _//////////////////_   render
  render() {
    const { scr } = this.props.main;

    const spacer = <View style={{ padding: 10, backgroundColor: '#BCF' }} />;

    const opt = { backBttnArrow: true, ratio: scr.unit,
      leftBttn: Actions.pop };
    const opt2 = { backBttnArrow: true, ratio: scr.unit,
      leftBttn: () => console.log(' UXdebugMain :: opt2'),
      rightBttn: { text: '전체동의', txtSty: { fontSize: 12 },
      opt: { margin: 5, textAlign: 'left' } }
    };

    return (
        <ScrollView style={esty.scrll} >
          <NavigateView opt={opt}/>

          <NavigateView opt={opt2}/>


          <Text style={esty.titleSty}> Initial Scene X </Text>

          {spacer}

          <View style={esty.rowCont}>
            <View style={{ flex: 0, width: '30%', backgroundColor: 'rgb(100,0,13)' }} />
            <View style={{ flex: 0, width: '10%', backgroundColor: '#589' }} />
            <View style={{ flex: 0, width: '58%', backgroundColor: '#D45' }} />

          </View>

          <Button
            large
            buttonStyle={{ flex: 5, backgroundColor: CL.navy, borderRadius: 5 }}
            textStyle={{ textAlign: 'center' }}
            title={'Go to scene Email Input'}
            onPress={() => Actions.authEmailInput()}
          />

          {spacer}




          <View style={base.separator} />

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

const esty = EStyleSheet.create({
  scrll: { flex: 10 },
  rowCont: { flex: 1, flexDirection: 'row' },
  txtx: {
    fontSize: '$fontSzBig'
  },
  titleSty: {
    fontSize: '$fontSzTitle', color: '$navy'
  },

});

const mapStateToProps = (state) => {
  return {
    main: state.main,
  };
};

export default connect(mapStateToProps, actions)(UXdebugMain);
// connect() 에서 함수를 리턴하면 거기에 SceneConnect 를 전달함..
