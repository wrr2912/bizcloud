import React, { PropTypes } from 'react'
import { Tree, Input, Button, Icon, Tag ,Row,Col} from 'antd'
import classnames from 'classnames'
import styles from './CodeTree.less'
const TreeNode = Tree.TreeNode
const Search = Input.Search
let dataList = []

const generateList = (data) => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i]
    const key = node.pubCode
    const title = node.codeName
    dataList.push({ key, title })
    if (node.children) {
      generateList(node.children, node.key)
    }
  }
}

const getParentKey = (key, tree) => {
  let parentKey
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i]
    if (node.children) {
      if (node.children.some(item => item.pubCode === key)) {
        parentKey = node.pubCode
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children)
      }
    }
  }
  return parentKey
}

class CodeTree extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      expandedKeys: [],
      searchValue: '',
      autoExpandParent: false,
      defaultExpandAll: true,
      loading: false,
      dataMenus: [],
      dataList: [],
    }
  }
  onExpand = (expandedKeys) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    })
  }

  onChange = (e) => {
    const value = e.target.value
    const { initTreeData } = this.props
    const dataMenus = initTreeData
    console.log(dataList);
    const expandedKeys = dataList.map((item) => {
      if (item.title.indexOf(value) > -1) {
        return getParentKey(item.key, dataMenus)
      }
      return null
    }).filter((item, i, self) => item && self.indexOf(item) === i)
    this.setState({
      expandedKeys,
      searchValue: value,
      autoExpandParent: true,
    })
  }


  onSelect = (selectedKeys,e) => {
   if(selectedKeys.length>0){
     this.props.handleOnSelect(selectedKeys[0],e.selectedNodes[0].props.title.props.children[2], e.selectedNodes[0].props.value);
   }else{
     this.props.handleOnSelect("","","");
   }



  }



  render () {
    const { searchValue, expandedKeys, autoExpandParent,defaultExpandAll } = this.state
    const { initTreeData } = this.props
    const { handleRefresh } = this.props
    const dataMenus = initTreeData
    generateList(dataMenus)
    const loop = data => data.map((item) => {
      const index = item.codeName.search(searchValue)
      const beforeStr = item.codeName.substr(0, index)
      const afterStr = item.codeName.substr(index + searchValue.length)
      const title = index > -1 ? (
          <span>
          {beforeStr}
            <span style={{ color: '#ffaa0a' }}>{searchValue}</span>
            {afterStr}
        </span>
        ) : <span>{item.codeName}</span>
      if (item.children) {
        return (
          <TreeNode key={item.pubCode} value={item.codeType} title={title}>
            {loop(item.children)}
          </TreeNode>
        )
      }
      return <TreeNode key={item.pubCode}  value={item.codeType} title={title} />
    })


    const treeNodes = loop(dataMenus);

    return (
      <div  className={classnames(styles.borderdiv)} >
        <div>
          <Row>
            <Col span={18}>
              <Search style={{ width: "100%" }} placeholder="Search" onChange={this.onChange} />
            </Col>
            <Col span={6}>
              <Icon style={{ paddingLeft: 8, paddingRight: 8,cursor: 'pointer' }} onClick={handleRefresh} type="retweet" />
            </Col>
          </Row>

        </div>
        <Tree
          defaultExpandAll={defaultExpandAll}
          onExpand={this.onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          onSelect={this.onSelect}
          defaultExpandedKeys={['PUB_CODE']}
          defaultSelectedKeys={['PUB_CODE']}
        >
          {treeNodes}
        </Tree>
      </div>
    )
  }
}

export default CodeTree
