import React, { PropTypes } from 'react'
import { Form, Modal,Col,Row,Slider, Button, Upload, Icon, Input,Select,DatePicker} from 'antd'
import styles from './minutesModal.less'
const { TextArea } = Input;
const Option = Select.Option;
const RangePicker=DatePicker.RangePicker
const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}
const formItemLayout1 = {
  labelCol: {
    span: 2,
  },
  wrapperCol: {
    span: 20,
  },
}
const MinutesCreateModel = ({
                              onOk,
                              applyList={},
                              applyid,
                               form: {
                                 getFieldDecorator,
                                 validateFields,
                                 getFieldsValue,
                                 getFieldValue,
                                 setFieldsValue,
                               },
                               ...modalProps,
                               editObj,
                             }) => {
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }

      let data
      if (editObj === null) {
        data = {
          minutes: {
            ...getFieldsValue(),
          },
          isCreate: true,
        }
      } else {
        data = {
          minutes: {
            ...getFieldsValue(),
            id: editObj.id,
            meetingDate:getFieldValue('meetingDate').format('YYYY-MM-DD HH:mm:ss'),

          },
          isCreate: false,
        }
      }

      onOk(data)
    })
  }
  const handleChange = (value) => {

   applyid=value
  }
 const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }
  const options=applyList.map(
    (apply)=>{
      return <Option value={apply.applyItems}>{apply.applyItems}</Option>

    }
  )
  const modalOpts = {
    okText:'保存',
    cancelText:'取消',
    wrapClassName: 'vertical-center-modal',
    className: styles.modalWidth,
    ...modalProps
  }
  return (
    <Modal {...modalOpts}  onOk={handleOk}   title="新增会议记录">
      <Form layout="horizontal">
        <Row>
          <Col span="8">
              <FormItem label="审查项目" hasFeedback {...formItemLayout}>
                {getFieldDecorator('applyProject', {
                  initialValue: editObj !== null ? editObj.applyProject : '',
                  rules: [
                    {
                      required: true,
                      message: '必须选择审查项目！',
                    },
                  ],
                 })(<Select
                  value={applyid}
                  onChange={handleChange}
                >
                  {options}
                </Select>)}
              </FormItem>
          </Col>
        {/*<FormItem label="审查阶段" hasFeedback {...formItemLayout}>*/}
          {/*{getFieldDecorator('reviewstage', {*/}
            {/*initialValue: editObj !== null ? editObj.reviewstage : '',*/}
            {/*rules: [*/}
              {/*{*/}
                {/*whitespace: true,*/}
                {/*message: '请输入审查阶段',*/}
              {/*},*/}
            {/*],*/}
          {/*})(<Input />)}*/}
        {/*</FormItem>*/}
          <Col span="8">
            <FormItem label="会议时间" hasFeedback {...formItemLayout}>
            {getFieldDecorator('meetingDate', {
              initialValue: editObj !== null ? editObj.meetingDate : '',
              rules: [{ type: 'object', required: true, message: '请输入会议时间' }],
            })( <DatePicker style={{ width: '100%' }} showTime format="YYYY-MM-DD HH:mm:ss" />)}
          </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="会议地点" hasFeedback {...formItemLayout}>
              {getFieldDecorator('meetingPlace', {
                initialValue: editObj !== null ? editObj.meetingPlace : '',
                rules: [
                  {
                    required: true,
                    message: '必须输入会议地点！',
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Col>
        </Row>
        <Row>

          <Col span="8">
            <FormItem label="主持人" hasFeedback {...formItemLayout}>
              {getFieldDecorator('compere', {
                initialValue: editObj !== null ? editObj.compere : '',

              })(<Input />)}
            </FormItem>
        </Col>

          <Col span="8">
        <FormItem label="记录人员" hasFeedback {...formItemLayout}>
          {getFieldDecorator('recorder', {
            initialValue: editObj !== null ? editObj.recorder : '',
            rules: [
              {
                whitespace: true,
                message: '请输入记录人员',
              },
            ],
          })(<Input />)}
        </FormItem>
      </Col>
      <Col span="8">
        <FormItem label="参会人员" hasFeedback {...formItemLayout}>
          {getFieldDecorator('participants', {
            initialValue: editObj !== null ? editObj.participants : '',
            rules: [
              {
                whitespace: true,
                message: '请输入参会人员',
              },
            ],
          })(<Input />)}
        </FormItem>
      </Col>
    </Row>
        <Row style={{left:0}}>
        <FormItem label="会议内容" hasFeedback {...formItemLayout1}>
          {getFieldDecorator('meetingContent', {
            initialValue: editObj !== null ? editObj.meetingContent : '',
            rules: [
              {
                whitespace: true,
                message: '请输入会议内容',
              },
            ],
          })(<TextArea placeholder="请输入会议内容" autosize={{ minRows: 10, maxRows: 10 }} />)}
        </FormItem>
        </Row>
        <Row>
          <FormItem
            {...formItemLayout1}
            label="附件上传"
          >
            <div className="dropbox">
              {getFieldDecorator('file', {
                valuePropName: 'fileList',
                getValueFromEvent:{normFile},
                required:false,

              })(
                <Upload.Dragger name="files" action="/upload.do">
                  <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                  </p>
                  <p className="ant-upload-text">点击或拖拽文件到此</p>
                  <p className="ant-upload-hint">支持单个或多个附件上传</p>
                </Upload.Dragger>
              )}
            </div>
          </FormItem>

        </Row>
        {/*<FormItem label="审查清单" hasFeedback {...formItemLayout}>*/}
          {/*{getFieldDecorator('reviewlists', {*/}
            {/*initialValue: editObj !== null ? editObj.reviewlists : '',*/}
            {/*rules: [*/}
              {/*{*/}
                {/*whitespace: true,*/}
                {/*message: '请输入审查清单',*/}
              {/*},*/}
            {/*],*/}
          {/*})(<Input />)}*/}
        {/*</FormItem>*/}
      </Form>
    </Modal>
  )
}

MinutesCreateModel.propTypes = {
  onOk: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  editObj: PropTypes.object,
}

export default Form.create()(MinutesCreateModel)
