import React, {PropTypes, Component} from 'react';//引入react包，用于编写react组件
import { Router, Route, browserHistory} from 'react-router';//引入react-router包，用于路由跳转
import ECharts from 'react-echarts3';//引入react-echarts包，实现echarts实现
import { connect } from 'dva'
import $ from 'jquery';
import { Col, Input, Row, Button } from 'antd'
import option from './barChart/options';

// 定义画面接口参数，其中checkList就是我们在model里面设定的namespace
const Analysis = ({ location, dispatch, loading, app }) => {
  // 展开state中的属性

  return (
    <div className="content-inner">

      <Row gutter={24} style={{ marginTop: '10px' }}>
        <Col span={24}>
          <ECharts
            option={option[0]}
            notMerge
            style={{ width: $(window).width()-500 + 'px',height:'300px' }}
          />
        </Col>
      </Row>
    <br/>
      <Row gutter={24} style={{ marginTop: '10px' }}>
      <Col span={24}>
        <ECharts
          option={option[1]}
          notMerge
          style={{ width: $(window).width()-500 + 'px', height:'300px' }}
        />
      </Col>
    </Row>
      <br/>

    </div>
  )
}

// 定义画面可传入的属性以及属性类型
Analysis.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,

}

// 导出并关联Model中state到本画面的props
export default connect(({ loading, app }) => ({  loading, app }))(Analysis)

