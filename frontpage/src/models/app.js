import { query,login, logout, getMenus } from '../services/app'
import { queryURL } from '../utils';
import { routerRedux } from 'dva/router'
import { parse } from 'qs'
import { config } from '../utils'
const { prefix } = config
export default {
  namespace: 'app',
  state: {
    menus: [],
    user: {},
    loginLoading: false,
    personal: { link: '/personal2', title: '个人信息' },
    menuPopoverVisible: false,
    siderFold: localStorage.getItem(`${prefix}siderFold`) === 'true',
    darkTheme: localStorage.getItem(`${prefix}darkTheme`) === 'true',
    isNavbar: document.body.clientWidth < 769,
    navOpenKeys: JSON.parse(localStorage.getItem(`${prefix}navOpenKeys`)) || [],
    // 当前激活的菜单ID
    activeMenu: { key: '' },
  },
  subscriptions: {
    setup ({ dispatch }) {
      dispatch({ type: 'init', payload:{}})
      let tid
      window.onresize = () => {
        clearTimeout(tid)
        tid = setTimeout(() => {
          dispatch({ type: 'changeNavbar' })
        }, 300)
      }
    },

  },
  effects: {
    * init({state, payload},{select, call, put}){
      /*const isLogin = yield select(state => state.app.isLogin)
      const user = yield select(state => state.app.user)
      if(isLogin) {
        yield put({type:'query'});
      }else {
        if (location.pathname !== '/login') {

          let from = location.pathname
          if (location.pathname === '/dashboard') {
            from = '/dashboard'
          }
          window.location.href = `${location.origin}/login?from=${from}`
        }*/
        const data = yield call(login, payload:{});
        if(data.success && data.result && data.result.user){
          yield put({type:'query'});
        }else {
          if (location.pathname !== '/login') {

            let from = location.pathname
            if (location.pathname === '/dashboard') {
              from = '/dashboard'
            }
            window.location.href = `${location.origin}/login?from=${from}`
          }
      }
    },

    * query ({
      payload,
    }, {call, put }) {
      const data = yield call(query, parse(payload))
      if (data.success && data.user) {
        yield put({
          type: 'querySuccess',
          payload: data.user,
        })
        // 获取菜单信息
        const dataMenus = yield call(getMenus, parse(payload))
        if (dataMenus.success && dataMenus.result) {
          console.log('data menus got')
          yield put({
            type: 'queryMenus',
            payload: dataMenus.result,
          })
        }

        // 页面跳转
        if (location.pathname === '/login') {
          yield put(routerRedux.push('/dashboard'))
        }
      } else if (location.pathname !== '/login') {
        let from = location.pathname
        if (location.pathname === '/dashboard') {
          from = '/dashboard'
        }
        window.location.href = `${location.origin}/login?from=${from}`
      }

    },

    *login ({
      payload,
    }, { put, call }) {
      yield put({ type: 'showLoginLoading' });
      const data = yield call(login, payload);
      yield put({ type: 'hideLoginLoading' });
      if (data.success && data.result && data.result.user) {
        const from = queryURL('from');
        yield put({ type: 'query'});
        if (from) {
          yield put(routerRedux.push(from));
        } else {
          yield put(routerRedux.push('/dashboard'));
        }
      } else {
        throw data
      }
    },

    * logout ({ payload }, { call, put }) {
      const data = yield call(logout, parse(payload))
       if (data.success) {
     /*    let from = location.pathname
         if (location.pathname === '/dashboard') {
           from = '/dashboard'
         }
         window.location = `${location.origin}/logout?from=${from}`*/
         yield put({ type: 'query' })
       } else {
         throw (data)
       }
    },
    * changeNavbar ({
      payload,
    }, { put, select }) {
      const { app } = yield (select(_ => _))
      const isNavbar = document.body.clientWidth < 769
      if (isNavbar !== app.isNavbar) {
        yield put({ type: 'handleNavbar', payload: isNavbar })
      }
    },

  },
  reducers: {
    querySuccess (state, { payload: user }) {
      return {
        ...state,
        user,
      }
    },

    queryMenus (state, { payload: menus }) {
      console.log('queryMenus success')
      // 处理Menus数据，进行Key值转换

      return {
        ...state,
        menus,
      }
    },

    switchSider (state) {
      localStorage.setItem(`${prefix}siderFold`, !state.siderFold)
      return {
        ...state,
        siderFold: !state.siderFold,
      }
    },

    switchTheme (state) {
      localStorage.setItem(`${prefix}darkTheme`, !state.darkTheme)
      return {
        ...state,
        darkTheme: !state.darkTheme,
      }
    },

    switchMenuPopver (state) {
      return {
        ...state,
        menuPopoverVisible: !state.menuPopoverVisible,
      }
    },

    handleNavbar (state, { payload }) {
      return {
        ...state,
        isNavbar: payload,
      }
    },

    handleNavOpenKeys (state, { payload: navOpenKeys }) {
      return {
        ...state,
        ...navOpenKeys,
      }
    },

    handleActiveMenu (state, { payload: activeMenu }) {
      return {
        ...state,
        activeMenu,
      }
    },

    showLoginLoading (state) {
      return {
        ...state,
        loginLoading: true,
      }
    },
    hideLoginLoading (state) {
      return {
        ...state,
        loginLoading: false,
      }
    },
  },
}
