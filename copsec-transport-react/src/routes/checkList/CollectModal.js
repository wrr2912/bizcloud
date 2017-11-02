import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber,Row, Col, Icon, Radio, Modal, Button, Cascader ,AutoComplete} from 'antd'
import styles from './CollectModal.less'
import {DataTable} from '../../components/'
import ApplyList from './ApplyList'

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
                 detailObj = {},
                 onOk,
                 adviceList,
                 form: {
                   getFieldDecorator,
                   validateFields,
                   getFieldValue,
                   getFieldsValue,

                 },
                 ...detailProps,

               }) => {
  const handleOk = () => {

    const data = {
          reviewResult: getFieldValue('reviewResult'),
          advice:getFieldValue('reviewAdvice'),
          applyid: item.id
    }

    validateFields((errors) => {
      if (errors) {
        return
      }

    })

    onOk(data)
  }

  const modalOpts = {
    // okText:'提交',
    // cancelText:'取消',
    footer:null,
    wrapClassName: 'vertical-center-modal',
    className: styles.modalWidth,
    ...detailProps,
    onOk: handleOk,
  }

  const apply = JSON.stringify(adviceList);

  return (
    <Modal {...modalOpts} >
      {/*<ApplyListGen />*/}
      <ApplyList adviceList={adviceList}/>
      <br/>

    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  onOk: PropTypes.func,
  detaiObj:PropTypes.object
}

export default Form.create()(modal)
