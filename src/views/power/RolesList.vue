<template>
  <el-card class="box-card">
    <el-table :data="rolesList" border style="width: 100%">
      <el-table-column type="expand">
        <template v-slot="space">
          <RolesPowerDetail :childrenList="space.row.children"></RolesPowerDetail>
          <!-- <pre>{{space.row}}</pre> -->
        </template>
      </el-table-column>
      <el-table-column label="#" type="index"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" > </el-table-column>
      <el-table-column prop="roleDesc" label="角色描述" > </el-table-column>
      <el-table-column prop="level" label="操作" >
        <template v-slot="space">
            <el-button type="primary" icon="el-icon-edit" size="small">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" size="small">删除</el-button>
            <el-button type="warning" icon="el-icon-setting" size="small" @click="roleAssignments(space.row)">分配角色</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 角色分配弹窗 -->
    <!-- 还是在这里获取数据修改数据方便 -->
    <el-dialog title="权限分配" :visible.sync="rightsAssignmentsDialogVisible" width="30%" >
      <el-tree :data="rightsTree" :props="rightsTreeProps" show-checkbox default-expand-all node-key="id"
                :default-checked-keys="rightsTreeDefaulCheckedKeys" ref="rightsTreeRef"></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="rightsAssignmentsDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="setRights">确 定</el-button>
      </span>
    </el-dialog>

    
  </el-card>
</template>

<script>
import { getRolesList, getRightsTree, setRoleRights } from 'network/power'


export default {
  name: 'RolesList',
  data() {
    return {
      rolesList: [],
      rightsAssignmentsDialogVisible: false,
      rightsTree: [],
      rightsTreeProps: {
        label: 'authName',
        children: 'children'
      },
      rightsTreeDefaulCheckedKeys: [],
      //将要被更新权限的角色ID
      roleId: ''
    }
  },
  methods: {
    //分配角色按钮点击事件
    roleAssignments (roles) {
      this.roleId = roles.id
      getRightsTree().then(res => {
        if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
        this.rightsTree = res.data
        
        //获取该角色下拥有的三级权限的id数组
        this.rightsTreeDefaulCheckedKeys = []
        this.getRightsDefaultKeys(roles, this.rightsTreeDefaulCheckedKeys)

        this.rightsAssignmentsDialogVisible = true
      })
    },
    //更新分配后的角色权限
    setRights () {
      const keys = [
        ...this.$refs.rightsTreeRef.getCheckedKeys(),
        ...this.$refs.rightsTreeRef.getHalfCheckedKeys()
      ]
      
      setRoleRights(this.roleId, keys.join(',')).then(res => {
        if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
        getRolesList()
        this.rightsAssignmentsDialogVisible = false
      })
    },
    //通过递归获取三级权限id数组
    getRightsDefaultKeys (node, arr) {
      if (!node.children) return arr.push(node.id)
      node.children.forEach(item => {
        this.getRightsDefaultKeys(item, arr)
      })
    }
  },
  created() {
    getRolesList().then(res => {
      if (res.meta.status !== 200) return this.$message.error('角色列表数据获取失败！')
      this.rolesList = res.data
    })
  }
}
</script>

<style>

</style>