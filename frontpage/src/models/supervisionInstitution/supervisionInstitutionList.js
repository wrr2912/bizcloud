import { config } from '../../utils'
import { getSupervisionInstitutionTableDataSource, createSupervisionInstitution, updateSupervisionInstitution, deleteSupervisionInstitution} from '../../services/supervisionInstitution'

const { defaultPageSize } = config

export default {
  namespace: 'supervisionInstitutionList',
  state: {
    supervisionInstitutionTableDataSource: [],  // 用来保存列表数据
    supervisionInstitutionTableLoading: false,  // 控制表格加载效果
    txtUnitName: null,  // 用来保存文本框输入的值
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

  subscriptions: {//监听路径变化
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/supervisionInstitution/supervisionInstitutionList') {
          dispatch({
            type: 'getSupervisionInstitutionTableDataSource',
            payload: {},
          })
        }
      })
    },
  },

  effects: {
    * getSupervisionInstitutionTableDataSource ({ payload }, { call, put }) {
      yield put({ type: 'showLoading' })  // 显示加载遮罩
      const data = yield call(getSupervisionInstitutionTableDataSource, payload)  // 调用远程服务获取结果
      if (data.success) { // 判断获取结果是否成功
        yield put({
          type: 'getSupervisionInstitutionTableDataSourceSuccess',
          payload: {
            supervisionInstitutionTableDataSource: data.rows,
            pagination: {
              current: typeof (payload.currentPage) === 'undefined' ? 1 : Number(payload.currentPage),
              pageSize: typeof (payload.pageSize) === 'undefined' ? defaultPageSize : Number(payload.pageSize),
              total: data.rowsTotal,
            },
            supervisionInstitutionTableLoading: false,
          },
        })  // 将返回结果赋值给state
      } else {
        yield put({ type: 'HideLoading' })
        let error = { message: data.message }
        throw (error) // 抛出错误信息，交给dva处理
      }
    },

    * saveSupervisionInstitution ({ payload }, { call, put }) {
      const { supervisionInstitution, isCreate } = payload
      let data
      if (isCreate) {
        data = yield call(createSupervisionInstitution, supervisionInstitution)  // 调用远程服务获取结果
      } else {
        data = yield call(updateSupervisionInstitution, supervisionInstitution)
      }

      if (data.success) { // 判断获取结果是否成功
        yield put({ type: 'setCreateModelVisible', payload: { createModelVisible: false, editObj: null } })
        yield put({ type: 'getSupervisionInstitutionTableDataSource', payload: {} })
      } else {
        yield put({ type: 'HideLoading' })
        let error = { message: data.message }
        throw (error) // 抛出错误信息，交给dva处理
      }
    },

    * deleteSupervisionInstitution ({ payload }, { call, put }) {
      let data = yield call(deleteSupervisionInstitution, payload)
      if (data.success) { // 判断获取结果是否成功
        yield put({ type: 'setCreateModelVisible', payload: { createModelVisible: false, editObj: null } })
        yield put({ type: 'getSupervisionInstitutionTableDataSource', payload: {} })
      } else {
        yield put({ type: 'HideLoading' })
        let error = { message: data.message }
        throw (error) // 抛出错误信息，交给dva处理
      }
    },
  },

  reducers: {
    getSupervisionInstitutionTableDataSourceSuccess (state, action) {
      const { supervisionInstitutionTableDataSource, pagination, supervisionInstitutionTableLoading } = action.payload // 从payload中展开需要的属性
      return {
        ...state,
        supervisionInstitutionTableDataSource,
        supervisionInstitutionTableLoading,
        pagination: {
          ...state.pagination,
          ...pagination,
        },
      } // 展开原有state，并赋值新的属性值
    },

    showLoading (state) {
      return {
        ...state,
        supervisionInstitutionTableLoading: true, // 显示表格加载状态
      }
    },

    HideLoading (state) {
      return {
        ...state,
        supervisionInstitutionTableLoading: false,  // 关闭表格加载状态
      }
    },

    onChangeUnitName (state, action) {
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

    editSupervisionInstitution (state, action) {
      return {
        ...state,
        ...action.payload,
        createModelVisible: true,
      }
    },
  },
}
