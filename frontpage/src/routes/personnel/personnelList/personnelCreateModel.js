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

const PersonnelCreateModel = ({
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
          personnel: {
            ...getFieldsValue(),
          },
          isCreate: true,
        }
      } else {
        data = {
          personnel: {
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
    <Modal {...modalProps} onOk={handleOk} okText="保存" title="新增人员">
      <Form layout="horizontal">
        <FormItem label="姓名" hasFeedback {...formItemLayout}>
          {getFieldDecorator('personnelName', {
            initialValue: editObj !== null ? editObj.personnelName : '',
            rules: [
              {
                required: true,
                whitespace: true,
                message: '必须输入名称',
              },
              {
                min: 2,
                max: 12,
                message: '请输入2到12个字',
              },
            ],
          })(<Input />)}
        </FormItem>

        <FormItem label="年龄" hasFeedback {...formItemLayout}>
          {getFieldDecorator('personnelAge', {
            initialValue: editObj !== null ? editObj.personnelAge : '',
          })(<Input />)}
        </FormItem>
        <FormItem label="性别" hasFeedback {...formItemLayout}>
          {getFieldDecorator('personnelGender', {
            initialValue: editObj !== null ? editObj.personnelGender : '',
          })(<Input />)}
        </FormItem>
      </Form>
    </Modal>
  )
}

PersonnelCreateModel.propTypes = {
  onOk: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  editObj: PropTypes.object,
}

export default Form.create()(PersonnelCreateModel)
