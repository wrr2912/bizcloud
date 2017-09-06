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

const UserCreateModel = ({
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
          user: {
            ...getFieldsValue(),
          },
          isCreate: true,
        }
      } else {
        data = {
          user: {
            userid: editObj.userid,
            ...getFieldsValue(),
          },
          isCreate: false,
        }
      }

      onOk(data)
    })
  }

  return (
    <Modal {...modalProps} onOk={handleOk} okText="保存" title="新增用户">
      <Form layout="horizontal">
        <FormItem label="用户名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('username', {
            initialValue: editObj !== null ? editObj.username   : '',
            rules: [
              {
                required: true,
                whitespace: true,
                message: '必须输入用户名',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="密码" hasFeedback {...formItemLayout}>
          {getFieldDecorator('password', {
            initialValue: editObj !== null ? editObj.password : '',
          })(<Input />)}
        </FormItem>
        <FormItem label="用户类型" hasFeedback {...formItemLayout}>
          {getFieldDecorator('truename', {
            initialValue: editObj !== null ? editObj.truename : '',
          })(<Input />)}
        </FormItem>
        <FormItem label="部门编号" hasFeedback {...formItemLayout}>
          {getFieldDecorator('deptId', {
            initialValue: editObj !== null ? editObj.deptId : '',
          })(<Input />)}
        </FormItem>
        <FormItem label="电话" hasFeedback {...formItemLayout}>
          {getFieldDecorator('phone', {
            initialValue: editObj !== null ? editObj.phone : '',
          })(<Input />)}
        </FormItem>

        <FormItem label="邮箱" hasFeedback {...formItemLayout}>
          {getFieldDecorator('email', {
            initialValue: editObj !== null ? editObj.email : '',
          })(<Input />)}
        </FormItem>
      </Form>
    </Modal>
  )
}

UserCreateModel.propTypes = {
  onOk: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  editObj: PropTypes.object,
}

export default Form.create()(UserCreateModel)
