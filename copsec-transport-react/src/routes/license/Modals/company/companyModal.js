import React from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col,Input, InputNumber, Radio, Modal, Cascader } from 'antd'
import  styles from './companyModal.less'
const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const CompanyModal = ({
                 company ,
                 onCancel,
                 ...companyModalProps
               }) => {

  const modalOpts = {
    footer:null,
    onCancel:onCancel,
    wrapClassName: 'vertical-center-modal',
    className: styles.modalWidth,
    ...companyModalProps,
  }


   return (
    <Modal {...modalOpts}>
      <Row>
        <Col span="8">企业名称：</Col>
        <Col span="12">{company.name}</Col>
      </Row>
      <br/>

      {/*<Row>*/}
        {/*<Col span="5">机构代码：</Col>*/}
        {/*<Col span="10">{company.orgCode}</Col>*/}
      {/*</Row>*/}
      <Row>
        <Col span="8">所属地区监管局：</Col>
        <Col span="12">{company.manageDept}</Col>
      </Row>
      <br/>
      <Row>
        <Col span="8">行业类别：</Col>
        <Col span="14">{company.industryType}</Col>
      </Row>
      <br/>
      <Row>
        <Col span="8">企业地址：</Col>
        <Col span="12">{company.registerAdd}</Col>
      </Row>
      <br/>
      <Row>
        <Col span="8">法人代表：</Col>
        <Col span="12">{company.legalRepresent}</Col>
      </Row>
      <br/>
      <Row>
        <Col span="8">企业性质：</Col>
        <Col span="12">{company.companyCharacter}</Col>
      </Row>
      <br/>
      <Row>
        <Col span="8">行政许可类别：</Col>
        <Col span="12">{company.licenseType}</Col>
      </Row>
      <br/>
      <Row>
        <Col span="8">企业联系人：</Col>
        <Col span="12">{company.keyContact}</Col>
      </Row>
      <br/>
      <Row>
        <Col span="8">联系方式：</Col>
        <Col span="12">{company.contactTele}</Col>
      </Row>
    <br/>
    </Modal>
  )
}

CompanyModal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  onCancel: PropTypes.func,
}

export default Form.create()(CompanyModal)
