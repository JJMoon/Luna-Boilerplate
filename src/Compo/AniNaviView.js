import React, { Component } from 'react';
import {
  View, Animated, Text, PanResponder, Dimensions, TouchableOpacity,
  LayoutAnimation, UIManager
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import * as C from '../Compo';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_DURATION = 250;

class AniNaviView extends Component {
  constructor(props) {
    super(props);

    this.state = {
        isLoading: true,
        poX: new Animated.Value(SCREEN_WIDTH),
        fadeAnim: new Animated.Value(0), // 0 : invisible.
      };
  }

  startAnimation(tarX, tarOpa) {
    Animated.timing(this.state.poX,
      { toValue: tarX, duration: SWIPE_DURATION }
    ).start();
    Animated.timing(this.state.fadeAnim,
      { toValue: tarOpa, duration: SWIPE_DURATION }
    ).start();
  }

  // public :: 나타나는 애니메이션 시작
  startShowUp(py) {
    this.startAnimation(0, 1);
    this.setState({ isLoading: false, top: py });
  }
  // public :: 엔딩...
  startToDisappear() {
    this.startAnimation(-SCREEN_WIDTH, 0);
  }

  render() {
      const { isLoading, fadeAnim, poX, top } = this.state;
      const { height, width = SCREEN_WIDTH, content } = this.props;
      if (isLoading) {
        return null;
      }
      return (
        <Animated.View                 // Special animatable View
          style={[styles.container,
            { top, width, height, opacity: fadeAnim, left: poX, // Animation
          }]}
        >
          {content}

          <C.MnButton
            text={'.. Disappear ..'}
            onPressCallback={() => {
              console.log('   dldldl  ');
            }}
          />

          <TouchableOpacity
            onPress={this.startToDisappear.bind(this)}
          >
            <Text> Touch this </Text>
          </TouchableOpacity>

        </Animated.View>
      );
    }
}

const styles = {
  container: {
    flex: 1, position: 'absolute', alignItems: 'stretch',
    width: SCREEN_WIDTH,
  },
};

export { AniNaviView };
