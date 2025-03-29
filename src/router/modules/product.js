export default [
  {
    path: '/brand',
    name: 'Brand',
    component: () => import('@/views/product/brand/Index.vue'),
  },
  {
    path: '/brand/add',
    name: 'AddBrand',
    component: () => import('@/views/product/brand/add/Index.vue'),
  },
]
