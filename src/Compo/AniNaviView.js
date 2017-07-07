import React, { Component } from 'react';
import { Animated, Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

/* ====== ====== ====== ====== ====== ====== ====== ======
// 내비게이션 효과의 애니메이션. 오른쪽에서 왼쪽으로 이동.
// Code Example

<C.AniNaviView
  ref="ani01" refObj={this.refs.rtxt001}
  content={
    <C.MnButton
      text={'.. Disappear ..'}
      onPressCallback={genFunctionObj(this.refs.ani01, 'disappear')}
    />
  }
/>

====== ====== ====== ====== ====== ====== ====== ====== */
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
    this.disappear = this.startToDisappear.bind(this);
  }


  componentDidMount() {
    // 기준 되는 컴퍼넌트에서 좌표 가져옴.
    setTimeout(() => {
      this.props.refObj.measure((fx, fy, width, height, px, py) => {
        this.startShowUp(py + height);
      });
    }, 400);
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
        <Animated.View
          style={[
            styles.container,
            { top, width, height, opacity: fadeAnim, left: poX,
          }]}
        >
          {content}
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
