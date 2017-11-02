import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Row, Col, Select,Icon, Radio, Modal, Button, Cascader ,AutoComplete} from 'antd'
import styles from './AdviceModal.less'
import {DataTable} from '../../components/'
import AdviceList from './AdviceList';
const RadioGroup = Radio.Group;
const Option = Select.Option;
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
                 onAdviceOk,
                 docHtml,
                 onAdviceCancel,
                 adviceModalVisible,
                 adviceList={},
                 adviceItem = {},
                 form: {
                   getFieldDecorator,
                   validateFields,
                   getFieldValue,
                   getFieldsValue,

                 },
                 ...adviceModel
               }) => {
  const handleOk = () => {
     const data = {
       ...getFieldsValue(),
       acceptedid:item.id,
    }

    validateFields((errors) => {
      if (errors) {
        return
      }else{
        onAdviceOk(data)
      }

    })
    console.log('----------提交最终----------')
    console.log(data)

  }

  const handleCancel = () => {
    onAdviceCancel();
  }


  const modalOpts = {
    okText:'确定',
    cancelText:'取消',
    wrapClassName: 'vertical-center-modal',
    className: styles.modalWidth,
    ...adviceModel,
    onOk: handleOk,
    onCancel: handleCancel,
  }

 // const AdviceListGen = () => <AdviceList adviceList={adviceList}/>

  return (
    <Modal {...modalOpts} >
      <FormItem  label="企业名称" hasFeedback {...formItemLayout}>
        {getFieldDecorator('companyName', {
          initialValue:item.companyName,
          rules: [
            {

              required: true,
            }
          ]
        })(
          <Input />
         )}
      </FormItem>
      <FormItem  label="地区监管局" hasFeedback {...formItemLayout}>
        {getFieldDecorator('zoneAdmin', {
          initialValue:item.zoneAdmin,
          rules: [
            {
              message: '选择地区监管局',
              required: true,
            }
          ]
        })(

              <Select  style={{ width: 200 }}
                                    placeholder="选择一个监管局">
              <Option value="沈阳铁路监督管理局">沈阳铁路监督管理局</Option>
              <Option value="上海铁路监督管理局">上海铁路监督管理局</Option>
              <Option value="广州铁路监督管理局">广州铁路监督管理局</Option>
              <Option value="成都铁路监督管理局">成都铁路监督管理局</Option>
              <Option value="武汉铁路监督管理局">武汉铁路监督管理局</Option>
              <Option value="西安铁路监督管理局">西安铁路监督管理局</Option>
              <Option value="兰州铁路监督管理局">兰州铁路监督管理局</Option>
            </Select>

         )}
      </FormItem>
      <FormItem  label="联系人" hasFeedback {...formItemLayout}>
      {getFieldDecorator('contactor', {

        rules: [
          {
            required: false,
          }
        ]
      })(
        <Input />
      )}
    </FormItem>
      <FormItem  label="联系方式" hasFeedback {...formItemLayout}>
        {getFieldDecorator('contactWay', {

          rules: [
            {
              required: false,
            }
          ]
        })(
          <Input />
        )}
      </FormItem>
      <FormItem  label="材料（名称+位置）" hasFeedback {...formItemLayout}>
        {getFieldDecorator('material', {

          rules: [
            {
              message: '填写材料位置',
              required: true,
            }
          ]
        })(

          <TextArea placeholder="填写材料位置"  autosize={{ minRows: 6, maxRows: 10 }} />
        )}
      </FormItem>
      <FormItem  label="材料审查意见" hasFeedback {...formItemLayout}>
      {getFieldDecorator('preAdvice', {

        rules: [
          {
            message: '填写材料审查意见',
             required: true,
          }
        ]
      })(

      <TextArea placeholder="填写材料审查意见"  autosize={{ minRows: 6, maxRows: 10 }} />
      )}
      </FormItem>

    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,

  onAdviceOk: PropTypes.func,
}

export default Form.create()(modal)
