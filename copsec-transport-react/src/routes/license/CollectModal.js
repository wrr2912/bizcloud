import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input,Checkbox, InputNumber,Upload, Row, Col, Select,Icon, Radio, Modal, Button, Cascader ,AutoComplete} from 'antd'
import styles from './CheckModal.less'
import {DataTable} from '../../components/'
import ApplyList from './ApplyList';
const RadioGroup = Radio.Group;

const Option = Select.Option;
const FormItem = Form.Item
const { TextArea } = Input;


const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 12,
  },
}
const modal = ({
                 item = {},
                 onOk,
                 changeCheck,
                 onSearch,
                 docHtml,
                 goverVisible,
                 adminVisible,
                 chiefsModelVisible,
                 checkItem = {},
                 form: {
                   getFieldDecorator,
                   validateFields,
                   getFieldValue,
                   getFieldsValue,

                 },
                 ...modalProps
               }) => {

  const handleOk = () => {

    let localGover=getFieldValue('localGover')==false?"":getFieldValue('localGover')
    let localAdmin=getFieldValue('localAdmin')==false?"":getFieldValue('localAdmin')

    const data = {
          reviewResult: getFieldValue('reviewResult'),
          advice:getFieldValue('reviewAdvice'),
          localAdmin:localAdmin,
          localGover:localGover,
          applyid: item.id
    }
    validateFields((errors) => {
      if (errors) {
        return
      }
      onOk(data)
    })
    console.log('----------审批---------------')
    console.log(data)

  }
  const goverChange = (e) =>{
    if(e.target.checked ){
     goverVisible=true
    }else{
      goverVisible=false
    }
    changeCheck(e.target.value,goverVisible)
  }
  const adminChange = (e) =>{
    if(e.target.checked ){
      adminVisible=true
    }else{
      adminVisible=false
    }
    changeCheck(e.target.value,adminVisible)
  }
  const modalOpts = {
    okText:'提交',
    cancelText:'取消',
    wrapClassName: 'vertical-center-modal',
    className: styles.modalWidth,
    ...modalProps,
    onOk: handleOk,
  }
  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }
  const apply = [item];
  console.log(...apply)

  const ApplyListGen = () => <ApplyList applyList={item}/>

  return (
    <Modal {...modalOpts} >
      <ApplyListGen />
      <br/>
      <Form layout="horizontal">

        <FormItem label="经办人意见" hasFeedback {...formItemLayout}>
          {getFieldDecorator('workAdvice', {
          //  initialValue: item.reviewResult,
            //initialValue:'以上行政许可申请，材料完备齐全，符合法定形式，通过材料审查。',
          })(<div><Row>
            <TextArea disabled={true} value={item.adviceList[0].advice} autosize={{ minRows: 4, maxRows: 10 }} />
          </Row>
            <Row> <span>经办人：</span> {item.acceptWorker}</Row>
           </div>)}
        </FormItem>

        <FormItem label="是否延期" hasFeedback {...formItemLayout}>
          {getFieldDecorator('isDelay', {
            rules: [
              {
                required: false,
              }
            ]
          })( <RadioGroup >
            <Radio value={1}>是</Radio>
            <Radio value={0}>否</Radio>
          </RadioGroup>)}
        </FormItem>



      <FormItem label="审核结果" hasFeedback {...formItemLayout}>
        {getFieldDecorator('reviewResult', {
          rules: [
            {
              message:"审核结果是必填项",
              required: true,
            }
          ]
        })( <RadioGroup >
          <Radio value={1}>准予</Radio>
          <Radio value={2}>不准予</Radio>
          <Radio value={3}>补充材料</Radio>
        </RadioGroup>)}
      </FormItem>

      <FormItem label="集体审查意见" hasFeedback {...formItemLayout}>
        {getFieldDecorator('reviewAdvice', {
          rules: [
            {
              message:"审查意见是必填项",
              required: true,
            }
          ]
        })(<TextArea placeholder="填写集体审查意见" autosize={{ minRows: 4, maxRows: 6 }} />)}
      </FormItem>
      <FormItem label="附件" hasFeedback {...formItemLayout}>

              {getFieldDecorator('upload', {
                valuePropName: 'fileList',
                getValueFromEvent: {normFile},
                required:false
              })(
                <Upload name="logo" action="" listType="">
                  <Button>
                    <Icon type="upload" /> 上传附件
                  </Button>
                </Upload>
              )}
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
