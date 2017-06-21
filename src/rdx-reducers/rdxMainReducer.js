/**
 * React Native Boilerplate by MOOON
 * github.com/JJMoon/Luna-Boilerplate.git
 *
 * src / rdx-reducers / rdxMainReducers.js
 *
 * Created by Jongwoo Moon on 2017. 6. 21..
 */

const initState = {
  loggedIn: false
};

export default (state = initState, action) => {
  switch (action.type) {
    case 'init':
      return state;
    default:
      return state;
  }
};
