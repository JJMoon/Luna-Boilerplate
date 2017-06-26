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
<HtButton width={100} fWidth={1} ptext={'Other'}
  onPressCallback={this._bttnActOtherView.bind(this)}>
사용 example =========================================================================================
*/
//const styl = require('./HtStyles');
///-------------------------  UI Components  -------------------------  버튼..
class MnButton extends Component {
   //  {/* View -------------------------  버튼 Location  ------------------------- View */}
  render() {
    const { onPressCallback, txtSty, text, margin } = this.props;

    // margin, textAlign
    return (
      <TouchableOpacity
        style={[sty.bttnSty, { margin } ]}
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
  },
  txtSty: {
    flex: 1, textAlign: 'center', color: 'navy', fontSize: 16
  }
});

export { MnButton };
