import React, { PropTypes } from 'react'
import { connect } from 'dva'
import { Col, Input, Row, Button } from 'antd'
import { routerRedux } from 'dva/router'
import Filter from './Filter'
import CheckListTable from './checkListTable'
import CheckListCreateModel from './checkListCreateModel'
import CheckListDetail from './checkListDetail'
import AdviceModal from './AdviceModal'
import CheckModal from './CheckModal'

import PreAdviceModal from './PreAdviceModal'

// 定义画面接口参数，其中checkList就是我们在model里面设定的namespace
const PreCheckList = ({ location, dispatch, preCheckList, loading, app }) => {
  // 展开state中的属性
  const { checkListTableDataSource,
    checkListTableLoading,pagination, createModelVisible,preAdviceVisible,
    adviceModalVisible,checkModalVisible,adviceList,
    docHtml,docKey,advice,checkItem,
    detailVisible, currentItem,detailObj } = preCheckList
  const { pageSize } = pagination
  // 传递给表格组件的属性
  const tableProp = {
    dispatch,
    checkListTableDataSource,
    checkListTableLoading,
    detailVisible,
    pagination,
    detailObj,
    getAdviceList(record){
      console.log('-------意见详情----------'+record)

      dispatch({
        type:'preCheckList/getAdviceList',
        payload:{
          currentItem:record,
        }
      })

    },
    onCheckItem(item){

      dispatch({
        type: 'preCheckList/checkLicense',
        payload: {
          modalType: 'check',
          currentItem: item,
        },
      })
    },
    showDetailModle(record){
      dispatch({
        type:'preCheckList/setDetailVisible',
        payload:{
          detailVisible:true,
          detailObj:record,
        }
      })
    },
  }
  //详情页面属性
  const detailProps={
    dispatch,
    detailObj,
    visible: detailVisible,
    onCancel(){
      dispatch({
        type:'preCheckList/setDetailVisible',
        payload:{
          detailVisible:false,
          detailObj:null,
        },
      })
    },
  }
console.log(adviceList)
  const adviceModalProps = {
    item: currentItem,
    adviceModalVisible:adviceModalVisible,
    title:  '材料审查意见',
    onAdviceOk (data) {
      dispatch({
        type: 'preCheckList/saveAdvice',
        payload: data,
      })
    }, onAdviceCancel () {
      dispatch({
        type: 'preCheckList/hideAdviceModal',
      })
    },
  }

  const preAdviceProps = {
    item: currentItem,
    adviceList:adviceList,
    visible:preAdviceVisible,
    title:  '材料审查意见',
     onPreCancel () {
      dispatch({
        type: 'preCheckList/hidePreAdvice',
      })
    },
  }
  //传递给弹出框表单组件的属性
  const modalProps = {
    visible: createModelVisible,
    maskClosable: false,

    confirmLoading: loading.effects['preCheckList/saveCheckList'],
    onCancel () {
      dispatch({
        type: 'preCheckList/setCreateModelVisible',
        payload: {
          createModelVisible: false,
          editObj: null,
        },
      })
    },
    onOk (data) {
      dispatch({
        type: 'preCheckList/saveCheckList',
        payload: {
          ...data,
        },
      })
    },
    dispatch,
  }

  const checkModalProps = {
    item: currentItem,
    checkItem: checkItem,
    visible: checkModalVisible,
    adviceList:adviceList,
    docHtml:docHtml,
    docKey:docKey,
    advice:advice,
    maskClosable: false,
    confirmLoading: loading.effects['licenseList/update'],
    title:  '材料审查',
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: 'preCheckList/workAdvice',
        payload: data,
      })
    },
    setDocKey(data){

      dispatch({
        type: 'preCheckList/setDocKey',
        payload:data
      })
    },
    onCancel () {
      dispatch({
        type: 'preCheckList/hideCheckModal',
      })
    },
    saveAdvice(data) {
      dispatch({
        type: 'preCheckList/saveAdvice',
        payload:data
      })
    },
    showAdviceModal(data){
      dispatch({
        type: 'preCheckList/showAdviceModal',
        payload:data
      })
    }
  }

  const showCreateModal = () => {
    dispatch({
      type: 'preCheckList/setCreateModelVisible',
      payload: {
        createModelVisible: true,
        editObj: null,
      },
    })
  }
  const filterProps = {

    filter: {
      ...location.query,
    },
    onFilterChange (value) {
      dispatch(routerRedux.push({
        pathname: location.pathname,
        query: {
          ...value,
          page: 1,
          pageSize,
        },
      }))
    },
    onSearch (fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/license/preCheckList',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/license',
      }))
    },


  }
  return (
    <div className="content-inner">
      <Row gutter={24} style={{ marginTop: '10px' }}>
        <Filter {...filterProps} />
      </Row>
      <Row gutter={24} style={{ marginTop: '10px' }}>
        <Col span={24}>
          <CheckListTable {...tableProp} />
        </Col>
      </Row>
      {preAdviceVisible && <PreAdviceModal {...preAdviceProps}/> }
      {checkModalVisible && <CheckModal {...checkModalProps} {...adviceModalProps}/>}

    </div>
  )
}

// 定义画面可传入的属性以及属性类型
PreCheckList.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  checkList: PropTypes.object,
  loading: PropTypes.object,
  app: PropTypes.object,
}

// 导出并关联Model中state到本画面的props
export default connect(({ preCheckList, loading, app }) => ({ preCheckList, loading, app }))(PreCheckList)
