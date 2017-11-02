import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment';
// 推荐在入口文件全局设置 locale
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import classnames from 'classnames'
import { Table, Modal, Icon, Tooltip } from 'antd'
import styles from './List.less'
import AnimTableBody from '../../components/DataTable/AnimTableBody'

const confirm = Modal.confirm

const List = ({ onDeleteItem, onEditItem, isMotion, location, ...tableProps }) => {
  console.log('------======-----getmenu')
  console.log(...tableProps)
  console.log('------++++++++-----getmenu')
  const handleMenuClick = (record, e) => {
    if (e === '1') {
      onEditItem(record)
    } else if (e === '2') {
      confirm({
        title: '确认删除该条记录吗?',
        onOk () {
          onDeleteItem(record.userId)
        },
      })
    }
  }

  const columns = [
      {
      title: '菜单名称',
      dataIndex: 'name',
      key: 'name',
      render:(text, record) => record.icon ?
        <span>
           <Icon type={record.icon} /> {text}
        </span> :
        text
    }, {
      title: '图标',
      dataIndex: 'icon',
      key: 'icon',
      render:(text, record) => record.icon ?
        <span>
            <Icon type={record.icon} /> {text}
        </span> :
        text
    }, {
      title: '链接',
      dataIndex: 'link',
      key: 'link',
    }, {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (row) => {
        const menuOptions = [{
          id: '1',
          name: '修改',
          color: 'blue',
          icon: 'edit',
          hidden: '',
        }, {
          id: '2',
          name: '删除',
          color: 'red',
          icon: 'delete',
          hidden: '',
        }]
        const buttons = menuOptions.map(({ color, name, id, icon, hidden }) => {
          return (<Tooltip title={name}><a
            onClick={() => {
              handleMenuClick(row, id)
            }}
            style={{
              color,
              marginRight: 12,
              display: hidden ? 'none' : 'inline-block',
              fontSize: 14,
            }}
          ><Icon type={icon} /></a></Tooltip>)
        })
        return (<div>
          {buttons}
        </div>)
      },
    },
  ]

  const rowSelection = {}
  return (
    <div>
      <Table
        {...tableProps}
        animate={false}
        className={classnames({ [styles.table]: true, [styles.motion]: isMotion })}
        bordered
        defaultExpandAllRows
        size="middle"
        columns={columns}
        pagination={false}
        simple
        rowSelection={rowSelection}
        rowKey={record => record.key}
      />
    </div>
  )
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default List
