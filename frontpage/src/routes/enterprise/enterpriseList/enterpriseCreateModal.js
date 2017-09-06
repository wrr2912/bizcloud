import React, { PropTypes } from 'react'
import { Form, Modal, Input, Radio, Col, Row ,DatePicker} from 'antd'
import moment from 'moment'

const FormItem = Form.Item
const RadioGroup = Radio.Group

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const EnterpriseCreateModal = ({
                                 onOk,
                                 form: {
                                   getFieldDecorator,
                                   validateFields,
                                   getFieldsValue,
                                 },
                                 ...modalProps,
                                 editObj,
                               }) => {
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }

      let data
      if (editObj === null) {
        data = {
          enterprise: {
            ...getFieldsValue(),
          },
          isCreate: true,
        }
      } else {
        data = {
          enterprise: {
            id: editObj.id,
            ...getFieldsValue(),
          },
          isCreate: false,
        }
      }

      onOk(data)
    })
  }

  return (
    <Modal {...modalProps} onOk={handleOk} okText="保存">
      <Form layout="horizontal">
        <Row>
          <Col span={12}>
            <FormItem label="企业名称" hasFeedback {...formItemLayout}>
              {getFieldDecorator('enterprise_name', {
                initialValue: editObj !== null ? editObj.enterprise_name : '',
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: '必须输入企业名称',
                  },
                  {
                    min: 2,
                    max: 30,
                    message: '请输入2到30个字',
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Col>
          <Col span = {12}>
            <FormItem label="企业类型" hasFeedback {...formItemLayout}>
              {getFieldDecorator('enterprise_type', {
                initialValue: editObj !== null ? editObj.enterprise_type : '',
              })(<Input />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label="成立时间" hasFeedback {...formItemLayout}>
              {getFieldDecorator('founding_time', {
                initialValue: editObj !== null ? moment(new Date(editObj.founding_time).format("yyyy-MM-dd hh:mm:ss")) : '',
              })(<DatePicker />)}
            </FormItem>
          </Col>
          <Col span = {12}>
            <FormItem label="邮政编码" hasFeedback {...formItemLayout}>
              {getFieldDecorator('postal_code', {
                initialValue: editObj !== null ? editObj.postal_code : '',
              })(<Input />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label="注册地址" hasFeedback {...formItemLayout}>
              {getFieldDecorator('register_address', {
                initialValue: editObj !== null ? editObj.register_address : '',
              })(<Input />)}
            </FormItem>
          </Col>
          <Col span = {12}>
            <FormItem label="联系人" hasFeedback {...formItemLayout}>
              {getFieldDecorator('contacts', {
                initialValue: editObj !== null ? editObj.contacts : '',
              })(<Input />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span = {12}>
            <FormItem label="生产地址" hasFeedback {...formItemLayout}>
              {getFieldDecorator('manufacturer_address', {
                initialValue: editObj !== null ? editObj.manufacturer_address : '',
              })(<Input />)}
            </FormItem>
          </Col>
          <Col span = {12}>
            <FormItem label="联系电话" hasFeedback {...formItemLayout}>
              {getFieldDecorator('contact_number', {
                initialValue: editObj !== null ? editObj.contact_number : '',
              })(<Input />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span = {12}>
            <FormItem label="法人代表" hasFeedback {...formItemLayout}>
              {getFieldDecorator('legal_representative', {
                initialValue: editObj !== null ? editObj.legal_representative : '',
              })(<Input />)}
            </FormItem>
          </Col>
          <Col span = {12}>
            <FormItem label="传真" hasFeedback {...formItemLayout}>
              {getFieldDecorator('fax', {
                initialValue: editObj !== null ? editObj.fax : '',
              })(<Input />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span = {12}>
            <FormItem label="企业性质" hasFeedback {...formItemLayout}>
              {getFieldDecorator('enterprise_nature', {
                initialValue: editObj !== null ? editObj.enterprise_nature : '',
              })(<Input />)}
            </FormItem>
          </Col>
          <Col span = {12}>
            <FormItem label="注册资金" hasFeedback {...formItemLayout}>
              {getFieldDecorator('register_capital', {
                initialValue: editObj !== null ? editObj.register_capital : '',
              })(<Input />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span = {12}>
            <FormItem label="企业职工" hasFeedback {...formItemLayout}>
              {getFieldDecorator('staff_number', {
                initialValue: editObj !== null ? editObj.staff_number : '',
              })(<Input />)}
            </FormItem>
          </Col>
          <Col span = {12}>
            <FormItem label="地方局" hasFeedback {...formItemLayout}>
              {getFieldDecorator('local_bureau', {
                initialValue: editObj !== null ? editObj.local_bureau : '',
              })(<Input />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span = {12}>
            <FormItem label="产品类别" hasFeedback {...formItemLayout}>
              {getFieldDecorator('product_category', {
                initialValue: editObj !== null ? editObj.product_category : '',
              })(<Input />)}
            </FormItem>
          </Col>
          <Col span = {12}>
            <FormItem label="行政许可类别统计" hasFeedback {...formItemLayout}>
              {getFieldDecorator('administrative_licensing_statistics', {
                initialValue: editObj !== null ? editObj.administrative_licensing_statistics : '',
              })(<Input />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span = {24}>
            <FormItem label="备注" hasFeedback {...formItemLayout}>
              {getFieldDecorator('legal_representative', {
                initialValue: editObj !== null ? editObj.legal_representative : '',
              })(<Input />)}
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

EnterpriseCreateModal.propTypes = {
  onOk: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  editObj: PropTypes.object,
}

export default Form.create()(EnterpriseCreateModal)
