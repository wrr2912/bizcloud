import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Row, Col,Timeline, Icon, Radio, Modal, Button, Cascader ,AutoComplete} from 'antd'
import HorizontalTimeline from 'react-horizontal-timeline'
import moment from 'moment';
import styles from './NodeModal.less'
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
                 checkItem = {},
                 form: {
                   getFieldDecorator,
                   validateFields,
                   getFieldValue,
                   getFieldsValue,

                 },
                 ...checkNodeProps
               }) => {
  const handleOk = () => {

    const data = {

    }
    validateFields((errors) => {
      if (errors) {
        return
      }
      onOk(data)
    })

    console.log(data)

  }

  const modalOpts = {
    footer:null,
    wrapClassName: 'vertical-center-modal',
    className: styles.modalWidth,
    ...checkNodeProps,
  }

  const apply = [item];
  console.log('----------时间节点审批---------------')
  console.log(item.adviceList)
  const   nodes = item.adviceList.map((advice)=>{
    let name,result,time
    if(advice.adviceType==1){
        name = '经办人审查'
        result = advice.reviewResult==1?'通过':'不通过'
        time = moment(advice.reviewTime).format('YYYY-MM-DD')
    }else if(advice.adviceType==2){
      name = '司集体审查'
      result = advice.reviewResult==1?'通过':'不通过'
      time = moment(advice.reviewTime).format('YYYY-MM-DD')
    }else if(advice.adviceType==3){
      name = '处审查'
      result = advice.reviewResult==1?'通过':'不通过'
      time = moment(advice.reviewTime).format('YYYY-MM-DD')
    }else if(advice.adviceType==4){
      name = '司主管负责人审查'
      result = advice.reviewResult==1?'通过':'不通过'
      time = moment(advice.reviewTime).format('YYYY-MM-DD')
    }else if(advice.adviceType==5){
      name = '司主要负责人审查'
      result = advice.reviewResult==1?'通过':'不通过'
      time = moment(advice.reviewTime).format('YYYY-MM-DD')
    }

   return  <Timeline.Item>{name}-->{result}-->{time}</Timeline.Item>

  })
  const   nextNodes = item.reviewStage==1?[<Timeline.Item dot={<Icon type="clock-circle-o"  style={{ fontSize: "18px" }}/>} color="red" >经办人审查-->审核中</Timeline.Item>,

      <Timeline.Item color="gray">司集体审查-->等待中</Timeline.Item>,
      <Timeline.Item color="gray">处审查-->等待中</Timeline.Item>,
      <Timeline.Item color="gray">司主管负责人审查-->等待中</Timeline.Item>,
      <Timeline.Item color="gray">司主要负责人审查-->等待中</Timeline.Item>]:item.reviewStage==2?[<Timeline.Item dot={<Icon type="clock-circle-o"  style={{ fontSize: "18px" }}/>} color="red" >司集体审查-->审核中</Timeline.Item>,

    <Timeline.Item color="gray">处审查-->等待中</Timeline.Item>,
    <Timeline.Item color="gray">司主管负责人审查-->等待中</Timeline.Item>,
    <Timeline.Item color="gray">司主要负责人审查-->等待中</Timeline.Item>]:item.reviewStage==3?[<Timeline.Item dot={<Icon type="clock-circle-o"  style={{ fontSize: "18px" }}/>} color="red" >处审查-->审核中</Timeline.Item>,

    <Timeline.Item color="gray">司主管负责人审查-->等待中</Timeline.Item>,
    <Timeline.Item color="gray">司主要负责人审查-->等待中</Timeline.Item>]:item.reviewStage==4?[<Timeline.Item dot={<Icon type="clock-circle-o"  style={{ fontSize: "18px" }}/>} color="red" >司主管负责人审查-->审核中</Timeline.Item>,

    <Timeline.Item color="gray">司主要负责人审查-->等待中</Timeline.Item>]:item.reviewStage==5?[<Timeline.Item dot={<Icon type="clock-circle-o"  style={{ fontSize: "18px" }}/>} color="red" >司主要负责人审查-->审核中</Timeline.Item>,

    <Timeline.Item color="gray">结束</Timeline.Item>]:<Timeline.Item >结束</Timeline.Item>;

  return (
    <Modal {...modalOpts} >
      <Timeline  >
        {nodes}
        {nextNodes}
        {/*<Timeline.Item>经办人审核，通过 ，2017-09-20</Timeline.Item>*/}
        {/*<Timeline.Item>处集体审查，通过 ，2017-09-23</Timeline.Item>*/}
        {/*<Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '18px' }} />} color="red">分管司领导，审核中 ，2017-09-24</Timeline.Item>*/}
        {/*<Timeline.Item color="gray">司集体审查  等待中</Timeline.Item>*/}
      </Timeline>
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
