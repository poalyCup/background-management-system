<template>
  <el-card class="box-card">
    <el-table :data="rolesList" border style="width: 100%">
      <el-table-column type="expand">
        <template v-slot="space">
          <RolesPowerDetail :childrenList="space.row.children"></RolesPowerDetail>
          <!-- <pre>{{space.row}}</pre> -->
        </template>
      </el-table-column>
      <el-table-column label="#" type="index"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" > </el-table-column>
      <el-table-column prop="roleDesc" label="角色描述" > </el-table-column>
      <el-table-column prop="level" label="操作" >
        <template>
            <el-button type="primary" icon="el-icon-edit" size="small">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" size="small">删除</el-button>
            <el-button type="warning" icon="el-icon-setting" size="small">分配角色</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import { getRolesList } from '../../network/power'


export default {
  name: 'RolesList',
  components: {
    // RolesPowerDetail
  },
  data() {
    return {
      rolesList: []
    }
  },
  created() {
    getRolesList().then(res => {
      console.log(res)
      if (res.meta.status !== 200) return this.$message.error('角色列表数据获取失败！')
      this.rolesList = res.data
    })
  }
}
</script>

<style>

</style>