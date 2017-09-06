import React, { PropTypes } from 'react'
import { Table, Popconfirm } from 'antd'
import { Link } from 'dva/router'

const EnterpriseListTable = ({ dispatch, enterpriseTableDataSource, enterpriseTableLoading, pagination, editEnterprise, delEnterprise }) => {
  // 定义表格列
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 40,
    },
    {
      title: '企业名称',
      dataIndex: 'enterprise_name',
      width: 100,
    },
    {
      title: '成立时间',
      dataIndex: 'founding_time',
      render: text => new Date(text).format("yyyy-MM-dd hh:mm:ss"),
      width: 140,
    },
    {
      title: '注册地址',
      dataIndex: 'register_address',
      width: 100,
    },
    {
      title: '生产地址',
      dataIndex: 'manufacturer_address',
      width: 100,
    },
    {
      title: '企业性质',
      dataIndex: 'enterprise_nature',
      width: 100,
    },
    {
      title: '备注',
      dataIndex: 'remark',
      width: 100,
    },
    {
      title: '操作',
      width: 100,
      render: (text, record) => (
        <div>
          <a onClick={() => editEnterprise(record)}>编辑</a>
          <span className="ant-divider" />
          <Popconfirm title="是否确认删除该企业?" onConfirm={() => delEnterprise(record.id)} okText="是" cancelText="否">
            <a href="#" style={{ color: 'red' }}>删除</a>
          </Popconfirm>
          <span className="ant-divider" />
          <Link to={`/enterprise/enterpriseView/${record.id}`}>查看</Link>
        </div>
      ),
    },
  ]

  // 分页操作
  const onChange = (page) => {
    dispatch({
      type: 'enterpriseList/getEnterpriseTableDataSource',
      payload: {
        currentPage: page.current,
        pageSize: page.pageSize,
      },
    })
  }

  // 渲染表格
  return (
    <Table bordered
      dataSource={enterpriseTableDataSource}
      columns={columns}
      onChange={onChange}
      rowKey="id"
      pagination={pagination}
      loading={enterpriseTableLoading}
    />
  )
}

EnterpriseListTable.propTypes = {
  dispatch: PropTypes.func,
  enterpriseTableDataSource: PropTypes.array,
  pagination: PropTypes.object,
  enterpriseTableLoading: PropTypes.bool,
  editEnterprise: PropTypes.func,
}

export default EnterpriseListTable
