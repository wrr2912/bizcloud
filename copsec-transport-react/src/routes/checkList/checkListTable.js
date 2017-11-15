import React, { PropTypes } from 'react'
import { Table, Popconfirm } from 'antd'
import moment from 'moment';
import checkList from "../../models/checkList/checkList"
import CheckListDetail from './checkListDetail'

const CheckListTable = ({ dispatch, detailObj, checkListTableDataSource,detailVisible,checkListTableLoading, pagination,showDetailModal}) => {


  // 定义表格列
  const columns = [
    {
      title: '企业名称',
      dataIndex: 'companyName',
      width: 100,
    },
    // {
    //   title: '产品类型',
    //   dataIndex: 'productType',
    //   width: 100,
    // },
    // {
    //   title: '产品型号',
    //   dataIndex: 'productVersion',
    //   width: 100,
    // },
    // {
    //   title: '产品编号',
    //   dataIndex: 'productNum',
    //   width: 100,
    // },
    {
      title: '许可种类',
      dataIndex: 'licenseType',
      width: 100,
      render: (text, record) => {
        if(record.licenseType==1){
          return "铁路运输基础设备生产企业许可证"
        }else   if(record.licenseType==2){
          return "机车车辆型号合格证"
        }else   if(record.licenseType==3){
          return "机车车辆制造许可证"
        }else   if(record.licenseType==4){
          return "机车车辆维修许可证"
        }else   if(record.licenseType==5){
          return "机车车辆进口许可证"
        }else   if(record.licenseType==6){
          return "铁路运输许可证"
        }
      }
    },
    // {
    //   title: '修程',
    //   dataIndex: 'repairing',
    //   width: 100,
    // },
    {
      title: '是否延期',
      dataIndex: 'isDelay',
      width: 100,
      render: (text, record) => {return record.isDelay==1?"是":"否"}
    },
    // {
    //   title: '其他',
    //   dataIndex: 'otherss',
    //   width: 100,
    // },
    {
      title: '提审字号',
      dataIndex: 'arraignment',
      width: 100,
    },
    {
      title: '受理日期',
      dataIndex: 'acceptDate',
      width: 100,
      render: (text, record) => {return record.acceptDate!=null?moment(record.acceptDate).format('YYYY-MM-DD'):''},
    },
    {
      title: '接收日期',
      dataIndex: 'receiveDate',
      width: 100,
      render: (text, record) => {return record.receiveDate!=null?moment(record.receiveDate).format('YYYY-MM-DD'):''},

    },
    {
      title: '经办人',
      dataIndex: 'operatorName',
      width: 100,
    },
    // {
    //   title: '复核人',
    //   dataIndex: 'reOperator',
    //   width: 100,
    // },
    {
      title: '审查意见',
      // dataIndex: 'reviewAdvices',
      width: 200,
      render: (text, record) => (
        <div>
          <a onClick={()=>showDetailModal(record)}>详情</a>
        </div>
      ),
    },{
      title: '操作',
      // dataIndex: 'reviewAdvices',
      width: 200,
      render: (text, record) => (
        <div>
          <a >移除</a>
        </div>
      ),
    },
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
