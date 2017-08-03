import React, { Component, PropTypes } from 'react';
import { NativeModules, requireNativeComponent, View, Text } from 'react-native';

const WebViewIOS = requireNativeComponent('WebVwIOS', null);

class WebIosView extends Component {
	constructor(props) {
		super(props);
	}

	render() {
    return (

        <WebViewIOS
          style={{ flex: 1 }}
          {...this.props}
        />
    );
	}
}

WebIosView.propTypes = {
	isTest: PropTypes.bool,
	// day: PropTypes.number,
	// month: PropTypes.number,
	// year: PropTypes.number,
	// onDateChange: PropTypes.func,
	...View.propTypes,
}


export default WebIosView;
