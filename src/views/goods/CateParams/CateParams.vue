<template>
  <div>
    <!-- 面包屑导航栏 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类参数</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-alert title="仅第三级分类可编辑属性！！！" type="warning" show-icon :closable="false" > </el-alert>
      <!-- 商品分类选择栏 -->
      <el-form>
        <el-form-item label="选择商品分类：">
            <el-cascader v-model="cateKeys" :options="categoriesList" size="medium"
                        :props="{label: 'cat_name', value: 'cat_id', children: 'children', expandTrigger: 'hover'}"
                        clearable @change="handleCateChange"></el-cascader>
          </el-form-item>
        </el-form>
      <!-- 参数属性Tab -->
      <el-tabs v-model="activeName" v-show="cateKeys.length > 0" @tab-click="tabClick">
        <el-tab-pane label="动态参数" name="many">
          <CateParamsList :paramsList="paramsList"></CateParamsList>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="only">
          <CateParamsList :paramsList="paramsList"></CateParamsList>
        </el-tab-pane>
      </el-tabs>

    </el-card>

  </div>
</template>

<script>
import { getCategoriesList, getAttrList } from 'network/goods'

import CateParamsList from './CateParamsList'


export default {
  name: 'CateParams',
  components: {
    CateParamsList
  },
  data() {
    return {
      categoriesList: [],
      cateKeys: [],
      activeName: 'many',
      paramsList: []
    }
  },
  methods: {
    handleCateChange () {
      console.log(this.cateKeys)
      this._getAttrList()
    },
    //tab栏点击事件
    tabClick(tab) {
      if (this.activeName !== tab.name) {
        this.activeName = tab.name
      }
    },




    //网络请求函数
    _getCategoriesList () {
      getCategoriesList().then(res => {
        if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
        this.categoriesList = res.data
      })
    },
    //根据id和参数类型获取参数列表
    _getAttrList () {
      console.log('_getAttrList')
      const info = {}
      info.id = this.cateKeys[this.cateKeys.length -1]
      info.sel = this.activeName
      getAttrList(info).then(res => {
        console.log(res)
        if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
        this.paramsList = res.data
      })
    }
  },
  created () {
    this._getCategoriesList()
  }

}
</script>

<style lang="less" scoped>
.el-form{
  margin-top: 20px;
  font-weight: bold;
}
</style>