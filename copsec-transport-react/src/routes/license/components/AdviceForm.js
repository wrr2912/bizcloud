import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Row, Col, Icon, Radio, Modal, Button, Cascader ,AutoComplete} from 'antd'
const RadioGroup = Radio.Group;
const FormItem = Form.Item
const { TextArea } = Input;


const formItemLayout = {
  labelCol: {
    span: 3,
  },
  wrapperCol: {
    span: 20,
  },
}

const form = ({
                 form: {
                   getFieldDecorator,
                   validateFields,
                   getFieldValue,
                   getFieldsValue,

                 },
               }) => {
  return (
      <Form layout="horizontal">
        <FormItem label="审核结果" hasFeedback {...formItemLayout}>
          {getFieldDecorator('reviewResult', {
            rules: [
              {
                message:"审核结果是必填项",
                required: true,
              }
            ]
          })(<RadioGroup >
            <Radio value={1}>准予</Radio>
            <Radio value={2}>不准予</Radio>
          </RadioGroup>)}
        </FormItem>
      <FormItem label="审核意见" hasFeedback {...formItemLayout}>
        {getFieldDecorator('advice', {
          rules: [
            {
              message:"审核意见是必填项",
              required: true,
            }
          ]
        })(<TextArea placeholder="填写审核意见" autosize={{ minRows:6, maxRows: 10 }} />)}
      </FormItem>

    </Form>
  )
}

form.propTypes = {
  form: PropTypes.object.isRequired,
}

export default Form.create()(form)
