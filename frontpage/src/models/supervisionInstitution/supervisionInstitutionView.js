import pathToRegexp from 'path-to-regexp'
import { getSupervisionInstitution } from '../../services/supervisionInstitution'

export default {
  namespace: 'supervisionInstitutionView',
  state: {
    supervisionInstitution: {
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
        const match = pathToRegexp('/supervisionInstitution/supervisionInstitutionView/:id').exec(location.pathname)
        if (match) {
          dispatch({
            type: 'getSupervisionInstitution',
            payload: { id: match[1] },
          })
        }
      })
    },
  },

  effects: {
    * getSupervisionInstitution ({ payload }, { call, put }) {
      const data = yield call(getSupervisionInstitution, payload)  // 调用远程服务获取结果
      if (data.success) { // 判断获取结果是否成功
        yield put({
          type: 'getSupervisionInstitutionSuccess',
          payload: {
            supervisionInstitution: data.rows[0],
          },
        })  // 将返回结果赋值给state
      } else {
        let error = { message: data.message }
        throw (error) // 抛出错误信息，交给dva处理
      }
    },
  },

  reducers: {
    getSupervisionInstitutionSuccess (state, action) {
      return {
        ...state,
        ...action.payload,
      }
    },
  },
}
