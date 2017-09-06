import pathToRegexp from 'path-to-regexp'
import { getDepartment } from '../../services/department'

export default {
  namespace: 'departmentView',
  state: {
    department: {
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
        const match = pathToRegexp('/department/departmentView/:id').exec(location.pathname)
        if (match) {
          dispatch({
            type: 'getDepartment',
            payload: { id: match[1] },
          })
        }
      })
    },
  },

  effects: {
    * getDepartment ({ payload }, { call, put }) {
      const data = yield call(getDepartment, payload)  // 调用远程服务获取结果
      if (data.success) { // 判断获取结果是否成功
        yield put({
          type: 'getDepartmentSuccess',
          payload: {
            department : data.rows[0],
          },
        })  // 将返回结果赋值给state
      } else {
        let error = { message: data.message }
        throw (error) // 抛出错误信息，交给dva处理
      }
    },
  },

  reducers: {
    getDepartmentSuccess (state, action) {
      return {
        ...state,
        ...action.payload,
      }
    },
  },
}
