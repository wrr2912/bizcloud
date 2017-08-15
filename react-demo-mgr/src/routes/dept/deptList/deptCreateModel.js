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

const DeptCreateModel = ({
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
            dept: {
            ...getFieldsValue(),
          },
          isCreate: true,
        }
      } else {
        data = {
          dept: {
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
    <Modal {...modalProps} onOk={handleOk} okText="保存" title="新增单位">
      <Form layout="horizontal">
        <FormItem label="名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('deptname', {
            initialValue: editObj !== null ? editObj.deptname : '',
            rules: [
              {
                required: true,
                whitespace: true,
                message: '必须输入单位',
              },
              {
                min: 2,
                max: 30,
                message: '请输入2到30个字',
              },
            ],
          })(<Input />)}
        </FormItem>

        <FormItem label="父级单位" hasFeedback {...formItemLayout}>
          {getFieldDecorator('parent_id', {
            initialValue: editObj !== null ? editObj.parent_id : '',
          })(<Input />)}
        </FormItem>
      </Form>
    </Modal>
  )
}

DeptCreateModel.propTypes = {
  onOk: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  editObj: PropTypes.object,
}

export default Form.create()(DeptCreateModel)
