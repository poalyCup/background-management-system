<template>
  <div>
     <!-- 面包屑导航栏 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="7">
          <!-- 用户搜索框 -->
          <el-input placeholder="请输入内容" clearable v-model="queryInfo.query" @clear="sreachGoods">
            <el-button slot="append" icon="el-icon-search" @click="sreachGoods"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="danger" @click="addGoods" disabled>添加商品</el-button>
        </el-col>
      </el-row>
      <GoodsList :goodsList="goodsList"></GoodsList>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum" :page-sizes="[10, 20, 26]" :page-size="queryInfo.pagesize" 
        layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getGoodsList } from 'network/goods'

import GoodsList from './GoodsList'

export default {
  name: 'Goods',
  data () {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      goodsList: [],
      total: 0
    }
  },
  components: {
    GoodsList
  },
  methods: {
    addGoods () {
      this.$router.push('/goods/add')
      this.$message.error('该功能还在开发中，敬请期待！')
    },
    //pagesize改变事件
    handleSizeChange (size) {
      // console.log(size)
      this.queryInfo.pagesize = size
      this._getGoodsList()
    },
    handleCurrentChange (currentPage) {
      // console.log(currentPage)
      this.queryInfo.pagenum = currentPage
      this._getGoodsList()
    },
    //搜索商品
    sreachGoods(){
      this._getGoodsList()
    },

    //网络请求
    _getGoodsList () {
      getGoodsList(this.queryInfo).then(res => {
        if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
        this.total = res.data.total
        this.goodsList = res.data.goods
      })
    }
  },
  created () {
    this._getGoodsList()
  }
}
</script>

<style lang="less" scoped>
  .el-pagination{ 
    margin-top: 10px;
  }
</style>