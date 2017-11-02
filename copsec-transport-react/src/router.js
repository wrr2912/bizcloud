import React from 'react'
import PropTypes from 'prop-types'
import { Router } from 'dva/router'
import App from './routes/app'

const registerModel = (app, model) => {
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model)
  }
}

const Routers = function ({ history, app }) {
  const routes = [
    {
      path: '/',
      component: App,
      getIndexRoute (nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('./models/dashboard'))
          cb(null, { component: require('./routes/dashboard/') })
        }, 'dashboard')
      },
      childRoutes: [
        {
          path: 'dashboard',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/dashboard'))
              cb(null, require('./routes/dashboard/'))
            }, 'dashboard')
          },
        }, {
          path: 'user/userList',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/user/userList'))
              cb(null, require('./routes/user/'))
            }, 'user')
          },
        }, {
          path: 'user/:id',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/user/detail'))
              cb(null, require('./routes/user/detail/'))
            }, 'user-detail')
          },
        }, {
          path: 'role/roleList',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/role/role'))
              cb(null, require('./routes/role/'))
            }, 'roleList')
          },
        }, {
          path: 'personal',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/personal/personal'))
              cb(null, require('./routes/personal/'))
            }, 'personal')
          },
        }, {
          path: 'personal2',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/personal/personal'))
              cb(null, require('./routes/personal2/'))
            }, 'personal2')
          },
        }, {
          path: 'login',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/login'))
              cb(null, require('./routes/login/'))
            }, 'login')
          },
        }, {
          path: 'request',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./routes/request/'))
            }, 'request')
          },
        }, {
          path: 'menu/menuList',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/menus/menus'))
              cb(null, require('./routes/MgrMenus/'))
            }, 'user_menus')
          },
        },
        {
          path: 'userGroups',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/usergroup/usergroup'))
              cb(null, require('./routes/usergroups/'))
            }, 'user_groups')
          },
        },

        {
          path: 'userAccounts',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/useraccount/account'))
              cb(null, require('./routes/useraccount/'))
            }, 'userAccounts')
          },
        },

        {
          path: 'UIElement/iconfont',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./routes/UIElement/iconfont/'))
            }, 'UIElement-iconfont')
          },
        }, {
          path: 'UIElement/search',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./routes/UIElement/search/'))
            }, 'UIElement-search')
          },
        }, {
          path: 'UIElement/dropOption',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./routes/UIElement/dropOption/'))
            }, 'UIElement-dropOption')
          },
        }, {
          path: 'UIElement/layer',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./routes/UIElement/layer/'))
            }, 'UIElement-layer')
          },
        }, {
          path: 'UIElement/dataTable',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./routes/UIElement/dataTable/'))
            }, 'UIElement-dataTable')
          },
        }, {
          path: 'UIElement/editor',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./routes/UIElement/editor/'))
            }, 'UIElement-editor')
          },
        }, {
          path: 'chart/lineChart',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./routes/chart/lineChart/'))
            }, 'chart-lineChart')
          },
        }, {
          path: 'chart/barChart',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./routes/chart/barChart/'))
            }, 'chart-barChart')
          },
        }, {
          path: 'minutes/minutesList',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/minutes/minutesList'))
              cb(null, require('./routes/minutes'))
            }, 'minutes-minutesList')
          },
        }, {
          path: 'chart/areaChart',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./routes/chart/areaChart/'))
            }, 'chart-areaChart')
          },
        }, {
          path: 'company/companyList',//企业信息
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/company/companyList'))
              cb(null, require('./routes/company/'))
            }, 'company')
          },
        }, {
          path: 'company/qual/:id',//企业详情
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/company/qualifications'))
              cb(null, require('./routes/company/qualifications/'))
            }, 'qualifications')
          },
        }, {
          path: 'employee/employeeList',//员工信息
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/employee/employeeList')) //  加载指定的model
              cb(null, require('./routes/employee/employeeList/'))  //  加载指定的画面
            }, 'employee-employeeList')
          },
        }, {
          path: 'employee/employeeView/:id',//员工详情
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/employee/employeeView')) //  加载指定的model
              cb(null, require('./routes/employee/employeeView/'))  //  加载指定的画面
            }, 'employee-employeeView')
          },
        }, {
          path: 'license/licenseList',//许可审查
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/license/licenseList'))
              cb(null, require('./routes/license/'))
            }, 'license')
          },
        }, {
          path: 'license/check/:id',
          breadcrumbName:'材料审查',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/license/licenseCheck'))
              cb(null, require('./routes/license/check/'))
            }, 'licenseCheck')
          },
        },
        {
          path: '/license/preCheckList',//预审查
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/preCheck/preCheckList'))
              cb(null, require('./routes/preCheck/'))
            }, 'preCheck')
          },
        },
        {
          path: 'checkList/checkList',//集体审查
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/checkList/checkList'))
              cb(null, require('./routes/checkList/'))
            }, 'checkList')
          },
        }, {
          path: 'compLedger/compLedgerList',//企业基本信息台账
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/compLedger/compLedgerList'))
              cb(null, require('./routes/compLedger'))
            }, 'compLedger-compLedgerList')
          },
        }, {
          path: 'license/analysis',//统计分析
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./routes/analysis/'))
            }, 'analysis')
          },
        },
        {
          path: 'rules/rulesList',//规则设置
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/rules/rulesList'))
              cb(null, require('./routes/rules/'))
            }, 'rules')
          },
        }, {
          path: 'pubCodeManager/pubCodeList',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/pubCodeManager/pubCodeList'))
              cb(null, require('./routes/pubCodeManager/pubCodeList/'))
            }, 'pubCodeManager-pubCodeList')
          },
        },{
          path: '*',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./routes/error/'))
            }, 'error')
          },
        },
      ],
    },
  ]

  return <Router history={history} routes={routes} />
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers
