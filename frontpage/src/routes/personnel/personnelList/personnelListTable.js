import React, { PropTypes } from 'react'
import { Table, Popconfirm } from 'antd'
import { Link } from 'dva/router'

const PersonnelListTable = ({ dispatch, personnelTableDataSource, personnelTableLoading, pagination, editPersonnel, delPersonnel}) => {
  // 定义表格列
  const columns = [
    {
      title: 'ID',
      dataIndex: 'personnelId',
      width: 100,
    },
    {
      title: '姓名',
      dataIndex: 'personnelName',
      width: 100,
    },
    {
      title: '年龄',
      dataIndex: 'personnelAge',
      width: 100,
    },
    {
      title: '性别',
      dataIndex: 'personnelGender',
      width: 100,
    },
    {
      title: '操作',
      width: 100,
      render: (text, record) => (
        <div>
          <a onClick={() => editPersonnel(record)}>编辑</a>
          <span className="ant-divider" />
          <Popconfirm title="是否确认删除该单位?" onConfirm={() => delPersonnel(record.personnelId)} okText="是" cancelText="否">
            <a href="#" style={{ color: 'red' }}>删除</a>
          </Popconfirm>
          <span className="ant-divider" />
          <Link to={`/personnel/personnelView/${record.personnelId}`}>查看</Link>
        </div>
      ),
    },
  ]

  // 分页操作
  const onChange = (page) => {
    dispatch({
      type: 'personnelList/getPersonnelTableDataSource',
      payload: {
        currentPage: page.current,
        pageSize: page.pageSize,
      },
    })
  }

  // 渲染表格
  return (
    <Table bordered
           dataSource={personnelTableDataSource}
           columns={columns}
           onChange={onChange}
           rowKey="personnelId"
           pagination={pagination}
           loading={personnelTableLoading}
    />
  )
}

PersonnelListTable.propTypes = {
  dispatch: PropTypes.func,
  personnelTableDataSource: PropTypes.array,
  pagination: PropTypes.object,
  personnelTableLoading: PropTypes.bool,
  editPersonnel: PropTypes.func,
}

export default PersonnelListTable
