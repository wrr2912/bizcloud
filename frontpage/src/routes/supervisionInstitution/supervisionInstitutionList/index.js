import React, { PropTypes } from 'react'
import { connect } from 'dva'
import { Col, Input, Row, Button } from 'antd'
import SupervisionInstitutionListTable from './supervisionInstitutionListTable'
import SupervisionInstitutionCreateModel from './supervisionInstitutionCreateModel'


// 定义画面接口参数，其中personnelList就是我们在model里面设定的namespace
const SupervisionInstitutionList = ({ location, dispatch, supervisionInstitutionList, loading, app }) => {
  // 展开state中的属性
  const { supervisionInstitutionTableDataSource, supervisionInstitutionTableLoading, txtUnitName, pagination, createModelVisible, editObj } = supervisionInstitutionList

  // 传递给表格组件的属性
  const tableProp = {
    dispatch,
    supervisionInstitutionTableDataSource,
    supervisionInstitutionTableLoading,
    pagination,
    editSupervisionInstitution (record) {
      dispatch({
        type: 'supervisionInstitutionList/editSupervisionInstitution',
        payload: {
          editObj: record,
        },
      })
    },

    delSupervisionInstitution (id) {
      dispatch({
        type: 'supervisionInstitutionList/deleteSupervisionInstitution',
        payload: {
          id,
        },
      })
    },
  }

  const onChange = (e) => {
    dispatch({
      type: 'supervisionInstitutionList/onChangeUnitName',
      payload: {
        txtUnitName: e.target.value,
      },
    })
  }

  const onClick = () => {
    dispatch({
      type: 'supervisionInstitutionList/getSupervisionInstitutionTableDataSource',
      payload: {
        txtUnitName,
      },
    })
  }

  const modalProps = {
    visible: createModelVisible,
    maskClosable: false,
    confirmLoading: loading.effects['supervisionInstitutionList/saveSupervisionInstitution'],
    onCancel () {
      dispatch({
        type: 'supervisionInstitutionList/setCreateModelVisible',
        payload: {
          createModelVisible: false,
          editObj: null,
        },
      })
    },
    onOk (data) {
      dispatch({
        type: 'supervisionInstitutionList/saveSupervisionInstitution',
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
      type: 'supervisionInstitutionList/setCreateModelVisible',
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
          <Input placeholder="单位名称" value={txtUnitName} onChange={onChange} />
        </Col>
        <Col md={{ span: 6 }}>
          <Button type="primary" icon="search" onClick={onClick}>查询</Button>
        </Col>
      </Row>
      <Row gutter={24} style={{ marginTop: '10px' }}>
        <Col span={24}>
          <Button icon="plus" type="primary" onClick={showCreateModal}>添加人员</Button>
          {createModelVisible && <SupervisionInstitutionCreateModel {...modalProps} /> }
        </Col>
      </Row>
      <Row gutter={24} style={{ marginTop: '10px' }}>
        <Col span={24}>
          <SupervisionInstitutionListTable {...tableProp} />
        </Col>
      </Row>
    </div>
  )
}

// 定义画面可传入的属性以及属性类型
SupervisionInstitutionList.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  supervisionInstitutionList: PropTypes.object,
  loading: PropTypes.object,
  app: PropTypes.object,
}

// 导出并关联Model中state到本画面的props
export default connect(({ supervisionInstitutionList, loading, app }) => ({ supervisionInstitutionList, loading, app }))(SupervisionInstitutionList)
