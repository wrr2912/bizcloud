import React, { PropTypes } from 'react'
import { Table, Popconfirm } from 'antd'
import { Link } from 'dva/router'

const UserListTable = ({ dispatch, userTableDataSource, userTableLoading, pagination, editUser, delUser }) => {
  // 定义表格列
  const columns = [
    {
      title: 'ID',
      dataIndex: 'userid',
      width: 100,
    },
    {
      title: '用户名称',
      dataIndex: 'username',
      width: 100,
    },
    {
      title: '密码',
      dataIndex: 'password',
      width: 100,
    },
    {
      title: '电话',
      dataIndex: 'phone',
      width: 100,
    },
       {
      title: '单位邮箱',
      dataIndex: 'email',
      width: 100,
    },
    {
      title: '操作',
      width: 100,
      render: (text, record) => (
        <div>
          <a onClick={() => editUser(record)}>编辑</a>
          <span className="ant-divider" />
          <Popconfirm  title="是否确认删除该用户?" onConfirm={() => delUser(record.userid)} okText="是" cancelText="否">
            <a href="#" style={{ color: 'red' }}>删除</a>
          </Popconfirm>
          <span className="ant-divider" />
          <Link to={`/user/userView/${record.userid}`}>查看</Link>
        </div>
      ),
    },
  ]

  // 分页操作
  const onChange = (page) => {
    dispatch({
      type: 'userList/getUserTableDataSource',
      payload: {
        currentPage: page.current,
        pageSize: page.pageSize,
      },
    })
  }

  // 渲染表格
  return (
    <Table bordered
           dataSource={userTableDataSource}
           columns={columns}
           onChange={onChange}
           rowKey="userid"
           pagination={pagination}
           loading={userTableLoading}
    />
  )
}

UserListTable.propTypes = {
  dispatch: PropTypes.func,
  userTableDataSource: PropTypes.array,
  pagination: PropTypes.object,
  userTableLoading: PropTypes.bool,
  editUser: PropTypes.func,
}

export default UserListTable
