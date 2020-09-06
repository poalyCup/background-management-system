import { request } from './request'

//获取商品分类列表
export function getCategoriesList (queryInfo) {
  return request({
    url: '/categories',
    method: 'get',
    params: {
      ...queryInfo
    }
  })
}

//根据id删除分类
export function deleteCateByCatId (cat_id) {
  return request({
    url: `categories/${cat_id}`,
    method: 'delete'
  })
}

//根据id获取分类数据
export function getCateInfoById(cat_id) {
  return request({
    url: `/categories/${cat_id}`,
    method: 'get'
  })
}

//根据ID修改分类名称
export function editCateInfoById (cateInfo) {
  return request({
    url: `/categories/${cateInfo.cat_id}`,
    method: 'put',
    params: {
      cat_name: cateInfo.cat_name
    }
  })
}

//获取两级的商品分类列表
export function getTwoLevelsCateList () {
  return request({
    url: '/categories',
    method: 'get',
    params: {
      type: 2
    }
  })
}

//添加分类
export function addCate (cateInfo){
  return request({
    url: 'categories',
    method: 'post',
    params: { 
      cat_pid: cateInfo.cat_pid,
      cat_name: cateInfo.cat_name,
      cat_level: cateInfo.cat_level
     }
  })
}

//根据id和参数类型获取参数列表
export function getAttrList (info) {
  return request({
    url: `categories/112/attributes`,
    method: 'get',
    params: {
      sel: 'many'
    }
  })
}

//获取商品列表数据
export function getGoodsList (queryInfo) {
  return request({
    url: 'goods',
    method: 'get',
    params: { ...queryInfo }
  })
}

//根据商品id删除商品
export function deleteGoodsById (id) {
  return request({
    url: `goods/${id}`,
    method: 'delete'
  })
}