import { getMgrMenus, getMgrMenuInfo, saveMgrMenuInfo, getMenuDrop} from '../../services/menus'
import { parse } from 'qs'
import { message } from 'antd'
export default {
  namespace: 'menuList',
  menuTableDataSource: [],  // 用来保存列表数据
  menuTableLoading: false,  // 控制表格加载效果
  menuDrop: [],
  state: {
    menus: [],
    menuInfo: {},
    menuPrivileges: [{"key":"1","roleId":"super.admin", "roleName": "系统管理员"}],
    formStatus: 'none',
    formEditable: false
  },
  subscriptions: {
    setup ({ dispatch }) {
      dispatch({ type: 'getMenuTableDataSource' })
    },
  },
  effects: {
    *getMenuTableDataSource ({ payload }, {call, put}) {
      yield put({ type: 'showLoading' })  // 显示加载遮罩
        let menuData = yield call(getMgrMenus, payload);
        if (menuData.success) { // 判断获取结果是否成功
          yield put({
            type: 'querySuccess',
            payload: {
              menuTableDataSource: menuData.rows,
              menuTableLoading: false,
            },
          })  // 将返回结果赋值给state
        } else {
          yield put({ type: 'HideLoading' })
          let error = { message: menuData.message }
          throw (error) // 抛出错误信息，交给dva处理
        }
    },

    *showMenu ({payload}, {call, put}) {
      let menuInfo = yield call(getMgrMenuInfo, parse(payload));
      if (menuInfo.success && menuInfo.rows) {
        yield put({type: 'showMenuInfo',
          payload:menuInfo.rows,
        })
      }
    },

    *saveMenu ({payload}, {call, put}) {
         let menuData = yield call(saveMgrMenuInfo, parse(payload));
         if (menuData.success) {
           yield put({type: 'updateMenuInfo',
             payload: payload,
           })
           message.success("保存成功")
         }
    },
  *getMenuDrop ({payload}, {call, put}) {
    let menuData = yield call(getMenuDrop, payload);
    if (menuData.success === true) {
      yield put({type: 'showModal',
        payload: { menuDrop: menuData.rows,}
      })
    }else {
      yield put({ type: 'HideLoading' })
      let error = { message: menuData.message }
      throw (error) // 抛出错误信息，交给dva处理
    }
  },
  },
  reducers: {
    querySuccess (state, action){
      const { menuTableDataSource, menuTableLoading } = action.payload // 从payload中展开需要的属性
      return {
        ...state,
        menuTableDataSource,
        menuTableLoading,
      } // 展开原有state，并赋值新的属性值
    },
    showMenuInfo (state, {payload}){
      return {...state, menuInfo: payload }
    },
    showModal (state, action) {
      return { ...state, ...action.payload, modalVisible: true }
    },

    hideModal (state) {
      return { ...state, modalVisible: false }
    },
    showMenuPrivileges (state, {payload}){
      return {...state, menuPrivileges: payload }
    },

    toEditModel (state, {payload}){
      if (state.menuInfo.key) {
        return {...state, formEditable: true, formStatus: 'edit'}
      }else {
        message.info('请在左侧树上选择菜单')
      }
      return state
    },

    saveEditForm (state, {payload}){
      return {...state, formEditable: false, formStatus: 'save' }
    },

    cancelEditForm (state, {payload}){
      return {...state, formEditable: false, formStatus: 'cancel'  }
    },

    updateMenuInfo (state, {payload}) {
      let data = payload;
      if (data.fieldName === 'title'){
        let us = state.menuInfo
        let updateData = {userInfo: { ...us, title: data.value}}
        return {...state, ...updateData }
      }else if (data.fieldName === 'index'){
        let us = state.menuInfo
        let updateData = {userInfo: { ...us, index: data.value}}
        return {...state, ...updateData }
      }
      return {... state}
    },

  },
}
