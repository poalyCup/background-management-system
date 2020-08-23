<template>
  <el-card>
    <el-row :gutter="20">
      <el-col :span="7">
        <!-- 用户搜索框 -->
        <el-input placeholder="请输入内容" v-model="currentQuery" @change="currentQueryChanged" clearable >
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="addUser">添加用户</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="userList"
      border
      style="width: 100%">
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column prop="username" label="姓名"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column prop="role_name" label="角色"></el-table-column>
      <el-table-column label="状态" width="80">
        <!-- 使用插槽自定义状态栏 -->
        <template v-slot="space">
          <el-switch v-model="space.row.mg_state" @change="changeMgState(space.row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column  prop="" label="操作">
        <template v-slot="space">
          <el-tooltip effect="dark" content="编辑" placement="top" :enterable="false">
            <el-button type="primary" icon="el-icon-edit" size="small" @click="editUser(space.row.id)"></el-button>
          </el-tooltip>
          <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
            <el-button type="danger" icon="el-icon-delete" size="small" @click="deleteUser(space.row.id)"></el-button>
          </el-tooltip>
          <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
            <el-button type="warning" icon="el-icon-setting" size="small"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum" :page-sizes="[2, 5, 10, 20]" :page-size="queryInfo.pagesize" 
      layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
  </el-card>
</template>

<script>
import { getUsersList, changeUserState } from '../../network/home.js'


export default {
  name: 'UserList',
  data() {
    return {
      currentQuery: '',
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      total: 0,
      userList: [],
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
        ]
      }
    }
  },
  methods: {
    //获取用户列表事件
    _getUserList(query = this.queryInfo){
      getUsersList(query).then(res => {
        console.log(res)
        if (res.meta.status !== 200) return this.$message.error('用户列表获取失败！')
        this.userList = res.data.users
        this.total = res.data.total
      })
    },
    //改变状态事件
    changeMgState (userInfo) {
      // console.log(userInfo)
      changeUserState(userInfo).then(res => {
        if (res.meta.status !== 200) {
          return this.$notify({
                  title: '错误',
                  message: '用户状态修改失败！',
                  type: 'error'
                });
        }
        this.$notify({
          title: '成功',
          message: '用户状态修改成功！',
          type: 'success'
        });
      })
    },
    //pagesize改变事件
    handleSizeChange (size) {
      // console.log(size)
      this.queryInfo.pagesize = size
    },
    handleCurrentChange (currentPage) {
      // console.log(currentPage)
      this.queryInfo.pagenum = currentPage
    },
    //添加用户按钮事件
    addUser(){
      //发送事件
      this.$emit('addDialogVisible', 1)
    },
    //编辑用户信息按钮事件
    editUser (id) {
      this.$emit('editDialogVisible', {bool: 1, uid: id})
    },
    //删除用户
    deleteUser (id) {
      this.$emit('deleteUser', id)
      setTimeout(() => {
        this._getUserList(this.queryInfo)
      }, 800);
    },
    //搜搜框内容改变事件
    currentQueryChanged () {
      this.queryInfo.query = this.currentQuery
    }
  },
  created () {
    this._getUserList(this.queryInfo)
  },
  watch: {
    queryInfo: {
      handler : function (val) {
        this._getUserList(val)
      },
      deep: true
    }
  }
}
</script>

<style lang="less" scoped>
.el-pagination{
    margin-top: 15px;
  }
</style>