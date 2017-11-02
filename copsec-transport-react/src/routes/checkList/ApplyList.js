import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Icon, Checkbox } from 'antd'
import moment from 'moment';
import {DataTable} from '../../components/'

class ApplyList extends Component {

  static propTypes = {
    adviceList: PropTypes.array.isRequired,
  }

  state = {
    adviceList: this.props.adviceList,

  }

  render() {
     const handleClick = (records)=>{
      console.log(...records)
    }
    let i=1
    const columns = [{
      title: '序号',
      dataIndex: 'id',
      //width: '30%',
      render: (row,record) => {return i++}
    }, {
      title: '审查节点',
      dataIndex: 'adviceType',
      // width: '30%', 1=操作人员  2= 司集体   3=处  4=副主任 5 = 主任
      render: (row,record) => {
        if (record.adviceType == 1) {
          return '经办人意见'
        } else if (record.adviceType == 2) {
          return '司集体意见'
        } else if (record.adviceType == 3) {
          return '处审查意见'
        } else if (record.adviceType == 4) {
          return '司主管负责人意见'
        }else if (record.adviceType == 5) {
          return '司主要负责人意见'
        }
      }
    },{
      title: '审查意见',
      dataIndex: 'advice',
      // width: '30%',
    }, {
      title: '审查日期',
      dataIndex: 'reviewTime',
      render: (text, record) => {
        return record.reviewTime!=null ? moment(record.reviewTime).format('YYYY-MM-DD'):''
      },
    }
    ]

    const apply = [this.state.adviceList];
    return (
      <DataTable
        animate={false}
        columns={columns}
        dataSource={this.state.adviceList}
        pagination={false}
        scroll={{ x:1000 }}
        size="small"
        bordered
        rowKey={record => record.id}
      />
    )
  }
}

export default ApplyList
