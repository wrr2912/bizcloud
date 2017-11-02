import config from './config'
import menu from './menu'
import request from './request'
import classnames from 'classnames'
import { color } from './theme'
import lodash from 'lodash'

// 连字符转驼峰
String.prototype.hyphenToHump = function () {
  return this.replace(/-(\w)/g, (...args) => {
    return args[1].toUpperCase()
  })
}

// 驼峰转连字符
String.prototype.humpToHyphen = function () {
  return this.replace(/([A-Z])/g, '-$1').toLowerCase()
}

// 日期格式化
Date.prototype.format = function (format) {
  const o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'H+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    S: this.getMilliseconds(),
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, `${this.getFullYear()}`.substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : (`00${o[k]}`).substr(`${o[k]}`.length))
    }
  }
  return format
}


/**
 * @param   {String}
 * @return  {String}
 */

const queryURL = (name) => {
  let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
  let r = window.location.search.substr(1).match(reg)
  if (r != null) return decodeURI(r[2])
  return null
}

/**
 * 数组内查询
 * @param   {array}      array
 * @param   {String}    id
 * @param   {String}    keyAlias
 * @return  {Array}
 */
const queryArray = (array, key, keyAlias = 'key') => {
  if (!(array instanceof Array)) {
    return null
  }
  const item = array.filter(_ => _[keyAlias] === key)
  if (item.length) {
    return item[0]
  }
  return null
}
const checkPower = (optionId, curPowers = []) => {
  return curPowers.some(cur => cur === optionId)
}

const getCurPowers = (curPath) => {
  if(!allPathPowers) {
    allPathPowers = JSON.parse(localStorage.getItem('allPathPowers'))
  }
  const curPathPower = allPathPowers && allPathPowers[curPath]
  //cur =2 检测查看页面内容权限
  if(!curPathPower || !curPathPower.find(cur => cur === 2)) {
    return false
  }
  return curPathPower //返回curPathPower，是为方便页面跳转验证权限后，dispatch当然权限
}

const generateList = (data, dataList) => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const newNode = {...node, children: null}
    dataList.push(newNode);
    if (node.children) {
      generateList(node.children, dataList);
    }
  }
}
/**
 * Tree 结构数据，到array数据
 * @param tree
 */
const treeToArray = (tree) => {
  let dataList = [];
  generateList(tree, dataList);
  return dataList;
}
function equalSet(a, b) {
  const as = new Set(a)
  const bs = new Set(b)
  if (as.size !== bs.size) return false
  for (var a of as) if (!bs.has(a)) return false
  return true
}

/**
 * 数组格式转树状结构
 * @param   {array}     array
 * @param   {String}    id
 * @param   {String}    pid
 * @param   {String}    children
 * @return  {Array}
 */
const arrayToTree = (array, id = 'key', pid = 'pid', children = 'children') => {
  let data = lodash.cloneDeep(array)

  let result = []
  let hash = {}
  data.forEach((item, index) => {
    hash[data[index][id]] = data[index]
  })

  data.forEach((item) => {
    let hashVP = hash[item[pid]]
    if (hashVP) {
      !hashVP[children] && (hashVP[children] = [])
      hashVP[children].push(item)
    } else {
      result.push(item)
    }
  })
  return result
}

module.exports = {
  config,
  menu,
  equalSet,
  request,
  color,
  classnames,
  queryURL,
  queryArray,
  arrayToTree,
  treeToArray,
  checkPower,
  getCurPowers
}
