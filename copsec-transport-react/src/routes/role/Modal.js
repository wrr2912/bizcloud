import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader } from 'antd'
import UserPower from './UserPower'
import city from '../../utils/city'
import styles from './Modal.less'

const FormItem = Form.Item

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
        roleId: item.roleId,
      }
      onOk(data)
    })
  }

  const modalOpts = {
    wrapClassName: 'vertical-center-modal',
    className: styles.modalWidth,
    ...modalProps,
    onOk: handleOk,
  }
  const UserPowerGen = () => <UserPower powerList={item.power}/>

  return (
    <Modal  {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="角色名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('roleName', {
            initialValue: item.roleName,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>

        <FormItem>
          <UserPowerGen/>
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
