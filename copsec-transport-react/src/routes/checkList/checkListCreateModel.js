import React, { PropTypes } from 'react'
import { Form, Modal, Input } from 'antd'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const CheckListCreateModel = ({
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
          checkList: {
            ...getFieldsValue(),
          },
          isCreate: true,
        }
      } else {
        data = {
          checkList: {
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
    <Modal {...modalProps} onOk={handleOk} okText="保存" title="集体审查清单">
      <Form layout="horizontal">
        <FormItem label="企业名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('companyName', {
            initialValue: editObj !== null ? editObj.companyName : '',
            rules: [
              {
                required: true,
                whitespace: true,
                message: '必须输入企业名称',
              },
              {
                min: 2,
                max: 10,
                message: '请输入2到10个字',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="产品类型" hasFeedback {...formItemLayout}>
          {getFieldDecorator('productType', {
            initialValue: editObj !== null ? editObj.productType : '',
            rules: [
              {
                whitespace: true,
                message: '请输入产品类型',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="产品编号" hasFeedback {...formItemLayout}>
          {getFieldDecorator('productNum', {
            initialValue: editObj !== null ? editObj.productNum : '',
            rules: [
              {
                whitespace: true,
                message: '请输入产品编号',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="产品型号" hasFeedback {...formItemLayout}>
          {getFieldDecorator('productVersion', {
            initialValue: editObj !== null ? editObj.productVersion : '',
            rules: [
              {
                required: true,
                whitespace: true,
                message: '必须输入产品型号',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="许可种类" hasFeedback {...formItemLayout}>
          {getFieldDecorator('licenseType', {
            initialValue: editObj !== null ? editObj.licenseType : '',
            rules: [
              {
                required: true,
                whitespace: true,
                message: '必须输入许可种类！',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="修程" hasFeedback {...formItemLayout}>
          {getFieldDecorator('repairing', {
            initialValue: editObj !== null ? editObj.repairing : '',
            rules: [
              {
                whitespace: true,
                message: '请输入修程',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="是否延期" hasFeedback {...formItemLayout}>
          {getFieldDecorator('isDelay', {
            initialValue: editObj !== null ? editObj.isDelay : '',
            rules: [
              {
                whitespace: true,
                message: '请选择是否延期',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="其他" hasFeedback {...formItemLayout}>
          {getFieldDecorator('otherss', {
            initialValue: editObj !== null ? editObj.otherss : '',
            rules: [
              {
                whitespace: true,
                message: '请输入所学专业',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="提审字号" hasFeedback {...formItemLayout}>
          {getFieldDecorator('arraignment', {
            initialValue: editObj !== null ? editObj.arraignment : '',
            rules: [
              {
                whitespace: true,
                message: '请输入提审字号',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="受理日期" hasFeedback {...formItemLayout}>
          {getFieldDecorator('acceptDate', {
            initialValue: editObj !== null ? editObj.acceptDate : '',
            rules: [
              {
                whitespace: true,
                message: '请选择受理日期',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="接受日期" hasFeedback {...formItemLayout}>
          {getFieldDecorator('receiveDate', {
            initialValue: editObj !== null ? editObj.receiveDate : '',
            rules: [
              {
                whitespace: true,
                message: '请选择接受日期',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="经办人" hasFeedback {...formItemLayout}>
          {getFieldDecorator('operatorName', {
            initialValue: editObj !== null ? editObj.operatorName : '',
            rules: [
              {
                required: true,
                whitespace: true,
                message: '必须输入经办人',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="复核人" hasFeedback {...formItemLayout}>
          {getFieldDecorator('reOperator', {
            initialValue: editObj !== null ? editObj.reOperator : '',
            rules: [
              {
                whitespace: true,
                message: '请输入复核人',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="审查意见" hasFeedback {...formItemLayout}>
          {getFieldDecorator('reviewAdvices', {
            initialValue: editObj !== null ? editObj.reviewAdvices : '',
            rules: [
              {
                whitespace: true,
                message: '请输入审查意见',
              },
            ],
          })(<Input />)}
        </FormItem>
      </Form>
    </Modal>
  )
}

CheckListCreateModel.propTypes = {
  onOk: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  editObj: PropTypes.object,
}

export default Form.create()(CheckListCreateModel)
