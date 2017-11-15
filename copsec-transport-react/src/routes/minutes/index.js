import React, { PropTypes } from 'react'
import { connect } from 'dva'
import { Col, Input, Row, Button } from 'antd'
import MinutesListTable from './minutesListTable'
import MinutesCreateModel from './minutesCreateModel'

// 定义画面接口参数，其中minutesList就是我们在model里面设定的namespace
const MinutesList = ({ location, dispatch, minutesList, loading, app }) => {
  // 展开state中的属性
  const { minutesTableDataSource,applyList,minutesTableLoading,pagination, createModelVisible, editObj } = minutesList

  // 传递给表格组件的属性
  const tableProp = {
    dispatch,
    minutesTableDataSource,
    minutesTableLoading,
    pagination,
    editMinutes (record) {
      dispatch({
        type: 'minutesList/editMinutes',
        payload: {
          editObj: record,
        },
      })
    },
    delMinutes (id) {
      dispatch({
        type: 'minutesList/deleteMinutes',
        payload: {
          id,
        },
      })
    },
  }
  console.log('------会议--------------')
  console.log(applyList)
  const modalProps = {
    visible: createModelVisible,
    maskClosable: false,
    applyList:applyList,
    confirmLoading: loading.effects['minutesList/saveMinutes'],
    onCancel () {
      dispatch({
        type: 'minutesList/setCreateModelVisible',
        payload: {
          createModelVisible: false,
          editObj: null,
        },
      })
    },
    onOk (data) {
      dispatch({
        type: 'minutesList/saveMinutes',
        payload: {
          ...data,
        },
      })
    },
    dispatch,
    editObj,
  }

  const showCreateModal = () => {
    dispatch({
      type: 'minutesList/showMetting',
      payload: {
        createModelVisible: true,
        editObj: null,
      },
    })
  }

  return (
    <div className="content-inner">
      <Row gutter={24} style={{ marginTop: '10px' }}>
        <Col span={24}>
          {createModelVisible && <MinutesCreateModel {...modalProps} /> }
        </Col>
      </Row>
      <Row gutter={24} style={{ marginTop: '10px' }}>
        <Col span={24}>
          <MinutesListTable {...tableProp} />
        </Col>
      </Row>
    </div>
  )
}

// 定义画面可传入的属性以及属性类型
MinutesList.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  minutesList: PropTypes.object,
  loading: PropTypes.object,
  app: PropTypes.object,
}

// 导出并关联Model中state到本画面的props
export default connect(({ minutesList, loading, app }) => ({ minutesList, loading, app }))(MinutesList)
