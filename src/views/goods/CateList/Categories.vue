<template>
  <div>
    <!-- 面包屑导航栏 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>

    <CategoriesList @deleteCateClick="deleteDialogOpen" @editCateClick="editDiagloOpen"
                    @addCateClick="addDialogOpen"></CategoriesList>

    <!-- 编辑分类名称弹窗 -->
    <el-dialog title="编辑分类" :visible.sync="editCateDialogVisible" width="30%" @close="editDialogClose">
      <!-- <span>确定删除【{{inSettingCateData.cat_name}}】这个分类吗</span> -->
      <el-form :model="editCateInfo" :rules="editRules" :required="true" ref="editFormRef">
        <el-form-item label="分类名称" prop="cat_name" >
          <el-input v-model="editCateInfo.cat_name" :placeholder="editCateInfo.cat_name" clearable ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editCateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveCateById">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 删除分类弹窗 -->
    <el-dialog title="删除分类" :visible.sync="deleteCateDialogVisible" width="30%" >
      <span>确定删除【{{inSettingCateData.cat_name}}】这个分类吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteCateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteCateById">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 添加分类弹窗 -->
    <el-dialog title="删除分类" :visible.sync="addCateDialogVisible" width="30%" @close="addCateDialogClose">
      <el-form :model="addCateInfo" :rules="addRules" ref="addCateRef">
        <el-form-item label="分类名称" prop="cat_name"><el-input v-model="addCateInfo.cat_name" clearable></el-input></el-form-item>
        <el-form-item label="父级分类">
          <el-cascader v-model="cateLevelKeys" :options="twoLevelsCateList"
                      :props="{label: 'cat_name', value: 'cat_id', children: 'children', checkStrictly: true}"
                      clearable ></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import CategoriesList from './CategoriesList'
import { deleteCateByCatId, getCateInfoById, editCateInfoById, getTwoLevelsCateList, addCate } from 'network/goods'
import Bus from 'common/bus'

export default {
  name: 'Categories',
  data() {
    return {
      inSettingCateData: {},
      deleteCateDialogVisible: false,
      editCateDialogVisible: false,
      editCateInfo: {},
      editRules: {
        cat_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ]
      },
      addCateDialogVisible: false,
      addCateInfo: {
        cat_pid: '',
        cat_name: '',
        cat_level: ''
      },
      addRules: {
        cat_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ]
      },
      twoLevelsCateList: [],
      cateLevelKeys: []
    }
  },
  methods: {
    //删除按钮点击事件
    deleteDialogOpen(data) {
      this.inSettingCateData = data
      this.deleteCateDialogVisible = true
    },
    //删除弹窗确认事件
    deleteCateById(){
      deleteCateByCatId(this.inSettingCateData.cat_id).then(res => {
        if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
        this.$notify({
          title: '成功',
          message: '分类删除成功！',
          type: 'success'
        })
        this.deleteCateDialogVisible = false
        Bus.$emit('cateUpdate')
      })
    },
    //编辑按钮点击事件
    editDiagloOpen (cat_id) {
      getCateInfoById(cat_id).then(res => {
        if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
        this.editCateInfo = res.data

        this.editCateDialogVisible = true
      })
    },
    //编辑弹窗关闭事件
    editDialogClose () {
      this.$refs.editFormRef.resetFields()
    },
    //编辑弹窗确认按钮点击事件
    saveCateById () {
      const self = this
      this.$refs.editFormRef.validate(res => {
        if (res) {
          editCateInfoById(self.editCateInfo).then(result => {
            if (result.meta.status !== 200) return this.$message.error('修改失败！')
          })
        }
      })
    },
    //添加分类按钮点击事件
    addDialogOpen () {
      getTwoLevelsCateList().then(res => {
        if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
        this.twoLevelsCateList = res.data
        this.addCateDialogVisible = true
      })
    },
    //添加分类窗口确认按钮
    addCate () {
      if (this.cateLevelKeys.length > 0){
        this.addCateInfo.cat_pid = this.cateLevelKeys[this.cateLevelKeys.length - 1]
        this.addCateInfo.cat_level = this.cateLevelKeys.length
      }else{
        this.addCateInfo.cat_pid = 0
        this.addCateInfo.cat_level = 0
      }
      this.$refs.addCateRef.validate(res => {
        if (res) {
            addCate(this.addCateInfo).then(result => {
              if (result.meta.status !== 200) return this.$message.error(result.meta.msg)
              Bus.$emit('cateUpdate')
            })
        }
      })
    },
    //添加分类窗口关闭事件
    addCateDialogClose(){
      this.$refs.addCateRef.resetFields()
    }
  },

  components: {
    CategoriesList
  }
}
</script>

<style lang="less" scoped>
.el-form-item{
  width: 100%;
  display: flex;
}
</style>