import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Row, Col, Icon, Radio, Modal, Button, Cascader ,AutoComplete} from 'antd'
import MaterialList from './MaterialList';
import styles from './CheckModal.less'
import AdviceForm from './components/AdviceForm'
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
                 item,
                 onOk,
                 setDocKey,
                 updateDocHtml,
                 docHtml,
                 docKey,
                 checkItem = {},
                 adviceFormVisible,
                 form: {
                   getFieldDecorator,
                   validateFields,
                   getFieldValue,
                   getFieldsValue,

                 },
                 ...checkModalProps,
               }) => {
  const handleOk = () => {
    const data={
      advice:getFieldValue('advice'),
      reviewResult:getFieldValue('reviewResult'),
      applyid: item.id,
    }
    validateFields((errors) => {
      if (errors) {
        return
      }else{
        onOk(data)
      }

    })
  }
  const setKey = (value)=>{

      setDocKey(value)
  }

  const getDocument = (value) => {
    updateDocHtml(value)
  }

  const handleSearch = (value) => {

  }
  const footer = {}
  if(!adviceFormVisible){
    footer.footer = null;
  }
  const modalOpts = {
    ...footer,
    okText:'确定',
    cancelText:'取消',
    wrapClassName: 'vertical-center-modal',
    className: styles.modalWidth,
    ...checkModalProps,
    onOk: handleOk,
  }
  console.log("adviceFormVisible:"+adviceFormVisible);
  const formItemLayout = {
    labelCol: {
      span: 2,
    },
    wrapperCol: {
      span: 22,
    },
  }
   const MaterialListGen = () => <MaterialList materialList={checkItem} setKey={setKey} updateDocHtml={getDocument}/>
  return (

    <Modal {...modalOpts} >
      <div className="content-inner" >
        <Row>
          <Col span={8}>
            <div>材料列表：</div>
            <br/>
            <div className={styles.treeBox} >
              <MaterialListGen />
            </div>
          </Col>
          <Col span={16}>
            <div>文档内容：</div>
            <br/>
            <div className={styles.docBox}>
              <div dangerouslySetInnerHTML={{__html:docHtml}}></div>
            </div>
          </Col>
        </Row>
      </div>
      {adviceFormVisible && <Form layout="horizontal">
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

      </Form>}
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
