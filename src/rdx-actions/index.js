/**
 * React Native Boilerplate by MOOON
 * github.com/JJMoon/Luna-Boilerplate.git
 *
 * src / rdx-actions / index.js
 *
 * Created by Jongwoo Moon on 2017. 6. 20..
 */

export * from './rdxBaseAction';

//export const setBleCompo = (payload) => { return { type: 'setBleCompo', payload }; };
export const actSetSideMenu =
(payload) => { return { type: 'actSetSideMenu', payload }; };

export const setScenes = () => { return { type: 'setScenes' }; };

export const toggleSideMenu = () => { return { type: 'toggleSideMenu' }; };
export const changeSideMenu = (payload) => {
  return { type: 'changeSideMenu', payload };
};
