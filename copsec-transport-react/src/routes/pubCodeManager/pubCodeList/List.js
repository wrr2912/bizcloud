/**
 * Created by shenfu on 2017/5/16.
 */
import React, { PropTypes } from 'react'
import styles from './List.less'
import DetailForm from './DetailForm'


// 采用antd的UI组件
import { Table, Row, Col, Button, message ,Modal} from 'antd'
const confirm = Modal.confirm;

const CodeListTable = ({
  pagination,
  loading,
  resultList,
  dispatch,
  queryData,
  selectCodeTypeList,
  detailData,
  isEdit,
  enabledList,
  codeTypeList,
  formTitle,
  visible,
  selectNode,
  addDisable,
  refDisplay,
  refList,
  ...tableProps
}) => {
  const columns = [
    {
      title: '顺序',     // table header 文案
      dataIndex: 'codeOrder', // 数据对象内的属性，也做react vdom 的key
      type: 'string',     // table 内显示的类型
      // sorter: true,         // 是否需要排序
      width: 50,
    }, {
      title: '代码CODE',
      dataIndex: 'pubCode',
      type: 'string',
      width: 120,
    }, {
      title: '代码名称',
      dataIndex: 'codeName',
      type: 'string',
      width: 120,
    },{
      title: '代码类型',
      dataIndex: 'codeTypeStr',
      type: 'string',
      width: 80,
    },{
      title: '上级代码CODE',
      dataIndex: 'parentCode',
      type: 'string',
      width: 120,
    },{
      title: '上级代码名称',
      dataIndex: 'parentName',
      type: 'string',
      width: 120,
    },{
      title: '是否启用',
      dataIndex: 'enabledStr',
      type: 'string',
      width: 80,
    },{
      title: '操作',
      width: 120,
      render: (text, record) => {

        return  (
          <div className="editable-row-operations">
            {
              <span>
               <a onClick={() => editHandle(record)}>修改</a>
                <span className="ant-divider" />
                <a onClick={() => delHandle(record)}>删除</a>
               </span>
            }
          </div>
        );

      }

    },

  ]

  const addHandle = () => {
    dispatch({
      type: 'pubCodeList/showModal',
      payload: {
        modalType: 'create',
        selectNode:{
          code:selectNode.code,
          name:selectNode.name,
          type:selectNode.type,
        },
        codeTypeList:codeTypeList,
        pagination:pagination,

      },
    })
  }

  const editHandle = (record) => {
      dispatch({
        type: 'pubCodeList/showModal',
        payload: {
          modalType: 'update',
          codeId: record.codeId,
          codeTypeList:codeTypeList,
        },
      })

  }


  function delHandle(record) {
    confirm({
      title: '是否确认删除?',
      onOk() {
          dispatch({
            type: 'pubCodeList/delCode',
            payload: {
              codeId: record.codeId,
              queryData:queryData,
              currentPage: pagination.current,
              pageSize: pagination.pageSize,
            },
          })

      },
      onCancel() {
      },
    });
  }

  const onChange = (page, filters, sorter) => {
    dispatch({
      type: 'pubCodeList/queryList',
      payload: {
        currentPage: page.current,
        pageSize: page.pageSize,
        queryData: queryData,
      },
    })
  }

  const detailProps = {
    selectCodeTypeList,
    visible,
    dispatch,
    queryData,
    pagination,
    detailData,
    isEdit,
    enabledList,
    formTitle,
    resultList,
    refDisplay,
    refList,
  }

  return (
    <Row>
      <Col span={24}>
          <div style={{ marginBottom: '12px' }}>
            <Button disabled={addDisable} type="primary" size="large" className="margin-right" onClick={addHandle} loading={loading}>新增</Button>
            <DetailForm {...detailProps} />
        </div>
      </Col>

      <Col span={24}>
        <Table
          {...tableProps}
          bordered
          className={styles.table}
          dataSource={resultList}
          columns={columns}
          simple
          pagination={pagination}
          loading={loading}
          scroll={{ y: 500 }}
          onChange={onChange}
          rowKey={'codeId'}
        />
      </Col>
    </Row>
  )
}

CodeListTable.propTypes = {
  pagination: PropTypes.object,
  loading: PropTypes.bool,
  resultList: PropTypes.array,
  dispatch: PropTypes.func,
  roleTypeList: PropTypes.array,
  visible: PropTypes.bool,
  queryData: PropTypes.object,
  selectCodeTypeList:PropTypes.array,
  detailData:PropTypes.object,
  isEdit:PropTypes.bool,
  enabledList:PropTypes.array,
  formTitle:PropTypes.string,
  selectNode:PropTypes.object,
  codeTypeList:PropTypes.array,
  addDisable:PropTypes.bool,
  refDisplay:PropTypes.string,
  refList:PropTypes.array,
}

export default CodeListTable
