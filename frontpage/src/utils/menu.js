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
    key: '7',
    name: '单位',
    icon: 'home',
    link: '/dept/deptList',
    visible: true,
  },
  {
    key: '71',
    name: '单位详细',
    icon: 'home',
    link: '/dept/deptView/:id',
    visible: false,
  },
]
