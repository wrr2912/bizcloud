import pathToRegexp from 'path-to-regexp'
import { getUser } from '../../services/sysuser'

export default {
  namespace: 'userView',
  state: {
    employee: {
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
        const match = pathToRegexp('/user/userView/:id').exec(location.pathname)
        if (match) {
          dispatch({
            type: 'getUser',
            payload: { id: match[1] },
          })
        }
      })
    },
  },

  effects: {
    * getEmployee ({ payload }, { call, put }) {
      const data = yield call(getUser, payload)  // 调用远程服务获取结果
      if (data.success) { // 判断获取结果是否成功
        yield put({
          type: 'getUserSuccess',
          payload: {
            employee: data.rows[0],
          },
        })  // 将返回结果赋值给state
      } else {
        let error = { message: data.message }
        throw (error) // 抛出错误信息，交给dva处理
      }
    },
  },

  reducers: {
    getUserSuccess (state, action) {
      return {
        ...state,
        ...action.payload,
      }
    },
  },
}
