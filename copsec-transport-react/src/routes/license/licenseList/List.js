import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Icon, Tooltip } from 'antd'
import styles from './List.less'
import moment from 'moment';
// 推荐在入口文件全局设置 locale
import 'moment/locale/zh-cn';
import { connect } from 'dva'
moment.locale('zh-cn');
import classnames from 'classnames'
import AnimTableBody from '../../../components/DataTable/AnimTableBody'
import { DropOption } from '../../../components/index'
import { Link } from 'dva/router'
import MaterialList from "../MaterialList";
import DocModal from "../components/DocModal"

const confirm = Modal.confirm

const List = ({ menuOptions,checkNode,showCompany,setDocKey,
                onCheckItem,onHandleItem,onOverlookItem,onAcceptItem,onBackItem, onEditItem, onMatchItem,onCollectItem,onIssueItem, onDeleteItem,onOpinionBook,onDecisionBook,
                isMotion, location,dispatch, ...tableProps }) => {
  const handleMenuClick = (record, e) => {

    if (e === '0' || e === 0) {
      onAcceptItem(record);//接收/启动
    } else if(e === '1' || e === 1){
       onCheckItem(record);//材料审查
      //    onHandleItem(record);
    }else if (e === '2' || e === 2) {
      onCollectItem(record);//司集体审查
    } else if (e === '3' || e === 3) {
      onOpinionBook(record);
    } else if (e === '4' || e === 4) {
  //    onHandleItem(record);//处审查   意见书--未通过
      onDecisionBook(record);
    } else  if (e === '5' || e === 5) {
      //决定书--未通过
    } else  if (e === '6' || e === 6) {
      //意见书--未通过
    //  onIssueItem(record);//发证
    }else  if (e === '7' || e === 7) {
      //意见书--未通过
      onIssueItem(record);//发证
    }
  }
const handleCheckNode = (record) =>{
  checkNode(record)
}
  const columns = [
    {
      title: '企业名称',
      dataIndex: 'companyName',
      width:"200px",
      render: (text,record) => {
        return (<a
          onClick={() => {
            showCompany(record.companyName)
          }}
          style={{
            marginRight: 12,
            fontSize: 14,
          }}
        > {text}</a>)

      }
    },{
      title: '申请事项/内容',
      dataIndex: 'applyItem',
      width:"120px"
    },{
      title:'受理时间',
      dataIndex:'acceptanceTime',
      width:"120px"
    },{
      title:'截止时间',
      dataIndex:'',
      width:'120px',
    },{
      title:'审查材料',
      dataIndex:'materials',
      width:"80px",
      render:(text,record,index) => {
       return (<a onClick={() => { onOverlookItem(record); }}>查看</a>)
      }
    },{
      title:'审查会议',
      dataIndex:'',
      width:"100px",
    },{
      title: '审查结果',
      dataIndex: 'reviewResult',
      width:"120px",
      render: (row,record) => {
        const {reviewResult,reviewStage,isAccepted} = record;
        if( isAccepted==0){
          return '未进入审查阶段'
        }else if(reviewStage==1 && reviewResult==1) {
          return '材料审查中'
        }else if(reviewStage==2&& reviewResult==1){
          return '材料审查通过'
        }else  if(reviewStage==6 && reviewResult==1){
          return '准予'
        } if(reviewStage==7 ){
          return '已发证'
        }else if(reviewResult==0){
          return '不通过'
        }
        return '材料审查中';
     }
    },
    {
      title: '操作',
      key: 'matterId',
      width: 200,
      render: (row,record) => {
        const button =(handleId,bText) => {
          return (<a key={handleId} onClick={() => { handleMenuClick(row, handleId)}} style={{marginRight: 12, fontSize: 14, }}>{bText}</a>)
        }
        return (<div>{button(7,'发证')}</div>);
        const {reviewResult,reviewStage,isAccepted} = record;
        if( isAccepted==0){
          return (button(0,'启动'));
        }else if(reviewStage==1 && reviewResult==1) {
          return (button(1,'材料审查'));
        }else if(reviewStage==2 && reviewResult==1){
          return (<div>{button(2,'集体审查')}</div>);                     //已审查，等待上会结果
        }else if(reviewStage==7 && reviewResult==1){
          return (<div>{button(3,'意见书')}{button(4,'决定书')}</div>);           //已发证
        }else  if(reviewStage==3  && reviewResult==1){
          return (<div>{button(7,'发证')}</div>);     //准予
        }else if(reviewResult==0){
          return (<div>{button(5,'意见书')}{button(6,'决定书')}</div>);   //材料审查不通过
        }
        return reviewStage;
      },
    },
  ]

  const getBodyWrapperProps = {
    page: location.query.page,
    current: tableProps.pagination.current,
  }

  const getBodyWrapper = body => { return isMotion ? <AnimTableBody {...getBodyWrapperProps} body={body} /> : body }
  const rowSelection = {}

  /*const docModalProps = {
    width:"50%",
    title:"在线预览",
    footer:null,
    docHtml:docHtml,
    visible:docModalVisible,
    onCancel () {
      dispatch({
        type: 'docModal/hideDocModal',
      })
    },
  }*/
  return (
    <div>
      <Table
        {...tableProps}
        className={classnames({ [styles.table]: true, [styles.motion]: isMotion })}
        bordered
        scroll={{ x: 1500 }}
        size="middle"
        rowSelection={rowSelection}
        columns={columns}
        simple
        rowKey={record => record.id}
        getBodyWrapper={getBodyWrapper}
      />
    </div>
  )
}

List.propTypes = {
  onHandleItem: PropTypes.func,
  onOverlookItem:PropTypes.func,
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  onBackItem: PropTypes.func,
  onMatchItem: PropTypes.func,
  onAcceptItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default connect(({ docModal}) => ({ docModal }))(List)
