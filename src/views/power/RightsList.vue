<template>
  <el-card class="box-card">
    <el-table :data="rightsList" border style="width: 100%">
      <el-table-column label="#" type="index"></el-table-column>
      <el-table-column prop="authName" label="权限名称" > </el-table-column>
      <el-table-column prop="path" label="权限路径" > </el-table-column>
      <el-table-column prop="level" label="权限等级" >
        <template v-slot="space">
          <el-tag v-if="space.row.level == 0">一级权限</el-tag>
          <el-tag type="success" v-if="space.row.level == 1">二级权限</el-tag>
          <el-tag type="danger" v-if="space.row.level == 2">三级权限</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import { getRightsList } from 'network/power'

export default {
  name: 'RightsList',
  data() {
    return {
      rightsList: []
    }
  },
  created() {
    getRightsList().then(res => {
      console.log(res)
      if (res.meta.status !== 200) return this.$message.error('权限列表信息获取失败！')
      this.rightsList = res.data
    })
  }
}
</script>

<style lang="less" scoped>

</style>