import React, { PropTypes } from 'react'
import { connect } from 'dva'
import { Col, Row, Button, Icon } from 'antd'

const DepartmentView = ({ dispatch, departmentView }) => {
  const { department } = departmentView

  const showCreateModal = () => {
    history.back()
  }

  return (
    <div className="content-inner">
      <Row gutter={24}>
        <Col md={{ span: 6 }}>
          部门ID：{department.departmentId !== null ? department.departmentId : <Icon type="loading" />}
        </Col>
      </Row>
      <Row gutter={24}>
        <Col md={{ span: 6 }}>
          部门名称：{department.departmentName !== null ? department.departmentName : <Icon type="loading" />}
        </Col>
      </Row>
      <Row gutter={24}>
        <Col md={{ span: 6 }}>
          部门人数：{department.sectorNumber !== null ? department.sectorNumber: <Icon type="loading" />}
        </Col>
      </Row>
      <Row gutter={24}>
        <Col md={{ span: 6 }}>
          <Button icon="arrow-left" type="primary" onClick={showCreateModal}>返回</Button>
        </Col>
      </Row>
    </div>
  )
}

DepartmentView.propTypes = {
  dispatch: PropTypes.func,
  departmentView: PropTypes.object,
}

export default connect(({ departmentView }) => ({ departmentView }))(DepartmentView)
