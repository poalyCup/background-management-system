<template>
  <div>
    <!-- 面包屑导航栏 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="7">
          <!-- 用户搜索框 -->
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable >
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <OrderList :ordersList="orderList" @editAddress="showEditAddressDialog" @showLogistics="showLogisticsDialog"></OrderList>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum" :page-sizes="[2, 5, 10, 20]" :page-size="queryInfo.pagesize" 
        layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>

    <!-- 修改地址弹窗 -->
    <el-dialog title="申请修改收货地址" :visible.sync="editAddressDialogVisible" width="40%"
                @close="handelEditDialogClose">
      <el-form :model="addressForm" label-width="100px" :rules="addressRules" ref="editAddressFormRef">
        <el-form-item label="省市区/县" :required="true" :inline="true">
          <el-cascader v-model="addressForm.cityKeys" :options="cityData" size="medium"
                        :props="{ label: 'label', value: 'value', children: 'children', expandTrigger: 'hover'}"
                        clearable ></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" :required="true" prop="cityAddress">
          <el-input v-model="addressForm.cityAddress" placeholder=""></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editAddressDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="applyAddress">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 物流信息 -->
    <el-dialog title="物流信息" :visible.sync="showLogisticsDialogVissble" width="40%">
      <el-timeline :reverse="reverse">
        <el-timeline-item
          v-for="(activity, index) in goodsLogistics"
          :key="index"
          :timestamp="activity.time">
          {{activity.context}}
        </el-timeline-item>
      </el-timeline>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="showLogisticsDialogVissble = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { getOrdersList, getLogisticsInfo } from 'network/orders'
import CityData from 'common/city_data'

import OrderList from './OrdersList'

export default {
  name: 'Orders',
  components: {
    OrderList
  },
  data () {
    return {
      cityData: CityData,
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      total: 0,
      orderList: [],
      editAddressDialogVisible: false,
      addressForm: {
        cityKeys: [],
        cityAddress: ''
      },
      addressRules: {
        cityAddress: [
          { required: true, message: '请输入详细地址', trigger: 'blur' }
        ]
      },
      
      showLogisticsDialogVissble: false,
      goodsLogistics: [],
      reverse: false,

    }
  },
  methods: {
    //pagesize改变事件
    handleSizeChange (size) {
      // console.log(size)
      this.queryInfo.pagesize = size
      this._getOrdersList()
    },
    handleCurrentChange (currentPage) {
      // console.log(currentPage)
      this.queryInfo.pagenum = currentPage
      this._getOrdersList()
    },

    //修改地址弹窗相关方法
    showEditAddressDialog () {
      this.editAddressDialogVisible = true
    },
    applyAddress(){
      let result = false
      this.$refs.editAddressFormRef.validate(res => result = res )
      if ((this.addressForm.cityKeys.length > 0) && result){
        this.editAddressDialogVisible = false
        this.$notify({
          title: '申请成功',
          message: '申请成功！请于两小时后来查看修改后地址！',
          type: 'success'
        })
        this.handelEditDialogClose()
      } else {
        this.$message.error('请输入真确的地址信息！')
      }
    },
    handelEditDialogClose(){
      this.addressForm.cityKeys = []
      this.$refs.editAddressFormRef.resetFields()
    },

    //物流信息弹窗相关方法
    showLogisticsDialog() {
      getLogisticsInfo().then(res => {
        if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
        this.goodsLogistics = res.data
        this.showLogisticsDialogVissble = true
      })
    },


    //网络请求方法
    _getOrdersList () {
      getOrdersList(this.queryInfo).then(res => {
        if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
        this.total = res.data.total
        this.orderList = res.data.goods
      })
    }
  },
  
  created (){
    this._getOrdersList()
    
  }
}
</script>

<style lang="less" scoped>
  .el-cascader{
    width: 100%;
  }
</style>