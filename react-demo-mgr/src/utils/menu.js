module.exports = [
  {
    key: '6',
    name: '职员列表',
    icon: 'user',
    link: '/employee/employeeList',
    visible: true,
  },
  {
    key: '61',
    name: '职员详细',
    icon: 'user',
    link: '/employee/employeeView/:id',
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
