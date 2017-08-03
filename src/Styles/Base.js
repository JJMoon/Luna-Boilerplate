import EStyleSheet from 'react-native-extended-stylesheet';

const base = EStyleSheet.create({
  $fontColor: '$navy', $darkGray: '#222',
  $outline: 1,
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
    justifyContent: 'center', alignItems: 'center',
  },
  rowCont: {
    flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
    backgroundColor: '#EEA'
  },
  separator: {
    flex: 0, height: 2, width: '$halfWid', padding: 2, margin: 1, backgroundColor: '#222'
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

export { base };
