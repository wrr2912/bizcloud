import React, { PropTypes } from 'react'
import { Form, Modal, Input, Button, Radio, Col, Row ,DatePicker, Select, Upload, Icon} from 'antd'
import moment from 'moment'
import { Layout } from '../../../components'
import {config} from '../../../utils';
const {serviceDomain} = config;

const FormItem = Form.Item
const RadioGroup = Radio.Group
const Option = Select.Option;
const TextArea = Input.TextArea;

const formItemLayout = {
  labelCol: {
    span: 9,
  },
  wrapperCol: {
    span: 14,
  },
}

const EnterpriseCreateModal = ({dispatch,
                                 onOk,
                                 form: {
                                   getFieldDecorator,
                                   validateFields,
                                   getFieldsValue,
                                 },
                                 ...modalProps,
                                 editObj,
                               }) => {
  const handleOk = (flag) => {
    alert(flag);
    validateFields((errors) => {
      if (errors) {
        return
      }

      let data
      if (editObj === null) {
        data = {
          enterprise: {
            ...getFieldsValue(),
          },
          isCreate: true,
        }
      } else {
        data = {
          enterprise: {
            id: editObj.id,
            ...getFieldsValue(),
          },
          isCreate: false,
        }
      }

      onOk(data)
    })
  }

  const handleCancel = ()=>{
    dispatch({
      type: 'enterpriseList/setCreateModelVisible',
      payload: {
        createModelVisible: false,
        editObj: null,
      },
    })
  }
  const normFile = (e)=>{
    let fileList = e.fileList;
    fileList = fileList.slice(-2);
    fileList = fileList.map((file) => {
      if (file.response) {
        file.url = `${serviceDomain}/file/get?id=${file.response.id}`;
      }
      return file;
    });
    if(Array.isArray(e)){
      return e;
    }
    return e && e.fileList;
  }
/*  const uploadProps = {
    onChange : (fileList)=>{
      let fileNum = 0;
      if(fileList != null){
        alert(JSON.stringify(fileList));
        editObj.attachList = fileList;
        alert(JSON.stringify(editObj));
      }
    },
  }
*/

  return (
    <Modal {...modalProps} footer={[
      <Button key="cancel" onClick={handleCancel}>取消</Button>,
      <Button key="save" type="primary" onClick={()=>handleOk(false)}>保存</Button>,
      <Button key="submit" type="primary" onClick={()=>handleOk(true)}>提交</Button>,
    ]}>
      <Form layout="horizontal">
        <Row>
          <Col span={8}>
            <FormItem label="企业名称" hasFeedback {...formItemLayout}>
              {getFieldDecorator('enterprise_name', {
                initialValue: editObj !== null ? editObj.enterprise_name : '',
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: '必须输入企业名称',
                  },
                  {
                    min: 1,
                    max: 100,
                    message: '请输入不超过100个字',
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Col>
          <Col span = {8}>
            <FormItem label="企业标识" hasFeedback {...formItemLayout}>
              {getFieldDecorator('enterprise_identification', {
                initialValue: editObj !== null ? editObj.enterprise_identification : '',
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: '必须输入企业标识',
                  },
                  {
                    min: 1,
                    max: 32,
                    message: '请输入不超过32个字',
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Col>
          <Col span = {8}>
            <FormItem label="营业执照类别" hasFeedback {...formItemLayout}>
              {getFieldDecorator('license_type', {
                initialValue: editObj !== null ? editObj.license_type : '',
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: '必须输入营业执照类别',
                  },
                  {
                    min: 1,
                    max: 50,
                    message: '请输入不超过50个字',
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <FormItem label="上级企业名称" hasFeedback {...formItemLayout}>
              {getFieldDecorator('p_enterprise_name', {
                initialValue: editObj !== null ? editObj.p_enterprise_name : '',
                rules: [

                  {
                    min: 0,
                    max: 100,
                    message: '请输入不超过100个字',
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Col>
          <Col span = {8}>
            <FormItem label="上级企业标识" hasFeedback {...formItemLayout}>
              {getFieldDecorator('p_enterprise_identification', {
                initialValue: editObj !== null ? editObj.p_enterprise_identification : '',
                rules: [
                  {
                    min: 0,
                    max: 32,
                    message: '请输入不超过32个字',
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Col>
          <Col span = {8}>
            <FormItem label="组织机构代码" hasFeedback {...formItemLayout}>
              {getFieldDecorator('orgnization_code', {
                initialValue: editObj !== null ? editObj.orgnization_code : '',
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: '必须输入组织机构代码',
                  },
                  {
                    min: 1,
                    max: 50,
                    message: '请输入不超过50个字',
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <FormItem label="公司名称" hasFeedback {...formItemLayout}>
              {getFieldDecorator('company_name', {
                initialValue: editObj !== null ? editObj.company_name : '',
                rules: [

                  {
                    min: 0,
                    max: 100,
                    message: '请输入不超过100个字',
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Col>
          <Col span = {8}>
            <FormItem label="公司标识" hasFeedback {...formItemLayout}>
              {getFieldDecorator('company_identification', {
                initialValue: editObj !== null ? editObj.company_identification : '',
                rules: [
                  {
                    min: 0,
                    max: 32,
                    message: '请输入不超过32个字',
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Col>
          <Col span = {8}>
            <FormItem label="行业隶属关系" hasFeedback {...formItemLayout}>
              {getFieldDecorator('industry_affiliation', {
                initialValue: editObj !== null ? editObj.industry_affiliation : '',
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: '必须输入行业隶属关系',
                  },
                  {
                    min: 1,
                    max: 50,
                    message: '请输入不超过50个字',
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <FormItem label="成立时间" hasFeedback {...formItemLayout}>
              {getFieldDecorator('founding_time', {
                initialValue: editObj !== null ? moment(new Date(editObj.founding_time).format("yyyy-MM-dd hh:mm:ss")) : null,
                rules: [
                  {
                    required: true,
                    message: '必须输入成立时间',
                  }
                ],
              })(<DatePicker style={{width:"100%"}}/>)}
            </FormItem>
          </Col>
          <Col span = {8}>
            <FormItem label="法人代表" hasFeedback {...formItemLayout}>
              {getFieldDecorator('legal_representative', {
                initialValue: editObj !== null ? editObj.legal_representative : '',
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: '必须输入法人代表',
                  },
                  {
                    min: 1,
                    max: 50,
                    message: '请输入不超过50个字',
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Col>
          <Col span = {8}>
            <FormItem label="行业类别代码" hasFeedback {...formItemLayout}>
              {getFieldDecorator('industry_code', {
                initialValue: editObj !== null ? editObj.industry_code : '',
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: '必须输入行业类别代码',
                  },
                  {
                    min: 1,
                    max: 50,
                    message: '请输入不超过50个字',
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span = {8}>
            <FormItem label="联系电话" hasFeedback {...formItemLayout}>
              {getFieldDecorator('contact_number', {
                initialValue: editObj !== null ? editObj.contact_number : '',
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: '必须输入联系电话',
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Col>
          <Col span = {8}>
            <FormItem label="电子邮箱" hasFeedback {...formItemLayout}>
              {getFieldDecorator('email', {
                initialValue: editObj !== null ? editObj.email : '',
                rules: [
                  {
                    min:0,
                    max:50,
                    message: '请输入不超过50个字',
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Col>
          <Col span = {8}>
            <FormItem label="属地监管机构" hasFeedback {...formItemLayout}>
              {getFieldDecorator('local_regulators', {
                initialValue: editObj !== null ? editObj.local_regulators : '',
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: '必须输入属地监管机构',
                  },
                  {
                    min: 1,
                    max: 100,
                    message: '请输入不超过100个字',
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
        <Col span={8}>
          <FormItem label="企业传真" hasFeedback {...formItemLayout}>
            {getFieldDecorator('fax', {
              initialValue: editObj !== null ? editObj.fax : '',
              rules: [
                {
                  min: 0,
                  max: 20,
                  message: '请输入不超过20个字',
                },
              ],
            })(<Input />)}
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem label="邮政编码" hasFeedback {...formItemLayout}>
            {getFieldDecorator('postal_code', {
              initialValue: editObj !== null ? editObj.postal_code : '',
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: '必须输入邮政编码',
                },
                {
                  min: 1,
                  max: 10,
                  message: '请输入不超过10个字',
                },
              ],
            })(<Input />)}
          </FormItem>
        </Col>
        <Col span = {8}>
          <FormItem label="经济类型编码" hasFeedback {...formItemLayout}>
            {getFieldDecorator('economic_coding', {
              initialValue: editObj !== null ? editObj.economic_coding : '',
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: '必须输入经济类型编码',
                },
                {
                  min: 1,
                  max: 50,
                  message: '请输入不超过50个字',
                },
              ],
            })(<Input />)}
          </FormItem>
        </Col>
      </Row>
        <Row>
          <Col span={8}>
            <FormItem label="工商注册号" hasFeedback {...formItemLayout}>
              {getFieldDecorator('registration_number', {
                initialValue: editObj !== null ? editObj.registration_number : '',
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: '必须输入工商注册号',
                  },
                  {
                    min: 1,
                    max: 50,
                    message: '请输入不超过50个字',
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="是否集团公司" hasFeedback {...formItemLayout}>
              {getFieldDecorator('group_flag', {
                initialValue: editObj !== null ? editObj.group_flag : '',
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: '必须输入是否集团公司',
                  },
                ],
              })(<Select>
                <Option value="">请选择</Option>
                <Option value="是">是</Option>
                <Option value="否">否</Option>
              </Select>)}
            </FormItem>
          </Col>
          <Col span = {8}>
            <FormItem label="国民经济行业代码" hasFeedback {...formItemLayout}>
              {getFieldDecorator('n_ecnomic_code', {
                initialValue: editObj !== null ? editObj.n_ecnomic_code : '',
                rules: [
                  {
                    min: 0,
                    max: 50,
                    message: '请输入不超过50个字',
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span = {8}>
            <FormItem label="企业规模" hasFeedback {...formItemLayout}>
              {getFieldDecorator('scale', {
                initialValue: editObj !== null ? editObj.scale : '',
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: '必须输入企业规模',
                  },
                  {
                    min:0,
                    max:100,
                    message:"请输入不超过50个字",
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Col>
          <Col span = {8}>
            <FormItem label="从业人数" hasFeedback {...formItemLayout}>
              {getFieldDecorator('staff_number', {
                initialValue: editObj !== null ? editObj.staff_number : '',
                rules: [
                  {
                    required: true,
                    message: '必须输入从业人数',
                  },
                ],
              })(<Input />)}
            </FormItem>
        </Col>
        <Col span = {8}>
          <FormItem label="占地面积" hasFeedback {...formItemLayout}>
            {getFieldDecorator('area', {
              initialValue: editObj !== null ? editObj.area : '',
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: '必须输入占地面积',
                },
              ],
            })(<Input />)}
          </FormItem>
        </Col>
        </Row>
        <Row>
          <Col span = {8}>
            <FormItem label="注册资金(万元)" hasFeedback {...formItemLayout}>
              {getFieldDecorator('registerd_capital', {
                initialValue: editObj !== null ? editObj.registerd_capital : '',
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: '必须输入注册资金',
                  }
                ],
              })(<Input />)}
            </FormItem>
          </Col>
          <Col span = {8}>
            <FormItem label="资产总额" hasFeedback {...formItemLayout}>
              {getFieldDecorator('assets', {
                initialValue: editObj !== null ? editObj.assets : '',
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: '必须输入资产总额',
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Col>
          <Col span = {8}>
            <FormItem label="年利润" hasFeedback {...formItemLayout}>
              {getFieldDecorator('profit', {
                initialValue: editObj !== null ? editObj.profit : '',
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: '必须输入年利润',
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span = {8}>
            <FormItem label="主要负责人" hasFeedback {...formItemLayout}>
              {getFieldDecorator('responsible_person', {
                initialValue: editObj !== null ? editObj.responsible_person : '',
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: '必须输入主要负责人',
                  },
                  {
                    min:1,
                    max:20,
                    message:"请输入不超过20个字"
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Col>
          <Col span = {8}>
            <FormItem label="负责人联系方式" hasFeedback {...formItemLayout}>
              {getFieldDecorator('responsible_contacts', {
                initialValue: editObj !== null ? editObj.responsible_contacts : '',
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: '必须输入企业负责人联系方式',
                  },
                  {
                    min:1,
                    max:20,
                    message:"请输入不超过20个字"
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Col>
          <Col span = {8}>
            <FormItem label="企业负责人邮箱" hasFeedback {...formItemLayout}>
              {getFieldDecorator('responsible_email', {
                initialValue: editObj !== null ? editObj.responsible_email : '',
                rules: [
                  {
                    min:0,
                    max:50,
                    message:"请输入不超过50个字"
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <FormItem label="企业性质" hasFeedback {...formItemLayout}>
              {getFieldDecorator('enterprise_nature', {
                initialValue: editObj !== null ? editObj.enterprise_nature : '',
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: '必须输入行政许可类别统计',
                  },
                  {
                    min:1,
                    max:500,
                    message:"请输入不超过500个字"
                  },
                ],
              })(<Input style={{width:"100%"}}/>)}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="生产经营地址" hasFeedback {...formItemLayout}>
              {getFieldDecorator('manufacturer_address', {
                initialValue: editObj !== null ? editObj.manufacturer_address : '',
                rules: [
                  {
                    min:0,
                    max:100,
                    message:"请输入不超过100个字",
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="企业注册地址" hasFeedback {...formItemLayout}>
              {getFieldDecorator('register_address', {
                initialValue: editObj !== null ? editObj.register_address : '',
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: '必须输入企业注册地址',
                  },
                  {
                    min:1,
                    max:100,
                    message:"请输入不超过100个字",
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Col>

        </Row>
        <Row>
          <Col span = {12}>
            <FormItem label="生产地区行政区划代码" labelCol={{ span: 8 }} wrapperCol={{ span: 15 }}>
              {getFieldDecorator('manufacturer_administrative', {
                initialValue: editObj !== null ? editObj.manufacturer_administrative : '',
                rules: [
                  {
                    min:0,
                    max:50,
                    message:"请输入不超过50个字",
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Col>
          <Col span = {12}>
            <FormItem label="注册地区行政区划代码" labelCol={{ span: 8 }} wrapperCol={{ span: 15 }}>
              {getFieldDecorator('register_administrative', {
                initialValue: editObj !== null ? editObj.register_administrative : '',
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: '必须输入注册地区行政区划代码',
                  },
                  {
                    min:1,
                    max:50,
                    message:"请输入不超过50个字",
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label="行政许可类别" labelCol={{ span: 3 }} wrapperCol={{ span: 20 }}>
              {getFieldDecorator('administrative_licensing_statistics', {
                initialValue: editObj !== null ? editObj.administrative_licensing_statistics : '',
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: '必须输入行政许可类别统计',
                  },
                  {
                    min:1,
                    max:500,
                    message:"请输入不超过500个字"
                  },
                ],
              })(<Input style={{width:"100%"}}/>)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label="经营范围" labelCol={{ span: 3 }} wrapperCol={{ span: 20 }}>
              {getFieldDecorator('scope', {
                initialValue: editObj !== null ? editObj.scope : '',
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: '必须输入经营范围',
                  },
                  {
                    min:1,
                    max:1000,
                    message:"请输入不超过1000个字"
                  },
                ],
              })(<TextArea autosize={{minRows:2, maxRows:10}} style={{width:"100%"}}/>)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label="企业概况" labelCol={{ span: 3 }} wrapperCol={{ span: 20 }}>
              {getFieldDecorator('profile', {
                initialValue: editObj !== null ? editObj.scope : '',
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: '必须输入企业概况',
                  },
                  {
                    min:1,
                    max:2000,
                    message:"请输入不超过2000个字"
                  },
                ],
              })(<TextArea autosize={{minRows:2, maxRows:10}} style={{width:"100%"}}/>)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label="企业经营状态" labelCol={{ span: 3 }} wrapperCol={{ span: 20 }}>
              {getFieldDecorator('business_status', {
                initialValue: editObj !== null ? editObj.business_status : '',
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: '必须输入企业经营状态',
                  },
                  {
                    min:1,
                    max:500,
                    message:"请输入不超过500个字"
                  },
                ],
              })(<TextArea autosize={{minRows:2, maxRows:10}} style={{width:"100%"}}/>)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label="备注" labelCol={{ span: 3 }} wrapperCol={{ span: 20 }}>
              {getFieldDecorator('remark', {
                initialValue: editObj !== null ? editObj.remark : '',
                rules: [
                  {
                    min:1,
                    max:500,
                    message:"请输入不超过500个字"
                  },
                ],
              })(<TextArea autosize={{minRows:2, maxRows:10}} style={{width:"100%"}}/>)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <FormItem label="附件" labelCol={{ span: 3 }} wrapperCol={{ span: 20 }}>
              {getFieldDecorator('upload',{
                valuePropName: 'fileList',
                getValueFromEvent: normFile,
              })(<Upload multiple={true} action={`${serviceDomain}/file/upload/`}>
                  <Button visible={false}>
                    <Icon type="upload"/>点击上传
                  </Button>
                </Upload>)}
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

EnterpriseCreateModal.propTypes = {
  onOk: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  editObj: PropTypes.object,
}

export default Form.create()(EnterpriseCreateModal)
