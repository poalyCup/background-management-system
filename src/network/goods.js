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