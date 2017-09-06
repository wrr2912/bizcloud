import React, { PropTypes } from 'react'
import { connect } from 'dva'
import { Col, Row, Button, Icon } from 'antd'

const EnterpriseView = ({ dispatch, enterpriseView }) => {
  const { enterprise } = enterpriseView

  const showCreateModal = () => {
    history.back()
  }

  return (
    <div className="content-inner">
      <Row gutter={24}>
        <Col md={{ span: 6 }}>
          企业ID：{enterprise.id !== null ? enterprise.id : <Icon type="loading" />}
        </Col>
      </Row>
      <Row gutter={24}>
        <Col md={{ span: 6 }}>
          企业名称：{enterprise.enterprise_name !== null ? enterprise.enterprise_name : <Icon type="loading" />}
        </Col>
      </Row>
      <Row gutter={24}>
        <Col md={{ span: 6 }}>
          成立时间：{enterprise.founding_time !== null ? new Date(enterprise.founding_time).format("yyyy-MM-dd hh:mm:ss") : <Icon type="loading" />}
        </Col>
      </Row>
      <Row gutter={24}>
        <Col md={{ span: 6 }}>
          注册地址：{enterprise.register_address !== null ? enterprise.register_address : <Icon type="loading" />}
        </Col>
      </Row>
      <Row gutter={24}>
        <Col md={{ span: 6 }}>
          生产地址：{enterprise.manufacturer_address !== null ? enterprise.manufacturer_address : <Icon type="loading" />}
        </Col>
      </Row>
      <Row gutter={24}>
        <Col md={{ span: 6 }}>
          产品类别：{enterprise.product_category !== null ? enterprise.product_category : <Icon type="loading" />}
        </Col>
      </Row>
      <Row gutter={24}>
        <Col md={{ span: 6 }}>
          地方局：{enterprise.local_bureau !== null ? enterprise.local_bureau : <Icon type="loading" />}
        </Col>
      </Row>
      <Row gutter={24}>
        <Col md={{ span: 6 }}>
          企业类型：{enterprise.enterprise_type !== null ? enterprise.enterprise_type : <Icon type="loading" />}
        </Col>
      </Row>
      <Row gutter={24}>
        <Col md={{ span: 6 }}>
          行政许可类别统计：{enterprise.administrative_licensing_statistics !== null ? enterprise.administrative_licensing_statistics : <Icon type="loading" />}
        </Col>
      </Row>
      <Row gutter={24}>
        <Col md={{ span: 6 }}>
          邮政编码：{enterprise.postal_code !== null ? enterprise.postal_code : <Icon type="loading" />}
        </Col>
      </Row>
      <Row gutter={24}>
        <Col md={{ span: 6 }}>
          联系人：{enterprise.contacts !== null ? enterprise.contacts : <Icon type="loading" />}
        </Col>
      </Row>
      <Row gutter={24}>
        <Col md={{ span: 6 }}>
          联系电话：{enterprise.contact_number !== null ? enterprise.contact_number : <Icon type="loading" />}
        </Col>
      </Row>
      <Row gutter={24}>
        <Col md={{ span: 6 }}>
          传真：{enterprise.fax !== null ? enterprise.fax : <Icon type="loading" />}
        </Col>
      </Row>
      <Row gutter={24}>
        <Col md={{ span: 6 }}>
          企业性质：{enterprise.enterprise_nature !== null ? enterprise.enterprise_nature : <Icon type="loading" />}
        </Col>
      </Row>
      <Row gutter={24}>
        <Col md={{ span: 6 }}>
          法人代表：{enterprise.legal_representative !== null ? enterprise.legal_representative : <Icon type="loading" />}
        </Col>
      </Row>
      <Row gutter={24}>
        <Col md={{ span: 6 }}>
          注册资金：{enterprise.registerd_capital !== null ? enterprise.registerd_capital : <Icon type="loading" />}
        </Col>
      </Row>
      <Row gutter={24}>
        <Col md={{ span: 6 }}>
          企业职工：{enterprise.staff_number !== null ? enterprise.staff_number : <Icon type="loading" />}
        </Col>
      </Row>
      <Row gutter={24}>
        <Col md={{ span: 6 }}>
          备注：{enterprise.remark !== null ? enterprise.remark : <Icon type="loading" />}
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

EnterpriseView.propTypes = {
  dispatch: PropTypes.func,
    enterpriseView: PropTypes.object,
}

export default connect(({ enterpriseView }) => ({ enterpriseView }))(EnterpriseView)
