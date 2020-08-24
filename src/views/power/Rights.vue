<template>
  <div>
    <!-- 面包屑导航栏 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <RightsList></RightsList>
  </div>
</template>

<script>
import RightsList from './RightsList'

export default {
  name: 'Rights',
  components: {
    RightsList
  }
}
</script>

<style lang="less" scoped>

</style>