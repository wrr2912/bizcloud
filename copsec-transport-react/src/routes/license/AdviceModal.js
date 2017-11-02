import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Row, Col, Icon, Radio, Modal, Button, Cascader ,AutoComplete} from 'antd'
import styles from './AdviceModal.less'
import {DataTable} from '../../components/'
import AdviceList from './AdviceList';
const RadioGroup = Radio.Group;
const Option = AutoComplete.Option;
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
         advice:getFieldValue('advice'),
         reviewResult:getFieldValue('reviewResult'),
         applyid: item.id,

    }

    validateFields((errors) => {
      if (errors) {
        return
      }else{
        onAdviceOk(data)
      }

    })
    console.log('----------提交最终----------')

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

  const AdviceListGen = () => <AdviceList adviceList={adviceList}/>

  return (
    <Modal {...modalOpts} >
      <AdviceListGen />
      <br/>
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
