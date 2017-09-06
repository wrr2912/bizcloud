import React, { PropTypes } from 'react'
import { Table, Popconfirm } from 'antd'
import { Link } from 'dva/router'

const DepartmentListTable = ({ dispatch, departmentTableDataSource, departmentTableLoading, pagination, editDepartment, delDepartment}) => {
  // 定义表格列
  const columns = [
    {
      title: 'ID',
      dataIndex: 'departmentId',
      width: 100,
    },
    {
      title: '部门名称',
      dataIndex: 'departmentName',
      width: 100,
    },
    {
      title: '部门人数',
      dataIndex: 'sectorNumber',
      width: 100,
    },
    {
      title: '操作',
      width: 100,
      render: (text, record) => (
        <div>
          <a onClick={() => editDepartment(record)}>编辑</a>
          <span className="ant-divider" />
          <Popconfirm title="是否确认删除该单位?" onConfirm={() => delDepartment(record.departmentId)} okText="是" cancelText="否">
            <a href="#" style={{ color: 'red' }}>删除</a>
          </Popconfirm>
          <span className="ant-divider" />
          <Link to={`/department/departmentView/${record.departmentId}`}>查看</Link>
        </div>
      ),
    },
  ]

  // 分页操作
  const onChange = (page) => {
    dispatch({
      type: 'departmentList/getDePartmentTableDataSource',
      payload: {
        currentPage: page.current,
        pageSize: page.pageSize,
      },
    })
  }

  // 渲染表格
  return (
    <Table bordered
           dataSource={departmentTableDataSource}
           columns={columns}
           onChange={onChange}
           rowKey="departmentId"
           pagination={pagination}
           loading={departmentTableLoading}
    />
  )
}

DepartmentListTable.propTypes = {
  dispatch: PropTypes.func,
  departmentTableDataSource: PropTypes.array,
  pagination: PropTypes.object,
  departmentTableLoading: PropTypes.bool,
  editDepartment: PropTypes.func,
}

export default DepartmentListTable
