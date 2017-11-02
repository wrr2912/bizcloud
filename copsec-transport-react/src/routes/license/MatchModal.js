import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Row, Col, Icon, Radio, Modal, Button, Cascader ,AutoComplete} from 'antd'
import styles from './MatchModal.less'
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
                 acceptWorker,
                 acceptWorkerId,
                 onOk,
                 onSearch,
                 searchItem={},
                 form: {
                   getFieldDecorator,
                   validateFields,
                   getFieldsValue,

                 },
                 ...matchModalProps
               }) => {
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        apply: {...item, acceptWorker: acceptWorker, acceptWorkerId: acceptWorkerId}
      }
      console.log('-----------自动补全2--------------')
      console.log(...data)

      onOk(data)
    })
  }
  const onSelect = (value) => {
    console.log('onSelect', value.split('|')[0]);

    acceptWorkerId = value.split('|')[0];
    acceptWorker = value.split('|')[1];
  }
  const renderOption = (item) =>{
    return (
      <Option key={item.userId +'|'+item.name} text={item.name +'('+item.orgId+')'}>
        {item.name} ({item.orgId})
      </Option>
    );
  }

  const handleSearch = (value) => {

      if(value){

        onSearch(value)
      }
  }

  const modalOpts = {
    ...matchModalProps,
    onOk: handleOk,
  }

  return (

    <Modal {...modalOpts}>
      <Row>
        <Col span={6}><div>选择经办人:</div></Col>
        <Col span={14}>   <div className="global-search-wrapper" style={{ width: 300 }}>
          <AutoComplete
            className="global-search"
            size="large"
            style={{ width: '100%' }}
            dataSource={searchItem.map(renderOption)}
            onSelect={onSelect}
            onSearch={handleSearch}
            placeholder="输入用户名/姓名"
            optionLabelProp="text"
          >
            <Input
              // suffix={(
              //   {/*<Button className="search-btn" size="large" type="primary">*/}
              //     {/*/!*<Icon type="search" />*!/*/}
              //   {/*</Button>*/}
              // )}
            />
          </AutoComplete>
        </div>
        </Col>
      </Row>


    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  acceptWorker: PropTypes.string,
  acceptWorkerId: PropTypes.number,
  onOk: PropTypes.func,
}

export default Form.create()(modal)
