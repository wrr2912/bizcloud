import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Row, Col, Icon, Radio, Modal, Button, Cascader ,AutoComplete} from 'antd'
import moment from 'moment';
import AdviceList from './AdviceList';
import styles from './CheckModal.less'
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
                 onOk,
                 setDocKey,
                 saveAdvice,
                 showAdviceModal,
                 adviceModalVisible,
                 adviceListVisible,
                 adviceList={},
                 onSearch,
                 docHtml,
                 docKey,
                 advice,
                 checkItem = {},
                 form: {
                   getFieldDecorator,
                   validateFields,
                   getFieldValue,
                   getFieldsValue,

                 },
                 ...checkModalProps,
                 ...adviceModalProps
               }) => {
  const handleOk = () => {

    validateFields((errors) => {
      if (errors) {
        return
      }

    })
    const data={
      id:item.id
    }
    onOk(data)
  }
  const setKey = (value)=>{

      setDocKey(value)
  }
  const handleClick = () => {
    const data = {
      id:item.id,

    }
    console.log(data)
    showAdviceModal(data)

  }
  const renderOption = (item) =>{

  }

  const handleSearch = (value) => {

  }
  const modalOpts = {
    // okText:'提交审查',
    // cancelText:'暂存退出',
    footer:null,
    wrapClassName: 'vertical-center-modal',
    className: styles.modalWidth,
    ...checkModalProps,
    onOk: handleOk,
  }
const adviceModel={
    item:item,
    adviceList:adviceList,
    visible:adviceModalVisible,
    ...adviceModalProps,

}
   const AdviceListGen = () => <AdviceList adviceList={adviceList}/>
  return (

    <Modal {...modalOpts} >
      <div className="content-inner" >
        <Row>
          {/*<Col span={5}>*/}
            {/*<div>材料列表：</div>*/}
            {/*<br/>*/}
            {/*<div className={styles.treeBox} >*/}
              {/*<MaterialListGen />*/}
            {/*</div>*/}
          {/*</Col>*/}
          <Col span={14}>
            <div>文档内容：</div>
            <br/>
            <div className={styles.docBox}>
              <div dangerouslySetInnerHTML={{__html:docHtml}}></div>
            </div>
          </Col>
          <Col span={10}>
            <div>材料审查备注：</div>
            <br/>
            <div className={styles.viewBox}>
              <row><AdviceListGen /></row>
              <row>
            {/*<FormItem   hasFeedback {...formItemLayout}>*/}
              {/*{getFieldDecorator('advice', {*/}
                {/*initialValue:advice,*/}
                {/*rules: [*/}
                  {/*{*/}
                    {/*required: true,*/}
                  {/*}*/}
                {/*]*/}
              {/*})(*/}

              {/*<TextArea placeholder="填写材料审查备注"  autosize={{ minRows: 6, maxRows: 10 }} />*/}
          {/*)}*/}
            {/*</FormItem>*/}
                <br/>
                <Button className="search-btn"  onClick={() => {
                  handleClick()
                }}
                        size="large" type="primary">
                  添加意见
                </Button>
              </row>
            </div>

          </Col>
        </Row>
      </div>
      {adviceModalVisible && <AdviceModal {...adviceModel}/>}
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
