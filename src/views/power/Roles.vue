<template>
  <div>
    <!-- 面包屑导航栏 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <RolesList></RolesList>

    
  </div>
</template>

<script>
import RolesList from './RolesList'

export default {
  name: 'Roles',
  components: {
    RolesList
  }

}
</script>

<style lang="less" scoped>

</style>