import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Icon, Checkbox } from 'antd'
import moment from 'moment';
import {DataTable} from '../../components/'

const CheckboxGroup = Checkbox.Group


class AdviceList extends Component {

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
    let i=1;
    const columns = [{
      title: '序号',
      dataIndex: 'id',
      //width: '30%',
      render: (text, record) => {return i++;}
    }, {
      title: '材料名称',
      dataIndex: 'materialName',
      // width: '30%',
    },{
      title: '审查意见',
      dataIndex: 'advice',
      // width: '30%',
    }, {
      title: '审查日期',
      dataIndex: 'modtime',
      render: (text, record) => {
        return record.modtime!=null ? moment(record.modtime).format('YYYY-MM-DD'):''
      },
    }
    ]

    const rowSelection = {

    }
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

export default AdviceList
