import React, { PropTypes } from 'react'
import { Form, Modal, Input, Radio } from 'antd'
import app from '../../../models/app'
const {state} = app
const userName = state.user.userName

const FormItem = Form.Item
const RadioGroup = Radio.Group

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}
/*function getDateTime(dt) {
  var year=dt.getFullYear();
  var month=dt.getMonth()+1;
  var day=dt.getDate();
  var h=dt.getHours();
  var m=dt.getMinutes();
  var s=dt.getSeconds();

  // 这里应该想一下，如果是个数怎么办？那就用三元表达式来处理
  month=month<10?"0"+month:month;
  day=day<10?"0"+day:day;
  h=h<10?"0"+h:h;
  m=m<10?"0"+m:m;
  s=s<10?"0"+s:s;

  return year+"年"+month+"月"+day+"日"+h+"时"+m+"分"+s+"秒";
}*/

const SupervisionInstitutionCreateModel = ({
                                onOk,
                                form: {
                                  getFieldDecorator,
                                  validateFields,
                                  getFieldsValue,
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
          supervisionInstitution: {
            ...getFieldsValue(),
          },
          isCreate: true,
        }
      } else {
        data = {
          supervisionInstitution: {
            id: editObj.id,
            ...getFieldsValue(),
          },
          isCreate: false,
        }
      }

      onOk(data)
    })
  }

  return (
    <Modal {...modalProps} onOk={handleOk} okText="保存" title="添加监管机构">
      <Form layout="horizontal">
        <FormItem label="监管机构名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('unitName', {
            initialValue: editObj !== null ? editObj.unitName : '',
            rules: [
              {
                required: true,
                whitespace: true,
                message: '必须输入名称',
              },
              {
                min: 1,
                max: 12,
                message: '请输入1到12个字',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="铁路总公司监督机构" hasFeedback {...formItemLayout}>
          {getFieldDecorator('supervision', {
            initialValue: editObj !== null ? editObj.supervision : '',
          })(<Input />)}
        </FormItem>

        <FormItem label="地区政府监管部门" hasFeedback {...formItemLayout}>
          {getFieldDecorator('prefectureSupervision', {
            initialValue: editObj !== null ? editObj.prefectureSupervision : '',
          })(<Input />)}
        </FormItem>

        <FormItem label="质量监督机构" hasFeedback {...formItemLayout}>
          {getFieldDecorator('qualitySupervision', {
            initialValue: editObj !== null ? editObj.qualitySupervision : '',
          })(<Input />)}
        </FormItem>

        <FormItem label="监督机构所属地域" hasFeedback {...formItemLayout}>
          {getFieldDecorator('qualitySupervisionArea', {
            initialValue: editObj !== null ? editObj.qualitySupervisionArea : '',
          })(<Input />)}
        </FormItem>
        <FormItem label="单位简称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('unitAbbreviation', {
            initialValue: editObj !== null ? editObj.unitAbbreviation : '',
          })(<Input />)}
        </FormItem>

        <FormItem label="法人代表" hasFeedback {...formItemLayout}>
          {getFieldDecorator('legalRepresentative', {
            initialValue: editObj !== null ? editObj.legalRepresentative : '',
          })(<Input />)}
        </FormItem>

        <FormItem label="法人代码" hasFeedback {...formItemLayout}>
          {getFieldDecorator('legalPersonCode', {
            initialValue: editObj !== null ? editObj.legalPersonCode : '',
          })(<Input />)}
        </FormItem>

        <FormItem label="通讯地址" hasFeedback {...formItemLayout}>
          {getFieldDecorator('postalAddress', {
            initialValue: editObj !== null ? editObj.postalAddress : '',
          })(<Input />)}
        </FormItem>

        <FormItem label="邮政编码" hasFeedback {...formItemLayout}>
          {getFieldDecorator('postalCode', {
            initialValue: editObj !== null ? editObj.postalCode : '',
          })(<Input />)}
        </FormItem>

        <FormItem label="官网链接" hasFeedback {...formItemLayout}>
          {getFieldDecorator('officialWebsiteLink', {
            initialValue: editObj !== null ? editObj.officialWebsiteLink : '',
          })(<Input />)}
        </FormItem>

        <FormItem label="备注" hasFeedback {...formItemLayout}>
          {getFieldDecorator('remarks', {
            initialValue: editObj !== null ? editObj.remarks : '',
          })(<Input />)}
        </FormItem>

        <FormItem label="值班电话" hasFeedback {...formItemLayout}>
          {getFieldDecorator('telephoneWatch', {
            initialValue: editObj !== null ? editObj.telephoneWatch : '',
          })(<Input />)}
        </FormItem>

        <FormItem label="项目名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('entryName', {
            initialValue: editObj !== null ? editObj.entryName : '',
          })(<Input />)}
        </FormItem>

        <FormItem label="项目编号" hasFeedback {...formItemLayout}>
          {getFieldDecorator('projectNumber', {
            initialValue: editObj !== null ? editObj.projectNumber : '',
          })(<Input />)}
        </FormItem>

        <FormItem label="项目联系人" hasFeedback {...formItemLayout}>
          {getFieldDecorator('projectContact', {
            initialValue: editObj !== null ? editObj.projectContact : '',
          })(<Input />)}
        </FormItem>

        <FormItem label="项目联系人电话" hasFeedback {...formItemLayout}>
          {getFieldDecorator('contactPhone', {
            initialValue: editObj !== null ? editObj.contactPhone : '',
          })(<Input />)}
        </FormItem>

        <FormItem>
          {getFieldDecorator('entryMan', {
            initialValue: userName,
          })}
        </FormItem>


        <FormItem >
        {getFieldDecorator('entryDate', {
          initialValue: new Date()
        })}
        </FormItem>

      </Form>
    </Modal>
  )
}

SupervisionInstitutionCreateModel.propTypes = {
  onOk: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  editObj: PropTypes.object,
}

export default Form.create()(SupervisionInstitutionCreateModel)
