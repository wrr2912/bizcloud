import React from 'react'
import PropTypes from 'prop-types'
import {Switch} from 'antd'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Rules = ({ location, dispatch, rulesList, loading }) => {

  const { rulesTableDataSource, pagination, currentItem, modalVisible, modalType, isMotion, editObj } = rulesList
  const { pageSize } = pagination
  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['rulesList/update'],
    title: `${modalType === 'create' ? '添加规则' : '修改规则'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: 'rulesList/saveRules',
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'rulesList/hideModal',
      })
    },
    dispatch,
    editObj,
  }

  const listProps = {
    dataSource: rulesTableDataSource,
    loading: loading.effects['rulesList/getRulesTableDataSource'],
    pagination,
    location,
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
        type: 'rulesList/deleteRules',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'rulesList/showModal',
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
        pathname: '/rulesList/',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/rulesList/',
      }))
    },
    onAdd () {
      dispatch({
        type: 'rulesList/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    switchIsMotion () {

      dispatch({ type: 'rules/switchIsMotion' })
    },
  }
  const onChange=()=>{
    dispatch({
      type: 'rulesList/setting'
    })
  }
  return (
    <div className="content-inner">
      <div>同步规则设置：</div>
      <Filter {...filterProps} />
      <List {...listProps} />
      {modalVisible && <Modal {...modalProps} />}
      <div>任务分配规则设置：</div>
      <Switch style={{ marginRight: 16 }} size="large" defaultChecked={isMotion} onChange={onChange} checkedChildren={'自动'} unCheckedChildren={'手动'} />

    </div>
  )
}

Rules.propTypes = {
  rulesList: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ rulesList, loading }) => ({ rulesList, loading }))(Rules)
