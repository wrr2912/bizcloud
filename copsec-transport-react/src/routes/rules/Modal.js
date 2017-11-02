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
                 editObj,
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
        <FormItem label="信息类型" hasFeedback {...formItemLayout}>
          {getFieldDecorator('messType', {
            initialValue: item !== null ? item.messType : '',

          })(<Input />)}
        </FormItem>
        <FormItem label="同步时间" hasFeedback {...formItemLayout}>
          {getFieldDecorator('synDate', {
            initialValue: item !== null ? item.synDate : '',

          })(<Input />)}
        </FormItem>

        <FormItem label="备注" hasFeedback {...formItemLayout}>
          {getFieldDecorator('remarks', {
            initialValue: item !== null ? item.remarks : '',

          })(<TextArea placeholder="备注" autosize={{ minRows: 2, maxRows: 6 }} />)}
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
