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
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

/*
사용 example =========================================================================================
import * as C from '../Compo';
<C.MnButton
  txtSty={{ textAlign: 'right' }}
  text={text} margin={margin}
  onPressCallback={() => console.log('bttn click')}
/>
=========================================================================================
*/

class MnButton extends Component {
  render() {
    const { txtSty, btnSty, text, margin = 0, onPressCallback } = this.props;

    return (
      <TouchableOpacity
        style={[sty.bttnSty, btnSty, { margin }]}
        onPress={onPressCallback}
      >
        <Text style={[sty.txtSty, txtSty]}>{text}</Text>
      </TouchableOpacity>
    );
  }
}

///-------------------------   -------------------------     ### custom style ###
const sty = StyleSheet.create({
  bttnSty: {
    flex: 1, // alignItems: 'stretch' // backgroundColor: '#999'
    backgroundColor: '#9F9'

  },
  txtSty: {
    flex: 1, textAlign: 'center', color: 'navy', fontSize: 16
  }
});

export { MnButton };
