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
//import Icon from '../ux/Icon';

const arrImg = require('../ux/icons/arrow_back.png');

class NavigateView extends Component {
  // 기본 높이 : 56

  getImgBack() {
    const { backBttnArrow = false, leftBttn = null } = this.props.opt;
    if (!backBttnArrow) return null;
    const { ratio } = this.props.opt, xy = 16 * ratio; // 24 에서 16만 이미지.
    const backSty = { flex: 0, width: xy, height: xy, margin: 24 };

    return (
      <TouchableOpacity
        onPress={leftBttn}
      >
        <Image style={backSty} source={arrImg} />
        {/* <Icon name="Tick" height="20" width="20" /> */}
      </TouchableOpacity>
    );
  }

  renderHambWithPage() {
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
    const { backBttnArrow = false, hambuger = false,
      leftBttn = null, rightBttn = null } = this.props.opt;

    if (rightBttn) {
      if (hambuger) return this.renderHambWithPage(); // H=             page
      return this.renderRightBttn();                  // <-             bttn
    }
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
