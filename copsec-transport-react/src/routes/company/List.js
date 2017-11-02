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
          onDeleteItem(record.companyId)
        },
      })
    }
  }

  const columns = [
    {
      title: '企业编号',
      dataIndex: 'num',
      key: 'num',
      render: (text, record) => <Link to={`user/${record.userId}`}>{text}</Link>,
    }, {
      title: '企业名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '机构代码',
      dataIndex: 'orgCode',
      key: 'orgCode',
    }, {
      title: '法人代表',
      dataIndex: 'president',
      key: 'president',
    }, {
      title: '生产地址',
      dataIndex: 'produceAdd',
      key: 'produceAdd',
    }, {
      title: '企业类型',
      dataIndex: 'companyType',
      key: 'companyType',
    }, {
      title: '固定资产',
      dataIndex: 'fixedAsset',
      key: 'fixedAsset',
    }, {
      title: '生产能力',
      dataIndex: 'producePower',
      key: 'producePower',
    },
    // {
    //   title: '生产许可证',
    //   dataIndex: 'productlicenses',
    //   key: 'productlicenses',
    // },
    {
      title: '资质证书',
      dataIndex: 'qualifications',
      key: 'qualifications',
      render: (text, record) => <Link to={`/company/qual/${record.id}`}>查看企业资质</Link>,
    },
    // {
    //   title: '企业信用',
    //   dataIndex: 'creditInfos',
    //   key: 'creditInfos',
    // },
    {
      title: '发展历程',
      dataIndex: 'development',
      key: 'development',
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

  return (
    <div>
      <Table
        {...tableProps}
        className={classnames({ [styles.table]: true, [styles.motion]: isMotion })}
        bordered
        scroll={{ x: 1200 }}
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
