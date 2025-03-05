// mockData.js
export const mockData = [
  {
    id: 1,
    name: 'Alice',
    age: 28,
    department: 'Engineering',
    hireDate: '2019-04-15',
  },
  {
    id: 2,
    name: 'Bob',
    age: 35,
    department: 'Marketing',
    hireDate: '2018-07-22',
  },
  {
    id: 3,
    name: 'Charlie',
    age: 42,
    department: 'HR',
    hireDate: '2017-11-30',
  },
  {
    id: 4,
    name: 'David',
    age: 26,
    department: 'Engineering',
    hireDate: '2021-01-08',
  },
  {
    id: 5,
    name: 'Eva',
    age: 30,
    department: 'Design',
    hireDate: '2020-05-10',
  },
]

export const mockCols = [
  {
    prop: 'id',
    label: 'ID',
  },
  {
    prop: 'name',
    label: '姓名',
    formatter: (val) => {
      return 'hello ' + val
    },
  },
  {
    prop: 'age',
    label: '年龄',
  },
  {
    label: '测试',
    children: [
      {
        prop: 'department',
        label: '部门',
      },
      {
        prop: 'hireDate',
        label: '入职时间',
      },
    ],
  },
]
