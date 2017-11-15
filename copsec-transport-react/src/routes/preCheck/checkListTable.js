import React, { PropTypes } from 'react'
import { Table, Popconfirm } from 'antd'
import checkList from "../../models/checkList/checkList"
import CheckListDetail from './checkListDetail'
import moment from 'moment'

const CheckListTable = ({ dispatch, detailObj,
                          onCheckItem,onOverlookItem,
                          getAdviceList,checkListTableDataSource,
                          detailVisible,checkListTableLoading,
                          pagination,showDetailModle}) => {
  const handAdvice = (record) => {
    getAdviceList(record)
  }

  const handleMenuClick = (record, e) => {

    if(e === '1') {
      onCheckItem(record);
    }else if(e === '2'){

    }
  }
  // 定义表格列
  const columns = [
    {
      title: '企业名称',
      dataIndex: 'companyName',
      width: 160,
    },{
      title: '申请事项/内容',
      dataIndex: 'applyItem',
      width: 90,
    },{
      title: '受理号',
      dataIndex: 'acceptNumber',
      width:180,
    },{
      title:'稿件',
      dataIndex:'materials',
      width:250,
      render:(text,record,index)=>{
        const {materials} = record;
        return (<div key="material">{
          materials.map((material,index,materials) => {
            const {id,materialName} = material;
            const div_key = "_" + id;
            return <div key={div_key}><a key={id} onClick={() => {
              onOverlookItem(record);
            }} >{materialName}</a></div>
          })
        }</div>)
      },
    },{
      title:'审查状态',
      dataIndex:'recordStatus',
      width:80,
    },{
      title: '操作',
      key: 'operation',
      width:80,
      render: (row, record) => {
        const menuOptions = [{
          id: '1',
          name: '预审',
          color: 'blue',
          icon: 'edit',
          hidden: '',
        },
        {
           id: '2',
           name: '结束',
           color: 'blue',
           icon: 'edit',
           hidden: '',
         },
        ]
        const buttons =  menuOptions.map(({color,name, hidden ,icon,id}) => {
          const key = `btn${id}`;
          return (<a key={key}
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
           scroll={{ x: 1500 }}
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
