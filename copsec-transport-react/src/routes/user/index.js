import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const User = ({ location, dispatch, userList, loading }) => {
  const { userTableDataSource, pagination, currentItem, modalVisible, modalType, isMotion } = userList
  const { pageSize } = pagination
  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['userList/update'],
    title: `${modalType === 'create' ? '添加用户' : '修改用户'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: 'userList/saveUser',
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'userList/hideModal',
      })
    },
  }

  const listProps = {
    dataSource: userTableDataSource,
    loading: loading.effects['userList/getUserTableDataSource'],
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
        type: 'userList/deleteUser',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'userList/showModal',
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
        pathname: '/userList/',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/user',
      }))
    },
    onAdd () {
      dispatch({
        type: 'userList/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    switchIsMotion () {
      dispatch({ type: 'user/switchIsMotion' })
    },
  }

  return (
    <div className="content-inner">
      <Filter {...filterProps} />
      <List {...listProps} />
      {modalVisible && <Modal {...modalProps} />}
    </div>
  )
}

User.propTypes = {
  userList: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ userList, loading }) => ({ userList, loading }))(User)
