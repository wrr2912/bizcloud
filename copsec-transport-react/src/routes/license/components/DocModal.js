import React from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col, Modal } from 'antd'

const modal = ({
                 onCancel,
                 docHtml,
                 ...docModalProps
               }) => {
  return (
    <Modal  {...docModalProps} onCancel={onCancel}>
      <div span="24">
        <div dangerouslySetInnerHTML={{__html:docHtml}}></div>
      </div>
    </Modal>

  )
}

modal.propTypes = {
  docHtml: PropTypes.string.isRequired,
  onCancel: PropTypes.func,
}

export default Form.create()(modal)
