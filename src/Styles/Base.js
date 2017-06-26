import { StyleSheet } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styleSht = StyleSheet.create({

  txtx: {
    color: '#3EE',
    textAlign: 'center',
    fontSize: 20
  },
});

const base = EStyleSheet.create({
  $fontColor: '$navy', $darkGray: '#222',
  $fontSize: 16,
  $btnHeight: 50,
  $labelFontSize: 12,
  $bigFontSize: 24,
  $subFontColor: '$bluey_gray',
  $subFontSize: 14,
  $marginLeft: 16,
  $marginRight: 19,
  container: {
    flex: 1,
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  rowCont: {
    flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
    backgroundColor: '#EEA'
  },
  separator: {
    flex: 0, height: 2, padding: 2, margin: 1, backgroundColor: '#222'
  },
  txtx: {
    color: '#3EE',
    textAlign: 'center',
    lineHeight: 20,
    //fontSize: '$subFontSize',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

//export default styleSht;

export { styleSht, base };
