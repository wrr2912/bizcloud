import {Modal,Form,Row,Col,Input,DatePicker } from 'antd'
import PropTypes from 'prop-types'
import styles from './OpinionBook.less'
const {TextArea} = Input
const FormItem = Form.Item

const modal = ({opinionItems,item,onOk,
                 form: {
                   getFieldDecorator,
                   validateFields,
                   getFieldsValue,
                   getFieldValue,
                 },
                 ...modalProps})=>{
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const day = currentDate.getDate();
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
  const content=`你单位于${opinionItems.acceptDate}提请审查的${item.companyName}铁路机车车辆（${opinionItems.productType}，${opinionItems.productNumber}）${item.licenseType}延期许可申请事项（${opinionItems.arraignment}），我司已审查完毕，于${year}年${month}月${day}日作出${opinionItems.advice}的审查意见。请进行合法性审核后呈局领导审定。`

  const Attachment = ()=>{
    if(item.reviewResult==0){
      return (<div className={styles.attachment}><span>附：行政许可决定书文本</span></div>)
    }else if(item.reviewResult==1){
      return (<div className={styles.attachment}><span>附：1.行政许可决定书文本<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.行政许可证件记载内容</span></div>)
    }
  }
  return (
  <Modal {...modalProps}
         wrapClassName= 'vertical-center-modal'
         className={styles.modalWidth}
         onOk={handleOk}
  >
    <Col span={3}></Col>
    <Col span={18}>
      <div className={styles.header}>行政许可审查意见书</div>
      <div className={styles.code}>{opinionItems.code}</div>
      <div className={styles.appellation}>科技与法制司：</div>
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
      <Attachment/>
      <br/>
      <div>
        <Row>
          <Col span={12}>
            <div className={styles.attachment}>经办人：{opinionItems.operatorName}</div>
          </Col>
          <Col className={styles.date} span={12}>{month}月{day}日</Col>
        </Row>
        <Row>
          <Col span={12}>
            <div className={styles.attachment}>处长：{opinionItems.chief}</div>
          </Col>
          <Col className={styles.date} span={12}>{month}月{day}日</Col>
        </Row>
        <Row>
          <Col span={12}>
            <div className={styles.attachment}>分管副司长：{opinionItems.deputy}</div>
          </Col>
          <Col className={styles.date} span={12}>{month}月{day}日</Col>
        </Row>
        <Row>
          <Col span={12}>
            <div className={styles.attachment}>司长：{opinionItems.director}</div>
          </Col>
          <Col className={styles.date} span={12}>{month}月{day}日</Col>
        </Row>
        <br/>
        <Row><Col className={styles.date2} span={24}>{year}年{month}月{day}日</Col></Row>
      </div>
    </Col>
    <Col span={3}></Col>
  </Modal>)
}
modal.propTypes={
}
export default Form.create()(modal)
