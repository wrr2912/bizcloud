/**
 * Created by shenfu on 2017/5/17.
 */
import React, { PropTypes } from 'react'
import { Form, Input, Tooltip, Icon, Cascader, Modal, Select, Row, Col, Checkbox, Button, message, InputNumber } from 'antd'
const FormItem = Form.Item
const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  },
}

const DetailForm = ({
  selectCodeTypeList,
  visible,
  dispatch,
  queryData,
  pagination,
  detailData,
  isEdit,
  enabledList,
  formTitle,
  resultList,
  refDisplay,
  refList,
  form: {
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue,
    validateFields,
    resetFields,
  },
}) => {
  const onCancel = () => {
    dispatch({
      type: 'pubCodeList/closeModal',
      payload: {
        resetFields,
      },
    })
  }

  const onCreate = () => {
    let fields = getFieldsValue()
    validateFields((errors) => {
      if (errors) {
        return
      }
      fields.codeId=detailData.codeId
      fields.refCodeId=Number(fields.refCodeId)
      if(fields.codeDes==null){
        fields.codeDes=""
      }
      dispatch({
        type: 'pubCodeList/saveCode',
        payload: {
          data: fields,
          queryData:queryData,
          currentPage: pagination.current,
          pageSize: pagination.pageSize,
          resetFields,
        },
      })
    });

  }


  const typeChange = (value) => {
   if(value=='03'){
     dispatch({
       type: 'pubCodeList/setDisplay',
       payload: {
         refDisplay:''
       },
     })
     dispatch({
       type: 'pubCodeList/getRefList',
       payload: {
         pubCodes:detailData.parentCode
       },
     })

   }else {
     dispatch({
       type: 'pubCodeList/setDisplay',
       payload: {
         refDisplay:'none'
       },
     })
   }

  }

  const formItemLayout = {// 指定布局
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
    },
  }
  return (
    <Modal
      visible={visible}
      title={formTitle}
      okText="保存"
      cancelText="关闭"
      maskClosable={false}
      onCancel={onCancel}
      onOk={onCreate}
    >
      <Form >
        <FormItem {...formItemLayout} label="上级代码CODE" hasFeedback>
          {getFieldDecorator('parentCode', {
            rules: [{
              required: true, message: '请输上级代码!',
            },{
              max: 32, message: '最大长度不能超过32!',
            }],
            initialValue: detailData.parentCode,
          })(<Input disabled={true}/>)}
        </FormItem>
        <FormItem {...formItemLayout} label="上级代码名称" hasFeedback>
          {getFieldDecorator('parentName', {
            rules: [{
              required: true, message: '请输入上级代码名称!',
            },{
              max: 256, message: '最大长度不能超过256!',
            }],
            initialValue: detailData.parentName,
          })(<Input disabled={true} />)}
        </FormItem>

        <FormItem {...formItemLayout} label="代码类型" hasFeedback>
          {getFieldDecorator('codeType', {
            rules: [{
              required: true, message: '请选择代码类型!',
            }],
            initialValue: detailData.codeType,
          })(<Select placeholder="请选择身份类型" disabled={isEdit} onChange={ typeChange}>
            {selectCodeTypeList.map(option => <Select.Option key={option.pubCode}>{option.codeName}</Select.Option>)}
          </Select>)}

        </FormItem>


        <FormItem {...formItemLayout} label="代码CODE" hasFeedback>
          {getFieldDecorator('pubCode', {
            rules: [{
              required: true, message: '请输代码CODE!',
            },{
              max: 32, message: '最大长度不能超过32!',
            }],
            initialValue: detailData.pubCode,
          })(<Input />)}
        </FormItem>


        <FormItem {...formItemLayout} label="代码名称" hasFeedback>
          {getFieldDecorator('codeName', {
            rules: [{
              required: true, message: '请输代码名称!',
            },{
              max: 256, message: '最大长度不能超过256!',
            }],
            initialValue: detailData.codeName,
          })(<Input />)}
        </FormItem>

        <FormItem label="顺序号" hasFeedback {...formItemLayout}>
          {getFieldDecorator('codeOrder', {
            rules: [
              {
                required: true,
                message: '必须设顺序号！',
              },
            ],
            initialValue: detailData.codeOrder,
          })(<InputNumber min={1} max={1000} style={{ width: '100%' }} />)}
        </FormItem>


        <FormItem {...formItemLayout} label="代码描述" hasFeedback>
          {getFieldDecorator('codeDes', {
            rules: [{
              max: 64, message: '最大长度不能超过1024!',
            }
            ],
            initialValue: detailData.codeDes,
          })(<Input type="textarea" rows={4} />)}
        </FormItem>

      <div  style={{display:refDisplay}}>

        <FormItem {...formItemLayout} label="关联代码" hasFeedback>
          {getFieldDecorator('refCodeId', {
            rules: [{

            }],
            initialValue: detailData.refCodeId,
          })(<Select placeholder="请选择关联代码">
            {refList.map(option => <Select.Option key={option.codeId.toString()} >{option.codeName}</Select.Option>)}
          </Select>)}

        </FormItem>



      </div>
        <FormItem {...formItemLayout} label="启用状态" hasFeedback>
          {getFieldDecorator('enabled', {
            rules: [{
              required: true, message: '请选择启用状态!',
            }],
            initialValue: detailData.enabled,
          })(<Select placeholder="请选择启用状态">
            {enabledList.map(option => <Select.Option key={option.pubCode}>{option.codeName}</Select.Option>)}
          </Select>)}

        </FormItem>
      </Form>
    </Modal>
  )
}


DetailForm.propTypes = {
  selectCodeTypeList: PropTypes.array,
  visible: PropTypes.bool,
  dispatch: PropTypes.func,
  form: PropTypes.object,
  queryData: PropTypes.object,
  pagination: PropTypes.object,
  detailData: PropTypes.object,
  isEdit: PropTypes.bool,
  enabledList: PropTypes.array,
  formTitle: PropTypes.string,
  resultList:PropTypes.array,
  refDisplay:PropTypes.string,
  refList: PropTypes.array,
}

export default Form.create()(DetailForm)
