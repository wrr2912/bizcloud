import PropTypes from 'prop-types'
import moment from 'moment'
import { Form, Button, Row, Col, DatePicker, Input, Cascader, Switch,Anchor } from 'antd'
import styles from './minutes.less'
const {TextArea} = Input
const {Link} = Anchor
const FormItem = Form.Item
const minutes = ({
                   form: {
                     getFieldDecorator,
                     getFieldsValue,
                     setFieldsValue,
                     validateFields,
                   },
                 }) => {
  const formItemLayout = {
    labelCol: {
      span: 3,
    },
    wrapperCol: {
      span: 21,
    },
  }
  const formLabelItemLayout = {
    labelCol: {
      span: 23,
    },
    wrapperCol: {
      span: 1,
    },
  }
  return (
    <Row gutter={24} className={styles.tableRow}>
      <Col span={3}></Col>
      <Col span={18}>
        <Col span={24} className={styles.tableHeader}><div>机车车辆行政许可审查会会议记录</div></Col>
        <Col span={24}>
          <FormItem label="编号：" hasFeedback labelCol={{span:20}} wrapperCol={{span:4}} >
            {getFieldDecorator('meetingCode', {
              initialValue: '2017年第22号',
              rules: [
                {
                  required: true,
                  message: '必填项！',
                },
              ],
            })(<Input />)}
          </FormItem>
        </Col>
        <Col span={5} className={styles.tableCol}>
          <FormItem label="会议时间" colon={false} {...formLabelItemLayout} >
            {getFieldDecorator('meetingDate', {
              initialValue: '',
              rules: [
            {
              required: true,
            },
              ],
            })(<p></p>)}
          </FormItem>
        </Col>
        <Col span={7} className={styles.tableCol}>
          <FormItem hasFeedback >
            {getFieldDecorator('meetingDate', {
              initialValue: '',
              rules: [
                {
                  required: true,
                  message: '请输入会议时间！',
                },
              ],
            })(<DatePicker style={{width:'100%'}} showTime format="YYYY-MM-DD HH:mm:ss"/>)}
          </FormItem>
        </Col>
        <Col span={5} className={styles.tableCol}>
          <FormItem label="会议地点" colon={false} {...formLabelItemLayout} >
            {getFieldDecorator('meetingPlace', {
              initialValue: 'meetingPlace',
              rules: [
                {
                  required: true,
                },
              ],
            })(<p></p>)}
          </FormItem>
        </Col>
        <Col span={7} className={styles.tableCol}>
          <FormItem hasFeedback >
            {getFieldDecorator('meetingPlace', {
              initialValue: '',
              rules: [
                {
                  required: true,
                  message: '请输入会议地点！',
                },
              ],
            })(<Input/>)}
          </FormItem>
        </Col>
        <Col span={5} className={styles.tableCol}>
          <FormItem label="主持人" colon={false} {...formLabelItemLayout} >
            {getFieldDecorator('compere', {
              initialValue: '',
              rules: [
                {
                  required: true,
                },
              ],
            })(<p></p>)}
          </FormItem>
        </Col>
        <Col span={7} className={styles.tableCol}>
          <FormItem hasFeedback >
            {getFieldDecorator('compere', {
              initialValue: '',
              rules: [
                {
                  required: true,
                  message: '请输入主持人！',
                },
              ],
            })(<Input/>)}
          </FormItem>
        </Col>
        <Col span={5} className={styles.tableCol}>
          <FormItem label="记录人员" colon={false} {...formLabelItemLayout} >
            {getFieldDecorator('recorder', {
              initialValue: '',
              rules: [
                {
                  required: true,
                },
              ],
            })(<p></p>)}
          </FormItem>
        </Col>
        <Col span={7} className={styles.tableCol}>
          <FormItem hasFeedback >
            {getFieldDecorator('recorder', {
              initialValue: '',
              rules: [
                {
                  required: true,
                  message: '请输入记录人员！',
                },
              ],
            })(<Input/>)}
          </FormItem>
        </Col>
        <Col span={5} className={styles.tableCol}>
          <FormItem label="主办处" colon={false} {...formLabelItemLayout} >
            {getFieldDecorator('host', {
              initialValue: '',
              rules: [
                {
                  required: true,
                },
              ],
            })(<p></p>)}
          </FormItem>
        </Col>
        <Col span={19} className={styles.tableCol}>
          <FormItem hasFeedback >
            {getFieldDecorator('host', {
              initialValue: '',
              rules: [
                {
                  required: true,
                  message: '请输入主办处！',
                },
              ],
            })(<Input/>)}
          </FormItem>
        </Col>
        <Col span={24} className={styles.tableCol}>
          <FormItem label="参会人员" hasFeedback {...formItemLayout}>
            {getFieldDecorator('participants', {
              initialValue: '',
              rules: [
                {
                  required: true,
                  message: '请输入参会人员！',
                },
              ],
            })(<Input/>)}
          </FormItem>
        </Col>
        <Col span={24} className={styles.tableCol}>
          <div className={styles.censorItem}>审查项目</div>
        </Col>
        <Col span={24} className={styles.tableCol}>
          <FormItem hasFeedback >
            {(<div className={styles.link}><a href="#table">详见《机车车辆行政许集体审查项目登记表》</a></div>)}
          </FormItem>
        </Col>
        <Col span={24} className={styles.tableCol}>
          <div className={styles.content}>会议内容纪录</div>
        </Col>
        <Col span={24} className={styles.tableCol}>
          <div className={styles.contentHeader}>一、司审查记录：</div>
        </Col>
        <Col span={24} className={styles.textareaCol}>
          <FormItem hasFeedback className={styles.formItem}>
            {getFieldDecorator('meetingContent', {
              initialValue: '',
              rules: [
                {
                  required: true,
                  message: '请输入会议内容！',
                },
              ],
            })(<TextArea  autosize={{ minRows: 10, maxRows: 10 }}/>)}
          </FormItem>
        </Col>
        <Col span={24} className={styles.tableCol}>
          <div className={styles.contentHeader}>二、司审查意见：</div>
        </Col>
        <Col span={24} className={styles.textareaCol}>
          <FormItem hasFeedback className={styles.formItem}>
            {getFieldDecorator('advice', {
              initialValue: '',
              rules: [
                {
                  required: true,
                  message: '请输入会议意见！',
                },
              ],
            })(<TextArea  autosize={{ minRows: 2, maxRows: 6 }}/>)}
          </FormItem>
        </Col>
        <Col span={24} className={styles.tableCol}>
          <div className={styles.contentHeader}>三、参会人员签字：</div>
        </Col>
        <Col span={24} className={styles.textareaCol}>
          <div><p className={styles.attachString}>见附件</p></div>
        </Col>
      </Col>
      <Col span={3}></Col>

    </Row>

  )
}

minutes.propTypes = {
  form: PropTypes.object,
}

export default Form.create()(minutes)
