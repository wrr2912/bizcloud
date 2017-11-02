import React, { PropTypes } from 'react'
import { Form, Modal, Input,Select} from 'antd'

const Option=Select.Option
const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const CompLedgerCreateModel = ({
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

    console.log('--------新增台账记录------')

    validateFields((errors) => {
      if (errors) {
        return
      }

      let data

      console.log('--------editObj------'+editObj)

      if (editObj === null) {
        data = {
          compLedger: {
            ...getFieldsValue(),
          },
          isCreate: true,
        }
        console.log('--------data------'+data)

      } else {
        data = {
          compLedger: {
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
    <Modal {...modalProps} onOk={handleOk} okText="保存" title="新增企业信息台账">
      <Form layout="horizontal">
        <FormItem label="企业名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('companyName', {
            initialValue: editObj !== null ? editObj.companyName : '',
            rules: [
              {
                required: true,
                whitespace: true,
                message: '必须输入企业名称',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="企业住所" hasFeedback {...formItemLayout}>
          {getFieldDecorator('enterpriseDomicile', {
            initialValue: editObj !== null ? editObj.enterpriseDomicile : '',
            rules: [
              {
                required:true,
                whitespace: true,
                message: '必须输入企业住所',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="地区监管局" hasFeedback {...formItemLayout}>
          {getFieldDecorator('regionalSupervision', {
            initialValue: editObj !== null ? editObj.regionalSupervision : '',
            rules: [
              {
                whitespace: true,
                message: '请选择地区监管局',
              },
            ],
          })(<Select placeholder="请选择地区监管局">
            <Option value="沈阳铁路监督管理局">沈阳铁路监督管理局</Option>
            <Option value="上海铁路监督管理局">上海铁路监督管理局</Option>
            <Option value="广州铁路监督管理局">广州铁路监督管理局</Option>
            <Option value="成都铁路监督管理局">成都铁路监督管理局</Option>
            <Option value="武汉铁路监督管理局">武汉铁路监督管理局</Option>
            <Option value="西安铁路监督管理局">西安铁路监督管理局</Option>
            <Option value="兰州铁路监督管理局">兰州铁路监督管理局</Option>
          </Select>)}
        </FormItem>
        <FormItem label="投资性质" hasFeedback {...formItemLayout}>
          {getFieldDecorator('investment', {
            initialValue: editObj !== null ? editObj.investment : '',
            rules: [
              {
                required: true,
                whitespace: true,
                message: '必须选择投资性质！',
              },
            ],
          })(<Select placeholder="请选择投资性质">
            <Option value="1">国有独资</Option>
            <Option value="2">国有控股独资</Option>
            <Option value="3">非国有控股合资</Option>
            <Option value="4">民营独资</Option>
          </Select>)}
        </FormItem>
        <FormItem label="企业性质" hasFeedback {...formItemLayout}>
          {getFieldDecorator('enterpriseNature', {
            initialValue: editObj !== null ? editObj.enterpriseNature : '',
            rules: [
              {
                whitespace: true,
                message: '请选择企业性质',
              },
            ],
          })(<Select placeholder="请选择企业性质">
            <Option value="铁路产权单位">铁路产权单位</Option>
            <Option value="铁路运输企业">铁路运输企业</Option>
          </Select>)}
        </FormItem>
        <FormItem label="许可经营范围" hasFeedback {...formItemLayout}>
          {getFieldDecorator('scopeofBusiness', {
            initialValue: editObj !== null ? editObj.scopeofBusiness : '',
            rules: [
              {
                whitespace: true,
                message: '请选择许可经营范围',
              },
            ],
          })(<Select placeholder="请选择投资性质">
            <Option value="高速铁路旅客运输">高速铁路旅客运输</Option>
            <Option value="城际铁路旅客运输">城际铁路旅客运输</Option>
            <Option value="普通铁路旅客运输">普通铁路旅客运输</Option>
            <Option value="铁路货物运输">铁路货物运输</Option>
          </Select>)}
        </FormItem>
        <FormItem label="许可证状况" hasFeedback {...formItemLayout}>
          {getFieldDecorator('licensingStatus', {
            initialValue: editObj !== null ? editObj.licensingStatus : '',
            rules: [
              {
                whitespace: true,
                message: '请选择许可证状况',
              },
            ],
          })(<Select placeholder="请选择许可证状况">
            <Option value="已取得">已取得</Option>
            <Option value="申请中">申请中</Option>
            <Option value="建设中，未运营">建设中，未运营</Option>
          </Select>)}
        </FormItem>
        <FormItem label="联系人及联系方式" hasFeedback {...formItemLayout}>
          {getFieldDecorator('personAndContact', {
            initialValue: editObj !== null ? editObj.personAndContact : '',
            rules: [
              {
                whitespace: true,
                message: '请输入联系人及联系方式',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="收文地址及传真" hasFeedback {...formItemLayout}>
          {getFieldDecorator('addressAndFax', {
            initialValue: editObj !== null ? editObj.addressAndFax : '',
            rules: [
              {
                whitespace: true,
                message: '请输入收文地址及传真',
              },
            ],
          })(<Input />)}
        </FormItem>
      </Form>
    </Modal>
  )
}

CompLedgerCreateModel.propTypes = {
  onOk: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  editObj: PropTypes.object,
}

export default Form.create()(CompLedgerCreateModel)
