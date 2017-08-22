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
      dataIndex: 'DEPTNAME',
      width: 100,
    },
    {
      title: '所在省份',
      dataIndex: 'PROVINCE',
      width: 100,
    },
    {
      title: '所在城市',
      dataIndex: 'CITY',
      width: 100,
    },
    {
      title: '所在区域',
      dataIndex: 'COUNTY',
      width: 100,
    },
    {
      title: '成立时间',
      dataIndex: 'CREATETIME',
      width: 100,
    },
    {
      title: '单位邮箱',
      dataIndex: 'EMAIL',
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
