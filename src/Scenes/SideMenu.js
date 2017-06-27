/**
 * React Native Boilerplate by MOOON
 * github.com/JJMoon/Luna-Boilerplate.git
 *
 * src / SideMenu.js
 *
 * Created by Jongwoo Moon on 2017. 6. 27..
 */
'use strict';

import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import * as C from '../Compo';

const avatar = require('../ux/icons/img_profile.png');

class SideMenuMain extends Component {

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
    return (
      <View style={esty.mainContainer} >
        <View style={esty.topContainer} >
          <View style={esty.avatarView} >
            <Image style={esty.imgAvatar} source={avatar} />
            <Text style={esty.nameText}>Name & 이름</Text>
          </View>

          <Text style={esty.emailText}>abcdefg.dk@email.com</Text>


        </View>

        <View style={{ flex: 10, backgroundColor: '#CCC' }} />
      </View>
    );
  }
}

const esty = EStyleSheet.create({
  mainContainer: {
    flex: 100, width: '100%', backgroundColor: '#FFF'
  },
  topContainer: {
    flex: 0, height: '172 * $scrRt',
    backgroundColor: '$pale_gray'
  },
  avatarView: {
    flex: 0, flexDirection: 'row', marginTop: '62 * $scrRt'
  },
  imgAvatar: {
    width: '48 * $scrRt', height: '48 * $scrRt',
    marginLeft: '17 * $scrRt', marginRight: '11 * $scrRt'
  },
  nameText: {
    fontSize: '$fontSzTitle', alignSelf: 'center',
    color: '$navy', textAlign: 'left',
  },
  emailText: {
    fontSize: '$fntNrm', marginTop: '28 * $scrRt', marginLeft: '16 * $scrRt',
    color: '$bluey_gray', textAlign: 'left'
  },
});

export default SideMenuMain;
