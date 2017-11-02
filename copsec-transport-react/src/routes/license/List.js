import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Icon, Tooltip } from 'antd'
import styles from './List.less'
import moment from 'moment';
// 推荐在入口文件全局设置 locale
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import classnames from 'classnames'
import AnimTableBody from '../../components/DataTable/AnimTableBody'
import { DropOption } from '../../components'
import { Link } from 'dva/router'

const confirm = Modal.confirm

const List = ({ menuOptions,checkNode,showCompany,
                onCheckItem,onHandleItem,onAcceptItem,onBackItem, onEditItem, onMatchItem,onCollectItem,onIssueItem, onDeleteItem,
                isMotion, location, ...tableProps }) => {
  const handleMenuClick = (record, e) => {

    if(e === '1'){
      onCheckItem(record);//材料审查
    }else if (e === '2') {
      onHandleItem(record);//领导审批
    } else if (e === '3') {
      onMatchItem(record);//分配任务
    } else if (e === '4') {
      console.log('接收'+record.id)
      onAcceptItem(record);//接收
    } else if (e === '5') {
      onHandleItem(record);//处审查
    } else  if (e === '6') {
      onCollectItem(record);//司集体审查
    } else  if (e === '7') {
      onIssueItem(record);//发证
    } else if (e === '8') {
      confirm({
        title: '确认删除该条记录吗?',
        onOk () {
          onDeleteItem(record.id)
        },
      })
    }
  }
const handleCheckNode = (record) =>{
  checkNode(record)
}
  const columns = [
    {
      title: '受理号',
      dataIndex: 'acceptNumber',
     }, {
      title: '申请事项/内容',
      dataIndex: 'applyItem',
      width:"250px"
    }, {
      title: '企业名称',
      dataIndex: 'companyName',
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
    },
    // {
    //   title: '代理人信息',
    //   dataIndex: 'employeeInfo',
    //   render: (text, record) => <Link to={`license/${record.id}`}>{text}</Link>,
    // },
    {
      title: '受理依据',
      dataIndex: 'acceptBasis',
    },
     {
       title: '接收时间',
       dataIndex: 'acceptTime',
    render: (text, record) => {return record.acceptTime!=null?moment(record.acceptTime).format('YYYY-MM-DD'):''},

      },
    {
      title: '经办人',
      dataIndex: 'acceptWorker',
    }, {
      title: '接收状态',
      dataIndex: 'isAccepted',
      render: (row,record) => record.isAccepted==0 ? '未接收':'已接收'
    },  {
      title: '审查状态',
      dataIndex: 'reviewStage',
      render: (row,record) => {
        if( record.isAccepted==0){
          return '未进入审查阶段'
        }else if(record.isAccepted==1 && record.reviewStage==1) {
          return '材料审查阶段'
        }else if(record.reviewStage==2){
          return '司集体审查中'
        }else if(record.reviewStage==3){
          return '处审查阶段'
        }else if(record.reviewStage==4){
          return '司主管负责人审核中'
        }else if(record.reviewStage==5){
          return '司主要负责人审核中'
        }else  if(record.isAccepted==0 && record.reviewStage==0){
          return '未进入审查阶段'
        }else if(record.reviewStage==6){
          return '审查结束'
        }else if(record.reviewStage==7){
          return '审查结束'
        }
      }

    }, {
      title: '流程节点',
      dataIndex: 'checkNode',
      render: (row,record) => {
        return (<a
          onClick={() => {
            handleCheckNode(record)
          }}
          style={{
            marginRight: 12,
            fontSize: 14,
          }}
        > 查看流程节点</a>)

      }
    },{
      title: '审查结果',
      dataIndex: 'reviewResult',
      render: (row,record) => {
        if( record.isAccepted==0){
          return '未进入审查阶段'
        }else if(record.reviewStage==1 && record.reviewResult==1) {
          return '材料审查中'
        }else if(record.reviewStage==2&& record.reviewResult==1){
          return '材料审查通过'
        }else if(record.reviewStage==3 && record.reviewResult==1){
          return '司集体审查通过'
        }else if(record.reviewStage==4 && record.reviewResult==1){
          return '处审查通过'
        }else  if(record.reviewStage==5 && record.reviewResult==1){
          return '司主管负责人通过'
        } else  if(record.reviewStage==6 && record.reviewResult==1){
          return '准予'
        } if(record.reviewStage==7 ){
          return '已发证'
        }else if(record.reviewResult==0){
          return '不通过'
        }
     }
    },
    // {
    //   title: '是否延期',
    //   dataIndex: 'isDelay',
    //   render: (text, record) =>{return isDelay==0?'否':'是'}
    // },
    {
      title: '操作',
      key: 'operation',
      width: 150,
      render: (row,record) => {
     const menuOptions = [{
          id: '1',
          name: '材料审查',
          color: 'blue',
          icon: 'edit',
          hidden: '',
        }, {
          id: '2',
          name: '行政许可审批',
          color: 'blue',
          icon: 'edit',
          hidden: '',
        }, {
          id: '3',
          name: '任务分配',
          color: 'blue',
          icon: 'edit',
          hidden: '',
        }, {
          id: '4',
          name: '接收',
          color: 'blue',
          icon: 'edit',
          hidden: '',
        },
          {
          id: '5',
          name: '处审查',
          color: 'blue',
          icon: 'edit',
          hidden: '',
        } ,
          {
          id: '6',
          name: '司集体审查',
          color: 'blue',
          icon: 'edit',
          hidden: '',
        }, {
          id: '7',
          name: '发证',
          color: 'blue',
          icon: 'edit',
          hidden: '',
        } ]
        if(record.reviewResult=='0'){
          return (<div>
            审查结束
          </div>)

        }else{
        if(record.isAccepted ==='0') {
          const buttons =  menuOptions.map(({name, id}) => {
             if (id === '3' || id === '4' ) {
              return (<a
                onClick={() => {
                  handleMenuClick(row, id)
                }}
                style={{
                  marginRight: 12,
                  fontSize: 14,
                }}
              > {name}</a>)
            }
          })
            return (<div>
            {buttons}
          </div>)
        }else if(record.isAccepted ==='1' && record.reviewStage==='1'){
          const buttons =  menuOptions.map(({name, id}) => {
             if (id === '1') {
              return (<a
                onClick={() => {
                  handleMenuClick(row, id)
                }}
                style={{
                  marginRight: 12,
                  fontSize: 14,
                }}
              > {name}</a>)
            }
          })
          return (<div>
            {buttons}
          </div>)
        } else if(record.reviewStage==='2'){
          const buttons =  menuOptions.map(({name, id}) => {
             if (id === '6' ) {
              return (<a
                onClick={() => {
                  handleMenuClick(row, id)
                }}
                style={{
                  marginRight: 12,
                  fontSize: 14,
                }}
              > {name}</a>)
            }
          })
          return (<div>
            {buttons}
          </div>)
        }else if(record.reviewStage==='3'){
          const buttons =  menuOptions.map(({name, id}) => {
            if (id === '5' ) {
              return (<a
                onClick={() => {
                  handleMenuClick(row, id)
                }}
                style={{
                  marginRight: 12,
                  fontSize: 14,
                }}
              > {name}</a>)
            }
          })
          return (<div>
            {buttons}
          </div>)
        }else if(record.reviewStage==='4'){
          const buttons =  menuOptions.map(({name, id}) => {
             if (id === '2') {
              return (<a
                onClick={() => {
                  handleMenuClick(row, id)
                }}
                style={{
                  marginRight: 12,
                  fontSize: 14,
                }}
              > {name}</a>)
            }
          })
          return (<div>
            {buttons}
          </div>)
        }else if(record.reviewStage==='5'){
          const buttons =  menuOptions.map(({name, id}) => {
            if (id === '2') {
              return (<a
                onClick={() => {
                  handleMenuClick(row, id)
                }}
                style={{
                  marginRight: 12,
                  fontSize: 14,
                }}
              > {name}</a>)
            }
          })
          return (<div>
            {buttons}
          </div>)
        }else if(record.reviewStage==='6'){
          const buttons =  menuOptions.map(({name, id}) => {
            if (id === '7') {
              return (<a
                onClick={() => {
                  handleMenuClick(row, id)
                }}
                style={{
                  marginRight: 12,
                  fontSize: 14,
                }}
              > {name}</a>)
            }
          })
          return (<div>
            {buttons}
          </div>)
        }else{
          return (<div>
            审查结束
          </div>)
        }
        }
      },
    },
  ]

  const getBodyWrapperProps = {
    page: location.query.page,
    current: tableProps.pagination.current,
  }

  const getBodyWrapper = body => { return isMotion ? <AnimTableBody {...getBodyWrapperProps} body={body} /> : body }
  const rowSelection = {}
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
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  onBackItem: PropTypes.func,
  onMatchItem: PropTypes.func,
  onAcceptItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default List
