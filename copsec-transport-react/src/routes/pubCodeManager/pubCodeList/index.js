/**
 * Created by shenfu on 2017/5/16.
 */
import React, { PropTypes } from 'react'
import { connect } from 'dva'

import { Row, Col,message,Card } from 'antd'
import  CodeTree from './CodeTree'
import  CodeTable from './List'
import Filter from './Filter'

const PubCodeList = ({ location, dispatch, pubCodeList }) => {

  const {
    initTreeData,
    pagination,
    loading,
    resultList,
    codeTypeList,
    visible,
    editDisabled,
    treeEdit,
    queryData,
    selectCodeTypeList,
    detailData,
    isEdit,
    enabledList,
    formTitle,
    selectNode,
    addDisable,
    refDisplay,
    refList,
  } = pubCodeList



  const filterProps = {
    codeTypeList,
    queryData,
    loading,
    pagination,
    selectNode,
    dispatch,
  }

  const codeListProps = {
    pagination,
    loading,
    resultList,
    codeTypeList,
    visible,
    queryData,
    editDisabled,
    treeEdit,
    selectCodeTypeList,
    detailData,
    isEdit,
    enabledList,
    formTitle,
    selectNode,
    codeTypeList,
    addDisable,
    refDisplay,
    refList,
    dispatch,
  }

  const orgTreeSelectProps = {
     handleRefresh: function (value) {
       dispatch({
         type: 'pubCodeList/initTree',
         payload: {
           pubCode:"PUB_CODE"
         },
       });
     },
    initTreeData,
    handleOnChange: function (val) {

    },
    handleOnSelect: function (code,name,type) {
       let buttonDisable=false;
       if(code==null||code==''){
         buttonDisable=true;
       }
      dispatch({ type: 'pubCodeList/queryList',
        payload: {
          queryData:{
            parentCode:code,
            pubCode:queryData.pubCode,
            codeName:queryData.codeName,
            codeType:queryData.codeType,
          },
        } })
      dispatch({ type: 'pubCodeList/setSelect',
        payload: {
          addDisable:buttonDisable,
          selectNode:{
            code:code,
            name:name,
            type:type,
          }
        } })
    },
    queryData,
  }


  return (
    <div className="content-inner">
        <Row>
          <Col span={6} >
            <div title='公共代码'>
              <CodeTree {... orgTreeSelectProps} ></CodeTree>
            </div>
          </Col>
          <Col span={1}></Col>
          <Col span={17}>
            <Filter {...filterProps} />
            <CodeTable {...codeListProps} />
          </Col>

        </Row>
    </div>
  )
}

function mapStateToProps ({ pubCodeList }) {
  return { pubCodeList }
}

PubCodeList.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  pubCodeList: PropTypes.object,

}

export default connect(mapStateToProps)(PubCodeList)

