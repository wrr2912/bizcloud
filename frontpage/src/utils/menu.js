module.exports = [
  {
    key: '6',
    name: '用户',
    icon: 'user',
    link: '/user/userList',
    visible: false,
  },
  {
    key: '61',
    name: '用户详细',
    icon: 'user',
    link: '/user/userView/:id',
    visible: false,
  },
  {
    key: '1',
    name: '主页',
    icon: 'home',
    link: '/dashboard',
    visible: false,
  },
  {
    key: '8',
    name: '人员',
    icon: 'user',
    link: '/personnel/personnelList',
    visible: false,
  },
  {
    key: '81',
    name: '人员信息',
    icon: 'user',
    link: '/personnel/personnelView/:id',
    visible: false,
  },
  {
    key: '2',
    name: '系统管理',
    icon: 'home',
    visible: true,
  },
  {
    key: '21',
    name: '单位管理',
    icon: 'home',
    link: '/dept/deptList',
    mpid: '2',
    visible: true,
  },
  {
    key: '3',
    name: '企业信息管理',
    icon: 'home',
    visible: true,
  },
  {
    key: '31',
    name: '企业基本信息管理',
    icon: 'home',
    link: '/enterprise/enterpriseList',
    mpid: '3',
    visible: true,
  },{

    key: '9',
    name: '部门',
    icon: 'home',
    link: '/department/departmentList',
    visible: true,
  },
  {
    key: '91',
    name: '部门信息',
    icon: 'home',
    link: '/department/departmentView/:id',
    visible: false,
  },{
    key:'10',
    name:'监管机构管理',
    icon:'home',
    link:'/supervisionInstitution/supervisionInstitutionList',
    visible:true,
  },{
    key:'101',
    name:'监管机构信息',
    icon:'home',
    link:'/supervisionInstitution/supervisionInstitutionView/:id',
    visible:false,
  },
]


