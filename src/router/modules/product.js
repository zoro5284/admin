export default [
  {
    path: '/brand',
    name: 'Brand',
    component: () => import('@/views/product/brand/list/Index.vue'),
  },
  {
    path: '/brand/add',
    name: 'AddBrand',
    component: () => import('@/views/product/brand/add/Index.vue'),
  },
  {
    path: '/category',
    name: 'Category',
    component: () => import('@/views/product/category/list/Index.vue'),
  },
  {
    path: '/category/add',
    name: 'AddCategory',
    component: () => import('@/views/product/category/add/Index.vue'),
  },
]
