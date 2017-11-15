import {Modal,Form,Row,Col,Input,DatePicker } from 'antd'
import PropTypes from 'prop-types'
import styles from './OpinionBook.less'
const {TextArea} = Input
const FormItem = Form.Item

const modal = ({decisionItems,item,onOk,
                 form: {
                   getFieldDecorator,
                   validateFields,
                   getFieldsValue,
                   getFieldValue,
                 },
                 ...modalProps})=>{
  const currentDate = new Date();
  console.log(currentDate);
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const day = currentDate.getDate();
  let content = '';
  if(item.reviewResult==1){
    content=`我局${decisionItems.acceptDate}受理的你单位提出的铁路机车车辆（${decisionItems.productType}，${decisionItems.productNumber}）${item.licenseType}延期许可申请，经审查，符合《铁路机车车辆设计制造维修进口许可办法》（交通运输部令2013年第13号）规定的条件，依据《中华人民共和国行政许可法》第三十八条的规定，决定准予行政许可。具体内容如下： 
            准予你单位${decisionItems.productType}维修许可，并向你单位颁发相应维修许可证。证书编号：${decisionItems.certificateNumber}，有效期至${decisionItems.trialScope}。`
  }else if(item.reviewResult==0){
    content = `我局${decisionItems.acceptDate}受理的你单位提出的铁路机车车辆（${decisionItems.productType}，${decisionItems.productNumber}）${item.licenseType}延期许可申请，依据《中华人民共和国行政许可法》第三十八条的规定，决定不予行政许可的决定。理由如下：
          不符合《铁路机车车辆设计制造维修进口许可实施细则》第二十六条第三项的规定,未提供原许可证书有效期内开展被许可业务的证明材料。
          如不服本决定，可在接到本决定书之日起60日内，向国家铁路局申请行政复议；或在接到本决定书之日起３个月内，直接向北京市第一中级人民法院提起行政诉讼。`;
  }
    const formItemLayout = {
    labelCol: {
      span:8,
    },
    wrapperCol: {
      span: 16,
    },
  }
  const recieverItemLayout = {
    labelCol: {
      span:12,
    },
    wrapperCol: {
      span: 12,
    },
  }
  const handleOk = () => {
    const data = {
      licenseDomain:{
        reviewAppendixContents:getFieldValue('reviewAppendixContents'),
      },
      matterid: item.matterId,
    }
    onOk(data);
  }
  return (
  <Modal {...modalProps}
         wrapClassName= 'vertical-center-modal'
         className={styles.modalWidth}
         onOk={handleOk}
  >
    <Col span={3}></Col>
    <Col span={18}>
      <div className={styles.header}>行政许可决定书</div>
      <div className={styles.appellation}>{item.companyName}：</div>
      <div>
        <FormItem >
          {
            getFieldDecorator('reviewAppendixContents',{
              rules: [{required:true,message:'决定书内容不能为空！'}],
              initialValue:content,
            })(
              <TextArea className={styles.textarea} autosize={{minRow:10,maxRow:10}} />
            )
          }
        </FormItem>
      </div>
      <div>
        <Row><Col className={styles.date2} span={24}>{year}年{month}月{day}日</Col></Row>
      </div>
    </Col>
    <Col span={3}></Col>
  </Modal>)
}
modal.propTypes={
}
export default Form.create()(modal)
