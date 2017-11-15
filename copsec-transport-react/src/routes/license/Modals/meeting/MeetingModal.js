import React from 'react'
import PropTypes from 'prop-types'
import { Form, Modal,Table, Button, Row, Col, DatePicker, Input} from 'antd'
import moment from 'moment'
import Minutes from '../../docTemplate/minutes'
import styles from '../../docTemplate/minutes.less'
const FormItem = Form.Item
const { TextArea } = Input;

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

const MeetingModal = ({dispatch,onCancel,onOk,meetingList,...modalProps,
                        form: {
                          getFieldDecorator,
                          getFieldsValue,
                          setFieldsValue,
                          validateFields,
                        },}) => {

  const {meetingListTableDataSource,loading} = meetingList

// 定义表格列
  const columns = [
    {
      title: '企业名称',
      dataIndex: 'companyName',
      width: 200,
    }, {
      title: '许可种类',
      dataIndex: 'licenseType',
      width: 100,
      render: (text, record) => {
        if(record.licenseType==1){
          return "铁路运输基础设备生产企业许可证"
        }else   if(record.licenseType==2){
          return "机车车辆型号合格证"
        }else   if(record.licenseType==3){
          return "机车车辆制造许可证"
        }else   if(record.licenseType==4){
          return "机车车辆维修许可证"
        }else   if(record.licenseType==5){
          return "机车车辆进口许可证"
        }else   if(record.licenseType==6){
          return "铁路运输许可证"
        }
      }
    },
    {
      title: '是否延期',
      dataIndex: 'isDelay',
      width: 80,
      render: (text, record) => {return record.isDelay==1?"是":"否"}
    },
    {
      title: '提审字号',
      dataIndex: 'arraignment',
      width: 140,
    },
    {
      title: '受理日期',
      dataIndex: 'acceptDate',
      width: 100,
      render: (text, record) => {return record.acceptDate!=null?moment(record.acceptDate).format('YYYY-MM-DD'):''},
    },
    {
      title: '接收日期',
      dataIndex: 'receiveDate',
      width: 100,
      render: (text, record) => {return record.receiveDate!=null?moment(record.receiveDate).format('YYYY-MM-DD'):''},

    },
    {
      title: '经办人',
      dataIndex: 'operatorName',
      width: 100,
    },{
      title: '操作',
      // dataIndex: 'reviewAdvices',
      width: 60,
      render: (text, record) => (
          <a onClick={() => {
            dispatch({
              type: 'meetingList/remove',
              payload: {id:record.id},
            });
          }}>移除</a>
      ),
    },
  ];

  // 分页操作
  const onChange = (page) => {
    dispatch({
      type: 'meetingList/getTableDataSource',
      payload: {
        currentPage: page.current,
        pageSize: page.pageSize,
      },
    })
  }
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      let data
        data = {
          minutes: {
            ...getFieldsValue(),
            applyList:meetingListTableDataSource,

          },
          isCreate: true,
        }

      onOk(data)
    })
  }
  const modalOpts = {
    okText:'保存',
    cancelText:'取消',
    wrapClassName: 'vertical-center-modal',
    ...modalProps,
    width:'95%',
    onCancel:onCancel,
    onOk:handleOk,
  }
  const filterProps = {
    filter : {
      ...location.query,
    },

    onFilterChange : (value)=>{
      dispatch(routerRedux.push({
        pathname: location.pathname,
        query: {
          ...value,
          page: 1,
          pageSize,
        },
      }))
    }
  }
   return (
     <Modal {...modalOpts} >
       <div id = "table">
         <Table bordered
                dataSource = {meetingListTableDataSource}
                loading = {loading}
                columns={columns}
                onChange={onChange}
                rowKey="id"
                size="small"
         />
       </div>
       <hr/>
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
             <div className={styles.label}><label className={styles.require}>*</label><label> 会议时间</label></div>
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
             <div className={styles.label}><label className={styles.require}>*</label><label> 会议地点</label></div>
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
             <div className={styles.label}><label className={styles.require}>*</label><label> 主持人</label></div>
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
             <div className={styles.label}><label className={styles.require}>*</label><label> 记录人员</label></div>
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
             <div className={styles.label}><label className={styles.require}>*</label><label> 主办处</label></div>
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
     </Modal>
  )
}

MeetingModal.propTypes = {
  disptch: PropTypes.func,
  onCancel: PropTypes.func,
  createModalVisible:PropTypes.bool,
  form: PropTypes.object,
}

export default Form.create()(MeetingModal)
