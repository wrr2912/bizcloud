import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Row, Col, Icon, Radio, Modal, Button, Cascader ,AutoComplete} from 'antd'
import MaterialList from './MaterialList';
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
                 adviceModalVisible,
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
      applyid:item.id,
      materail:{
        id:docKey,
        advice:getFieldValue('advice'),
      }
    }
    console.log(data)
    saveAdvice(data)

  }
  const renderOption = (item) =>{

  }

  const handleSearch = (value) => {

  }
  const modalOpts = {
    okText:'提交审查',
    cancelText:'暂存退出',
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
   const MaterialListGen = () => <MaterialList materialList={checkItem} setKey={setKey}/>
  return (

    <Modal {...modalOpts} >
      <div className="content-inner" >
        <Row>
          <Col span={5}>
            <div>材料列表：</div>
            <br/>
            <div className={styles.treeBox} >
              <MaterialListGen />
            </div>
          </Col>
          <Col span={15}>
            <div>文档内容：</div>
            <br/>
            <div className={styles.docBox}>
              <div dangerouslySetInnerHTML={{__html:docHtml}}></div>
            </div>
          </Col>
          <Col span={4}>
            <div>材料审查备注：</div>
            <br/>
            <div className={styles.viewBox}>
            <FormItem   hasFeedback {...formItemLayout}>
              {getFieldDecorator('advice', {
                initialValue:advice,
                rules: [
                  {
                    required: false,
                  }
                ]
              })(

              <TextArea placeholder="填写材料审查备注"  autosize={{ minRows: 6, maxRows: 10 }} />
          )}
            </FormItem>
            </div>
            <br/>
            <Button className="search-btn"  onClick={() => {
              handleClick()
            }}
                    size="large" type="primary">
              保存备注
            </Button>
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
