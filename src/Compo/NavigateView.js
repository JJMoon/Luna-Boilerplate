/**
 * React Native Boilerplate by MOOON
 * github.com/JJMoon/Luna-Boilerplate.git
 *
 * src / Compo / NavigateView.js
 *
 * Created by Jongwoo Moon on 2017. 6. 22..
 */
'use strict';

import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import * as CL from '../Compo/MnColor';
import StatusBar from './StatusBar';
import MnButton from './MnButton';

const arrImg = require('../ux/icons/arrow_back.png');

class NavigateView extends Component {
  // 기본 높이 : 56

  getImgBack() {
    const { backBttnArrow = false } = this.props.opt;
    if (!backBttnArrow) return null;
    const { ratio } = this.props.opt, xy = 16 * ratio; // 24 에서 16만 이미지.
    const backSty = { flex: 0, width: xy, height: xy, margin: 24 };
    return <Image style={backSty} source={arrImg} />;
  }

  // <MnButton
  //   width={100} fWidth={1} ptext={rightBttn.text}
  //   onPressCallback={() => console.log('bttn click')}
  // />



  renderRightBttn() {
    const { rightBttn, h = 56, ratio } = this.props.opt;
    const viewSty = { flex: 0, height: (h * ratio), flexDirection: 'row' };
    const { txtSty, text } = rightBttn;
    const margin = 16 * ratio;

    return (
      <View style={{ flex: 0, backgroundColor: '#FFD' }}>
        <StatusBar />
        <View style={viewSty} >
          {this.getImgBack()}
          <View style={{ flex: 100 }}>
            <MnButton
              txtSty={{ ...txtSty, textAlign: 'right' }}
              text={text} margin={margin}
              onPressCallback={() => console.log('bttn click')}
            />
          </View>
        </View>
      </View>
    );
  }

  renderSimpleWithArrow() {
    const { h = 56, ratio } = this.props.opt, xy = 16 * ratio; // 24 에서 16만 이미지.
    const viewSty = { flex: 0, height: (h * ratio), flexDirection: 'row',
      backgroundColor: '#FDF'
    };

    return (
      <View style={{ flex: 0 }}>
        <StatusBar />
        <View style={viewSty} >
          {this.getImgBack()}
        </View>
      </View>
    );
  }

  render() {
    const { backBttnArrow = false, rightBttn = null } = this.props.opt;

    if (rightBttn) return this.renderRightBttn();             // <-             bttn
    if (backBttnArrow) return this.renderSimpleWithArrow();   // <-

    return (
      <View>
        <Text>
          This is the Second View !!!
        </Text>
      </View>
    );
  }
}

const sty = StyleSheet.create({
  viewBase: {
    flexDirection: 'row',
    backgroundColor: '#DFF'
    //alignItems: 'stretch', justifyContent: 'center',
  },
});


export default NavigateView;
