import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Icon, Checkbox } from 'antd'
import moment from 'moment'
import {DataTable} from '../../components/'

const CheckboxGroup = Checkbox.Group


class ApplyList extends Component {

  static propTypes = {
    applyList: PropTypes.object.isRequired,
  }

  state = {
    applyList: this.props.applyList,

  }

  render() {
    const handleClick = (records)=>{
      console.log(...records)
    }

    const columns = [{
      title: '序号',
      dataIndex: 'id',
      //width: '30%',
    }, {
      title: '申请人',
      dataIndex: 'companyName',
      // width: '30%',
    },{
      title: '申请事项',
      dataIndex: 'applyItem',
      // width: '30%',
    },
      {
        title: '许可种类',
        dataIndex: 'licenseName',
        // width: '30%',
      },
      // {
      //   title: '是否延期',
      //   dataIndex: 'isDelay',
      //   render: (text, record) =>{return isDelay==0?'否':'是'}
      // },
      {
      title: '拟受理号',
      dataIndex: 'acceptNumber',
      // width: '30%',
    },{
      title: '受理日期',
      dataIndex: 'acceptTime',
      render: (text, record) => {return moment(record.acceptTime).format('YYYY-MM-DD')},
      // width: '30%',
    }
    ]

    const rowSelection = {

    }
    const apply = [this.state.applyList];
    return (
      <DataTable
        animate={false}
        columns={columns}
        dataSource={apply}
        pagination={false}
        scroll={{ x:500 }}
        size="small"
        bordered
        rowKey={record => record.id}
      />
    )
  }
}

export default ApplyList
