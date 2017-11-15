import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import Filter from './components/Filter'
import MeetingListTable from './components/MeetingListTable'
import List from "./licenseList/List"
import CompanyModal from './Modals/company/companyModal'
import MatchModal from './MatchModal'
import CheckModal from './CheckModal'
import ApproveModal from './ApproveModal'
import CollectModal from './CollectModal'
import IssueModal from './IssueModal'
import NodeModal from './NodeModal'
import DocModal from "./components/DocModal"
import OpinionBook from './docTemplate/OpinionBook'
import DecisionBook from './docTemplate/DecisionBook'


const License = ({ location, dispatch, licenseList ,loading , app}) => {
  const { permission } = app
  const {licenseTableDataSource, docHtml,adviceList,advice,company,companyVisible,
    docKey,checkItem,pagination,searchItem, currentItem,checkNodeVisible,
    adviceFormVisible,checkModalVisible,issueModalVisible,matchModalVisible, modalVisible,
    chiefsModelVisible,collectModalVisible,goverVisible,adminVisible,opinionBookVisible,decisionBookVisible,
    opinionItems,decisionItems,modalType, isMotion } = licenseList
    const {pageSize} = pagination
  //材料审查弹出页面属性
  const modalProps = {
    item: currentItem,
    visible: modalVisible,
    maskClosable: false,
    chiefsModelVisible:chiefsModelVisible,
    confirmLoading: loading.effects['licenseList/update'],
    title: `${modalType === 'create' ? '任务分配' : '任务审查'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: 'licenseList/saveLicense',
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'licenseList/hideModal',
      })
    },
  }

//集体审查
  const collectModalProps = {
    item: currentItem,
    visible: collectModalVisible,
    goverVisible: goverVisible,
    adminVisible: adminVisible,
    maskClosable: false,
    confirmLoading: loading.effects['licenseList/update'],
    title: '集体审查',
    wrapClassName: 'vertical-center-modal',
    changeCheck(e,value){
      let data
      if(e==1){
        data={goverVisible:value}
      }else{
        data={adminVisible:value}
      }

      dispatch({
        type: 'licenseList/changeCheck',
        payload: data,
      })

    },
    onOk (data) {
      dispatch({
        type: 'licenseList/saveCollectCheck',
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'licenseList/hideCollectModal',
      })
    },
  }

  //任务分配页面属性
  const matchModalProps = {
    item:  currentItem,
    searchItem: searchItem,
    visible: matchModalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['licenseList/update'],
    title: `${matchModalVisible === true ? '任务分配' : '任务审查'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: 'licenseList/matchToUser',
        payload: data,
      })
    },
    onSearch (data) {
      dispatch({
        type: 'licenseList/getCompleteUser',
        payload: {userId:data},
      })
    },
    onCancel () {
      dispatch({
        type: 'licenseList/hideMatchModal',
      })
    },
  }

  //材料审查页面
  const checkModalProps = {
    item: currentItem,
    checkItem: checkItem,
    visible: checkModalVisible,
    docHtml:docHtml,
    docKey:docKey,
    maskClosable: false,
    adviceFormVisible:adviceFormVisible,
    confirmLoading: loading.effects['licenseList/update'],
    title:  '在线预览',
    wrapClassName: 'vertical-center-modal',
    updateDocHtml:(data)=>{
      dispatch({
        type: 'licenseList/updateDocHtml',
        payload:{docHtml:data},
      })
    },
    onOk (data) {
    /*  dispatch({
        type: 'licenseList/workAdvice',
        payload: data,
      })*/
      dispatch({
        type: 'licenseList/saveApply',
        payload: data,
      })
    },
    setDocKey(data){
      dispatch({
        type: 'licenseList/setDocKey',
        payload:data
      })
    },
    onCancel () {
      dispatch({
        type: 'licenseList/hideCheckModal',
      })
    },
  }
  console.log('------------------'+companyVisible)
  //企业信息弹出页面信息
  const companyModalProps = {
    company: company,
    visible: companyVisible,
    maskClosable: false,
    confirmLoading: loading.effects['licenseList/update'],
    title: '企业详情',
    wrapClassName: 'vertical-center-modal',

    onCancel () {
      dispatch({
        type: 'licenseList/hideCompanyVisible',
      })
    },
  }

  //材料审查意见弹出页面属性
 /* const adviceModalProps = {
    item: currentItem,
    adviceModalVisible:adviceModalVisible,
    title:  '材料审查',
    onAdviceOk (data) {
      dispatch({
        type: 'licenseList/saveApply',
        payload: data,
      })
    }, onAdviceCancel () {
      dispatch({
        type: 'licenseList/hideAdviceModal',
      })
    },
  }*/

