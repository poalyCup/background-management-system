<template>
  <div>
    <!-- 面包屑导航栏 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>


    <el-dialog title="物流信息" :visible.sync="DialogVissble" width="90%" @close="goback">

      <span class="tt">我知道你想看啥，就是不给！</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="goback">取 消</el-button>
        <el-button type="primary" @click="goback">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import ECharts from 'vue-echarts'
// import 'echarts/lib/chart/line'
// import 'echarts/lib/component/polar'

export default {
  name: 'Reports',
  data() {
    return {
      DialogVissble: true
    }
  },
  methods: {
    goback(){
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
  .tt{
    font-size: 30px;
    text-align: center;
  }
</style>