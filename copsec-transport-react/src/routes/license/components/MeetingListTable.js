import React, { PropTypes } from 'react'
import { Form,Row,Col,Button } from 'antd'
import MeetingModal from '../Modals/meeting/MeetingModal'
import {connect} from 'dva'
import moment from 'moment';

const MeetingListTable = ({ dispatch,meetingList}) => {
  const {createModalVisible,loading} = meetingList

  const modalProps = {
    visible: createModalVisible,
    maskClosable: false,
    confirmLoading: false,
    title: '上会清单列表',
    wrapClassName: 'vertical-center-modal',
    dispatch,
    meetingList,
    onOk (data) {
      dispatch({
        type: 'meetingList/saveMinutes',
        payload: {
          ...data,
        },
      })
    },
    onCancel () {
      dispatch({
        type: 'meetingList/hideModal',
      })
    },
  }
  return (
    <div>
      <Row gutter={24} style={{ marginTop: '10px' }}>
        <Col span={24}>
          <Button icon="plus" type="primary" onClick={()=>{dispatch({type:'meetingList/showCreateModal',payload:{}})}} >生成上会清单</Button>
        </Col>
      </Row>

      {createModalVisible && <MeetingModal {...modalProps}/>}
    </div>
  )
}

MeetingListTable.propTypes = {
  dispatch: PropTypes.func,
}

export default connect(({meetingList})=>({meetingList}))(Form.create()(MeetingListTable))
