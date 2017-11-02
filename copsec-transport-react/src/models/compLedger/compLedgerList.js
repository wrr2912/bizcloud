import { config } from '../../utils'
import { getCompLedgerTableDataSource, createCompLedger,deleteCompLedger,updateCompLedger} from '../../services/compLedger'

const { defaultPageSize } = config

export default {
  namespace: 'compLedgerList',//铁路企业基础信息台账
  state: {
    compLedgerTableDataSource: [],  // 用来保存列表数据
    compLedgerTableLoading: false,  // 控制表格加载效果
    txtCompanyName:null,
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
        if (location.pathname === '/compLedger/compLedgerList') {
          dispatch({
            type: 'getCompLedgerTableDataSource',
            payload: {},
          })
        }
      })
    },
  },

  effects: {
    * getCompLedgerTableDataSource ({ payload }, { call, put }) {
      yield put({ type: 'showLoading' })  // 显示加载遮罩
      const data = yield call(getCompLedgerTableDataSource, payload)  // 调用远程服务获取结果
      if (data.success) { // 判断获取结果是否成功
        yield put({
          type: 'getCompLedgerTableDataSourceSuccess',
          payload: {
            compLedgerTableDataSource: data.rows,
            pagination: {
              current: typeof (payload.currentPage) === 'undefined' ? 1 : Number(payload.currentPage),
              pageSize: typeof (payload.pageSize) === 'undefined' ? defaultPageSize : Number(payload.pageSize),
              total: data.rowsTotal,
            },
            compLedgerTableLoading: false,
          },
        })  // 将返回结果赋值给state
      } else {
        yield put({ type: 'HideLoading' })
        let error = { message: data.message }
        throw (error) // 抛出错误信息，交给dva处理
      }
    },

    * saveCompLedger ({ payload }, { call, put }) {
      const { compLedger, isCreate } = payload
      let data
      if (isCreate) {
        data = yield call(createCompLedger, compLedger)  // 调用远程服务获取结果
      } else {
        data = yield call(updateCompLedger, compLedger)
      }

      if (data.success) { // 判断获取结果是否成功
        yield put({ type: 'setCreateModelVisible', payload: { createModelVisible: false, editObj: null } })
        yield put({ type: 'getCompLedgerTableDataSource', payload: {} })
      } else {
        yield put({ type: 'HideLoading' })
        let error = { message: data.message }
        throw (error) // 抛出错误信息，交给dva处理
      }
    },

    * deleteCompLedger ({ payload }, { call, put }) {
      let data = yield call(deleteCompLedger, payload)
      if (data.success) { // 判断获取结果是否成功
        yield put({ type: 'setCreateModelVisible', payload: { createModelVisible: false, editObj: null } })
        yield put({ type: 'getCompLedgerTableDataSource', payload: {} })
      } else {
        yield put({ type: 'HideLoading' })
        let error = { message: data.message }
        throw (error) // 抛出错误信息，交给dva处理
      }
    },
  },

  reducers: {
    getCompLedgerTableDataSourceSuccess (state, action) {
      const { compLedgerTableDataSource, pagination, compLedgerTableLoading } = action.payload // 从payload中展开需要的属性
      return {
        ...state,
        compLedgerTableDataSource,
        compLedgerTableLoading,
        pagination: {
          ...state.pagination,
          ...pagination,
        },
      } // 展开原有state，并赋值新的属性值
    },

    showLoading (state) {
      return {
        ...state,
        compLedgerTableLoading: true, // 显示表格加载状态
      }
    },

    HideLoading (state) {
      return {
        ...state,
        compLedgerTableLoading: false,  // 关闭表格加载状态
      }
    },

    onChangeCompanyName (state, action) {
      return {
        ...state,
        ...action.payload,
      }
    },

    setCreateModelVisible (state, action) {
      return {
        ...state,
        ...action.payload,
      }
    },

    editCompLedger (state, action) {
      return {
        ...state,
        ...action.payload,
        createModelVisible: true,
      }
    },
  },
}
