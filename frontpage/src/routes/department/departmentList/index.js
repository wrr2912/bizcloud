import React, { PropTypes } from 'react'
import { connect } from 'dva'
import { Col, Input, Row, Button } from 'antd'
import DepartmentListTable from './departmentListTable'
import DepartmentCreateModel from './departmentCreateModel'


// 定义画面接口参数，其中departmentList就是我们在model里面设定的namespace
const DepartmentList = ({ location, dispatch, departmentList, loading, app }) => {
  // 展开state中的属性
  const { departmentTableDataSource, departmentTableLoading, txtDepartmentName, pagination, createModelVisible, editObj } = departmentList

  // 传递给表格组件的属性
  const tableProp = {
    dispatch,
    departmentTableDataSource,
    departmentTableLoading,
    pagination,
    editDepartment (record) {
      dispatch({
        type: 'departmentList/editDepartment',
        payload: {
          editObj: record,
        },
      })
    },

    delDepartment (id) {
      dispatch({
        type: 'departmentList/deleteDepartment',
        payload: {
          id,
        },
      })
    },
  }

  const onChange = (e) => {
    dispatch({
      type: 'departmentList/onChangeDepartmentName',
      payload: {
        txtDepartmentName: e.target.value,
      },
    })
  }

  const onClick = () => {
    dispatch({
      type: 'departmentList/getDepartmentTableDataSource',
      payload: {
        txtDepartmentName,
      },
    })
  }

  const modalProps = {
    visible: createModelVisible,
    maskClosable: false,
    confirmLoading: loading.effects['departmentList/saveDepartment'],
    onCancel () {
      dispatch({
        type: 'departmentList/setCreateModelVisible',
        payload: {
          createModelVisible: false,
          editObj: null,
        },
      })
    },
    onOk (data) {
      dispatch({
        type: 'departmentList/saveDepartment',
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
      type: 'departmentList/setCreateModelVisible',
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
          <Input placeholder="部门名称" value={txtDepartmentName} onChange={onChange} />
        </Col>
        <Col md={{ span: 6 }}>
          <Button type="primary" icon="search" onClick={onClick}>查询</Button>
        </Col>
      </Row>
      <Row gutter={24} style={{ marginTop: '10px' }}>
        <Col span={24}>
          <Button icon="plus" type="primary" onClick={showCreateModal}>添加部门</Button>
          {createModelVisible && <DepartmentCreateModel {...modalProps} /> }
        </Col>
      </Row>
      <Row gutter={24} style={{ marginTop: '10px' }}>
        <Col span={24}>
          <DepartmentListTable {...tableProp} />
        </Col>
      </Row>
    </div>
  )
}

// 定义画面可传入的属性以及属性类型
DepartmentList.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  departmentList: PropTypes.object,
  loading: PropTypes.object,
  app: PropTypes.object,
}

// 导出并关联Model中state到本画面的props
export default connect(({ departmentList, loading, app }) => ({ departmentList, loading, app }))(DepartmentList)
