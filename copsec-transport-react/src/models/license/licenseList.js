import { message } from 'antd'
import { config } from '../../utils'
import license from '../../utils/license'
import licenseCheck from '../../utils/licenseCheck'
import docHtml from '../../utils/docHtml'
import { getLicenseTableDataSource,saveApply,saveIssue ,showCompany,saveCollectCheck,chiefsCheck,directorCheck,getMaterial,getMaterialList,createLicense, acceptTask,saveAdvice, backTask, getCompleteUser, matchToUser, deleteLicense } from '../../services/license'


const { defaultPageSize } = config

export default {
  namespace: 'licenseList',
  state: {
    licenseTableDataSource: [],  // 用来保存列表数据
    licenseTableLoading: false,  // 控制表格加载效果
    txtLicenseName: null,  // 用来保存文本框输入的值
    pagination: {
      showSizeChanger: true,  // 是否可以改变 pageSize
      showQuickJumper: true,  // 是否可以快速跳转至某页
      showTotal: total => `共 ${total} 条`, // 用于显示数据总量和当前数据顺序
      current: 1, // 当前页数
      total: 0,  // 数据总数
    },  // 用来保存翻页控件的信息
    createModelVisible: false,//修改
    matchModalVisible: false,//分配
    checkModalVisible: false,//审查
    adviceModalVisible:false,//填写意见
    collectModalVisible:false,//司集体审查
    issueModalVisible:false,//发证
    chiefsModelVisible:false,
    checkNodeVisible:false,//流程节点
    goverVisible: false,
    adminVisible: false,
    companyVisible:false,
    company:null,
    advice:'',
    adviceList:[],
    searchItem:[],
    docKey:'',
    checkItem: [],//审查材料数据
    docHtml:docHtml,//审查文档
    editObj: null,
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/license/licenseList') {
          dispatch({
            type: 'getLicenseTableDataSource',
            payload: location.query,
          })
        }
      })
    },
  },

  effects: {
    * getLicenseTableDataSource ({ payload }, { call, put }) {
      yield put({ type: 'showLoading' })  // 显示加载遮罩

     const data = yield call(getLicenseTableDataSource, payload)  // 调用远程服务获取结果
      if (data.success) { // 判断获取结果是否成功
        yield put({
          type: 'getLicenseTableDataSourceSuccess',
          payload: {
            licenseTableDataSource:data.rows,
            pagination: {
              current: typeof (payload.currentPage) === 'undefined' ? 1 : Number(payload.currentPage),
              pageSize: typeof (payload.pageSize) === 'undefined' ? defaultPageSize : Number(payload.pageSize),
              total: data.rowsTotal,
            },
            licenseTableLoading: false,
          },
        })  // 将返回结果赋值给state
      } else {
        yield put({ type: 'HideLoading' })
        let error = { message: data.message }
        throw (error) // 抛出错误信息，交给dva处理
      }
    },
    * onAcceptItem({ payload }, { call, put }){
      const data = yield call(acceptTask, payload.currentItem.id)
      if (data.success) { // 判断获取结果是否成功
         yield put({ type: 'getLicenseTableDataSource', payload: {} })
      }else {
        yield put({ type: 'HideLoading' })
        let error = { message: data.message }
        throw (error) // 抛出错误信息，交给dva处理
      }
    },
    * onBackItem({ payload }, { call, put }){
      const data = yield call(backTask, payload)
      if (data.success) { // 判断获取结果是否成功
         yield put({ type: 'getLicenseTableDataSource', payload: {} })
      }else {
        yield put({ type: 'HideLoading' })
        let error = { message: data.message }
        throw (error) // 抛出错误信息，交给dva处理
      }
    },
    * saveAdvice({ payload }, { call, put }){
      let  data = yield call(saveAdvice, payload.materail)
      if(data.success){
        yield put({ type: 'setDocKeySuccess', payload: {key:data.id,advice:data.advice} })
        yield call(getMaterial, payload.applyid)
        message.success('材料审核意见保存成功！');

      }

    },
    * showCompany({ payload }, { call, put }){

      let data = yield call(showCompany, payload)

      if (data.success) { // 判断获取结果是否成功

        yield put({ type: 'showCompanyVisible', payload: { company:data.rows[0],companyVisible:true} })

      } else {
        yield put({ type: 'HideLoading' })
        let error = { message: data.message }
        throw (error) // 抛出错误信息，交给dva处理
      }

    },
    * saveApply({ payload }, { call, put }){
      console.log('-----------材料审查建议-----------------')
      console.log(payload)
      let  data = yield call(saveApply, payload)
      if (data.success) { // 判断获取结果是否成功
        yield put({ type: 'hideAdviceModal', payload: { adviceModalVisible: false} })
        yield put({ type: 'hideCheckModal', payload: { checkModalVisible: false} })
        yield put({ type: 'getLicenseTableDataSource', payload: {} })
        message.success('材料审核成功！');
      }else {
        yield put({ type: 'HideLoading' })
        let error = { message: data.message }
        throw (error) // 抛出错误信息，交给dva处理
      }

    },
    * matchToUser({ payload }, { call, put }){

      let  data = yield call(matchToUser, payload.apply)
      if (data.success) { // 判断获取结果是否成功
        yield put({ type: 'hideMatchModal', payload: { matchModalVisible: false, editObj: null } })
        yield put({ type: 'getLicenseTableDataSource', payload: {} })
      }else {
        yield put({ type: 'HideLoading' })
        let error = { message: data.message }
        throw (error) // 抛出错误信息，交给dva处理
      }
    },
    * checkLicense({ payload }, { call, put }){
      let data = yield call(getMaterial, payload.currentItem.id)
      if(data.success){
        yield put({
          type: 'showCheckModal',
          payload: {
            currentItem: payload.currentItem,
            checkItem:data.rows,
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
    * saveLicense ({ payload }, { call, put }) {

      let  data
      if(payload.reviewType==3){
        data = yield call(chiefsCheck, payload)
      }else{
        data = yield call(directorCheck, payload)
      }

      if (data.success) { // 判断获取结果是否成功
        yield put({ type: 'hideModal'})
        yield put({ type: 'getLicenseTableDataSource', payload: {} })
      } else {
        yield put({ type: 'HideLoading' })
        let error = { message: data.message }
        throw (error) // 抛出错误信息，交给dva处理
      }
    },
    * saveCollectCheck({ payload }, { call, put }){
      let data = yield call(saveCollectCheck, payload)
      if (data.success) { // 判断获取结果是否成功
        yield put({ type: 'hideCollectModal'})
        yield put({ type: 'getLicenseTableDataSource', payload: {} })
      } else {
        yield put({ type: 'HideLoading' })
        let error = { message: data.message }
        throw (error) // 抛出错误信息，交给dva处理
      }
    },
    * saveIssue({ payload }, { call, put }){
      let data = yield call(saveIssue, payload)
      if (data.success) { // 判断获取结果是否成功
        yield put({ type: 'hideIssueModal'})
        yield put({ type: 'getLicenseTableDataSource', payload: {} })
      } else {
        yield put({ type: 'HideLoading' })
        let error = { message: data.message }
        throw (error) // 抛出错误信息，交给dva处理
      }
    },
    * getCompleteUser({ payload }, { call, put }){
      let data = yield call(getCompleteUser, payload)

      if (data.success) { // 判断获取结果是否成功
         yield put({ type: 'getCompleteUserSuccess', payload: {searchItem:data.rows} })
      } else {
        yield put({ type: 'HideLoading' })
        let error = { message: data.message }
        throw (error) // 抛出错误信息，交给dva处理
      }
    },
    *setDocKey({ payload }, { call, put }){

      yield put({
        type: 'setDocKeySuccess',
        payload: payload
      })
    },
    * deleteLicense ({ payload }, { call, put }) {
      let data = yield call(deleteLicense, payload)
      if (data.success) { // 判断获取结果是否成功
        yield put({ type: 'setCreateModelVisible', payload: { createModelVisible: false, editObj: null } })
        yield put({ type: 'getLicenseTableDataSource', payload: {} })
      } else {
        yield put({ type: 'HideLoading' })
        let error = { message: data.message }
        throw (error) // 抛出错误信息，交给dva处理
      }
    },
  },

  reducers: {
    getLicenseTableDataSourceSuccess (state, action) {
      const { licenseTableDataSource, pagination, licenseTableLoading } = action.payload // 从payload中展开需要的属性
      return {
        ...state,
        licenseTableDataSource,
        licenseTableLoading,
        pagination: {
          ...state.pagination,
          ...pagination,
        },
      } // 展开原有state，并赋值新的属性值
    },
    getCompleteUserSuccess(state,action){
      return { ...state,...action.payload}
    },
    showModal (state,action) {
      return { ...state,...action.payload,  modalVisible: true }
    },

    hideModal (state) {
      return { ...state, modalVisible: false }
    },
    setDocKeySuccess (state,action){
      const {key,advice}=action.payload
      return { ...state,docKey:key,advice:advice}
    },
    showMatchModal (state,action) {
      return { ...state,...action.payload,  matchModalVisible: true }
    },

    hideMatchModal (state) {
      return { ...state, matchModalVisible: false }
    },
    showCheckModal (state,action) {
      const docKey = action.payload.checkItem[0].key
      const advice = action.payload.checkItem[0].advice
      return { ...state,...action.payload, docKey:docKey,advice:advice, checkModalVisible: true }
    },

    hideCheckModal (state) {
      return { ...state, checkModalVisible: false }
    },

    showAdviceModal(state,action){

      const {adviceList,currentItem}={...action.payload}
      console.log('-----------提交11111--------------')
      console.log(adviceList)
      return { ...state, adviceList:adviceList,currentItem:currentItem, adviceModalVisible: true }
    },
    hideAdviceModal (state) {
      return { ...state, adviceModalVisible: false }
    },

    showCollectModel(state,action){

      return { ...state, ...action.payload, collectModalVisible: true }

    },
    hideCollectModal (state) {

      return { ...state, collectModalVisible: false }
    },
    showIssueModal(state,action){

      return { ...state,...action.payload,issueModalVisible: true }
    },
    hideIssueModal (state) {

      return { ...state, issueModalVisible: false }
    },
    showLoading (state) {
      return {
        ...state,
        licenseTableLoading: true, // 显示表格加载状态
      }
    },
    showCheckNode(state,action){
      return { ...state,...action.payload,checkNodeVisible: true }
    },
    hideCheckNode (state) {

      return { ...state, checkNodeVisible: false }
    },
    HideLoading (state) {
      return {
        ...state,
        licenseTableLoading: false,  // 关闭表格加载状态
      }
    },

    onChangeLicenseName (state, action) {
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
    changeCheck(state, action){
      return {
        ...state,
        ...action.payload,
      }

    },
    showCompanyVisible(state, action){
      console.log('--------企业信息---------')
      console.log(...action.payload)
      return {
        ...state,
        ...action.payload,
        companyVisible:true
      }

    },
    hideCompanyVisible(state){
      return {
        ...state,
        companyVisible:false
      }

    },
    editLicense (state, action) {
      return {
        ...state,
        ...action.payload,
        createModelVisible: true,
      }
    },
  },
}
