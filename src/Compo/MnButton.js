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

/* Code Example
import * as C from '../Compo';
================================================================================
<C.MnButton
  txtSty={{ textAlign: 'right' }}
  text={text} margin={margin}
  onPressCallback={() => console.log('bttn click')}
  additional={() => this.setState({ viewCnt: 1 })} delay={300}
/>
================================================================================
*/

class MnButton extends Component {
  render() {
    const { txtSty, btnSty, text, margin = 0 } = this.props;

    return (
      <TouchableOpacity
        style={[sty.bttnSty, btnSty, { margin }]}
        onPress={this.pressAction.bind(this)}
      >
        <Text style={[sty.txtSty, txtSty]}>{text}</Text>
      </TouchableOpacity>
    );
  }

  pressAction() {
    const { onPressCallback, additional, delay } = this.props;
    onPressCallback();
    console.log('  additional >>> ');
    console.log(delay);
    if (additional) {
      setTimeout(() => {
        additional();
      }, delay);
    }
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
