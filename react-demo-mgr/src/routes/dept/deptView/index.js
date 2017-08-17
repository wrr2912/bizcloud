import React, { PropTypes } from 'react'
import { connect } from 'dva'
import { Col, Row, Button, Icon } from 'antd'

const DeptView = ({ dispatch, deptView }) => {
  const { dept } = deptView

  const showCreateModal = () => {
    history.back()
  }

  return (
    <div className="content-inner">
      <Row gutter={24}>
        <Col md={{ span: 6 }}>
          单位ID：{dept.id !== null ? dept.id : <Icon type="loading" />}
        </Col>
      </Row>
      <Row gutter={24}>
        <Col md={{ span: 6 }}>
          单位名称：{dept.name !== null ? dept.deptname : <Icon type="loading" />}
        </Col>
      </Row>
      <Row gutter={24}>
        <Col md={{ span: 6 }}>
          上级单位ID：{dept.sex !== null ? dept.parent_id : <Icon type="loading" />}
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

DeptView.propTypes = {
  dispatch: PropTypes.func,
    deptView: PropTypes.object,
}

export default connect(({ deptView }) => ({ deptView }))(DeptView)
