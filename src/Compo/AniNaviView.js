import React, { Component } from 'react';
import {
  View, Animated, Text, PanResponder, Dimensions,
  LayoutAnimation, UIManager
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import * as C from '../Compo';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_DURATION = 2000; //250;

class AniNaviView extends Component {
  constructor(props) {
    super(props);

    this.state = {
        isLoading: true,
        poX: new Animated.Value(SCREEN_WIDTH),
        fadeAnim: new Animated.Value(0), // 0 : invisible.
      };
  }

  componentWillMount() {
    this.waitForRefCompo()
      .then((compo) => {
        this.setState({ isLoading: false });
      });
  }

  componentDidMount() {
    console.log('  AniNaviView :: componentDidMount');
    this.startAnimation(0, 1);
  }

  async waitForRefCompo() {
    return new Promise((resolve, reject) => {
      if (this.props.refCompo !== undefined) {
        console.log('\n\n\n\n resolve ><><><><>><<>><><<><>><><');
        resolve(this.props.refCompo);
      }
    });
  }

  startAnimation(tarX, tarOpa) {
    Animated.timing(this.state.poX,
      { toValue: tarX, duration: SWIPE_DURATION }
    ).start();
    Animated.timing(this.state.fadeAnim,
      { toValue: tarOpa, duration: SWIPE_DURATION }
    ).start();
  }

  // public
  startShowUp(py) {
    this.setState({ isLoading: false, top: py });
  }

  startToDisappear() {
    this.startAnimation(-SCREEN_WIDTH, 0);
  }

  getTopDistance() {
    if (this.props.refCompo === undefined) {
      console.log(' this.props.refCompo === undefined ');
      return 0;
    }
    this.props.refCompo.measure((fx, fy, width, height, px, py) => {
      console.log(`   refCompo ::  px : ${px}, py : ${py} `);
      return py;
    });
  }

  render() {
      const { isLoading, fadeAnim, poX, top } = this.state;

      const { height, width = SCREEN_WIDTH, content
         } = this.props;



      if (isLoading) {
        return null;
      }

      //const top = this.getTopDistance();

      return (
        <Animated.View                 // Special animatable View
          style={{
            position: 'absolute',
            left: poX, top,

            width, height, backgroundColor: '#9AB',
            opacity: fadeAnim,         // Bind opacity to animated value
          }}
        >
          {content}
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

export { AniNaviView };
