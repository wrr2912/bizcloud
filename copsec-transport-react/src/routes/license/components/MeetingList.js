import React from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col,Button } from 'antd'

const meeting = ({ }) => {
  return (
    <Row gutter={24} style={{ marginTop: '10px' }}>
      <Col span={24}>
        <Button icon="plus" type="primary">生成上会清单</Button>
      </Col>
      {}
    </Row>

  )
}

meeting.propTypes = { }

export default Form.create()(meeting)
