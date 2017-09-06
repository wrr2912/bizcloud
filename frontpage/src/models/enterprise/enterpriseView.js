import pathToRegexp from 'path-to-regexp'
import { getEnterprise } from '../../services/enterprise'

export default {
  namespace: 'enterpriseView',
  state: {
    enterprise: {
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
        const match = pathToRegexp('/enterprise/enterpriseView/:id').exec(location.pathname)
        if (match) {
          dispatch({
            type: 'getEnterprise',
            payload: { id: match[1] },
          })
        }
      })
    },
  },

  effects: {
    * getEnterprise ({ payload }, { call, put }) {
      const data = yield call(getEnterprise, payload)  // 调用远程服务获取结果
      if (data.success) { // 判断获取结果是否成功
        yield put({
          type: 'getEnterpriseSuccess',
          payload: {
            enterprise: data.rows[0],
          },
        })  // 将返回结果赋值给state
      } else {
        let error = { message: data.message }
        throw (error) // 抛出错误信息，交给dva处理
      }
    },
  },

  reducers: {
    getEnterpriseSuccess (state, action) {
      return {
        ...state,
        ...action.payload,
      }
    },
  },
}
