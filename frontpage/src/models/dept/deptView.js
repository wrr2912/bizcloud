import pathToRegexp from 'path-to-regexp'
import { getDept } from '../../services/dept'

export default {
  namespace: 'deptView',
  state: {
    dept: {
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
        const match = pathToRegexp('/dept/deptView/:id').exec(location.pathname)
        if (match) {
          dispatch({
            type: 'getDept',
            payload: { id: match[1] },
          })
        }
      })
    },
  },

  effects: {
    * getDept ({ payload }, { call, put }) {
      const data = yield call(getDept, payload)  // 调用远程服务获取结果
      if (data.success) { // 判断获取结果是否成功
        yield put({
          type: 'getDeptSuccess',
          payload: {
            dept: data.rows[0],
          },
        })  // 将返回结果赋值给state
      } else {
        let error = { message: data.message }
        throw (error) // 抛出错误信息，交给dva处理
      }
    },
  },

  reducers: {
    getDeptSuccess (state, action) {
      return {
        ...state,
        ...action.payload,
      }
    },
  },
}
