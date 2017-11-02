import { config } from '../../utils'
import { getCheckListTableDataSource, getAdviceList,saveCheckList} from '../../services/checkList'

const { defaultPageSize } = config

export default {
  namespace: 'checkList',//审查清单列表
  state: {
    checkListTableDataSource: [],  // 用来保存列表数据
    checkListTableLoading: false,  // 控制表格加载效果
    pagination: {
      showSizeChanger: true,  // 是否可以改变 pageSize
      showQuickJumper: true,  // 是否可以快速跳转至某页
      showTotal: total => `共 ${total} 条`, // 用于显示数据总量和当前数据顺序
      current: 1, // 当前页数
      total: 0,  // 数据总数
    },  // 用来保存翻页控件的信息
    createModelVisible: false,
    editObj:null,
    detailVisible: false,
    detailObj:[],
    adviceList:[],
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/checkList/checkList') {
          dispatch({
            type: 'getCheckListTableDataSource',
            payload:location.query,
          })
        }
      })
    },
  },

  effects: {
    * getCheckListTableDataSource ({ payload }, { call, put }) {
      yield put({ type: 'showLoading' })  // 显示加载遮罩
      const data = yield call(getCheckListTableDataSource, payload)  // 调用远程服务获取结果
      if (data.success) { // 判断获取结果是否成功
        yield put({
          type: 'getCheckListTableDataSourceSuccess',
          payload: {
            checkListTableDataSource: data.rows,
            pagination: {
              current: typeof (payload.currentPage) === 'undefined' ? 1 : Number(payload.currentPage),
              pageSize: typeof (payload.pageSize) === 'undefined' ? defaultPageSize : Number(payload.pageSize),
              total: data.rowsTotal,
            },
            checkListTableLoading: false,
          },
        })  // 将返回结果赋值给state
      } else {
        yield put({ type: 'HideLoading' })
        let error = { message: data.message }
        throw (error) // 抛出错误信息，交给dva处理
      }
    },
    * getAdvice({ payload }, { call, put }){
      const {currentItem,detailVisible}=payload
      let data = yield call(getAdviceList,currentItem.applyid)
      if (data.success) { // 判断获取结果是否成功
        yield put({
          type: 'setDetailVisible',
          payload:{
            detailVisible:true,
            adviceList:data.rows
        } })
      } else {
        yield put({ type: 'HideLoading' })
        let error = { message: data.message }
        throw (error) // 抛出错误信息，交给dva处理
      }
    },


    * saveCheckList ({ payload }, { call, put }) {
      const { checkList, isCreate } = payload
      let data
      if (isCreate) {
        data = yield call(saveCheckList, checkList)  // 调用远程服务获取结果
      } else {
        data = yield call(updateCheckList, checkList)
      }

      if (data.success) { // 判断获取结果是否成功
        yield put({ type: 'setCreateModelVisible', payload: { createModelVisible: false, editObj: null } })
        yield put({ type: 'getCheckListTableDataSource', payload: {} })
      } else {
        yield put({ type: 'HideLoading' })
        let error = { message: data.message }
        throw (error) // 抛出错误信息，交给dva处理
      }
    },
  },

  reducers: {
    getCheckListTableDataSourceSuccess (state, action) {
      const { checkListTableDataSource, pagination, checkListTableLoading } = action.payload // 从payload中展开需要的属性
       return {
        ...state,
        checkListTableDataSource,
        checkListTableLoading,
        pagination: {
          ...state.pagination,
          ...pagination,
        },
      } // 展开原有state，并赋值新的属性值
    },

    showLoading (state) {
      return {
        ...state,
        checkListTableLoading: true, // 显示表格加载状态
      }
    },

    HideLoading (state) {
      return {
        ...state,
        checkListTableLoading: false,  // 关闭表格加载状态
      }
    },

    setCreateModelVisible (state, action) {

      return {
        ...state,
        ...action.payload,

      }
    },

    setDetailVisible (state, action) {

      const {adviceList,detailVisible}= action.payload

      return {
        ...state,
         adviceList,
         detailVisible
      }
    },
  },
}
