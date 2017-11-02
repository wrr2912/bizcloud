import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
// import Modal from './Modal'

const Qualifications = ({ location, dispatch, qualList, loading }) => {
  const { qualTableDataSource, pagination, currentItem, modalVisible, modalType, isMotion } = qualList
  const { pageSize } = pagination
  console.log('-------进来了9-------')
  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['qualList/update'],
    title: `${modalType === 'create' ? '添加企业' : '修改企业'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: 'qualList/saveQual',
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'qualList/hideModal',
      })
    },
  }

  const listProps = {
    dataSource: qualTableDataSource,
    loading: loading.effects['qualList/getQualTableDataSource'],
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
        type: 'qualList/deleteQual',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'qualList/showModal',
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
        pathname: '/qualList/',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/qual',
      }))
    },
    onAdd () {
      dispatch({
        type: 'qualList/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    switchIsMotion () {
      dispatch({ type: 'company/switchIsMotion' })
    },
  }

  return (
    <div className="content-inner">
      hello
      <Filter {...filterProps} />
      <List {...listProps} />
      {/*{modalVisible && <Modal {...modalProps} />}*/}
    </div>
  )
}

Qualifications.propTypes = {
  qualList: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ qualList, loading }) => ({ qualList, loading }))(Qualifications)
