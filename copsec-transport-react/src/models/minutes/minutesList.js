import { config } from '../../utils'
import { getMinutesTableDataSource,getApplyByState,createMinutes,deleteMinutes,updateMinutes} from '../../services/minutes'

const { defaultPageSize } = config

export default {
  namespace: 'minutesList',
  state: {
    minutesTableDataSource: [],  // 用来保存列表数据
    minutesTableLoading: false,  // 控制表格加载效果
    applyList:[],
    pagination: {
      showSizeChanger: true,  // 是否可以改变 pageSize
      showQuickJumper: true,  // 是否可以快速跳转至某页
      showTotal: total => `共 ${total} 条`, // 用于显示数据总量和当前数据顺序
      current: 1, // 当前页数
      total: 0,  // 数据总数
    },  // 用来保存翻页控件的信息
    createModelVisible: false,
    editObj: null,
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/minutes/minutesList') {
          dispatch({
            type: 'getMinutesTableDataSource',
            payload: {},
          })
        }
      })
    },
  },

  effects: {
    * getMinutesTableDataSource ({ payload }, { call, put }) {
      yield put({ type: 'showLoading' })  // 显示加载遮罩
      const data = yield call(getMinutesTableDataSource, payload)  // 调用远程服务获取结果
      if (data.success) { // 判断获取结果是否成功
        yield put({
          type: 'getMinutesTableDataSourceSuccess',
          payload: {
            minutesTableDataSource: data.rows,
            pagination: {
              current: typeof (payload.currentPage) === 'undefined' ? 1 : Number(payload.currentPage),
              pageSize: typeof (payload.pageSize) === 'undefined' ? defaultPageSize : Number(payload.pageSize),
              total: data.rowsTotal,
            },
            minutesTableLoading: false,
          },
        })  // 将返回结果赋值给state
      } else {
        yield put({ type: 'HideLoading' })
        let error = { message: data.message }
        throw (error) // 抛出错误信息，交给dva处理
      }
    },
    * showMetting({ payload }, { call, put }){
      const data = yield call(getApplyByState, payload)  // 调用远程服务获取结果
      if (data.success) { // 判断获取结果是否成功
        yield put({ type: 'setCreateModelVisible', payload: { createModelVisible: true, applyList: data.rows } })
      }
    },
    * saveMinutes ({ payload }, { call, put }) {
      const { minutes, isCreate } = payload
      let data
      if (isCreate) {
        data = yield call(createMinutes, minutes)  // 调用远程服务获取结果
      } else {
        data = yield call(updateMinutes, minutes)
      }

      if (data.success) { // 判断获取结果是否成功
        yield put({ type: 'setCreateModelVisible', payload: { createModelVisible: false, editObj: null } })
        yield put({ type: 'getMinutesTableDataSource', payload: {} })
      } else {
        yield put({ type: 'HideLoading' })
        let error = { message: data.message }
        throw (error) // 抛出错误信息，交给dva处理
      }
    },

    * deleteMinutes ({ payload }, { call, put }) {
      let data = yield call(deleteMinutes, payload)
      if (data.success) { // 判断获取结果是否成功
        yield put({ type: 'setCreateModelVisible', payload: { createModelVisible: false, editObj: null } })
        yield put({ type: 'getMinutesTableDataSource', payload: {} })
      } else {
        yield put({ type: 'HideLoading' })
        let error = { message: data.message }
        throw (error) // 抛出错误信息，交给dva处理
      }
    },
  },

  reducers: {
    getMinutesTableDataSourceSuccess (state, action) {
      const { minutesTableDataSource, pagination, minutesTableLoading } = action.payload // 从payload中展开需要的属性
      return {
        ...state,
        minutesTableDataSource,
        minutesTableLoading,
        pagination: {
          ...state.pagination,
          ...pagination,
        },
      } // 展开原有state，并赋值新的属性值
    },

    showLoading (state) {
      return {
        ...state,
        minutesTableLoading: true, // 显示表格加载状态
      }
    },

    HideLoading (state) {
      return {
        ...state,
        minutesTableLoading: false,  // 关闭表格加载状态
      }
    },

    setCreateModelVisible (state, action) {
      return {
        ...state,
        ...action.payload,
      }
    },

    editMinutes (state, action) {
      return {
        ...state,
        ...action.payload,
        createModelVisible: true,
      }
    },
  },
}
