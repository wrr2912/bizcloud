import React, { PropTypes } from 'react'
import { connect } from 'dva'
import { Col, Input, Row, Button } from 'antd'
import DeptListTable from './deptListTable'
import DeptCreateModel from './deptCreateModel'


// 定义画面接口参数，其中deptList就是我们在model里面设定的namespace
const DeptList = ({ location, dispatch, deptList, loading, app }) => {
  // 展开state中的属性
  const { deptTableDataSource, deptTableLoading, txtDeptName, pagination, createModelVisible, editObj } = deptList

  // 传递给表格组件的属性
  const tableProp = {
    dispatch,
    deptTableDataSource,
      deptTableLoading,
    pagination,
    editDept (record) {
      dispatch({
        type: 'deptList/editDept',
        payload: {
          editObj: record,
        },
      })
    },
    delDept (id) {
      dispatch({
        type: 'deptList/deleteDept',
        payload: {
          id,
        },
      })
    },
  }

  const onChange = (e) => {
    dispatch({
      type: 'deptList/onChangeDeptName',
      payload: {
        txtDeptName: e.target.value,
      },
    })
  }

  const onClick = () => {
    dispatch({
      type: 'deptList/getDeptTableDataSource',
      payload: {
        txtDeptName,
      },
    })
  }

  const modalProps = {
    visible: createModelVisible,
    maskClosable: false,
    confirmLoading: loading.effects['deptList/saveDept'],
    onCancel () {
      dispatch({
        type: 'deptList/setCreateModelVisible',
        payload: {
          createModelVisible: false,
          editObj: null,
        },
      })
    },
    onOk (data) {
      dispatch({
        type: 'deptList/saveDept',
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
      type: 'deptList/setCreateModelVisible',
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
          <Input placeholder="单位名称" value={txtDeptName} onChange={onChange} />
        </Col>
        <Col md={{ span: 6 }}>
          <Button type="primary" icon="search" onClick={onClick}>查询</Button>
        </Col>
      </Row>
      <Row gutter={24} style={{ marginTop: '10px' }}>
        <Col span={24}>
          <Button icon="plus" type="primary" onClick={showCreateModal}>新增单位</Button>
          {createModelVisible && <DeptCreateModel {...modalProps} /> }
        </Col>
      </Row>
      <Row gutter={24} style={{ marginTop: '10px' }}>
        <Col span={24}>
          <DeptListTable {...tableProp} />
        </Col>
      </Row>
    </div>
  )
}

// 定义画面可传入的属性以及属性类型
DeptList.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  deptList: PropTypes.object,
  loading: PropTypes.object,
  app: PropTypes.object,
}

// 导出并关联Model中state到本画面的props
export default connect(({ deptList, loading, app }) => ({ deptList, loading, app }))(DeptList)
