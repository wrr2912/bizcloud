import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader } from 'antd'
import city from '../../utils/city'

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
                 menuDrop,
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
        menuId: item.menuId,
      }
      console.log('-----获取菜单添加数据---------')
      console.log( ...getFieldsValue())
      console.log('-----获取菜单添加数据成功---------')
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
        <FormItem label="上级菜单" hasFeedback {...formItemLayout}>
          {getFieldDecorator('parentId', {
            initialValue: item.parentd,
            rules: [
              {
                required: true,
              },
            ],
          })( <Cascader options={menuDrop}  changeOnSelect />)}
        </FormItem>
        <FormItem label="菜单名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('menuName', {
            initialValue: item.menuName,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>

        <FormItem label="图标" hasFeedback {...formItemLayout}>
          {getFieldDecorator('icon', {
            initialValue: item.icon,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="链接" hasFeedback {...formItemLayout}>
          {getFieldDecorator('href', {
            initialValue: item.href,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="排序" hasFeedback {...formItemLayout}>
          {getFieldDecorator('sort', {
            initialValue: item.sort,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
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
