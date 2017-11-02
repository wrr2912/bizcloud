import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber,Icon, Radio, Modal, Button, Cascader ,DatePicker} from 'antd'
import styles from './IssueModal.less'
import {DataTable} from '../../components/'
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
                 onIssueOk,
                 onSearch,
                 onIssueCancel,
                 form: {
                   getFieldDecorator,
                   validateFields,
                   getFieldValue,
                   getFieldsValue,

                 },
                 ...issueModalProps
               }) => {
  const handleOk = () => {

    const data = {

    //  getFieldsValue


      matterid: item.id,
      licenseDomain:{
        type:item.licenseType,
        companyName: getFieldValue('companyName'),
        productionAddress:getFieldValue('productionAddress'),
        companyAddress: getFieldValue('companyAddress'),
        productName:getFieldValue('productName'),
        trialScope: getFieldValue('trialScope'),
        certificateNumber:getFieldValue('certificateNumber'),
        validityPeriod: getFieldValue('validityPeriod'),
        issueDate:getFieldValue('productionAddress'),
        productCategory: getFieldValue('productCategory'),
        productNumber:getFieldValue('productNumber'),
        productModel: getFieldValue('productModel'),
        licenseeCompany:getFieldValue('licenseeCompany'),

        certificateNumber: getFieldValue('certificateNumber'),
        productMakeAddress:getFieldValue('productMakeAddress'),
        productMaintainAddress: getFieldValue('productMaintainAddress'),
        productMakeCompany:getFieldValue('productMakeCompany'),

      }

    }
    console.log('----------材料列表2---------')
    console.log( data)

    validateFields((errors) => {
      if (errors) {
        return
      }
      onIssueOk(data)
    })

  }

  const handleCancel= ()=>{
    onIssueCancel()
  }

  const modalOpts = {
    okText:'确认',
    cancelText:'取消',
    wrapClassName: 'vertical-center-modal',
    className: styles.modalWidth,
    ...issueModalProps,
    onOk: handleOk,
    onCancel:handleCancel
  }
  console.log('----------材料列表2---------')
  console.log( item.licenseType)
  return (
    <Modal {...modalOpts} >


      {/*// 铁路运输许可证*/}

      <Form layout="horizontal">
        <FormItem className={styles.licenseName}>
          <span>{item.licenseName}</span>
        </FormItem>
        <FormItem label="企业名称:" hasFeedback {...formItemLayout}>
          {getFieldDecorator('companyName', {
            //  initialValue: item.reviewResult,
            initialValue: item.companyName,
            rules: [
              {
                message:"企业名称是必填项",
                required: true,
              }
            ]
          })(<Input />)}
        </FormItem>

        <FormItem label="企业住所:" hasFeedback {...formItemLayout}>
          {getFieldDecorator('companyAddress', {
            initialValue:item.companyAddress,
            rules: [
              {
                message:"企业住所是必填项",
                required: true,
              }
            ]
          })(<Input/>
          )}
        </FormItem>


        <FormItem label="许可范围：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('trialScope', {
            rules: [
              {
                message:"许可范围是必填项",
                required: true,
              }
            ]
          })(<TextArea placeholder="填写许可范围" autosize={{ minRows: 2, maxRows: 6 }} />)}
        </FormItem>

        <FormItem label="证书编号:" hasFeedback {...formItemLayout}>
          {getFieldDecorator('certificateNumber', {
            rules: [
              {
                message:"证书编号是必填项",
                required: true,
              }
            ]
          })(<Input />)}
        </FormItem>

        <FormItem label="有效期限:" hasFeedback {...formItemLayout}>
          {getFieldDecorator('validityPeriod', {
            rules: [
              {
                message:"有效期限是必填项",
                required: true,
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem label="发证日期:" hasFeedback {...formItemLayout}>
          {getFieldDecorator('issueDate', {
            rules: [
              {
                message:"发证日期是必填项",
                required: true,
              }
            ]
          })(<DatePicker style={{width:'100%'}} showTime format="YYYY-MM-DD HH:mm:ss" />)}
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
