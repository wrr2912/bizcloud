import { config } from '../../utils'
import licenseCheck from '../../utils/licenseCheck'
import docHtml from '../../utils/docHtml'
import { getDocTableDataSource, createLicense, acceptTask, backTask, getCompleteUser, matchToUser, deleteLicense } from '../../services/licenseCheck'

const { defaultPageSize } = config

export default {
  namespace: 'licenseCheck',
  state: {
    contentHtml:docHtml,
    docTableDataSource: [],  // 用来保存列表数据
    docTableLoading: false,  // 控制表格加载效果
    treeData: [],
    materailName:'',
    docName:'',
    pagination: {
      showSizeChanger: true,  // 是否可以改变 pageSize
      showQuickJumper: true,  // 是否可以快速跳转至某页
      showTotal: total => `共 ${total} 条`, // 用于显示数据总量和当前数据顺序
      current: 1, // 当前页数
      total: 0,  // 数据总数
    },  // 用来保存翻页控件的信息

  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
       // if (location.pathname === '/license/check/:id') {
        console.log('=-------材料审查------')
          dispatch({
            type: 'getDocTableDataSource',
            payload: {},
          })
       // }
      })
    },
  },

  effects: {
    * getDocTableDataSource ({ payload }, { call, put }) {
      yield put({ type: 'showLoading' })  // 显示加载遮罩

    // const data = yield call(getDocTableDataSource, payload)  // 调用远程服务获取结果
      //if (data.success) { // 判断获取结果是否成功
        yield put({
          type: 'getDocTableDataSourceSuccess',
          payload: {
            docTableDataSource: licenseCheck,
            docTableLoading: false,
          },
        })  // 将返回结果赋值给state
      // } else {
      //   yield put({ type: 'HideLoading' })
      //   let error = { message: data.message }
      //   throw (error) // 抛出错误信息，交给dva处理
      // }
    },

    * saveView ({ payload }, { call, put }) {
      const { license, isCreate } = payload
      let data
      if (isCreate) {
        data = yield call(createLicense, license)  // 调用远程服务获取结果
      }

      if (data.success) { // 判断获取结果是否成功
        // yield put({ type: 'setCreateModelVisible', payload: { createModelVisible: false, editObj: null } })
        // yield put({ type: 'getLicenseTableDataSource', payload: {} })
      } else {
        yield put({ type: 'HideLoading' })
        let error = { message: data.message }
        throw (error) // 抛出错误信息，交给dva处理
      }
    },

    * deleteView ({ payload }, { call, put }) {
      let data = yield call(deleteView, payload)
      if (data.success) { // 判断获取结果是否成功
        // yield put({ type: 'setCreateModelVisible', payload: { createModelVisible: false, editObj: null } })
        // yield put({ type: 'getViewTableDataSource', payload: {} })
      } else {
        yield put({ type: 'HideLoading' })
        let error = { message: data.message }
        throw (error) // 抛出错误信息，交给dva处理
      }
    },
  },

  reducers: {
    getDocTableDataSourceSuccess (state, action) {
      const { docTableDataSource, pagination, docTableLoading } = action.payload // 从payload中展开需要的属性

      return {
        ...state,
        docTableDataSource,
        docTableLoading,
        pagination: {
          ...state.pagination,
          ...pagination,
        },
      } // 展开原有state，并赋值新的属性值
    },

    showLoading (state) {
      return {
        ...state,
        licenseTableLoading: true, // 显示表格加载状态
      }
    },
    setName(state,action){
      const{ materailName,docName}=action.payload
      return {
        ...state,
        materailName,
        docName,
      }
    },
    HideLoading (state) {
      return {
        ...state,
        licenseTableLoading: false,  // 关闭表格加载状态
      }
    },

  },
}
