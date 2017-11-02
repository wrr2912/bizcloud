import React, { PropTypes } from 'react'
import { Table, Popconfirm } from 'antd'
import moment from 'moment'

import { Link } from 'dva/router'

const MinutesListTable = ({ dispatch, minutesTableDataSource, minutesTableLoading, pagination, editMinutes, delMinutes }) => {
  // 定义表格列
  const columns = [
    {
      title: '审查项目',
      dataIndex: 'applyProject',
      width: 100,
    },
    // {
    //   title: '审查阶段',
    //   dataIndex: 'reviewstage',
    //   width: 100,
    // },
    {
      title: '会议时间',
      dataIndex: 'meetingDate',
      width: 100,
      render: (text, record) => {return moment(record.meetingDate).format('YYYY-MM-DD HH:mm:ss')},

    },
    {
      title: '会议地点',
      dataIndex: 'meetingPlace',
      width: 100,
    },
    {
      title: '主持人',
      dataIndex: 'compere',
      width: 100,
    },
    {
      title: '记录人员',
      dataIndex: 'recorder',
      width: 100,
    },
    {
      title: '参与人员',
      dataIndex: 'participants',
      width: 100,
    },
    {
      title: '会议内容',
      dataIndex: 'meetingContent',
      width: 100,
    },

    // {
    //   title: '审查清单',
    //   dataIndex: 'reviewlists',
    //   width: 100,
    //   render:(text,record)=>(<span>{record.reviewlist}</span>),
    // },
    {
      title: '操作',
      width: 200,
      render: (text, record) => (
        <div>
          <a onClick={() => editMinutes(record)}>编辑</a>
          <span className="ant-divider" />
          <Popconfirm title="是否确认删除该记录?" onConfirm={() => delMinutes(record.id)} okText="是" cancelText="否">
            <a href="#" style={{ color: 'red' }}>删除</a>
          </Popconfirm>
        </div>
      ),
    },
  ]

  // 分页操作
  const onChange = (page) => {
    dispatch({
      type: 'MinutesList/getMinutesTableDataSource',
      payload: {
        currentPage: page.current,
        pageSize: page.pageSize,
      },
    })
  }

  // 渲染表格
  return (
    <Table bordered
      dataSource={minutesTableDataSource}
      columns={columns}
      onChange={onChange}
      rowKey="id"
      pagination={pagination}
      loading={minutesTableLoading}
    />
  )
}

MinutesListTable.propTypes = {
  dispatch: PropTypes.func,
  minutesTableDataSource: PropTypes.array,
  pagination: PropTypes.object,
  minutesTableLoading: PropTypes.bool,
  editMinutes: PropTypes.func,
}

export default MinutesListTable
