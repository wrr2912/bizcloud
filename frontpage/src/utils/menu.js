module.exports = [
  {
    key: '6',
    name: '用户',
    icon: 'user',
    link: '/user/userList',
    visible: true,
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
    icon: 'home',
    link: '/personnel/personnelList',
    visible: true,
  },
  {
    key: '81',
    name: '人员信息',
    icon: 'home',
    link: '/personnel/personnelView/:id',
    visible: false,
  },
  {
    key: '2',
    name: '单位管理',
    icon: 'home',
    link: '/dept/deptList',
    visible: true,
  },
  ]

