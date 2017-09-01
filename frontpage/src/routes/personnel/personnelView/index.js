import React, { PropTypes } from 'react'
import { connect } from 'dva'
import { Col, Row, Button, Icon } from 'antd'

const PersonnelView = ({ dispatch, personnelView }) => {
  const { personnel } = personnelView

  const showCreateModal = () => {
    history.back()
  }

  return (
    <div className="content-inner">
      <Row gutter={24}>
        <Col md={{ span: 6 }}>
          人员ID：{personnel.personnelId !== null ? personnel.personnelId : <Icon type="loading" />}
        </Col>
      </Row>
      <Row gutter={24}>
        <Col md={{ span: 6 }}>
          姓名：{personnel.personnelName !== null ? personnel.personnelName : <Icon type="loading" />}
        </Col>
      </Row>
      <Row gutter={24}>
        <Col md={{ span: 6 }}>
          年龄：{personnel.personnelAge !== null ? personnel.personnelAge: <Icon type="loading" />}
        </Col>
      </Row>
      <Row gutter={24}>
        <Col md={{ span: 6 }}>
          性别：{personnel.personnelGender !== null ? personnel.personnelGender : <Icon type="loading" />}
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

PersonnelView.propTypes = {
  dispatch: PropTypes.func,
  personnelView: PropTypes.object,
}

export default connect(({ personnelView }) => ({ personnelView }))(PersonnelView)
