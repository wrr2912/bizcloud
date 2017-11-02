import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Row, Col, Icon, Radio, Modal, Button, Cascader ,AutoComplete} from 'antd'
import styles from './CheckModal.less'
import {DataTable} from '../../components/'
import ApplyList from './ApplyList';
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
                 onOk,
                 onSearch,
                 docHtml,
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
    let reviewType = item.reviewStage==3 ? 2:3

    const data = {
          reviewResult: getFieldValue('reviewResult'),
          advice:getFieldValue('reviewAdvice'),
          applyid: item.id,
          reviewType:reviewType
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

  const modalOpts = {
    okText:'提交审批',
    cancelText:'取消',
    wrapClassName: 'vertical-center-modal',
    className: styles.modalWidth,
    ...modalProps,
    onOk: handleOk,
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
            <TextArea disabled={true} value={item.adviceList[0].advice} autosize={{ minRows: 6, maxRows: 10 }} />
          </Row>
            <Row> <span>经办人：</span> {item.acceptWorker}</Row>
           </div>)}
        </FormItem>
          <FormItem label="司集体审查意见" hasFeedback {...formItemLayout}>
            {getFieldDecorator('directorView', {
              //  initialValue: item.reviewResult,
              initialValue:item.adviceList[1].advice,
            })(
              <TextArea disabled={true}  autosize={{ minRows: 6, maxRows: 10 }} />
            )}
          </FormItem>

        {item.reviewStage==4  &&   <FormItem label="处审查意见" hasFeedback {...formItemLayout}>
          {getFieldDecorator('directorView', {
            //  initialValue: item.reviewResult,
            initialValue:item.adviceList[2].advice,
          })(
            <TextArea disabled={true} autosize={{ minRows: 6, maxRows: 10 }} />
         )}
        </FormItem> }
        {item.reviewStage==5  &&   <FormItem label="司主管责任人意见" hasFeedback {...formItemLayout}>
          {getFieldDecorator('directorView', {
            //  initialValue: item.reviewResult,
            initialValue:item.adviceList[3].advice,
          })(
            <TextArea disabled={true}  autosize={{ minRows: 6, maxRows: 10 }} />
          )}
        </FormItem> }
        {item.reviewStage==6  &&   <FormItem label="司主要责任人意见" hasFeedback {...formItemLayout}>
          {getFieldDecorator('directorView', {
            //  initialValue: item.reviewResult,
            initialValue:item.adviceList[4].advice,
          })(
            <TextArea disabled={true}  autosize={{ minRows: 6, maxRows: 10 }} />
          )}
        </FormItem> }
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
              message:"填写审核结果",
              required: true,
            }
          ]
        })( <RadioGroup >
          <Radio value={1}>准予</Radio>
          <Radio value={2}>不准予</Radio>
        </RadioGroup>)}
      </FormItem>

      <FormItem label="审核意见" hasFeedback {...formItemLayout}>
        {getFieldDecorator('reviewAdvice', {
          rules: [
            {
              message:"填写审核意见",
              required: true,
            }
          ]
        })(<TextArea placeholder="填写审核意见" autosize={{ minRows: 4, maxRows: 6 }} />)}
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
