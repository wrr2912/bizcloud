import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button } from 'antd'
import List from './List'
import Modal from './Modal'

const Menu = ({ dispatch, menuList, loading }) => {
  const { menuDrop, menuTableDataSource, currentItem, modalVisible, modalType } = menuList
  const onAdd = () =>{
    dispatch({
      type: 'menuList/getMenuDrop',
      payload: {
        modalType: 'create',
      },
    })
  }
  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    menuDrop: menuDrop,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['menuList/update'],
    title: `${modalType === 'create' ? '添加用户' : '修改用户'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: 'menuList/saveMenu',
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'menuList/hideModal',
      })
    },
  }

  const listProps = {
    dataSource: menuTableDataSource,
    loading: loading.effects['menuList/getMenuTableDataSource'],
    onDeleteItem (id) {
      dispatch({
        type: 'menuList/deleteMenu',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'menuList/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
  }

  return (
    <div className="content-inner">
      <div>
        <Button size="large" type="ghost"  onClick={onAdd}>添加</Button>
      </div>
      <List {...listProps} />
      {modalVisible && <Modal {...modalProps} />}
    </div>
  )
}

Menu.propTypes = {
  menuList: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ menuList, loading }) => ({ menuList, loading }))(Menu)
