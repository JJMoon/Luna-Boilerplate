/**
 * React Native Boilerplate by MOOON
 * github.com/JJMoon/Luna-Boilerplate.git
 *
 * src / rdx-reducers / rdxSideMenu.js
 *
 * Created by Jongwoo Moon on 2017. 6. 28..
 */

const initState = {
  isSideMenuOpen: false,
};

export default (state = initState, action) => {
  const { type, payload } = action;
  const { isSideMenuOpen } = state;

  switch (type) {
    case 'toggleSideMenu':
      console.log(`    toggleSideMenu ${isSideMenuOpen}`);
      return { ...state, isSideMenuOpen: !isSideMenuOpen };
    case 'changeSideMenu':
      return { ...state, isSideMenuOpen: payload };
    default:
      return state;
  }
};
