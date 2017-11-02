import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Company = ({ location, dispatch, companyList, loading }) => {
  const { companyTableDataSource, pagination, currentItem, modalVisible, modalType, isMotion } = companyList
  const { pageSize } = pagination
  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['companyList/update'],
    title: `${modalType === 'create' ? '添加企业' : '修改企业'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: 'companyList/saveCompany',
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'companyList/hideModal',
      })
    },
  }

  const listProps = {
    dataSource: companyTableDataSource,
    loading: loading.effects['companyList/getCompanyTableDataSource'],
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
        type: 'companyList/deleteCompany',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'companyList/showModal',
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
        pathname: '/companyList/',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/company',
      }))
    },
    onAdd () {
      dispatch({
        type: 'companyList/showModal',
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
      <Filter {...filterProps} />
      <List {...listProps} />
      {modalVisible && <Modal {...modalProps} />}
    </div>
  )
}

Company.propTypes = {
  companyList: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ companyList, loading }) => ({ companyList, loading }))(Company)
