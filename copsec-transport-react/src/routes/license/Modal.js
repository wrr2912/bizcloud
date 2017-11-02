import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader } from 'antd'
import city from '../../utils/city'
const RadioGroup = Radio.Group;
const FormItem = Form.Item
const { TextArea } = Input;
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const modal = ({
                 item = {},
                 onOk,
                 form: {
                   getFieldDecorator,
                   validateFields,
                   getFieldsValue,
                 },
                 ...modalProps
               }) => {
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        id: item.id,
      }
      onOk(data)
    })
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  return (

    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="受理号" hasFeedback {...formItemLayout}>
          {getFieldDecorator('acceptNumber', {
            initialValue: item.acceptNumber,

          })(<Input />)}
        </FormItem>
        <FormItem label="申请事项" hasFeedback {...formItemLayout}>
          {getFieldDecorator('applyItems', {
            initialValue: item.applyItems,

          })(<Input />)}
        </FormItem>

        <FormItem label="企业名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('companyName', {
            initialValue: item.companyName,

          })(<Input />)}
        </FormItem>
        <FormItem label="审核结果" hasFeedback {...formItemLayout}>
          {getFieldDecorator('reviewResult', {
          })( <RadioGroup >
            <Radio value={1}>同意</Radio>
            <Radio value={2}>不同意</Radio>
          </RadioGroup>)}
        </FormItem>
        <FormItem label="审核意见" hasFeedback {...formItemLayout}>
          {getFieldDecorator('suggestion', {
          })(<TextArea placeholder="填写审核意见" autosize={{ minRows: 2, maxRows: 6 }} />)}
        </FormItem>

      </Form>
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(modal)
