import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Row, Col, Icon, Radio, Modal, Button, Cascader ,AutoComplete} from 'antd'
import moment from 'moment';
import AdviceList from './AdviceList';
import styles from './PreAdviceModal.less'
import AdviceModal from './AdviceModal'
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
                 adviceList={},
                 checkItem = {},
                 onPreCancel,
                 ...preAdviceProps,

               }) => {

  const modalOpts = {
    // okText:'提交审查',
    // cancelText:'暂存退出',
    footer:null,
    wrapClassName: 'vertical-center-modal',
    className: styles.modalWidth,
    ...preAdviceProps,
    onCancel:onPreCancel
  }

   const AdviceListGen = () => <AdviceList adviceList={adviceList}/>
  return (

    <Modal {...modalOpts} >
      <div className="content-inner" >

            <div className={styles.viewBox}>
               <AdviceListGen />

            </div>

      </div>
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
