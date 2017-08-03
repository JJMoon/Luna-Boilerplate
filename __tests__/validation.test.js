//const pwRegx = new RegExp('^(?=.{6,20})((?=.*[A-Z])|(?=.*[a-z])|(?=.*[0-9])|(?=.*[~!@\#$%<>^&*()-=+_])).*$', 'g');
//const pwRegx = new RegExp('/^[A-Za-z0-9~!@#$%^&*-=+_]{6,20}$/', 'g');

const checkPassword = function(value) {
  //const mediumRegex = /^[A-Za-z0-9~!@#$%^&*-=+_]{6,20}$/;
  const mediumRegex = /^(?=.{6,20})((?=.*[A-Z])|(?=.*[a-z])|(?=.*[0-9])|(?=.*[~!@\#$%<>^&*()-=+_])).*$/;

  console.log(` PW chk : ${value}`);
  if (!mediumRegex.test(value)) {
    console.log(`     PW >>>   False `);
    return false;
  } else {
    console.log(`     PW >>>   True `);
  }
  if (value.length < 6 || value.length > 20) {
    console.log(' Length Error');
    return false;
  }
  return true;
}

test('Password Check aaa', () => {
  expect(checkPassword('aaa')).toBeFalsy();
});

test('Password Check aaabbb', () => {
  expect(checkPassword('aaabbb')).toBeTruthy();
});

test('Password Check aaabbbK', () => {
  expect(checkPassword('aaabbbK')).toBeTruthy();
});

test('Password Check aaabbb3', () => {
  expect(checkPassword('aaabbb3')).toBeTruthy();
});

test('Password Check aaabbbfsf', () => {
  expect(checkPassword('aaabbbfsf')).toBeTruthy();
});
