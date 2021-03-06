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
import { View, Text, Image, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import * as C from '../Compo';

const arrImg = require('../ux/icons/arrow_back.png');

class NavigateView extends Component {
  // 기본 높이 : 56

  getImgBack() {
    const { backBttnArrow = false, leftBttn = null } = this.props.opt;
    if (!backBttnArrow) return null;
    return (
      <TouchableOpacity
        onPress={leftBttn}
      >
        <Image style={esty.imgBack} source={arrImg} />
      </TouchableOpacity>
    );
  }

  renderHambWithPage() {
    const { h = 56, rightBttn } = this.props.opt, height = (h * C.screenRatio);
    const { text } = rightBttn;
    const margin = 16 * C.screenRatio;

    return (
      <View style={{ flex: 0, backgroundColor: '#FFD' }}>
        <C.StatusBar />
        <View style={[esty.contentContainer, { height }]}>
          {this.getImgBack()}
          <View style={{ flex: 100 }}>
            <C.MnButton
              txtSty={{ textAlign: 'right' }}
              text={text} margin={margin}
              onPressCallback={() => console.log('bttn click')}
            />
          </View>
        </View>
      </View>
    );
  }

  renderRightBttn() {
    const { h = 56, rightBttn } = this.props.opt,
      { text } = rightBttn,
      height = (h * C.screenRatio);
    return (
      <View style={{ flex: 0, backgroundColor: '#FFD' }}>
        <C.StatusBar />
        <View style={[esty.contentContainer, { height }]}>
          {this.getImgBack()}
          <View style={{ flex: 100 }}>
            <C.MnButton
              txtSty={esty.rightBttnTxt}
              text={text} margin={0}
              onPressCallback={() => console.log('bttn click')}
            />
          </View>
        </View>
      </View>
    );
  }

  renderSimpleWithArrow() {
    const { h = 56 } = this.props.opt,
      height = (h * C.screenRatio);

    return (
      <View style={{ flex: 0 }}>
        <C.StatusBar />
        <View style={[esty.contentContainer, { height }]}>

          {this.getImgBack()}

        </View>
      </View>
    );
  }

  render() {
    const { backBttnArrow = false, hambuger = false,
      rightBttn = null } = this.props.opt;

    if (rightBttn) {
      if (hambuger) return this.renderHambWithPage(); // H=             page
      return this.renderRightBttn();                  // <-             bttn
    }
    if (backBttnArrow) return this.renderSimpleWithArrow();   // <-
    return null;
  }
}

const esty = EStyleSheet.create({
  contentContainer: {
    flex: 0, flexDirection: 'row', backgroundColor: '#FDF'
  },
  imgBack: {
    width: '16 * $scrRt', height: '16 * $scrRt',
    flex: 0, margin: '20 * $scrRt'
  },
  rightBttnTxt: { // 20 16 20
    fontSize: '$fontSzBig', padding: '20 * $scrRt',
    color: '$navy', textAlign: 'right',
  },
});

export { NavigateView };
