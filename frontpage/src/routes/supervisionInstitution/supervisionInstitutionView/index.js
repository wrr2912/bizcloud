import React, { PropTypes } from 'react'
import { connect } from 'dva'
import { Col, Row, Button, Icon } from 'antd'

const SupervisionInstitutionView = ({ dispatch, supervisionInstitutionView }) => {
  const { supervisionInstitution } = supervisionInstitutionView

  const showCreateModal = () => {
    history.back()
  }

  return (
    <div className="content-inner">
      <Row gutter={24}>
        <Col md={{ span: 6 }}>
          ID：{supervisionInstitution.id !== null ? supervisionInstitution.id : <Icon type="loading" />}
        </Col>
      </Row>
      <Row gutter={24}>
        <Col md={{ span: 6 }}>
          铁路总公司监督机构：{supervisionInstitution.supervision !== null ? supervisionInstitution.supervision : <Icon type="loading" />}
        </Col>
      </Row>
      <Row gutter={24}>
        <Col md={{ span: 6 }}>
          地区政府监管部门：{supervisionInstitution.prefectureSupervision !== null ? supervisionInstitution.prefectureSupervision: <Icon type="loading" />}
        </Col>
      </Row>
      <Row gutter={24}>
        <Col md={{ span: 6 }}>
          质量监督机构：{supervisionInstitution.qualitySupervision !== null ? supervisionInstitution.qualitySupervision : <Icon type="loading" />}
        </Col>
      </Row>
      <Row gutter={24}>
        <Col md={{ span: 6 }}>
          监督机构所属地域：{supervisionInstitution.qualitySupervisionArea !== null ? supervisionInstitution.qualitySupervisionArea : <Icon type="loading" />}
        </Col>
      </Row>
      <Row gutter={24}>
        <Col md={{ span: 6 }}>
          单位名称：{supervisionInstitution.unitName !== null ? supervisionInstitution.unitName : <Icon type="loading" />}
        </Col>
      </Row>
      <Row gutter={24}>
        <Col md={{ span: 6 }}>
          单位简称：{supervisionInstitution.unitAbbreviation !== null ? supervisionInstitution.unitAbbreviation: <Icon type="loading" />}
        </Col>
      </Row>
      <Row gutter={24}>
        <Col md={{ span: 6 }}>
          法人代表：{supervisionInstitution.legalRepresentative !== null ? supervisionInstitution.legalRepresentative : <Icon type="loading" />}
        </Col>
      </Row>
      <Row gutter={24}>
        <Col md={{ span: 6 }}>
          法人代码：{supervisionInstitution.legalPersonCode !== null ? supervisionInstitution.legalPersonCode : <Icon type="loading" />}
        </Col>
      </Row>
      <Row gutter={24}>
        <Col md={{ span: 6 }}>
          通讯地址：{supervisionInstitution.postalAddress !== null ? supervisionInstitution.postalAddress: <Icon type="loading" />}
        </Col>
      </Row>
      <Row gutter={24}>
        <Col md={{ span: 6 }}>
          邮政编码：{supervisionInstitution.postalCode !== null ? supervisionInstitution.postalCode : <Icon type="loading" />}
        </Col>
      </Row>
      <Row gutter={24}>
        <Col md={{ span: 6 }}>
          官网链接：{supervisionInstitution.officialWebsiteLink !== null ? <a href={supervisionInstitution.officialWebsiteLink}>{supervisionInstitution.officialWebsiteLink}</a> : <Icon type="loading" />}
        </Col>
      </Row>
      <Row gutter={24}>
        <Col md={{ span: 6 }}>
          备注：{supervisionInstitution.remarks !== null ? supervisionInstitution.remarks: <Icon type="loading" />}
        </Col>
      </Row>
      <Row gutter={24}>
        <Col md={{ span: 6 }}>
          值班电话：{supervisionInstitution.telephoneWatch !== null ? supervisionInstitution.telephoneWatch : <Icon type="loading" />}
        </Col>
      </Row>
      <Row gutter={24}>
        <Col md={{ span: 6 }}>
          项目名称：{supervisionInstitution.entryName !== null ? supervisionInstitution.entryName : <Icon type="loading" />}
        </Col>
      </Row>
      <Row gutter={24}>
        <Col md={{ span: 6 }}>
          项目编号：{supervisionInstitution.projectNumber !== null ? supervisionInstitution.projectNumber: <Icon type="loading" />}
        </Col>
      </Row> <Row gutter={24}>
      <Col md={{ span: 6 }}>
        项目联系人：{supervisionInstitution.projectContact !== null ? supervisionInstitution.projectContact : <Icon type="loading" />}
      </Col>
    </Row>
      <Row gutter={24}>
        <Col md={{ span: 6 }}>
          联系人电话：{supervisionInstitution.contactPhone !== null ? supervisionInstitution.contactPhone : <Icon type="loading" />}
        </Col>
      </Row>
      <Row gutter={24}>
        <Col md={{ span: 6 }}>
          录入人：{supervisionInstitution.entryMan !== null ? supervisionInstitution.entryMan :<Icon type="loading" />}
        </Col>
      </Row>
      <Row gutter={24}>
        <Col md={{ span: 6 }}>
          录入日期：{supervisionInstitution.entryDate !== null ? new Date(supervisionInstitution.entryDate).format("yyyy年MM月dd日 hh时mm分ss秒"): <Icon type="loading" />}
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

SupervisionInstitutionView.propTypes = {
  dispatch: PropTypes.func,
  supervisionInstitutionView: PropTypes.object,
}

export default connect(({ supervisionInstitutionView }) => ({ supervisionInstitutionView }))(SupervisionInstitutionView)
