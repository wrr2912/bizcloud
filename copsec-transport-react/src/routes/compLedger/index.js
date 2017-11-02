import React, { PropTypes } from 'react'
import { connect } from 'dva'
import { Col, Input, Row, Button } from 'antd'
import CompLedgerListTable from './compLedgerListTable'
import CompLedgerCreateModel from './compLedgerCreateModel'

// 定义画面接口参数，其中compLedgerList就是我们在model里面设定的namespace
const CompLedgerList = ({ location, dispatch, compLedgerList, loading, app }) => {
  // 展开state中的属性
  const { compLedgerTableDataSource, compLedgerTableLoading,txtCompanyName,pagination, createModelVisible, editObj } = compLedgerList

  // 传递给表格组件的属性
  const tableProp = {
    dispatch,
    compLedgerTableDataSource,
    compLedgerTableLoading,
    pagination,
    editCompLedger (record) {
      dispatch({
        type: 'compLedgerList/editCompLedger',
        payload: {
          editObj: record,
        },
      })
    },
    delCompLedger (id) {
      dispatch({
        type: 'compLedgerList/deleteCompLedger',
        payload: {
          id,
        },
      })
    },
  }

  const modalProps = {
    visible: createModelVisible,
    maskClosable: false,
    confirmLoading: loading.effects['compLedgerList/saveCompLedger'],
    onCancel () {
      dispatch({
        type: 'compLedgerList/setCreateModelVisible',
        payload: {
          createModelVisible: false,
          editObj: null,
        },
      })
    },
    onOk (data) {
      dispatch({
        type: 'compLedgerList/saveCompLedger',
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
      type: 'compLedgerList/setCreateModelVisible',
      payload: {
        createModelVisible: true,
        editObj: null,
      },
    })
  }

  const onChange = (e) => {
    dispatch({
      type: 'compLedgerList/onChangeCompanyName',
      payload: {
        txtCompanyName: e.target.value,
      },
    })
  }

  const onClick = () => {
    console.log('---------查询信息台账------------')
    dispatch({
      type: 'compLedgerList/getCompLedgerTableDataSource',
      payload: {
        txtCompanyName,
      },
    })
  }

  return (
    <div className="content-inner">
      <Row gutter={24}>
        <Col md={{ span: 6 }}>
          <Input placeholder="企业名称" value={txtCompanyName} onChange={onChange} />
        </Col>
        <Col md={{ span: 6 }}>
          <Button type="primary" icon="search" onClick={onClick}>查询</Button>
        </Col>
      </Row>
      <Row gutter={24} style={{ marginTop: '10px' }}>
        <Col span={24}>
          <Button icon="plus" type="primary" onClick={showCreateModal}>新增台账</Button>
          {createModelVisible && <CompLedgerCreateModel {...modalProps} /> }
        </Col>
      </Row>
      <Row gutter={24} style={{ marginTop: '10px' }}>
        <Col span={24}>
          <CompLedgerListTable {...tableProp} />
        </Col>
      </Row>
    </div>
  )
}

// 定义画面可传入的属性以及属性类型
CompLedgerList.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  compLedgerList: PropTypes.object,
  loading: PropTypes.object,
  app: PropTypes.object,
}

// 导出并关联Model中state到本画面的props
export default connect(({ compLedgerList, loading, app }) => ({ compLedgerList, loading, app }))(CompLedgerList)
