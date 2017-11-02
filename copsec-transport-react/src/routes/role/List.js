import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Icon, Tooltip } from 'antd'
import styles from './List.less'
import moment from 'moment';
// 推荐在入口文件全局设置 locale
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import classnames from 'classnames'
import AnimTableBody from '../../components/DataTable/AnimTableBody'
import { DropOption } from '../../components'
import { Link } from 'dva/router'

const confirm = Modal.confirm

const List = ({ onDeleteItem, onEditItem, isMotion, location, ...tableProps }) => {
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
    }else if(e === '3') {
      onEditItem(record)
    }
  }

  const columns = [
    {
      title: '角色ID',     // table header 文案
      dataIndex: 'roleId', // 数据对象内的属性，也做react vdom 的key
      type: 'string',     // table 内显示的类型
      sorter: true,         // 是否需要排序
      width: 100,
    }, {
      title: '角色名称',
      dataIndex: 'roleName',
      type: 'string',
      width: 200,
    }, {
      title: '角色标识',
      dataIndex: 'enname',
      type: 'string',
      width: 200,
    }, {
      title: '操作',
      key: 'operation',
      width: 200,
      render: (row) => {
        const menuOptions = [{
          id: '1',
          name: '修改',
          color: 'blue',
          hidden: '',
        }, {
          id: '2',
          name: '删除',
          color: 'red',
          hidden: '',
        }, {
          id: '3',
          name: '配置权限',
          color: 'red',
          hidden: '',

        }]
        const buttons = menuOptions.map(({ color, name, id, hidden }) => {
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
          >{name}</a></Tooltip>)
        })
        return (<div>
          {buttons}
        </div>)
      },
    },
  ]

  const getBodyWrapperProps = {
    page: location.query.page,
    current: tableProps.pagination.current,
  }
  console.log('------role-------')
 console.log(...tableProps)
   const rowSelection = {}
  return (
    <div>
      <Table
        {...tableProps}
        className={classnames({ [styles.table]: true, [styles.motion]: isMotion })}
        bordered
        scroll={{ x: 500 }}
        size="middle"
        rowSelection={rowSelection}
        columns={columns}
        simple
        rowKey={record => record.roleId}
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
