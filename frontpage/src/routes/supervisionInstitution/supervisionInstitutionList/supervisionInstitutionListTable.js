import React, { PropTypes } from 'react'
import { Table, Popconfirm } from 'antd'
import { Link } from 'dva/router'

const SupervisionInstitutionListTable = ({ dispatch, supervisionInstitutionTableDataSource, supervisionInstitutionTableLoading, pagination, editSupervisionInstitution, delSupervisionInstitution}) => {
  // 定义表格列
  const columns = [
    {
      title: 'ID',
      dataIndex: 'SIId',
      width: 100,
    },
    {
      title: '单位名称',
      dataIndex: 'unitName',
      width: 100,
    },
    {
      title: '单位简称',
      dataIndex: 'unitAbbreviation',
      width: 100,
    },
    {
      title: '法人代表',
      dataIndex: 'legalRepresentative',
      width: 100,
    },
    {
      title: '法人代码',
      dataIndex: 'legalPersonCode',
      width: 100,
    },
    {
      title: '通讯地址',
      dataIndex: 'postalAddress',
      width: 100,
    },
    {
      title: '邮政编码',
      dataIndex: 'postalCode',
      width: 100,
    },
    {
      title: '官网链接',
      dataIndex: 'officialWebsiteLink',
      width: 100,
    },
    {
      title: '备注',
      dataIndex: 'remarks',
      width: 100,
    },
    {
      title: '值班电话',
      dataIndex: 'telephoneWatch',
      width: 100,
    },
    {
      title: '项目名称',
      dataIndex: 'entryName',
      width: 100,
    },
    {
      title: '项目编号',
      dataIndex: 'projectNumber',
      width: 100,
    },
    {
      title: '项目联系人',
      dataIndex: 'projectContact',
      width: 100,
    },
    {
      title: '项目联系人电话',
      dataIndex: 'contactPhone',
      width: 100,
    },
    {
      title: '录入人',
      dataIndex: 'entryMan',
      width: 100,
    },
    {
      title: '录入日期',
      dataIndex: 'entryDate',
      width: 100,
    },
    {
      title: '操作',
      width: 100,
      render: (text, record) => (
        <div>
          <a onClick={() => editSupervisionInstitution(record)}>编辑</a>
          <span className="ant-divider" />
          <Popconfirm title="是否确认删除该单位?" onConfirm={() => delSupervisionInstitution(record.SIId)} okText="是" cancelText="否">
            <a href="#" style={{ color: 'red' }}>删除</a>
          </Popconfirm>
          <span className="ant-divider" />
          <Link to={`/supervisionInstitution/supervisionInstitutionView/${record.SIId}`}>查看</Link>
        </div>
      ),
    },
  ]

  // 分页操作
  const onChange = (page) => {
    dispatch({
      type: 'supervisionInstitutionList/getSupervisionInstitutionTableDataSource',
      payload: {
        currentPage: page.current,
        pageSize: page.pageSize,
      },
    })
  }

  // 渲染表格
  return (
    <Table bordered
           dataSource={supervisionInstitutionTableDataSource}
           columns={columns}
           onChange={onChange}
           rowKey="SIID"
           pagination={pagination}
           loading={supervisionInstitutionTableLoading}
    />
  )
}

SupervisionInstitutionListTable.propTypes = {
  dispatch: PropTypes.func,
  supervisionInstitutionTableDataSource: PropTypes.array,
  pagination: PropTypes.object,
  supervisionInstitutionTableLoading: PropTypes.bool,
  editSupervisionInstitution: PropTypes.func,
}

export default SupervisionInstitutionListTable
