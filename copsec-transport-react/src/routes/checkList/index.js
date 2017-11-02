import React, { PropTypes } from 'react'
import { connect } from 'dva'
import { Col, Input, Row, Button } from 'antd'
import { routerRedux } from 'dva/router'
import Filter from './Filter'
import CheckListTable from './checkListTable'
import CheckListCreateModel from './checkListCreateModel'
import CollectModal from './CollectModal'

// 定义画面接口参数，其中checkList就是我们在model里面设定的namespace
const CheckList = ({ location, dispatch, checkList, loading, app }) => {
  // 展开state中的属性
  const { checkListTableDataSource, checkListTableLoading,pagination, createModelVisible,detailVisible, detailObj,editObj,adviceList } = checkList
  const { pageSize } = pagination
  // 传递给表格组件的属性
  const tableProp = {
    dispatch,
    checkListTableDataSource,
    checkListTableLoading,
    detailVisible,
    pagination,
    showDetailModal(record){


      dispatch({
        type:'checkList/getAdvice',
        payload:{
          detailVisible:true,
          currentItem:record,
        }
      })
    },
  }
  //详情页面属性
  const detailProps={
    dispatch,
    detailObj:detailObj,
    visible: detailVisible,
    adviceList,
    onCancel(){
      dispatch({
        type:'checkList/setDetailVisible',
        payload:{
          detailVisible:false,
          adviceList:null,
        },
      })
    },
  }
  //传递给弹出框表单组件的属性
  const modalProps = {
    visible: detailVisible,
    maskClosable: false,
    confirmLoading: loading.effects['checkList/saveCheckList'],
    onCancel () {
      dispatch({
        type: 'checkList/setCreateModelVisible',
        payload: {
          createModelVisible: false,
          editObj: null,
        },
      })
    },
    onOk (data) {
      dispatch({
        type: 'checkList/saveCheckList',
        payload: {
          ...data,
        },
      })
    },
    dispatch,
    editObj,
  }

  const showCreateModal = () => {
    dispatch({
      type: 'checkList/setCreateModelVisible',
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
      console.log('---------集体审查----------')
      console.log(value)
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
        pathname: '/checkList',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/checkList',
      }))
    },

  }
  return (
    <div className="content-inner">
      {/*<Row gutter={24} style={{ marginTop: '10px' }}>*/}
        {/*<Col span={24}>*/}
          {/*<Button icon="plus" type="primary" onClick={showCreateModal}>生成集体审查列表</Button>*/}
          {/*{createModelVisible && <CheckListCreateModel {...modalProps} /> }*/}
        {/*</Col>*/}
      {/*</Row>*/}
      <Filter {...filterProps} />
      <Row gutter={24} style={{ marginTop: '10px' }}>
        <Col span={24}>
          <CheckListTable {...tableProp} />
        </Col>
      </Row>
      {detailVisible && <CollectModal {...detailProps}/> }

    </div>
  )
}

// 定义画面可传入的属性以及属性类型
CheckList.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  checkList: PropTypes.object,
  loading: PropTypes.object,
  app: PropTypes.object,
}

// 导出并关联Model中state到本画面的props
export default connect(({ checkList, loading, app }) => ({ checkList, loading, app }))(CheckList)
