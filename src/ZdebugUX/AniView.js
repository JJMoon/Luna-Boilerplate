import React, { Component } from 'react';
import {
  View, Animated, Text, PanResponder, Dimensions,
  LayoutAnimation, UIManager
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import * as C from '../Compo';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_DURATION = 2000; //250;

class SelfNaviCompo extends Component {
  constructor(props) {
    super(props);

    this.state = {
        poX: new Animated.Value(SCREEN_WIDTH),
        fadeAnim: new Animated.Value(0), // 0 : invisible.
      };
  }

  componentDidMount() {
    console.log('  Deck :: componentDidMount');
    this.startAnimation(0, 1);
  }

  startAnimation(tarX, tarOpa) {
    Animated.timing(this.state.poX,
      { toValue: tarX, duration: SWIPE_DURATION }
    ).start();
    Animated.timing(this.state.fadeAnim,
      { toValue: tarOpa, duration: SWIPE_DURATION }
    ).start();
  }

  startToDisappear() {
    this.startAnimation(-SCREEN_WIDTH, 0);
  }

  render() {
      const { fadeAnim, poX } = this.state;

      return (
        <Animated.View                 // Special animatable View
          style={{

            position: 'absolute', left: poX, top: 50,

            width: SCREEN_WIDTH, height: 50, backgroundColor: '#9AB',
            opacity: fadeAnim,         // Bind opacity to animated value
          }}
        >
          <C.MnButton
            txtSty={{ textAlign: 'right' }}
            text={'Touch to start Swipe'} margin={5}
            onPressCallback={() => this.startToDisappear()}
          />
        </Animated.View>
      );
    }
}

const styles = {
  cardStyle: {
    position: 'absolute',
    backgroundColor: '#5EF',
    width: SCREEN_WIDTH, height: 100
  },

};

export default SelfNaviCompo;
