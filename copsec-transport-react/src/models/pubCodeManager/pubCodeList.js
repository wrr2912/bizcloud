import { message } from 'antd'
import { findCodeTree,getCodeList,getPubCodes,saveCode,getCodeInfo,deleteCode } from '../../services/pubCodeManager'
import { defaultPageSize } from '../../utils/config'

export default {
  namespace: 'pubCodeList',
  state: {
    initTreeData:[],
    resultList:[],
    queryData:{
      parentCode:"",
      pubCode:"",
      codeName:"",
      codeType:"",
    },
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      pageSize:defaultPageSize,
      total: null,
    },
    codeTypeList:[],
    selectCodeTypeList:[],
    visible:false,
    detailData:{
      parentCode: '',
      parentName: '',
      codeType: '',
      pubCode:'',
      codeName:'',
      codeOrder:'',
      codeDes:'',
      enabled:'',
      refCodeId:'',
      codeId:'',
    },
    isEdit:false,
    enabledList:[],
    formTitle:"",
    selectNode:{
      code:'',
      name:'',
      type:'',
    },
    addDisable:false,
    refDisplay:'none',
    loading: false,
    refList:[],
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        //初始化树根节点
        dispatch({
          type: 'initTree',
          payload: {
            pubCode:"PUB_CODE"
          },
        });
        dispatch({ type: 'setSelect',
          payload: {
            addDisable:false,
            selectNode:{
              code:"PUB_CODE",
              name:'公共代码',
              type:'01'
            }
          } });

        dispatch({
          type: 'queryList',
          payload: {
            queryData:{
              parentCode:'PUB_CODE',
            },

          },
        });
        dispatch({
          type: 'getCodes',
          payload: {
            pubCodes:'CODE_TYPE,QYZT'
          },
        });

      })
    },

  },
  effects: {
    *initTree({payload}, {call, put}){
      const data = yield call(findCodeTree,{pubCode:"PUB_CODE"});
      if(data){
        const loop = data => data.map((item) => {
          if (item.children&&item.children.length>0) {
            item.isLeaf=false
            loop(item.children)
          }else{
            item.isLeaf=true
          }

        });
        loop(data);
        yield put({
          type: 'initTreeSuccess',
          payload: {
            treeData: data,
          },
        })
      }
    },

    *queryList ({ payload }, { call, put }) {
      yield put({ type: 'showLoading' })
      const data = yield call(getCodeList, payload)
      if (data&& data.success === true) {
        yield put({
          type: 'querySuccess',
          payload: {
            resultList: data.result.rows,
            pagination: {
              current: typeof (payload.currentPage) === 'undefined' ? 1 : Number(payload.currentPage),
              pageSize: typeof (payload.pageSize) === 'undefined' ? defaultPageSize : Number(payload.pageSize),
              total: data.result.totalNum,
            },
            queryData: payload.queryData,
            loading: false,
          },
        })
      } else {
        yield put({ type: 'HideLoading' })
        message.error('获取数据失败！')
      }
    },

    *getCodes ({ payload }, { call, put }) {
      const data = yield call(getPubCodes, payload)
      if (data&& data.success === true) {
        yield put({
          type: 'getCodeSuccess',
          payload: {
            codeTypeList: data.CODE_TYPE,
            enabledList:data.QYZT,
            selectCodeTypeList: data.CODE_TYPE,
          },
        })
      } else {
        message.error('获取数据失败！')
      }
    },

    *getRefList ({ payload }, { call, put }) {
      const data = yield call(getPubCodes, payload)
      if (data&& data.success === true) {
        yield put({
          type: 'getRefListSuccess',
          payload: {
            refList: data[payload.pubCodes],
          },
        })
      } else {
        message.error('获取数据失败！')
      }
    },

    *saveCode ({ payload }, { call, put }) {
      const data = yield call(saveCode, payload)
      if (data) {
        if (data.success) {
          yield put({
            type: 'closeModal',
            payload: {
              resetFields: payload.resetFields,
            },
          })
          message.success('保存成功！')
          yield put({ type: 'showLoading' })
          const listData = yield call(getCodeList, payload)
          if (listData&& listData.success === true) {
            yield put({
              type: 'querySuccess',
              payload: {
                resultList: listData.result.rows,
                pagination: {
                  current: Number(payload.currentPage),
                  pageSize: Number(payload.pageSize),
                  total: listData.result.totalNum,
                },
                queryData: payload.queryData,
                loading: false,
              },
            })
          } else {
            yield put({ type: 'HideLoading' })
            message.error('获取数据失败！')
          }
        } else {
          message.error(data.message)
        }
      } else {
        message.error('保存数据失败！')
      }
    },

    *delCode ({ payload }, { call, put }) {
      const data = yield call(deleteCode, payload)
      if (data) {
        if (data.success) {
          message.success('删除成功！')
          yield put({ type: 'showLoading' })
          const listData = yield call(getCodeList, payload)
          if (listData&& listData.success === true) {
            yield put({
              type: 'querySuccess',
              payload: {
                resultList: listData.result.rows,
                pagination: {
                  current: Number(payload.currentPage),
                  pageSize: Number(payload.pageSize),
                  total: listData.result.totalNum,
                },
                queryData: payload.queryData,
                loading: false,
              },
            })
          } else {
            yield put({ type: 'HideLoading' })
            message.error('获取数据失败！')
          }
        } else {
          message.error(data.message)
        }
      } else {
        message.error('删除数据失败！')
      }
    },

    *showModal ({ payload }, { call, put }) {
      if (payload.modalType == 'create') {
        let selectCodeTypeList=[];
        if(payload.selectNode.type=='01'){
          payload.codeTypeList.forEach((ele) => {
           if(ele.pubCode=='01'||ele.pubCode=='02'){
             selectCodeTypeList.push(ele)
           }
          }
          )
        }else{
          payload.codeTypeList.forEach((ele) => {
            if(ele.pubCode=='03'){
              selectCodeTypeList.push(ele)
            }
          })
        }
        yield put({
          type: 'showSuccess',
          payload: {
            detailData: {
              parentCode:payload.selectNode.code,
              parentName: payload.selectNode.name,
              codeType: '',
              pubCode:'',
              codeName:'',
              codeOrder:Number(payload.pagination.total)+1,
              codeDes:'',
              enabled:'1',
              refCodeId:null,
              codeId:null,
            },
            formTitle:"新增代码",
            isEdit: false,
            selectCodeTypeList:selectCodeTypeList,
            refDisplay:'none'
          },
        })
      } else {

        const data = yield call(getCodeInfo, payload)
        if (data) {
          if (data.success) {

            let refDisplay='none'
            if( data.result.codeType=='03'){
              refDisplay=''
              const refData = yield call(getPubCodes, {pubCodes:data.result.parentCode})
              if (refData&& refData.success === true) {
                yield put({
                  type: 'getRefListSuccess',
                  payload: {
                    refList: refData[data.result.parentCode],
                  },
                })
              } else {
                message.error('获取数据失败！')
              }


            }
            let refCodeId=data.result.refCodeId
            if(refCodeId==0){
              refCodeId=null
            }else {
              refCodeId=refCodeId.toString()
            }
            yield put({
              type: 'showSuccess',
              payload: {
                detailData: {
                  parentCode:data.result.parentCode,
                  parentName: data.result.parentName,
                  codeType: data.result.codeType,
                  pubCode:data.result.pubCode,
                  codeName:data.result.codeName,
                  codeOrder:data.result.codeOrder,
                  codeDes:data.result.codeDes,
                  enabled:data.result.enabled,
                  codeId:data.result.codeId,
                  refCodeId:refCodeId,
                },
                formTitle:"修改代码",
                isEdit: true,
                selectCodeTypeList:payload.codeTypeList,
                refDisplay:refDisplay,
              },
            })

          }else{
            message.error(data.message)
          }
        }else{
          message.error('获取数据失败！')
        }
      }
    },

  },
  reducers: {

    showLoading (state) {
      return { ...state, loading: true }
    },

    HideLoading (state) {
      return { ...state, loading: false }
    },


    initTreeSuccess(state,action){
      const {treeData} = action.payload;
      return {...state, initTreeData: treeData}
    },
    querySuccess (state, action) {
      const { resultList, pagination, queryData,loading } = action.payload
      return {
        ...state,
        resultList,
        pagination: {
          ...state.pagination,
          ...pagination,
        },
        queryData,
        loading,
      }
    },

    getCodeSuccess (state, action) {
      const { codeTypeList ,enabledList,selectCodeTypeList} = action.payload
      return {
        ...state,
        codeTypeList,
        enabledList,
        selectCodeTypeList
      }
    },

    getRefListSuccess (state, action) {
      const { refList} = action.payload
      return {
        ...state,
        refList,
      }
    },

    showSuccess (state, action) {
      const { detailData, formTitle,isEdit,selectCodeTypeList,refDisplay } = action.payload
      return {
        ...state,
        detailData,
        formTitle,
        isEdit,
        selectCodeTypeList,
        refDisplay,
        visible: true }
    },

    closeModal (state, action) {
      const { resetFields } = action.payload
      resetFields()
      return {
        ...state,
        visible: false }
    },

    setSelect (state, action) {
      const { selectNode,addDisable } = action.payload
      return {
        ...state,
        selectNode,
        addDisable,
      }
    },


    setDisplay (state, action) {
      const { refDisplay } = action.payload
      return {
        ...state,
        refDisplay,
      }
    },

    onChangeFilter (state, action) {
      const { queryData } = action.payload
      return {
        ...state,
        queryData,
      }
    },


  },
}
