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
    key: '2',
    name: '系统管理',
    icon: 'setting',
    visible: true,
  }
]
