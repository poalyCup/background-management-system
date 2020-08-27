<template>
  <el-card>
    <el-button type="primary" @click="addCate">添加分类</el-button>
    <el-table :data="categoriesList" style="width: 100%;margin-bottom: 20px;" row-key="cat_id"
      border :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column prop="cat_name" label="分类名称"></el-table-column>
      <el-table-column label="是由有效">
        <template v-slot="space">
          <i class="el-icon-success" style="color: limegreen" v-if="!space.row.cat_deleted"></i>
          <i class="el-icon-error" style="color: red" v-else></i>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="space">
          <el-button type="primary" icon="el-icon-edit" size="small" @click="editCate(space.row.cat_id)">编辑名称</el-button>
          <el-button type="danger" icon="el-icon-delete" size="small" @click="deleteCate(space.row)">删除分类</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 翻页功能栏 -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum" :page-sizes="[2, 5, 10, 20]" :page-size="queryInfo.pagesize" 
      layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
  </el-card>
</template>

<script>
import { getCategoriesList } from 'network/goods'
import Bus from 'common/bus'

export default {
  name: 'CategoriesList',
  data() {
    return {
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 10
      },
      categoriesList: [],
      total: 0
    }
  },
  methods: {
    editCate (cat_id) {
      this.$emit('editCateClick', cat_id)
    },
    deleteCate (data) {
      this.$emit('deleteCateClick', data)
    },
    addCate () {
      this.$emit('addCateClick')
    },

    //翻页相关事件
    //pagesize改变事件
    handleSizeChange (size) {
      // console.log(size)
      this.queryInfo.pagesize = size

    },
    handleCurrentChange (currentPage) {
      // console.log(currentPage)
      this.queryInfo.pagenum = currentPage
    },


    //获取商品分类列表数据方法
    _getCategoriesList () {
      getCategoriesList(this.queryInfo).then(res => {
        if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
        this.categoriesList = res.data.result
        this.total = res.data.total
      })
    }
  },
  created() {
    const self = this
    this._getCategoriesList()
    Bus.$on("cateUpdate", () => {
      self._getCategoriesList()
    })
  },
  watch: {
    queryInfo: {
      handler: function(){
        this._getCategoriesList()
      },
      deep: true
    }
  }
}
</script>

<style lang="less" scoped>

</style>