<template>
  <div>
    <!-- 面包屑导航栏 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-alert title="添加商品" type="info" center show-icon :closable="false"></el-alert>
      <el-steps :space="150" :active="activeIndex - 0" finish-status="success" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <el-button @click="test">test</el-button>
      <el-form :required="true" :rules="addFormRules" :model="addGoodsForm" status-icon>
        <el-tabs v-model="activeIndex" tab-position="left" stretch>
          <!-- 基本信息 -->
          <el-tab-pane label="基本信息" name="0" >
            <el-form-item label="商品分类" label-width="300" :required="true">
              <el-cascader v-model="cateKeys" :options="categoriesList" size="medium"
                        :props="{label: 'cat_name', value: 'cat_id', children: 'children', expandTrigger: 'hover'}"
                        clearable ></el-cascader>
            </el-form-item>
            <el-form-item prop="goods_name" label="商品名称">
              <el-input placeholder="请输入商品名称" v-model="addGoodsForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item prop="goods_price" label="商品价格" :required="true">
              <el-input placeholder="请输入商品价格" v-model.number="addGoodsForm.goods_price"></el-input>
            </el-form-item>
            <el-form-item prop="goods_weight" label="商品重量" :required="true">
              <el-input placeholder="请输入商品重量" v-model.number="addGoodsForm.goods_weight"></el-input>
            </el-form-item>
            <el-form-item prop="goods_number" label="商品数量" :required="true">
              <el-input placeholder="请输入商品数量" v-model.number="addGoodsForm.goods_number"></el-input>
            </el-form-item>
          </el-tab-pane>
          <!-- 商品属性 -->
          <el-tab-pane label="商品属性" name="1">
            
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="2">角色管理</el-tab-pane>
          <el-tab-pane label="商品内容" name="3">定时任务补偿</el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getCategoriesList, getAttrList } from 'network/goods'

export default {
  name: "AddGoods",
  data() {
    var checkNum = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('该项不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            callback();
          }
        }, 1000);
      };
    return {
      activeIndex: "0",
      categoriesList: [],
      cateKeys: [],
      addFormRules: {
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          // { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }a
        ],
        goods_price: [
          { validator: checkNum, trigger: 'blur' }
        ],
        goods_weight: [
          { validator: checkNum, trigger: 'blur' }
        ],
        goods_number: [
          { validator: checkNum, trigger: 'blur' }
        ]
      },
      addGoodsForm: {
        goods_name: '',
        goods_cat: [],
        goods_price: null,
        goods_number: null,
        goods_weight: null,
        goods_intriduce: '',
        pics: {},
        attrs: {}
      }
    }
  },
  methods: {
    test () {
      getAttrList().then(res => {
        console.log(res)
      })
    },

    //网络请求方法
    _getCateList(){
      getCategoriesList().then(res => {
        console.log(res)
        if (res.meta.status !== 200) return this.$message.error(res.mete.msg)
        this.categoriesList = res.data
      })
    }
  },
  created() {
    this._getCateList()
  },
};
</script>

<style lang="less" scoped>
.el-steps {
  margin: 20px auto;
  display: flex;
  justify-content: center;
}
</style>