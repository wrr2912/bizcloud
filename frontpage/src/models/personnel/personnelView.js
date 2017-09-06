import pathToRegexp from 'path-to-regexp'
import { getPersonnel } from '../../services/personnel'

export default {
  namespace: 'personnelView',
  state: {
    personnel: {
      id: null,
      name: null,
      sex: null,
      telNumber: null,
      address: null,
    },
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        const match = pathToRegexp('/personnel/personnelView/:id').exec(location.pathname)
        if (match) {
          dispatch({
            type: 'getPersonnel',
            payload: { id: match[1] },
          })
        }
      })
    },
  },

  effects: {
    * getPersonnel ({ payload }, { call, put }) {
      const data = yield call(getPersonnel, payload)  // 调用远程服务获取结果
      if (data.success) { // 判断获取结果是否成功
        yield put({
          type: 'getPersonnelSuccess',
          payload: {
            personnel: data.rows[0],
          },
        })  // 将返回结果赋值给state
      } else {
        let error = { message: data.message }
        throw (error) // 抛出错误信息，交给dva处理
      }
    },
  },

  reducers: {
    getPersonnelSuccess (state, action) {
      return {
        ...state,
        ...action.payload,
      }
    },
  },
}
