import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Icon, Checkbox } from 'antd'
import {DataTable} from '../../components/'

const CheckboxGroup = Checkbox.Group


class MaterialList extends Component {

  static propTypes = {
    materialList: PropTypes.array.isRequired,
    setKey:PropTypes.func.isRequired,
    updateDocHtml:PropTypes.func.isRequired,
  }

  state = {
    materialList: this.props.materialList,
    setKey: this.props.setKey,
    updateDocHtml:this.props.updateDocHtml,
  }

  render() {
    const handleClick = (records)=>{

      if(records.isLeaf){
        this.state.setKey(records);
        this.state.updateDocHtml(records.html);
      }
    }
    const columns = [{
      title: '审核材料',
      dataIndex: 'title',
      width: '30%',
      render: (text, record,index) => {
        return (<a key={index}
                   onClick={() => {
                     handleClick(record)
                   }}
        >
          {text}</a>)
      }
    } ]

    const rowSelection = {

    }

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
          rowKey="key"
        />
    )
  }
}

export default MaterialList
