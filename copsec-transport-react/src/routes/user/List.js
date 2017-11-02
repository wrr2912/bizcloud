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
    }
  }

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      render: (text, record) => <Link to={`user/${record.userId}`}>{text}</Link>,
    }, {
      title: '用户名',
      dataIndex: 'loginName',
    }, {
      title: '手机',
      dataIndex: 'phone',
    }, {
      title: 'Email',
      dataIndex: 'email',
    }, {
      title: '创建时间',
      dataIndex: 'createTime',
      render: (text, record) => moment(record.createTime, 'YYYY-MM-DD'),
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
        simple
        rowKey={record => record.userId}
        getBodyWrapper={getBodyWrapper}
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
