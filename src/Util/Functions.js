/**
 * React Native Boilerplate by MOOON
 * github.com/JJMoon/Luna-Boilerplate.git
 *
 * src / / index.js
 *
 * Created by Jongwoo Moon on 2017. 7. 7..
 */

export const genFunctionOfRef = (obj, funcName, refName) => {
  return (() => {
    //console.log(obj[refName][funcName]);
    obj.refs[refName][funcName]();
  });
};


export const genFunctionObj = (obj, funcName) => {
  return (() => {
    //console.log(obj[refName][funcName]);
    obj[funcName]();
  });
};
