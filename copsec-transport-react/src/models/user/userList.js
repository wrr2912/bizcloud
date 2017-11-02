import { config } from '../../utils/index'
import { getUserTableDataSource, saveUser, deleteUser } from '../../services/sysuser'

const { defaultPageSize } = config

export default {
  namespace: 'userList',
  state: {
    userTableDataSource: [],  // 用来保存列表数据
    userTableLoading: false,  // 控制表格加载效果
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
        if (location.pathname === '/user/userList') {
          dispatch({
            type: 'getUserTableDataSource',
            payload: location.query,
          })
        }
      })
    },
  },

  effects: {
    * getUserTableDataSource ({ payload }, { call, put }) {
      console.log('----getUserTableDataSource----')
      console.log(payload)
      yield put({ type: 'showLoading' })  // 显示加载遮罩
      const data = yield call(getUserTableDataSource, payload)  // 调用远程服务获取结果
      if (data.success) { // 判断获取结果是否成功
        yield put({
          type: 'getUserTableDataSourceSuccess',
          payload: {
            userTableDataSource: data.rows,
            pagination: {
              current: typeof (payload.currentPage) === 'undefined' ? 1 : Number(payload.currentPage),
              pageSize: typeof (payload.pageSize) === 'undefined' ? defaultPageSize : Number(payload.pageSize),
              total: data.rowsTotal,
            },
            userTableLoading: false,
          },
        })  // 将返回结果赋值给state
      } else {
        yield put({ type: 'HideLoading' })
        let error = { message: data.message }
        throw (error) // 抛出错误信息，交给dva处理
      }
    },

    * saveUser ({ payload }, { call, put }) {
      let data = yield call(saveUser, payload)
      if (data.success) { // 判断获取结果是否成功
        yield put({ type: 'setCreateModelVisible', payload: { modalVisible: false, editObj: null } })
        yield put({ type: 'getUserTableDataSource', payload: {} })
      } else {
        yield put({ type: 'HideLoading' })
        let error = { message: data.message }
        throw (error) // 抛出错误信息，交给dva处理
      }
    },
    * deleteUser ({ payload }, { call, put }) {
      let data = yield call(deleteUser, payload)
      if (data.success) { // 判断获取结果是否成功
        yield put({ type: 'setCreateModelVisible', payload: { modalVisible: false, editObj: null } })
        yield put({ type: 'getUserTableDataSource', payload: {} })
      } else {
        yield put({ type: 'HideLoading' })
        let error = { message: data.message }
        throw (error) // 抛出错误信息，交给dva处理
      }
    },
  },

  reducers: {
    getUserTableDataSourceSuccess (state, action) {
      const { userTableDataSource, pagination, userTableLoading } = action.payload // 从payload中展开需要的属性
      return {
        ...state,
        userTableDataSource,
        userTableLoading,
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
        userTableLoading: true, // 显示表格加载状态
      }
    },

    HideLoading (state) {
      return {
        ...state,
        userTableLoading: false,  // 关闭表格加载状态
      }
    },

    onChangeUserName (state, action) {
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

    editUser (state, action) {
      return {
        ...state,
        ...action.payload,
        createModelVisible: true,
      }
    },
  },
}
