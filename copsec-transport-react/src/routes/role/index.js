import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Role = ({ location, dispatch, roleList, loading }) => {
  const {menuList, roleTableDataSource, pagination, currentItem, modalVisible, modalType, isMotion } = roleList
  const { pageSize } = pagination
  const modalProps = {
    modalVisible: modalVisible,
    dataSource: menuList,
    title:'配置权限',
  }

  const listProps = {
    dataSource: roleTableDataSource,
    loading: loading.effects['roleList/getRoleTableDataSource'],
    pagination,
    location,
    isMotion,
    onChange (page) {
      const { query, pathname } = location
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          page: page.current,
          pageSize: page.pageSize,
        },
      }))
    },
    onDeleteItem (id) {
      dispatch({
        type: 'roleList/deleteRole',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'roleList/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
  }

  const filterProps = {
    isMotion,
    filter: {
      ...location.query,
    },
    onFilterChange (value) {
      console.log('-----onFilterChange-------')
      console.log(location.pathname)
      dispatch(routerRedux.push({
        pathname: location.pathname,
        query: {
          ...value,
          page: 1,
          pageSize,
        },
      }))
    },
    onSearch (fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/roleList/',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/role',
      }))
    },
    onAdd () {
      dispatch({
        type: 'roleList/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    switchIsMotion () {
      dispatch({ type: 'role/switchIsMotion' })
    },
  }
  console.log('---------role开始---------')
  console.log(modalVisible)
  console.log(...modalProps)
  console.log('---------role结束---------')
  return (
    <div className="content-inner">
      <Filter {...filterProps} />
      <List {...listProps} />
      {modalVisible && <Modal {...modalProps} />}
    </div>
  )
}

Role.propTypes = {
  roleList: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ roleList, loading }) => ({ roleList, loading }))(Role)
