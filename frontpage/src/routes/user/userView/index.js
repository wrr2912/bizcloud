import React, { PropTypes } from 'react'
import { connect } from 'dva'
import { Col, Row, Button, Icon } from 'antd'

const UserView = ({ dispatch, userView }) => {
  const { user } = userView

  const showCreateModal = () => {
    history.back()
  }

  return (
    <div className="content-inner">
      <Row gutter={24}>
        <Col md={{ span: 6 }}>
          用户ID：{user.userid !== null ? user.userid : ''}
        </Col>
      </Row>
      <Row gutter={24}>
        <Col md={{ span: 6 }}>
          用户名称：{user.name !== null ? user.username : ''}
        </Col>
      </Row>
      <Row gutter={24}>
        <Col md={{ span: 6 }}>
          密码：{user.password !== null ? user.password : ''}
        </Col>
      </Row>
      <Row gutter={24}>
        <Col md={{ span: 6 }}>
          用户类型：{user.truename !== null ? user.truename : ''}
        </Col>
      </Row>
      <Row gutter={24}>
        <Col md={{ span: 6 }}>
          部门编号：{user.deptId !== null ? user.deptId : ''}
        </Col>
      </Row>
      <Row gutter={24}>
        <Col md={{ span: 6 }}>
          电话：{user.phone !== null ? user.phone : ''}
        </Col>
      </Row>
      <Row gutter={24}>
        <Col md={{ span: 6 }}>
          邮箱：{user.email !== null ? user.email : ''}
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

UserView.propTypes = {
  dispatch: PropTypes.func,
  userView: PropTypes.object,
}

export default connect(({ userView }) => ({ userView }))(UserView)
