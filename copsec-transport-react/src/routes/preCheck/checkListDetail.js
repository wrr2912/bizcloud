import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Row, Col, Modal} from 'antd'
import {DataTable} from '../../components/'
import styles from './checkListDetail.less'

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

const CheckListDetail = ({
                  dispatch,
                  detailObj,
                  form: {
                   getFieldDecorator,
                   validateFields,
                   getFieldsValue,
                  },
                  ...detailProps,
               }) => {

  const columns = [{
    title: '企业名称',
    dataIndex: 'companyName',
    //width: '30%',
  }, {
    title: '产品类型',
    dataIndex: 'productType',
    // width: '30%',
  }, {
    title: '产品型号',
    dataIndex: 'productVersion',
    // width: '30%',
  },{
    title: '产品编号',
    dataIndex: 'productNum',
    // width: '30%',
  },{
    title: '许可种类',
    dataIndex: 'licenseType',
    // width: '30%',
  },
  ]

  //dataSource是数组类型，对detail进行转换
  const detailList=[detailObj]

  //footer为null时，底部的两个默认按钮不显示;
  const modalOpts = {
    title:"集体审查清单意见详情",
    okText:'会议记录',
    footer:null,
    wrapClassName: 'vertical-center-modal',
    className: styles.modalWidth,
    ...detailProps,
  }
  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="清单信息" hasFeedback {...formItemLayout}>
          {getFieldDecorator('view', {
          })(
            <DataTable
              animate={false}
              columns={columns}
              dataSource={detailList}
              pagination={false}
              scroll={{ x:500 }}
              size="small"
          bordered
          rowKey="id"
          // rowKey={detailObj => detailObj.id}
          />)}
        </FormItem>
        <br/>
        <FormItem label="审查意见" hasFeedback {...formItemLayout}>
          {getFieldDecorator('reviewAdvice', {
          })(<div><Row>
            <TextArea disabled={true}  autosize={{ minRows: 4, maxRows: 10 }} />
          </Row>
          </div>)}
        </FormItem>
      </Form>
    </Modal>
  )
}

CheckListDetail.propTypes = {
  form: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  detailObj: PropTypes.object,
}

export default Form.create()(CheckListDetail)
