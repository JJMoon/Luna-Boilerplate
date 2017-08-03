
import _ from 'lodash';

const now = new Date();
const aDay = new Date('Mon July 3 2017');

// toBeTruthy
test('Basic', () => {
  expect(5 < 8).toBeTruthy();
});

test('Lodash, Date', () => {
  expect(_.isDate(now)).toBeTruthy();
  expect(_.isDate(aDay)).toBeTruthy();
  // 시간 계산 in Second
  const inSec = (now - aDay) * 0.001, inHr = inSec / 3600;
  console.log(` since :: ${inHr}  from ${aDay}`);
  //expect(inHr < 500).toBeTruthy();
  //expect(aDay.toString()).toBe('Mon Jul 03 2017 00:00:00 GMT+0900 (KST)');
});

test('Lodash, Number ', () => {
  expect(_.isNumber(5)).toBeTruthy();
  expect(_.floor(3.234)).toBe(3);
  expect(_.floor(3.234, 2)).toBe(3.23);
  expect(_.floor(12423.234, -2)).toBe(12400);

  expect(_.round(3.734)).toBe(4);
  expect(_.round(3.238, 2)).toBe(3.24);
  expect(_.round(12993.234, -2)).toBe(13000);
});
