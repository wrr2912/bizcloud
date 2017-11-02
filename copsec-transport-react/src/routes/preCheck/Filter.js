import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FilterItem } from '../../components'
import { Form, Button, Row, Col, DatePicker, Input, Cascader, Switch } from 'antd'
import city from '../../utils/city'

const Search = Input.Search
const { RangePicker } = DatePicker

const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  },
}

const TwoColProps = {
  ...ColProps,
  xl: 96,
}

const Filter = ({
                  onAdd,
                  isMotion,
                  switchIsMotion,
                  onFilterChange,
                  filter,
                  form: {
                    getFieldDecorator,
                    getFieldsValue,
                    setFieldsValue,
                  },
                }) => {
  const handleFields = (fields) => {
    const { createTime } = fields
    if (createTime.length) {
      fields.createTime = [createTime[0].format('YYYY-MM-DD'), createTime[1].format('YYYY-MM-DD')]
    }
    return fields
  }

  const handleSubmit = () => {
    let fields = getFieldsValue()
    console.log('----handleSubmit----')
    console.log(fields)
    onFilterChange(fields)
  }

  const handleReset = () => {
    const fields = getFieldsValue()
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = []
        } else {
          fields[item] = undefined
        }
      }
    }
    setFieldsValue(fields)
    handleSubmit()
  }

  const handleChange = (key, values) => {
    let fields = getFieldsValue()
    fields[key] = values
    fields = handleFields(fields)
    onFilterChange(fields)
  }

  const { name } = filter

  return (
    <Row gutter={24}>
      <Col {...ColProps} xl={{ span: 2 }} md={{ span:3}}>申请企业：</Col>
      <Col {...ColProps} xl={{ span: 4 }} md={{ span: 6 }}>
        {getFieldDecorator('companyName', { initialValue:"" })(<Search placeholder="搜索企业名称" size="large" onSearch={handleSubmit} />)}
      </Col>
      <Col {...ColProps} xl={{ span: 2 }} md={{ span:3}}>申请事项：</Col>
      <Col {...ColProps} xl={{ span: 4 }} md={{ span: 6 }}>
        {getFieldDecorator('applyItem', { initialValue: "" })(<Search placeholder="搜索申请事项" size="large" onSearch={handleSubmit} />)}
      </Col>
      <Col {...ColProps} xl={{ span: 4 }} md={{ span: 6}}>
        <Button type="primary" size="large" className="margin-right search" onClick={handleSubmit}  icon="search">检索</Button>
        <Button type="danger" size="large" onClick={handleReset} className="margin-right reset" icon="reload">重置</Button>
      </Col>
      {/*<Col {...TwoColProps} xl={{ span: 10 }} md={{ span: 24 }} sm={{ span: 24 }}>*/}
      {/*<div style={{ display: 'flex', justifyContent: 'space-between' }}>*/}
      {/*<div >*/}
      {/*/!*<Button size="large" type="primary"  onClick={onAdd} className="margin-right" icon="user-add">添加</Button>*!/*/}
      {/*<Button size="large" type="danger" className="margin-right" icon="user-delete">删除</Button>*/}
      {/*</div>*/}
      {/*</div>*/}
      {/*</Col>*/}
    </Row>
  )
}

Filter.propTypes = {
  onAdd: PropTypes.func,
  isMotion: PropTypes.bool,
  switchIsMotion: PropTypes.func,
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Form.create()(Filter)
