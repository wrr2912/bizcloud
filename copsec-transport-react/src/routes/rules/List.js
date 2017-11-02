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

const List = ({ onDeleteItem,onHandleItem, onEditItem, isMotion, location, ...tableProps }) => {
  const handleMenuClick = (record, e) => {
    if (e === '1') {
      onEditItem(record)
    } else if (e === '2') {
      confirm({
        title: '确认删除该条记录吗?',
        onOk () {
          onDeleteItem(record.id)
        },
      })
    }
  }

  const columns = [
    {
      title: '信息类型',
      dataIndex: 'messType',
     }, {
      title: '同步时间',
      dataIndex: 'synDate',
    },  {
      title: '操作',
      key: 'operation',
      width: 200,
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
          > {name}</a></Tooltip>)
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

  const getBodyWrapper = body => { return isMotion ? <AnimTableBody {...getBodyWrapperProps} body={body} /> : body }
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
        simplei
        rowKey={record => record.d}
        getBodyWrapper={getBodyWrapper}
      />
    </div>
  )
}

List.propTypes = {
  onHandleItem: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default List
