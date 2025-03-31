export default [
  {
    path: '/brand',
    name: 'Brand',
    component: () => import('@/views/product/brand/list/Index.vue'),
    meta: {
      title: '品牌列表',
    },
  },
  {
    path: '/brand/add',
    name: 'AddBrand',
    component: () => import('@/views/product/brand/add/Index.vue'),
    meta: {
      title: '新增品牌',
    },
  },
  {
    path: '/category',
    name: 'Category',
    component: () => import('@/views/product/category/list/Index.vue'),
    meta: {
      title: '类目列表',
    },
  },
  {
    path: '/category/add',
    name: 'AddCategory',
    component: () => import('@/views/product/category/add/Index.vue'),
    meta: {
      title: '新增类目',
    },
  },
  {
    path: '/model',
    name: 'Model',
    component: () => import('@/views/product/model/list/Index.vue'),
    meta: {
      title: '型号列表',
    },
  },
  {
    path: '/model/add',
    name: 'AddModel',
    component: () => import('@/views/product/model/add/Index.vue'),
    meta: {
      title: '新增型号',
    },
  },
]
