
import { encrypt, decrypt } from 'react-native-simple-encryption';

test('encrypt test', () => {
  console.log('  encrypt test ..... log ');
  const ky = 'someComplexKey', target = 'target string with @$#$ *(()) 234 98';
  const encptStr = encrypt(ky, target);
  const rslt = decrypt(ky, encptStr);
  console.log(`  encrypt test ::  ${encptStr}`);
  console.log(`  encrypt rslt ::  ${rslt}`);
  expect(target).toBe(rslt);
});
