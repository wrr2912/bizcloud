import React, { PropTypes } from 'react'
import { connect } from 'dva'
import { Col, Input, Row, Button } from 'antd'
import UserListTable from './userListTable'
import UserCreateModel from './userCreateModel'


// 定义画面接口参数，其中userList就是我们在model里面设定的namespace
const UserList = ({ location, dispatch, userList, loading, app }) => {
  // 展开state中的属性
  const { userTableDataSource, userTableLoading, txtUserName, pagination, createModelVisible, editObj } = userList
  // 传递给表格组件的属性
  const tableProp = {
    dispatch,
    userTableDataSource,
    userTableLoading,
    pagination,
    editUser (record) {
      dispatch({
        type: 'userList/editUser',
        payload: {
          editObj: record,
        },
      })
    },
    delUser (id) {
      dispatch({
        type: 'userList/deleteUser',
        payload: {
          id,
        },
      })
    },
  }

  const onChange = (e) => {
    dispatch({
      type: 'userList/onChangeUserName',
      payload: {
        txtUserName: e.target.value,
      },
    })
  }

  const onClick = () => {
    dispatch({
      type: 'userList/getUserTableDataSource',
      payload: {
        txtUserName,
      },
    })
  }

  const modalProps = {
    visible: createModelVisible,
    maskClosable: false,
    confirmLoading: loading.effects['userList/saveUser'],
    onCancel () {
      dispatch({
        type: 'userList/setCreateModelVisible',
        payload: {
          createModelVisible: false,
          editObj: null,
        },
      })
    },
    onOk (data) {
      dispatch({
        type: 'userList/saveUser',
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
      type: 'userList/setCreateModelVisible',
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
          <Input placeholder="用户名" value={txtUserName} onChange={onChange} />
        </Col>
        <Col md={{ span: 6 }}>
          <Button type="primary" icon="search" onClick={onClick}>查询</Button>
        </Col>
      </Row>
      <Row gutter={24} style={{ marginTop: '10px' }}>
        <Col span={24}>
          <Button icon="plus" type="primary" onClick={showCreateModal}>新增用户</Button>
          {createModelVisible && <UserCreateModel {...modalProps} /> }
        </Col>
      </Row>
      <Row gutter={24} style={{ marginTop: '10px' }}>
        <Col span={24}>
          <UserListTable {...tableProp} />
        </Col>
      </Row>
    </div>
  )
}

// 定义画面可传入的属性以及属性类型
UserList.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  userList: PropTypes.object,
  loading: PropTypes.object,
  app: PropTypes.object,
}

// 导出并关联Model中state到本画面的props
export default connect(({ userList, loading, app }) => ({ userList, loading, app }))(UserList)