//发证页面属性
  const issueModalProps = {
    item: currentItem,
    visible:issueModalVisible,
    title:  '许可证内容填写',
    onIssueOk (data) {
      dispatch({
        type: 'licenseList/saveIssue',
        payload:data,
      })
    }, onIssueCancel () {
      dispatch({
        type: 'licenseList/hideIssueModal',
      })
    },
  }
  console.log('-------流程----'+checkNodeVisible)
  //流程节点页面属性
  const checkNodeProps = {
    item: currentItem,
    visible: checkNodeVisible,
    maskClosable: false,
    confirmLoading: loading.effects['licenseList/update'],
    title: '流程节点',
    wrapClassName: 'vertical-center-modal',

    onCancel () {
      dispatch({
        type: 'licenseList/hideCheckNode',
      })
    },
  }
  //列表属性
  const listProps = {
    dataSource:licenseTableDataSource,
    loading : loading.effects['licenseList/getLicenseTableDataSource'],
    pagination:pagination,
      location,
  //  dispatch,
    isMotion,
    setDocKey(data){
      dispatch({
        type: 'licenseList/setDocKey',
        payload:data
      })
    },
    checkNode(item){//展示流程节点

      dispatch({
        type: 'licenseList/showCheckNode',
        payload: {
          modalType: 'checkNode',
          currentItem: item,
        },
      })
    },
    showCompany(data){//展示企业信息

      dispatch({
        type: 'licenseList/showCompany',
        payload: {
          name:data,
        }
      })

    },
    onChange (page) {
      const { query, pathname } = location
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          page: page.current,
          pageSize: page.pageSize,
        },
      }))
    },
    onDeleteItem (id) {
      dispatch({
        type: 'licenseList/deleteUser',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'licenseList/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
    onCheckItem(item){//材料审查
      dispatch({
        type: 'licenseList/checkLicense',
        payload: {
          modalType: 'check',
          currentItem: item,
          adviceFormVisible:true
        },
      })
    },
    onOverlookItem(item){//材料审查
      dispatch({
        type: 'licenseList/checkLicense',
        payload: {
          modalType: 'check',
          currentItem: item,
          adviceFormVisible:false
        },
      })
    },
    onHandleItem (item) {//展示材料审查页面

      dispatch({
        type: 'licenseList/showModal',
        payload: {
          modalType: 'handle',
          currentItem: item,
        },
      })
    },
    onMatchItem(item) {//分配任务

      dispatch({
        type: 'licenseList/showMatchModal',
        payload: {
          modalType: 'match',
          currentItem: item,
        },
      })
    },
    onAcceptItem(item){//接收任务
      console.log('-----获取申请id----'+item.id)
      dispatch({
        type: 'licenseList/onAcceptItem',
        payload: {
          modalType: 'accept',
          currentItem: item,
        },
      })
    },
    onIssueItem(item) {//发证

      dispatch({
        type: 'licenseList/showIssueModal',
        payload: {
          modalType: 'issue',
          currentItem: item,
        },
      })
    },
    onCollectItem(item){//集体审查
      dispatch({
        type: 'licenseList/showCollectModel',
        payload: {
          modalType: 'collect',
          currentItem: item,
        },
      })

    },
    onBackItem(item){//退回

      dispatch({
        type: 'licenseList/onBackItem',
        payload: {
          modalType: 'back',
          currentItem: item,
        },
      })
    },
    onOpinionBook(item){
      dispatch({type:"licenseList/showOpinionBook",payload:{currentItem:item}});
    },
    onDecisionBook(item){
      dispatch({type:"licenseList/showDecisionBook",payload:{currentItem:item}});
    }
  }
  const filterProps = {
   filter : {
      ...location.query,
    },

    onFilterChange : (value)=>{
      dispatch(routerRedux.push({
        pathname: location.pathname,
        query: {
          ...value,
          page: 1,
          pageSize,
        },
      }))
    }
  }

  const opinionBookProps = {
    opinionItems:opinionItems,
    item:currentItem,
    visible:opinionBookVisible,
    onOk:(data)=>{
      dispatch({type:"licenseList/saveOpinionBook",payload:data});
    },
    onCancel:()=>{
      dispatch({type:"licenseList/hideOpinionBookModal"});
    }
  }

  const decisionBookProps = {
    decisionItems:decisionItems,
    item:currentItem,
    visible:decisionBookVisible,
    onOk:(data)=>{
      dispatch({type:"licenseList/saveDecisionBook",payload:data});
    },
    onCancel:()=>{
      dispatch({type:"licenseList/hideDecisionBookModal"});
    }
  }
  return (
    <div className="content-inner">
      <Filter {...filterProps}/>
      <MeetingListTable dispatch={dispatch}/>
      <List {...listProps} />
      {companyVisible && <CompanyModal {...companyModalProps} />}
      {modalVisible && <ApproveModal {...modalProps} />}
      {collectModalVisible && <CollectModal  {...collectModalProps} />}
      {issueModalVisible && <IssueModal  {...issueModalProps} />}
      {checkModalVisible && <CheckModal {...checkModalProps} />}
      {opinionBookVisible && <OpinionBook {...opinionBookProps}/>}
      {decisionBookVisible && <DecisionBook {...decisionBookProps}/>}
    </div>
  )
}

License.propTypes = {
  licenseList: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
  app:  PropTypes.object,
}

export default connect(({ licenseList, loading, app }) => ({ licenseList, loading , app}))(License)
