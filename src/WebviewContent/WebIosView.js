import React, { Component } from 'react';
import { NativeModules, requireNativeComponent, View, Text } from 'react-native';
import PropTypes from 'prop-types';

class WebIosView extends Component {
	constructor(props) {
		super(props);
	}

	render() {
    return (
      <WebVwIOS {...this.props} />
    );
	}
}

WebIosView.propTypes = {
	isTest: PropTypes.bool,
  loginInfo: PropTypes.string,
  tNum: PropTypes.number
	// day: PropTypes.number,
	// month: PropTypes.number,
	// year: PropTypes.number,
	// onDateChange: PropTypes.func,
	///...View.propTypes,
}

const WebVwIOS = requireNativeComponent('WebVwIOS', WebIosView);

export default WebIosView;
