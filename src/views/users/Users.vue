<template>
  <div>
    <!-- 面包屑导航栏 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb> 
    <!-- 用户列表单 -->
    <user-list @addDialogVisible="addUserDialogVisibleChange" @editDialogVisible="editUserDialogVisibleChange"
                @deleteUser="deleteUser"></user-list>
    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="addUserDialogVisible" width="40%" center
                @close="addUserDialogCancel">
      <!-- 添加用户的表单 -->
      <el-form ref="addUserFormRef" label-width="80px" :model="addUserForm" class="add-user-form"
              :rules="addUserRule"  :required="true">
        <el-form-item label="用户名称" prop="username"><el-input v-model="addUserForm.username"></el-input></el-form-item>
        <el-form-item label="用户密码" prop="password"><el-input type="password" v-model="addUserForm.password"></el-input></el-form-item>
        <el-form-item label="邮箱" prop="email"><el-input v-model="addUserForm.email"></el-input></el-form-item>
        <el-form-item label="手机号" prop="mobile"><el-input v-model="addUserForm.mobile"></el-input></el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addUserDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑用户信息对话框 -->
    <el-dialog title="修改信息" :visible.sync="editUserDialogVisible" width="40%" center
                @close="editUserDialogCancel">
      <!-- 添加用户的表单 -->
      <el-form ref="editUserFormRef" label-width="80px" :model="editUserInfo" class="add-user-form"
              :rules="addUserRule"  :required="true">
        <el-form-item label="用户名称"><el-input v-model="editUserInfo.username" disabled></el-input></el-form-item>
        <el-form-item label="邮箱" prop="email"><el-input v-model="editUserInfo.email"></el-input></el-form-item>
        <el-form-item label="手机号" prop="mobile"><el-input v-model="editUserInfo.mobile"></el-input></el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editUserDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveUserInfo">确 定</el-button>
      </span>
    </el-dialog>


  </div>
</template>

<script>
import { addNewUser, getUserInfoById, saveUserInfoById, deleteUserById } from '../../network/home.js'
import UserList from './UserList'
// 防抖函数导入
// import { debouce } from '../../common/util'


export default {
  name: 'Users',
  components: {
    UserList
  },
  data() {
    //邮箱验证规则
    const checkEmail = (rule, value, cb) => {
      const regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (regEmail.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法的邮箱！'))
    }
    //手机号验证规则
    const checkMobile = (rule, value, cb) => {
      const regMobile = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]{8}$)/
      if (regMobile.test(value)) {
        return cb()
      }
      cb(new Error('请输入正确的手机号！'))
    }
    return {
      addUserDialogVisible: false,
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      addUserRule: {
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 12, message: '长度在 5 到 13 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur'}
        ],
        mobile: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur'}
        ]
      },
      editUserDialogVisible: false,
      editUserInfo: {}
    }
  },
  methods: {
    //
    addUserDialogVisibleChange (bool) {
      this.addUserDialogVisible = Boolean(bool)
    },
    //添加用户弹窗关闭事件
    addUserDialogCancel () {
      setTimeout(() => {
        this.$refs.addUserFormRef.resetFields()
      },300)
    },
    //添加新用户
    addUser () {
      this.$refs.addUserFormRef.validate(res => {
        if (res) {
          addNewUser(this.addUserForm).then(result => {
            if (result.meta.status !== 201) {
              return this.$message.error('用户添加失败，请重试！')
            }
          })
        }
      })
    },
    //
    editUserDialogVisibleChange (bool) {
      getUserInfoById(bool.uid).then(res => {
        if (res.meta.status !== 200) {
          return this.$message.error('获取用户信息失败！')
        }
        this.editUserInfo = res.data
        this.editUserDialogVisible = Boolean(bool.bool)
      })
    },
    //修改用户信息对话框关闭事件
    editUserDialogCancel () {
      this.$refs.editUserFormRef.resetFields()
    },
    //修改用户信息确认事件
    saveUserInfo () {
      saveUserInfoById(this.editUserInfo).then(res => {
        if (res.meta.status !== 200) {
          return this.$message.error('用户信息修改失败！')
        }
        this.editUserDialogCancel()
      })
    },
    //根据id删除用户
    deleteUser (id) {
      deleteUserById(id).then(res => {
        if (res.meta.status !== 200) return this.$message.error('用户删除失败，请重试！')
        // this.$router.go(0)
        this.$message.success('用户删除成功！')
      })
    }
  }
}
</script>

<style lange="less" scoped>
  .el-pagination{
    margin-top: 15px;
  }
</style>