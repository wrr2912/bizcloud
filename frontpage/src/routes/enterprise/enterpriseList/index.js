import React, { PropTypes } from 'react'
import { connect } from 'dva'
import { Col, Input, Row, Button } from 'antd'
import EnterpriseListTable from './enterpriseListTable'
import EnterpriseCreateModal from './enterpriseCreateModal'


// 定义画面接口参数，其中enterpriseList就是我们在model里面设定的namespace
const EnterpriseList = ({ location, dispatch, enterpriseList, loading, app }) => {
  // 展开state中的属性
  const { enterpriseTableDataSource, enterpriseTableLoading, txtEnterpriseName, pagination, createModelVisible, editObj, modalTitle } = enterpriseList

  // 传递给表格组件的属性
  const tableProp = {
    dispatch,
    enterpriseTableDataSource,
      enterpriseTableLoading,
    pagination,
    editEnterprise (record) {
      dispatch({
        type: 'enterpriseList/editEnterprise',
        payload: {
          editObj: record,
        },
      })
    },
    delEnterprise (id) {
      dispatch({
        type: 'enterpriseList/deleteEnterprise',
        payload: {
          id,
        },
      })
    },
  }

  const onChange = (e) => {
    dispatch({
      type: 'enterpriseList/onChangeEnterpriseName',
      payload: {
        txtEnterpriseName: e.target.value,
      },
    })
  }

  const onClick = () => {
    dispatch({
      type: 'enterpriseList/getEnterpriseTableDataSource',
      payload: {
        txtEnterpriseName,
      },
    })
  }

  const modalProps = {
    visible: createModelVisible,
    maskClosable: false,
    confirmLoading: loading.effects['enterpriseList/saveEnterprise'],
    onCancel () {
      dispatch({
        type: 'enterpriseList/setCreateModelVisible',
        payload: {
          createModelVisible: false,
          editObj: null,
        },
      })
    },
    onOk (data) {
      dispatch({
        type: 'enterpriseList/saveEnterprise',
        payload: {
          ...data,
        },
      })
    },
    dispatch,
    editObj,
    title:modalTitle,
    width: 1000,
  }

  const showCreateModal = () => {
    dispatch({
      type: 'enterpriseList/setCreateModelVisible',
      payload: {
        createModelVisible: true,
        editObj: null,
      },
    })
  }

  return (
    <div className="content-inner">
      <Row gutter={24}>
        <Col md={{ span: 6 }}>
          <Input placeholder="企业名称" value={txtEnterpriseName} onChange={onChange} />
        </Col>
        <Col md={{ span: 6 }}>
          <Button type="primary" icon="search" onClick={onClick}>查询</Button>
        </Col>
      </Row>
      <Row gutter={24} style={{ marginTop: '10px' }}>
        <Col span={24}>
          <Button icon="plus" type="primary" onClick={showCreateModal}>新增企业</Button>
          {createModelVisible && <EnterpriseCreateModal {...modalProps} /> }
        </Col>
      </Row>
      <Row gutter={24} style={{ marginTop: '10px' }}>
        <Col span={24}>
          <EnterpriseListTable {...tableProp} />
        </Col>
      </Row>
    </div>
  )
}

// 定义画面可传入的属性以及属性类型
EnterpriseList.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  enterpriseList: PropTypes.object,
  loading: PropTypes.object,
  app: PropTypes.object,
}

// 导出并关联Model中state到本画面的props
export default connect(({ enterpriseList, loading, app }) => ({ enterpriseList, loading, app }))(EnterpriseList)
