import React, { PropTypes } from 'react'
import { connect } from 'dva'
import { Col, Input, Row, Button } from 'antd'
import PersonnelListTable from './personnelListTable'
import PersonnelCreateModel from './personnelCreateModel'


// 定义画面接口参数，其中personnelList就是我们在model里面设定的namespace
const PersonnelList = ({ location, dispatch, personnelList, loading, app }) => {
  // 展开state中的属性
  const { personnelTableDataSource, personnelTableLoading, txtPersonnelName, pagination, createModelVisible, editObj } = personnelList

  // 传递给表格组件的属性
  const tableProp = {
    dispatch,
    personnelTableDataSource,
    personnelTableLoading,
    pagination,
    editPersonnel (record) {
      dispatch({
        type: 'personnelList/editPersonnel',
        payload: {
          editObj: record,
        },
      })
    },

    delPersonnel (id) {
      dispatch({
        type: 'personnelList/deletePersonnel',
        payload: {
          id,
        },
      })
    },
  }

  const onChange = (e) => {
    dispatch({
      type: 'personnelList/onChangePersonnelName',
      payload: {
        txtPersonnelName: e.target.value,
      },
    })
  }

  const onClick = () => {
    dispatch({
      type: 'personnelList/getPersnnelTableDataSource',
      payload: {
        txtPersonnelName,
      },
    })
  }

  const modalProps = {
    visible: createModelVisible,
    maskClosable: false,
    confirmLoading: loading.effects['personnelList/savePersonnel'],
    onCancel () {
      dispatch({
        type: 'personnelList/setCreateModelVisible',
        payload: {
          createModelVisible: false,
          editObj: null,
        },
      })
    },
    onOk (data) {
      dispatch({
        type: 'personnelList/savePersonnel',
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
      type: 'personnelList/setCreateModelVisible',
      payload: {
        createModelVisible: true,
        editObj: null,
      },
    })
  }

  return (
    <div className="content-inner">
      <Row gutter={24}>
        <Col md={{ span: 6 }}>
          <Input placeholder="人员名称" value={txtPersonnelName} onChange={onChange} />
        </Col>
        <Col md={{ span: 6 }}>
          <Button type="primary" icon="search" onClick={onClick}>查询</Button>
        </Col>
      </Row>
      <Row gutter={24} style={{ marginTop: '10px' }}>
        <Col span={24}>
          <Button icon="plus" type="primary" onClick={showCreateModal}>添加人员</Button>
          {createModelVisible && <PersonnelCreateModel {...modalProps} /> }
        </Col>
      </Row>
      <Row gutter={24} style={{ marginTop: '10px' }}>
        <Col span={24}>
          <PersonnelListTable {...tableProp} />
        </Col>
      </Row>
    </div>
  )
}

// 定义画面可传入的属性以及属性类型
PersonnelList.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  personnelList: PropTypes.object,
  loading: PropTypes.object,
  app: PropTypes.object,
}

// 导出并关联Model中state到本画面的props
export default connect(({ personnelList, loading, app }) => ({ personnelList, loading, app }))(PersonnelList)
