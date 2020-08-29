<template>
  <div>
    <div v-if="paramsList.length > 0">
      <el-table :data="paramsList">
        <el-table-column type="expand">
          <template v-slot="space">
            <pre>{{space.row}}</pre>
          </template>
        </el-table-column>
        <el-table-column :label="labelName"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="space">
              <el-button type="primary" icon="el-icon-edit" size="small">编辑名称</el-button>
              <el-button type="danger" icon="el-icon-delete" size="small">删除分类</el-button>
            </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 如果没有数据 -->
    <div v-else>
      <h5>暂无数据</h5>
    </div>
  </div>
  
</template>

<script>
export default {
  name: 'CateParamsList',
  props: {
    activeName: { type: String, default: 'many' },
    paramsList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    labelName () {
      this.activeName === 'many' ? '参数名称' : '属性名称'
    }
  }
}
</script>

<style lang="less" scoped>

</style>