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
import { View, StyleSheet, Text, PixelRatio, LayoutAnimation, Platform, requireNativeComponent,
  AsyncStorage, NativeModules,
  TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Button, SideMenu } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import EStyleSheet from 'react-native-extended-stylesheet';

import { base } from '../Styles/Base';
import * as actions from '../rdx-actions';
import * as C from '../Compo';
import * as CL from '../Compo/MnColor';
import * as CU from '../CompoUnit';
import SideMenuMain from '../Scenes/SideMenuMain';

// iOS BLE Connection
//const BridgeIOS = NativeModules.BridgeIOS;
//const BleLinkconModuleAndroid = NativeModules.BleLinkconModuleAndroid;

import WebViewAndroid from '../WebviewContent/WebAndroidView';
import WebIosView from '../WebviewContent/WebIosView';

const iosNativeModule = NativeModules.WebVwIOSManager;


// const WebViewIOS = requireNativeComponent('WebVwIOS', null);

class UXdebugMain extends Component {
  constructor(props) {
    super(props);
    console.log('\n\n\n\n\n ====== ====== ====== ======  [[ UXdebugMain  :: constructor ]]  .....\n');
    console.log(`   PixelRatio :: ${PixelRatio.get()}`);
    this.state = {
      login: 'Init',
      someTest: 'value',
      id: 'id'
    };
    const rss = JSON.stringify(this.state);
  }

  ////////////////////////////////////////////////////   _//////////////////_   component life cycle
  componentWillUpdate() {
  }

  componentWillMount() {
    console.log('\n ====== ====== ====== ======  [[ UXdebugMain :: componentWillMount ]]');
  }

  componentWillUnmount() {
    console.log('\n\n\n\n\n ====== ====== ====== ======  [[ UXdebugMain :: unmount ]] ...\n');
  }

  async componentDidMount() {
    await AsyncStorage.setItem('theKey', 'this is from RN ');

    // RCT_EXPORT_METHOD(setLogoutCallback:(RCTResponseSenderBlock)callback) {
    iosNativeModule.setLogoutCallback((error, str) => {
      if (error) {
        console.error(error);
      } else {
        this.setState({ login: 'ios logOut' });
        console.log(`  returned from obj c ::  ${str}`);
      }
    });
  }

  loginAction() {
    const sendMessage = {
      type : 'EMAIL_LOGIN',
      data : { email: 'hyochan', password: 'password12' }
    }
    console.log(JSON.stringify(sendMessage));

    iosNativeModule.loginInfo(JSON.stringify(sendMessage));

    this.setState({ login: ' ios logged in ' });
  }

  renderWebView() {
    return (
      <WebViewAndroid
        style={esty.scrll}
        type={'EMAIL_LOGIN_From JS'}
        loadUrl={'file:///android_asset/index.html'}
      />
    );
  }

  renderIosWebView() {
    return (
      <WebIosView
        style={{ flex: 8 }}
      />
    ); // loginInfo={'{ "login info": "not yet" }'}  isTest={true}
  }

  renderState() {
    const { login } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: '#DEF' }} >
        <Text style={esty.txtx}> Login : {login}</Text>
        <C.MnButton
          text={'.. Log In ..'}
          onPressCallback={this.loginAction.bind(this)}
        />
      </View>
    );
  }

  ////////////////////////////////////////////////////   _//////////////////_   render
  render() {
    //return (<CU.MnSideMenu main={this.renderMain()} />);
    const webVw = Platform.OS === 'ios' ? this.renderIosWebView() : this.renderWebView();
    return (
      <View style={{ flex: 10, marginTop: 50 }}>
        {this.renderState()}
        {webVw}
      </View>
    ); // loginInfo={'{ "login info": "not yet" }'}  isTest={true}
  }

  renderMain() {
    const { scr } = this.props.main;

    const spacer = <View style={{ padding: 10, backgroundColor: '#BCF' }} />;

    const opt = { backBttnArrow: true, ratio: scr.unit,
      leftBttn: Actions.pop };
    const opt2 = { backBttnArrow: true, ratio: scr.unit,
      leftBttn: () => console.log(' UXdebugMain :: opt2'),
      rightBttn: { text: '전체동의', txtSty: { fontSize: 12 },
      opt: { margin: 5, textAlign: 'left' } }
    };

    return (
        <ScrollView style={esty.scrll} >
          <CU.NavigateView opt={opt}/>

          <CU.NavigateView opt={opt2}/>


          <Text style={esty.titleSty}> Initial Scene X </Text>

          {spacer}

          <View style={esty.rowCont}>
            <View style={{ flex: 0, width: '30%', backgroundColor: 'rgb(100,0,13)' }} />
            <View style={{ flex: 0, width: '10%', backgroundColor: '#589' }} />
            <View style={{ flex: 0, width: '58%', backgroundColor: '#D45' }} />

          </View>

          <Button
            large
            buttonStyle={{ flex: 5, backgroundColor: CL.navy, borderRadius: 5 }}
            textStyle={{ textAlign: 'center' }}
            title={'Go to scene Email Input'}
            onPress={() => Actions.authEmailInput()}
          />

          {spacer}

          <View style={base.separator} />

          {spacer}

          <Button
            icon={{ name: 'cached', size: 22 }}
            buttonStyle={{ flex: 5, backgroundColor: CL.navy, borderRadius: 5 }}
            textStyle={{ textAlign: 'center' }}
            title={'Welcome '}
            onPress={() => console.log(' Pressed !! ')}
          />

          <C.MnButton
            text={'MENU'}
            onPressCallback={this.props.toggleSideMenu}
          />
        </ScrollView>
    );
  }
}

const esty = EStyleSheet.create({
  scrll: { flex: 10, backgroundColor: '#FDA' },
  rowCont: { flex: 1, flexDirection: 'row' },
  txtx: {
    fontSize: '$fontSzBig'
  },
  titleSty: {
    fontSize: '$fontSzTitle', color: '$navy'
  },
  andrWeb: {
    width: '100%', height: '100%'
  }

});

const mapStateToProps = (state) => {
  return {
    main: state.main,
  };
};

export default connect(mapStateToProps, actions)(UXdebugMain);
// connect() 에서 함수를 리턴하면 거기에 SceneConnect 를 전달함..
