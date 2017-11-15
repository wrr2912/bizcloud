import { getCheckListTableDataSource, getAdviceList,saveCheckList} from '../../services/checkList'
import { createMinutes} from '../../services/minutes'
import { config } from '../../utils'
const {defaultPageSize} = config
export default {
  namespace: 'meetingList',
  state: {
    meetingTableDataSource: [],  // 用来保存列表数据
    pagination: {
      showSizeChanger: true,  // 是否可以改变 pageSize
      showQuickJumper: true,  // 是否可以快速跳转至某页
      showTotal: total => `共 ${total} 条`, // 用于显示数据总量和当前数据顺序
      current: 1, // 当前页数
      total: 0,  // 数据总数
    },  // 用来保存翻页控件的信息
    createModalVisible: false,//修改
    loading:false,
  },

  effects: {
    * showCreateModal({payload},{call,put}){
      yield put({type:'getTableDataSource',payload:{}});

    },
    * getTableDataSource ({ payload }, { call, put }) {
      yield put({type:'showLoading',payload:{}});
      const data = yield call(getCheckListTableDataSource, payload)  // 调用远程服务获取结果
      if (data.success) { // 判断获取结果是否成功
        const {currentPage,pageSize} = payload
        yield put({
          type: 'getTableDataSourceSuccess',
          payload: {
            meetingListTableDataSource: data.rows,
            pagination: {
              current: typeof (currentPage) === 'undefined' ? 1 : Number(currentPage),
              pageSize: typeof (pageSize) === 'undefined' ? defaultPageSize : Number(pageSize),
              total: data.rowsTotal,
            },
            loading:false,
            createModalVisible:true,
          },
        })  // 将返回结果赋值给state
      } else {
        yield put({type:'hideLoading',payload:{}});
        let error = { message: data.message }
        throw (error) // 抛出错误信息，交给dva处理
      }
    },
    * removeFromTable({payload},{put,call}){
      yield put({type:'remove',payload:{...payload}});
    },
    * saveMinutes ({ payload }, { call, put }) {
      const { minutes, isCreate } = payload
      let data
      if (isCreate) {
        data = yield call(createMinutes, minutes)  // 调用远程服务获取结果
      }
      if (data.success) { // 判断获取结果是否成功
        yield put({ type: 'hideModal' })
      } else {
        yield put({ type: 'hideLoading' })
        let error = { message: data.message }
        throw (error) // 抛出错误信息，交给dva处理
      }
    },
  },

  reducers: {
    getTableDataSourceSuccess (state, action) {
      const { meetingListTableDataSource, pagination ,createModalVisible,loading} = action.payload // 从payload中展开需要的属性
      return {
        ...state,
        meetingListTableDataSource,
        pagination: {
          ...state.pagination,
          ...pagination,
        },
        createModalVisible,
        loading,
      } // 展开原有state，并赋值新的属性值
    },
    remove(state,action){
      return{
        ...state,
        meetingListTableDataSource:state.meetingListTableDataSource.filter(record => record.id !== action.payload.id),
      }
    },
    showModal(state,action){
      return{
        ...state,
        createModalVisible:true,
      }
    },
    hideModal(state,action){
      return{
        ...state,
        createModalVisible:false,
      }
    },
    showLoading(state,action){
      return {
        ...state,
        loading: true,
      }
    },
    hideLoading(state,action){
      return{
        ...state,
        loading:false,
      }
    }
  },
}
