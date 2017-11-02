import { config } from '../../utils/index'
import { getRoleTableDataSource, saveRole, deleteRole } from '../../services/role'
import { getMgrMenus } from '../../services/menus'
const { defaultPageSize } = config

export default {
  namespace: 'roleList',
  state: {
    roleTableDataSource: [],  // 用来保存列表数据
    menuList: [],
    roleTableLoading: false,  // 控制表格加载效果
    queryData:{
      roleName: "",
    },
    pagination: {
      showSizeChanger: true,  // 是否可以改变 pageSize
      showQuickJumper: true,  // 是否可以快速跳转至某页
      showTotal: total => `共 ${total} 条`, // 用于显示数据总量和当前数据顺序
      current: 1, // 当前页数
      total: 0,  // 数据总数
    },  // 用来保存翻页控件的信息
    modalVisible: false,
    editObj: null,
  },

  subscriptions: {

    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/role/roleList') {
          dispatch({
            type: 'getRoleTableDataSource',
            payload: location.query,
          })
        }
      })
    },
  },

  effects: {
    * getRoleTableDataSource ({ payload }, { call, put }) {
      console.log('----getRoleTableDataSource----')
      console.log(payload)
      yield put({ type: 'showLoading' })  // 显示加载遮罩
      const data = yield call(getRoleTableDataSource, payload)  // 调用远程服务获取结果
      if (data.success) { // 判断获取结果是否成功
        yield put({
          type: 'getRoleTableDataSourceSuccess',
          payload: {
            roleTableDataSource: data.rows,
            pagination: {
              current: typeof (payload.currentPage) === 'undefined' ? 1 : Number(payload.currentPage),
              pageSize: typeof (payload.pageSize) === 'undefined' ? defaultPageSize : Number(payload.pageSize),
              total: data.rowsTotal,
            },
            roleTableLoading: false,
          },
        })  // 将返回结果赋值给state
      } else {
        yield put({ type: 'HideLoading' })
        let error = { message: data.message }
        throw (error) // 抛出错误信息，交给dva处理
      }
    },
    *showModal1 ({ payload }, { call, put }) {
      let data = yield call(getMgrMenus, payload.roleId)
      if (data.success && data.rows) {
        console.log(data.rows)
        yield put({ type: 'showModalSuccess',
          payload: {
            menuList: data.rows,
            roleTableLoading: false,
          },
        })
      }
    },
    * saveRole ({ payload }, { call, put }) {
      let data = yield call(saveRole, payload)
      if (data.success) { // 判断获取结果是否成功
        yield put({ type: 'setCreateModelVisible', payload: { modalVisible: false, editObj: null } })
        yield put({ type: 'getRoleTableDataSource', payload: {} })
      } else {
        yield put({ type: 'HideLoading' })
        let error = { message: data.message }
        throw (error) // 抛出错误信息，交给dva处理
      }
    },
    * deleteRole ({ payload }, { call, put }) {
      let data = yield call(deleteUser, payload)
      if (data.success) { // 判断获取结果是否成功
        yield put({ type: 'setCreateModelVisible', payload: { modalVisible: false, editObj: null } })
        yield put({ type: 'getRoleTableDataSource', payload: {} })
      } else {
        yield put({ type: 'HideLoading' })
        let error = { message: data.message }
        throw (error) // 抛出错误信息，交给dva处理
      }
    },
  },

  reducers: {
    getRoleTableDataSourceSuccess (state, action) {
      const { roleTableDataSource, pagination, roleTableLoading } = action.payload // 从payload中展开需要的属性
      return {
        ...state,
        roleTableDataSource,
        roleTableLoading,
        pagination: {
          ...state.pagination,
          ...pagination,
        },
      } // 展开原有state，并赋值新的属性值
    },
    showModalSuccess (state, action) {
      const { menuList, roleTableLoading } = action.payload
      console.log('-------showModalSuccess--------')
      console.log(menuList)
      console.log('-------showModalSuccess----end----')
      return { ...state, menuList, roleTableLoading,  modalVisible: true }
    },
    showModal (state, action) {

      return { ...state,  modalVisible: true }
    },
    hideModal (state) {
      return { ...state, modalVisible: false }
    },
    showLoading (state) {
      return {
        ...state,
        roleTableLoading: true, // 显示表格加载状态
      }
    },

    HideLoading (state) {
      return {
        ...state,
       roleTableLoading: false,  // 关闭表格加载状态
      }
    },

    onChangeRoleName (state, action) {
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

    editRole (state, action) {
      return {
        ...state,
        ...action.payload,
        modalVisible: true,
      }
    },
  },
}
