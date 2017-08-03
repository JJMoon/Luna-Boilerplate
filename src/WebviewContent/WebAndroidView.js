import React, { Component, PropTypes } from 'react';
import { NativeModules, requireNativeComponent, View, Text } from 'react-native';

class WebAndroidView extends Component {

	constructor(props) {
		super(props);
		//this._onChange = this._onChange.bind(this);
	}

	// _onChange(event) {
	// 	if(!this.props.onDateChange) {
	// 		return;
	// 	}
	// 	this.props.onDateChange(event.nativeEvent);
	// }

	render() {
		//return <WebAndroidViewCompo {...this.props} onChange={this._onChange} />;
    return <WebAndroidViewCompo {...this.props} />;
	}
}

WebAndroidView.propTypes = {
	type: PropTypes.string,
  loadUrl:PropTypes.string,
	// day: PropTypes.number,
	// month: PropTypes.number,
	// year: PropTypes.number,
	// onDateChange: PropTypes.func,
	...View.propTypes,
}

const WebAndroidViewCompo = requireNativeComponent(`WebViewAdr`, WebAndroidView, {
	nativeOnly: {
		//onChange: true,
	},
});

export default WebAndroidView;
