import { config } from '../../utils/index'
import { getRulesTableDataSource, saveRules, deleteRules, setRules, getRulesByType } from '../../services/rules'

const { defaultPageSize } = config

export default {
  namespace: 'rulesList',
  state: {
    rulesTableDataSource: [],  // 用来保存列表数据
    rulesTableLoading: false,  // 控制表格加载效果
    queryData:{

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
    isMotion: false
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/rules/rulesList') {
          dispatch({
            type: 'getRulesTableDataSource',
            payload: location.query,
          }),
          dispatch({
              type: 'getRules',
              payload:{},
          })
        }
      })
    },
  },

  effects: {
    * getRulesTableDataSource ({ payload }, { call, put }) {
      console.log('----getRulesTableDataSource----')
      console.log(payload)
      yield put({ type: 'showLoading' })  // 显示加载遮罩
      const data = yield call(getRulesTableDataSource, payload)  // 调用远程服务获取结果
      if (data.success) { // 判断获取结果是否成功
        yield put({
          type: 'getRulesTableDataSourceSuccess',
          payload: {
            rulesTableDataSource: data.rows,
            pagination: {
              current: typeof (payload.currentPage) === 'undefined' ? 1 : Number(payload.currentPage),
              pageSize: typeof (payload.pageSize) === 'undefined' ? defaultPageSize : Number(payload.pageSize),
              total: data.rowsTotal,
            },
            rulesTableLoading: false,
          },
        })  // 将返回结果赋值给state
      } else {
        yield put({ type: 'HideLoading' })
        let error = { message: data.message }
        throw (error) // 抛出错误信息，交给dva处理
      }
    },

    * saveRules ({ payload }, { call, put }) {
      let data = yield call(saveRules, payload)
      if (data.success) { // 判断获取结果是否成功
        yield put({ type: 'setCreateModelVisible', payload: { modalVisible: false, editObj: null } })
        yield put({ type: 'getRulesTableDataSource', payload: {} })
      } else {
        yield put({ type: 'HideLoading' })
        let error = { message: data.message }
        throw (error) // 抛出错误信息，交给dva处理
      }
    },
    *getRules({ payload }, { call, put }){
      let data = yield call(getRulesByType, payload)
      console.log('---------规则设置---------')
      console.log(data.row.synDate)

      if (data.success) { // 判断获取结果是否成功
        yield put({ type: 'switchIsMotion', payload: {isMotion : data.row.synDate} })
      }else {
        yield put({ type: 'HideLoading' })
        let error = { message: data.message }
        throw (error) // 抛出错误信息，交给dva处理
      }
    },
    *setting({ payload }, { select, call, put }){
      let type = yield select(state => state.rulesList.isMotion);
       console.log('---------规则设置1---------')
       console.log(type)
      if(type){
         type = false
      }else{
         type = true
      }
      console.log('---------规则设置2---------')
      console.log(type)
      let data = yield call(setRules, {type})
      if (data.success) { // 判断获取结果是否成功
        yield put({ type: 'switchIsMotion', payload: {isMotion : type} })
      } else {
        yield put({ type: 'HideLoading' })
        let error = { message: data.message }
        throw (error) // 抛出错误信息，交给dva处理
      }
    },
    * deleteRules ({ payload }, { call, put }) {

      let data = yield call(deleteRules, payload)
      if (data.success) { // 判断获取结果是否成功
        yield put({ type: 'setCreateModelVisible', payload: { modalVisible: false, editObj: null } })
        yield put({ type: 'getRulesTableDataSource', payload: {} })
      } else {
        yield put({ type: 'HideLoading' })
        let error = { message: data.message }
        throw (error) // 抛出错误信息，交给dva处理
      }
    },
  },

  reducers: {
    getRulesTableDataSourceSuccess (state, action) {
      const { rulesTableDataSource, pagination, rulesTableLoading } = action.payload // 从payload中展开需要的属性
      return {
        ...state,
        rulesTableDataSource,
        rulesTableLoading,
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
        rulesTableLoading: true, // 显示表格加载状态
      }
    },

    HideLoading (state) {
      return {
        ...state,
        rulesTableLoading: false,  // 关闭表格加载状态
      }
    },

    onChangeRulesName (state, action) {
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
    switchIsMotion (state ,action) {
      console.log(...state)
      console.log(...action.payload)
      return { ...state,  ...action.payload, }
    },
    editRules (state, action) {
      return {
        ...state,
        ...action.payload,
        createModelVisible: true,
      }
    },
  },
}
