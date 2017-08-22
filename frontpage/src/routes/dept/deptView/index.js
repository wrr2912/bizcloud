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
          单位名称：{dept.name !== null ? dept.DEPTNAME : <Icon type="loading" />}
        </Col>
      </Row>
      <Row gutter={24}>
        <Col md={{ span: 6 }}>
          省份：{dept.sex !== null ? dept.PROVINCE : <Icon type="loading" />}
        </Col>
      </Row>
      <Row gutter={24}>
        <Col md={{ span: 6 }}>
          城市：{dept.sex !== null ? dept.CITY : <Icon type="loading" />}
        </Col>
      </Row>
      <Row gutter={24}>
        <Col md={{ span: 6 }}>
          区域：{dept.sex !== null ? dept.CONTY : <Icon type="loading" />}
        </Col>
      </Row>
      <Row gutter={24}>
        <Col md={{ span: 6 }}>
          成立时间：{dept.sex !== null ? dept.CREATETIME : <Icon type="loading" />}
        </Col>
      </Row>
      <Row gutter={24}>
        <Col md={{ span: 6 }}>
          邮箱：{dept.sex !== null ? dept.EMAIL : <Icon type="loading" />}
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
