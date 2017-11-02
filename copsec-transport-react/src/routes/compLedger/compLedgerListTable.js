import React, { PropTypes } from 'react'
import { Table, Popconfirm } from 'antd'
import { Link } from 'dva/router'

const CompLedgerListTable = ({ dispatch, compLedgerTableDataSource, compLedgerTableLoading, pagination, editCompLedger, delCompLedger }) => {
  // 定义表格列
  const columns = [
    {
      title: '企业名称',
      dataIndex: 'companyName',
      width: 100,
    },
    {
      title: '企业住所',
      dataIndex: 'enterpriseDomicile',
      width: 100,
    },
    {
      title: '地区监管局',
      dataIndex: 'regionalSupervision',
      width: 100,
    },
    {
      title: '投资性质',
      dataIndex: 'investment',
      width: 100,
    },
    {
      title: '企业性质',
      dataIndex: 'enterpriseNature',
      width: 100,
    },
    {
      title: '许可经营范围',
      dataIndex: 'scopeofBusiness',
      width: 100,
    },
    {
      title: '许可证取得情况',
      dataIndex: 'licensingStatus',
      width: 100,
    },
    {
      title: '联系人及联系方式',
      dataIndex: 'personAndContact',
      width: 100,
    },
    {
      title: '收文地址及传真',
      dataIndex: 'addressAndFax',
      width: 100,
    },
    // {
    //   title: '操作',
    //   width: 200,
    //   render: (text, record) => (
    //     <div>
    //       <a onClick={() => editCompLedger(record)}>编辑</a>
    //       <span className="ant-divider" />
    //       <Popconfirm title="是否确认删除该台账信息?" onConfirm={() => delCompLedger(record.id)} okText="是" cancelText="否">
    //         <a href="#" style={{ color: 'red' }}>删除</a>
    //       </Popconfirm>
    //     </div>
    //   ),
    // },
  ]

  // 分页操作
  const onChange = (page) => {
    dispatch({
      type: 'compLedgerList/getCompLedgerTableDataSource',
      payload: {
        currentPage: page.current,
        pageSize: page.pageSize,
      },
    })
  }

  // 渲染表格
  return (
    <Table bordered
      dataSource={compLedgerTableDataSource}
      columns={columns}
      onChange={onChange}
      rowKey="id"
      pagination={pagination}
      loading={compLedgerTableLoading}
    />
  )
}

CompLedgerListTable.propTypes = {
  dispatch: PropTypes.func,
  compLedgerTableDataSource: PropTypes.array,
  pagination: PropTypes.object,
  compLedgerTableLoading: PropTypes.bool,
  editCompLedger: PropTypes.func,
}

export default CompLedgerListTable
