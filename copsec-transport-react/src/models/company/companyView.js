import pathToRegexp from 'path-to-regexp'
import { getCompany } from '../../services/company'

export default {
  namespace: 'companyView',
  state: {
    company: {
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
        const match = pathToRegexp('/company/companyView/:id').exec(location.pathname)
        if (match) {
          dispatch({
            type: 'getCompany',
            payload: { id: match[1] },
          })
        }
      })
    },
  },

  effects: {
    * getCompany ({ payload }, { call, put }) {
      const data = yield call(getCompany, payload)  // 调用远程服务获取结果
      if (data.success) { // 判断获取结果是否成功
        yield put({
          type: 'getompanySuccess',
          payload: {
            company: data.rows[0],
          },
        })  // 将返回结果赋值给state
      } else {
        let error = { message: data.message }
        throw (error) // 抛出错误信息，交给dva处理
      }
    },
  },

  reducers: {
    getompanySuccess (state, action) {
      return {
        ...state,
        ...action.payload,
      }
    },
  },
}
