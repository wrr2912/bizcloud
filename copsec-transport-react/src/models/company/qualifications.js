import pathToRegexp from 'path-to-regexp'
import { config } from '../../utils/index'
import { getQualTableDataSource, saveQual, deleteQual } from '../../services/qual'

const { defaultPageSize } = config

export default {
  namespace: 'qualList',
  state: {
    qualTableDataSource: [],  // 用来保存列表数据
    qualTableLoading: false,  // 控制表格加载效果
    queryData:{
      loginName: "",
      name: "",
      phone: "",
      userId: "",
    },
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
        console.log('------111221111---------')
        const match = pathToRegexp('/company/qual/:id').exec(location.pathname)
        if (match) {
          dispatch({ type: 'getQualTableDataSource', payload: { companyid: match[1] } })
        }
      })
    },
  },

  effects: {
    * getQualTableDataSource ({ payload }, { call, put }) {
      console.log('----getQualTableDataSource----')
      console.log(payload)
      yield put({ type: 'showLoading' })  // 显示加载遮罩
      const data = yield call(getQualTableDataSource, payload) // 调用远程服务获取结果
      if (data) { // 判断获取结果是否成功
        yield put({
          type: 'getQualTableDataSourceSuccess',
          payload: {
            qualTableDataSource: data.rows,
            pagination: {
              current: typeof (payload.currentPage) === 'undefined' ? 1 : Number(payload.currentPage),
              pageSize: typeof (payload.pageSize) === 'undefined' ? defaultPageSize : Number(payload.pageSize),
              total: data.rowsTotal,
            },
            qualTableLoading: false,
          },
        })  // 将返回结果赋值给state
      } else {
        yield put({ type: 'HideLoading' })
        let error = { message: data.message }
        throw (error) // 抛出错误信息，交给dva处理
      }
    },

    * saveQual ({ payload }, { call, put }) {
      let data = yield call(saveQual, payload)
      if (data.success) { // 判断获取结果是否成功
        yield put({ type: 'setCreateModelVisible', payload: { modalVisible: false, editObj: null } })
        yield put({ type: 'getQualTableDataSource', payload: {} })
      } else {
        yield put({ type: 'HideLoading' })
        let error = { message: data.message }
        throw (error) // 抛出错误信息，交给dva处理
      }
    },
    * deleteQual ({ payload }, { call, put }) {
      let data = yield call(deleteQual, payload)
      if (data.success) { // 判断获取结果是否成功
        yield put({ type: 'setCreateModelVisible', payload: { modalVisible: false, editObj: null } })
        yield put({ type: 'getQualTableDataSource', payload: {} })
      } else {
        yield put({ type: 'HideLoading' })
        let error = { message: data.message }
        throw (error) // 抛出错误信息，交给dva处理
      }
    },
  },

  reducers: {
    getQualTableDataSourceSuccess (state, action) {
      const { qualTableDataSource, pagination, qualTableLoading } = action.payload // 从payload中展开需要的属性
      return {
        ...state,
        qualTableDataSource,
        qualTableLoading,
        pagination: {
          ...state.pagination,
          ...pagination,
        },
      } // 展开原有state，并赋值新的属性值
    },
    showModal (state, action) {
      return { ...state, ...action.payload, modalVisible: true }
    },

    hideModal (state) {
      return { ...state, modalVisible: false }
    },
    showLoading (state) {
      return {
        ...state,
        qualTableLoading: true, // 显示表格加载状态
      }
    },

    HideLoading (state) {
      return {
        ...state,
        qualTableLoading: false,  // 关闭表格加载状态
      }
    },

    onChangeQualName (state, action) {
      return {
        ...state,
        ...action.payload,
      }
    },
    onFilterChange (state, action) {
      console.log('------onChangeFilter------')
      console.log(action.payload)
      const { queryData } = action.payload
      return {
        ...state,
        queryData,
      }
    },

    setCreateModelVisible (state, action) {
      return {
        ...state,
        ...action.payload,
      }
    },

    editQual (state, action) {
      return {
        ...state,
        ...action.payload,
        createModelVisible: true,
      }
    },
  },
}
