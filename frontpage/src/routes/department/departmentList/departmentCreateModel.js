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

const DepartmentCreateModel = ({
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
          department: {
            ...getFieldsValue(),
          },
          isCreate: true,
        }
      } else {
        data = {
          department: {
            departmentId: editObj.departmentId,
            ...getFieldsValue(),
          },
          isCreate: false,
        }
      }

      onOk(data)
    })
  }

  return (
    <Modal {...modalProps} onOk={handleOk} okText="保存" title="添加部门">
      <Form layout="horizontal">
        <FormItem label="部门名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('departmentName', {
            initialValue: editObj !== null ? editObj.departmentName : '',
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

        <FormItem label="部门人数" hasFeedback {...formItemLayout}>
          {getFieldDecorator('sectorNumber', {
            initialValue: editObj !== null ? editObj.sectorNumber : '',
          })(<Input />)}
        </FormItem>
      </Form>
    </Modal>
  )
}

DepartmentCreateModel.propTypes = {
  onOk: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  editObj: PropTypes.object,
}

export default Form.create()(DepartmentCreateModel)
