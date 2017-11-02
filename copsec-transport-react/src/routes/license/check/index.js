import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col,Tree,Input ,Button } from 'antd';
import styles from './index.less'
const { TextArea } = Input;
const TreeNode = Tree.TreeNode;

const License = ({ location, dispatch, licenseCheck, loading }) => {
  const { docTableDataSource ,contentHtml,docName,materailName} = licenseCheck

  const listProps = {
    dataSource: '',
    loading: loading.effects['licenseList/getLicenseTableDataSource'],
  }

  const loop = (data )=> {
    console.log('---------进入方法2-----------')
    console.log(contentHtml)
    return data.map((item) => {
    console.log('---------进入方法3-----------')
    if (item.children && item.children.length) {
      return <TreeNode key={item.key} title={item.title}>{loop(item.children)}</TreeNode>;
    }
    return <TreeNode key={item.key} title={item.title} />;
  })

  }
  const select = (selectedNodes )=> {
    console.log('---------进入选择方法1-----------')
    console.log(selectedNodes)
    dispatch({
      type:'licenseCheck/setName',
      payload:{
        materailName:selectedNodes.title,
        docName:selectedNodes.title,
      }
    })
  }

  return (
    <div className="content-inner" >
      <Row>
        <Col span={6}>
          <div>材料列表：</div>
          <br/>
          <div className={styles.treeBox} >
              <Tree
            className="draggable-tree"
            onSelect={select}
            >
            {loop(docTableDataSource)}
            </Tree>
          </div>
        </Col>
        <Col span={14}>
          <div>{'文档内容：'+materailName+'-->'+docName}</div>
          <br/>
          <div className={styles.docBox}>
              <div dangerouslySetInnerHTML={{__html:contentHtml}}></div>
          </div>
        </Col>
        <Col span={4}>
          <div>{'审核意见：'+materailName}</div>
          <br/>
          <div className={styles.viewBox}>
            <TextArea placeholder="填写审核意见" autosize={{ minRows: 6, maxRows: 10 }} />
            <br/>
            <Button className="search-btn" size="large" type="primary">
              保存
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  )
}

License.propTypes = {
  licenseCheck: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ licenseCheck, loading }) => ({ licenseCheck, loading }))(License)
