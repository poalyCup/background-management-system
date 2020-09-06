<template>
  <div>
    <el-table :data="ordersList" border >
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column label="订单编号" prop="order_number"></el-table-column>
      <el-table-column label="订单价格" prop="order_price" width="100"></el-table-column>
      <el-table-column label="是否付款" prop="pay_status" width="100"></el-table-column>
      <el-table-column label="是否发货" prop="is_send" width="100"></el-table-column>
      <el-table-column label="下单时间">
        <template v-slot="space">
          {{ space.row.create_time | dateFormat }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template >
          <el-button type="primary" @click="editAddress"><i class="el-icon-edit"></i></el-button>
          <el-button type="success" @click="showLogistics"><i class="el-icon-s-promotion"></i></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'OrdersList',
  props: {
    ordersList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    editAddress(){
      this.$emit('editAddress')
    },
    showLogistics(){
      this.$emit('showLogistics')
    },

    test() {
      console.log(this.ordersList)
    }
  }
}
</script>

<style>

</style>