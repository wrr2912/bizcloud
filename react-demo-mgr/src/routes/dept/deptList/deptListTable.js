import React, { PropTypes } from 'react'
import { Table, Popconfirm } from 'antd'
import { Link } from 'dva/router'

const DeptListTable = ({ dispatch, deptTableDataSource, deptTableLoading, pagination, editDept, delDept }) => {
  // 定义表格列
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 100,
    },
    {
      title: '单位名称',
      dataIndex: 'deptname',
      width: 100,
    },
    {
      title: '上级单位ID',
      dataIndex: 'parent_id',
      width: 100,
    },
    {
      title: '操作',
      width: 100,
      render: (text, record) => (
        <div>
          <a onClick={() => editDept(record)}>编辑</a>
          <span className="ant-divider" />
          <Popconfirm title="是否确认删除该单位?" onConfirm={() => delDept(record.id)} okText="是" cancelText="否">
            <a href="#" style={{ color: 'red' }}>删除</a>
          </Popconfirm>
          <span className="ant-divider" />
          <Link to={`/dept/deptView/${record.id}`}>查看</Link>
        </div>
      ),
    },
  ]

  // 分页操作
  const onChange = (page) => {
    dispatch({
      type: 'deptList/getDeptTableDataSource',
      payload: {
        currentPage: page.current,
        pageSize: page.pageSize,
      },
    })
  }

  // 渲染表格
  return (
    <Table bordered
      dataSource={deptTableDataSource}
      columns={columns}
      onChange={onChange}
      rowKey="id"
      pagination={pagination}
      loading={deptTableLoading}
    />
  )
}

DeptListTable.propTypes = {
  dispatch: PropTypes.func,
  deptTableDataSource: PropTypes.array,
  pagination: PropTypes.object,
  deptTableLoading: PropTypes.bool,
  editDept: PropTypes.func,
}

export default DeptListTable
