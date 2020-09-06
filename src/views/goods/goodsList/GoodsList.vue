<template>
  <div>
    <el-table :data="goodsList" border >
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column prop="goods_name" label="商品名称" width="550"></el-table-column>
      <el-table-column prop="goods_price" label="商品价格"></el-table-column>
      <el-table-column prop="goods_number" label="商品数量"></el-table-column>
      <el-table-column prop="add_time" label="创建时间">
        <template v-slot="space">
          {{ space.row.add_time | dateFormat }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="space">
          <el-tooltip effect="dark" content="编辑商品" placement="top" :enterable="false">
            <el-button size="mini" type="primary" icon="el-icon-edit" disabled></el-button>
          </el-tooltip>
          <el-tooltip effect="dark" content="删除商品" placement="top" :enterable="false">
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="deleteGoods(space.row)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'GoodsList',
  props: {
    goodsList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    deleteGoods (data) {
      this.$emit('deleteGoodsClick', data)
    }
  },
  
}
</script>

<style>

</style>