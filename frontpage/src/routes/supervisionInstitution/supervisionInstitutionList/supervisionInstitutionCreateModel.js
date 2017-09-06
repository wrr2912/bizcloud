import React, { PropTypes } from 'react'
import { Form, Modal, Input, Radio } from 'antd'

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

const SupervisionInstitutionCreateModel = ({
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
          supervisionInstitution: {
            ...getFieldsValue(),
          },
          isCreate: true,
        }
      } else {
        data = {
          supervisionInstitution: {
            SIId: editObj.SIId,
            ...getFieldsValue(),
          },
          isCreate: false,
        }
      }

      onOk(data)
    })
  }

  return (
    <Modal {...modalProps} onOk={handleOk} okText="保存" title="添加监管机构">
      <Form layout="horizontal">
        <FormItem label="监管机构名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('unitName', {
            initialValue: editObj !== null ? editObj.unitName : '',
            rules: [
              {
                required: true,
                whitespace: true,
                message: '必须输入名称',
              },
              {
                min: 1,
                max: 12,
                message: '请输入1到12个字',
              },
            ],
          })(<Input />)}
        </FormItem>

        <FormItem label="单位简称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('unitAbbreviation', {
            initialValue: editObj !== null ? editObj.unitAbbreviation : '',
          })(<Input />)}
        </FormItem>

        <FormItem label="法人代表" hasFeedback {...formItemLayout}>
          {getFieldDecorator('legalRepresentative', {
            initialValue: editObj !== null ? editObj.legalRepresentative : '',
          })(<Input />)}
        </FormItem>

        <FormItem label="法人代码" hasFeedback {...formItemLayout}>
          {getFieldDecorator('legalPersonCode', {
            initialValue: editObj !== null ? editObj.legalPersonCode : '',
          })(<Input />)}
        </FormItem>

        <FormItem label="通讯地址" hasFeedback {...formItemLayout}>
          {getFieldDecorator('postalAddress', {
            initialValue: editObj !== null ? editObj.postalAddress : '',
          })(<Input />)}
        </FormItem>

        <FormItem label="邮政编码" hasFeedback {...formItemLayout}>
          {getFieldDecorator('postalCode', {
            initialValue: editObj !== null ? editObj.postalCode : '',
          })(<Input />)}
        </FormItem>

        <FormItem label="官网链接" hasFeedback {...formItemLayout}>
          {getFieldDecorator('officialWebsiteLink', {
            initialValue: editObj !== null ? editObj.officialWebsiteLink : '',
          })(<Input />)}
        </FormItem>

        <FormItem label="备注" hasFeedback {...formItemLayout}>
          {getFieldDecorator('remarks', {
            initialValue: editObj !== null ? editObj.remarks : '',
          })(<Input />)}
        </FormItem>

        <FormItem label="值班电话" hasFeedback {...formItemLayout}>
          {getFieldDecorator('telephoneWatch', {
            initialValue: editObj !== null ? editObj.telephoneWatch : '',
          })(<Input />)}
        </FormItem>

        <FormItem label="项目名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('entryName', {
            initialValue: editObj !== null ? editObj.entryName : '',
          })(<Input />)}
        </FormItem>

        <FormItem label="项目编号" hasFeedback {...formItemLayout}>
          {getFieldDecorator('projectNumber', {
            initialValue: editObj !== null ? editObj.projectNumber : '',
          })(<Input />)}
        </FormItem>

        <FormItem label="项目联系人" hasFeedback {...formItemLayout}>
          {getFieldDecorator('projectContact', {
            initialValue: editObj !== null ? editObj.projectContact : '',
          })(<Input />)}
        </FormItem>

        <FormItem label="项目联系人电话" hasFeedback {...formItemLayout}>
          {getFieldDecorator('contactPhone', {
            initialValue: editObj !== null ? editObj.contactPhone : '',
          })(<Input />)}
        </FormItem>

        <FormItem label="录入人" hasFeedback {...formItemLayout}>
          {getFieldDecorator('entryMan', {
            initialValue: editObj !== null ? editObj.entryMan : '',
          })(<Input />)}
        </FormItem>

        <FormItem label="录入时间" hasFeedback {...formItemLayout}>
          {getFieldDecorator('entryDate', {
            initialValue: editObj !== null ? editObj.entryDate : '',
          })(<Input />)}
        </FormItem>

      </Form>
    </Modal>
  )
}

SupervisionInstitutionCreateModel.propTypes = {
  onOk: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  editObj: PropTypes.object,
}

export default Form.create()(SupervisionInstitutionCreateModel)
