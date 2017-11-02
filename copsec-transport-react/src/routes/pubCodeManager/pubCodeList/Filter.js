/**
 * Created by shenfu on 2017/5/17.
 */
import React, { PropTypes } from 'react'
import { Form, Button, Row, Col, Input, Select } from 'antd'

const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  },
}

const Filter = ({
                  codeTypeList,
                  loading,
                  pagination,
                  queryData,
                  selectNode,
                  dispatch,
                  form: {
                    getFieldDecorator,
                    getFieldsValue,
                    setFieldsValue,
                  },
                }) => {

  const handleSubmit = () => {
    let fields = getFieldsValue()
    dispatch({ type: 'pubCodeList/queryList',
      payload: {
        queryData:{
          parentCode:queryData.parentCode,
          pubCode:fields.queryCode,
          codeName:fields.queryName,
          codeType:fields.queryType,
        }
      } })

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
    dispatch({
      type: 'pubCodeList/onChangeFilter',
      payload: {
        queryData:{
          parentCode:queryData.parentCode,
          pubCode:'',
          codeName:'',
          codeType:'',
        }
      },
    })
  }

  const codeChange = (e) => {

    dispatch({
      type: 'pubCodeList/onChangeFilter',
      payload: {
        queryData:{
          parentCode:queryData.parentCode,
          pubCode:e,
          codeName:queryData.codeName,
          codeType:queryData.codeType,
        }
      },
    })
  }

  const nameChange = (e) => {
    dispatch({
      type: 'pubCodeList/onChangeFilter',
      payload: {
        queryData:{
          parentCode:queryData.parentCode,
          pubCode:queryData.pubCode,
          codeName:e,
          codeType:queryData.codeType,
        }
      },
    })
  }

  const typeChange = (e) => {
    dispatch({
      type: 'pubCodeList/onChangeFilter',
      payload: {
        queryData:{
          parentCode:queryData.parentCode,
          pubCode:queryData.pubCode,
          codeName:queryData.codeName,
          codeType:e,
        }
      },
    })
  }




  return (
    <Row gutter={16}>
      <Col {...ColProps} xl={{ span: 6 }} md={{ span: 5 }}>
        {getFieldDecorator('queryCode', { })(<Input onChange={codeChange} placeholder="代码CODE" style={{ width: '100%' }}
          size="large"
        >
        </Input>)}
      </Col>
      <Col {...ColProps} xl={{ span: 6 }} md={{ span: 5 }}>
        {getFieldDecorator('queryName', { })(<Input onChange={nameChange} placeholder="代码名称" style={{ width: '100%' }} size="large"
        />)}
      </Col>
      <Col {...ColProps} xl={{ span: 6 }} md={{ span: 5 }}>
        {getFieldDecorator('queryType', { })(<Select onSelect={typeChange} placeholder="代码类型" style={{ width: '100%' }} size="large" allowClear
        >
          {codeTypeList.map(option => <Select.Option key={option.pubCode} value={option.pubCode}>{option.codeName}</Select.Option>)}
        </Select>)}
      </Col>

      <Col {...ColProps} xl={{ span: 6 }} md={{ span: 9 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div >
            <Button type="primary" className="margin-right" onClick={handleSubmit} loading={loading}>查询</Button>
            <Button  style={{marginLeft: 4}}  className="margin-right"  onClick={handleReset}>重置</Button>
          </div>
        </div>
      </Col>

    </Row>
  )
}

Filter.propTypes = {
  codeTypeList: PropTypes.array,
  loading: PropTypes.bool,
  pagination: PropTypes.object,
  form: PropTypes.object,
  queryData:PropTypes.object,
  dispatch:PropTypes.func,
  selectNode:PropTypes.object,
}

export default Form.create()(Filter)
