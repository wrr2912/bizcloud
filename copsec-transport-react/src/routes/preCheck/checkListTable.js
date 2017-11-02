import React, { PropTypes } from 'react'
import { Table, Popconfirm } from 'antd'
import checkList from "../../models/checkList/checkList"
import CheckListDetail from './checkListDetail'
import moment from 'moment'

const CheckListTable = ({ dispatch, detailObj,
                          onCheckItem,
                          getAdviceList,checkListTableDataSource,
                          detailVisible,checkListTableLoading,
                          pagination,showDetailModle}) => {
  const handAdvice = (record) => {
    getAdviceList(record)
  }

  const handleMenuClick = (record, e) => {

    if(e === '1') {
      onCheckItem(record);
    }
  }
  // 定义表格列
  const columns = [
    {
      title: '受理号',
      dataIndex: 'acceptNumber',
    },
    {
      title: '申请事项/内容',
      dataIndex: 'applyItem',
      width: 200,
    },
    {
      title: '企业名称',
      dataIndex: 'companyName',
      width: 100,
    },
    {
      title: '受理时间',
      dataIndex: 'acceptTime',
      render: (text, record) => {return moment(record.acceptTime).format('YYYY-MM-DD')},
    },
    {
      title: '截止时间',
      dataIndex: 'endTime',
      render: (text, record) => {return moment(record.acceptTime+2246400000).format('YYYY-MM-DD')},

    }, {
      title: '预审意见',
      dataIndex: 'preAdvice',
      render: (text, record) => {
        return (<a
          onClick={() => {
            handAdvice(record)
          }}
          style={{
            marginRight: 12,
            fontSize: 14,
          }}
        >意见详情</a>)
      },

    },{
      title: '操作',
      key: 'operation',
      width: 200,
      render: (row, record) => {
        const menuOptions = [{
          id: '1',
          name: '材料审查',
          color: 'blue',
          icon: 'edit',
          hidden: '',
        },
        //   {
        //   id: '2',
        //   name: '手动结束',
        //   color: 'blue',
        //   icon: 'edit',
        //   hidden: '',
        // },
        ]
        const buttons =  menuOptions.map(({color,name, hidden ,icon,id}) => {
          return (<a
            onClick={() => {
              handleMenuClick(row, id)
            }}
            style={{
              color,
              marginRight: 12,
              display: hidden ? 'none' : 'inline-block',
              fontSize: 14,
            }}
          > {name}</a>)

        })
        return (<div>
          {buttons}
        </div>)

      }
    }
  ]

  // 分页操作
  const onChange = (page) => {
    dispatch({
      type: 'checkList/getCheckListTableDataSource',
      payload: {
        currentPage: page.current,
        pageSize: page.pageSize,
      },
    })
  }

  // 渲染表格
  return (

    <Table bordered
           dataSource={checkListTableDataSource}
           columns={columns}
           onChange={onChange}
           rowKey="id"
           size="small"
           pagination={pagination}
           loading={checkListTableLoading}
    />
  )
}

CheckListTable.propTypes = {
  dispatch: PropTypes.func,
  checkListTableDataSource: PropTypes.array,
  pagination: PropTypes.object,
  checkListTableLoading: PropTypes.bool,
  showDetailModle: PropTypes.func,
}

export default CheckListTable
