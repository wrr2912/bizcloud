import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Icon, Checkbox } from 'antd'
import {DataTable} from '../../components/'

const CheckboxGroup = Checkbox.Group


class MaterialList extends Component {

  static propTypes = {
    materialList: PropTypes.object.isRequired,
    setKey:PropTypes.func.isRequired,
  }

  state = {
    materialList: this.props.materialList,
    setKey: this.props.setKey,
  }

  render() {
    const handleClick = (records)=>{
      console.log(records)
      if(!records.isLeaf){
        this.state.setKey(records);
      }
    }
    const columns = [{
      title: '审核材料',
      dataIndex: 'title',
      width: '30%',
      render: (text, record) => <a
        onClick={() => {
          handleClick(record)
        }}
      >
        {text}</a>
    } ]

    const rowSelection = {

    }
    console.log(this.state.materialList)

    return (
        <DataTable
          with="200px"
          showHeader={false}
          animate={false}
          columns={columns}
          dataSource={this.state.materialList}
          pagination={false}
          scroll={{ x:200 }}
          size="small"
          defaultExpandAllRows
          bordered
          rowKey={record => record.key}
        />
    )
  }
}

export default MaterialList
