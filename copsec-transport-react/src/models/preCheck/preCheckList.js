import { message } from 'antd'
import { config } from '../../utils'
import docHtml from '../../utils/docHtml'
import {saveAdvice, getAdvice,getCheckListTableDataSource, saveCheckList,getdocs,getAdviceList,getMaterial,getMaterialList} from '../../services/preCheck'

const { defaultPageSize } = config

export default {
  namespace: 'preCheckList',
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
    adviceListVisible:false,
    checkModalVisible:false,
    adviceModalVisible:false,
    preAdviceVisible:false,
    advice:'',
    adviceList:[],
    docKey:'',
    checkItem: [],//审查材料数据
    docHtml:'',//审查文档
    editObj:null,
    detailVisible: false,
    detailObj:null,
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/license/preCheckList') {
          dispatch({
            type: 'getCheckListTableDataSource',
            payload: location.query,
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
    * saveAdvice({ payload }, { call, put }){
      let  data = yield call(saveAdvice, payload)
      if(data.success){
        let gdata = yield call(getAdvice,{id: payload.acceptedid})

        yield put({ type: 'hideAdviceModal' ,
          payload: {
          adviceList:gdata.rows,
        }})
        message.success('材料审核意见保存成功！');

      }

    },
    * getAdviceList({ payload }, { call, put }){

      let data = yield call(getAdvice, payload.currentItem)
      if(data.success){
        yield put({
          type: 'showPreAdvice',
          payload: {
            adviceList:data.rows,
          }
        })
      }else {
        yield put({ type: 'HideLoading' })
        let error = { message: data.message }
        throw (error) // 抛出错误信息，交给dva处理
      }
    },
    * checkLicense({ payload }, { call, put }){

      let data = yield call(getAdvice, payload.currentItem)
      if(data.success){
        yield put({
          type: 'showCheckModal',
          payload: {
            currentItem: payload.currentItem,
            adviceList:data.rows,
          }
        })
      }else {
        yield put({ type: 'HideLoading' })
        let error = { message: data.message }
        throw (error) // 抛出错误信息，交给dva处理
      }


    },
    * workAdvice({ payload }, { call, put }){

      let data = yield call(getMaterialList, payload.id)

      if(data.success){
        yield put({
          type: 'showAdviceModal',
          payload: {
            adviceList:data.rows,
            currentItem:payload
          }
        })
      }else {
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
    * getMaterial({ payload }, { call, put }){
      let data = yield call(getdocs, payload.currentItem.id)
      if(data.success){
        const rows = data.rows;
        let docKey = '';
        let docHtml = '';

        if(rows != null && rows.length  > 0){
          let {children} = rows[0];
          if(children != null && children.length  > 0){
            docKey = children[0];
            docHtml = docKey.html;
          }
        }

        yield put({
          type: 'showMaterialModal',
          payload: {
            currentItem: payload.currentItem,
            checkItem:rows,
            docKey:docKey,
            docHtml:docHtml
          }
        })
      }else {
        yield put({ type: 'HideLoading' })
        let error = { message: data.message }
        throw (error) // 抛出错误信息，交给dva处理
      }
    },
    * updateDocHtml ({ payload }, { call, put }) {
      yield put({type:'setDocHtml',payload:{...payload}});
    },
  },

  reducers: {
    setDocHtml(state,action){
      return{
        ...state,
        ...action.payload,
      }
    },
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

    setDocKey (state,action){
      const {key,advice}=action.payload
      return { ...state,docKey:key,advice:advice}
    },
    setCreateModelVisible (state, action) {
      return {
        ...state,
        ...action.payload,
      }
    },
    showCheckModal (state,action) {

      return { ...state,...action.payload, checkModalVisible: true }
    },

    hideCheckModal (state) {
      return { ...state, checkModalVisible: false }
    },
    showMaterialModal(state,action){
      return {
        ...state,
        ...action.payload,
        materialModalVisible:true,
      }
    },
    hideMaterialModal(state,action){
      return{
        ...state,
        materialModalVisible:false,
      }
    },
    showAdviceModal (state,action) {
      return { ...state,...action.payload, adviceModalVisible: true }
    },
    hideAdviceModal (state,action) {
      return { ...state,...action.payload, adviceModalVisible: false }
    },
    showPreAdvice(state,action){
      return { ...state,...action.payload, preAdviceVisible: true }
    },
    hidePreAdvice (state,action) {
      return { ...state,...action.payload, preAdviceVisible: false }
    },
    setDetailVisible (state, action) {
      return {
        ...state,
        ...action.payload,
      }
    },
  },
}
