<template>
  <div>
    <!-- 面包屑导航栏 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <div id="main" style="width: 800px;height:450px;"></div>
    </el-card>


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
  // import echarts from 'echarts'
  import { getReportData } from 'network/report'
  import _ from 'lodash'

export default {
  name: 'Reports',
  data() {
    return {
      DialogVissble: false,
      optionsL: {
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ]
      }
      }
    },
  methods: {
    goback(){
      // this.$router.go(-1)
      this.DialogVissble = false
    }
  },
  mounted(){
    var myChart = echarts.init(document.getElementById('main'))

    getReportData().then( res => {
      if(res.meta.status == 200){
        myChart.setOption(_.merge(res.data, this.optionsL))
      }
    })

  }
}
</script>

<style lang="less" scoped>
  .tt{
    font-size: 30px;
    text-align: center;
  }
</style>