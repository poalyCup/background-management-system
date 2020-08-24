<template>
  <div>
    <!-- 当不是第三层权限列时 -->
    <template v-if="childrenList[0].children">
      <el-row  v-for="(item, index) in childrenList" :key="item.id" class="bottom-border">
          <el-col :span="6" >
            <el-tag>{{item.authName}}</el-tag>
            <i class="el-icon-caret-right"></i>
          </el-col>
          <el-col v-if="item.children" :span="18">
            <RolesPowerDetail :childrenList="item.children"></RolesPowerDetail>
          </el-col>
      </el-row>
    </template>
    <!-- <el-row  v-for="(item, index) in childrenList" :key="item.id" class="bottom-border">
      <template v-if="item.children">
        <el-col :span="5" >
          <el-tag>{{item.authName}}</el-tag>
          <i class="el-icon-caret-right"></i>
        </el-col>
        <el-col v-if="item.children" :span="19">
          <RolesPowerDetail :childrenList="item.children"></RolesPowerDetail>
        </el-col>
      </template>

      <template v-if="!item.children">
          <el-tag>{{item.authName}}</el-tag>
      </template>
    </el-row> -->
    <template v-if="!childrenList[0].children">
      <el-tag v-for="(item, index) in childrenList" :key="item.id" type="warning" class="last-col">
        {{item.authName}}
      </el-tag>
    </template>
  </div>
</template>

<script>
export default {
  name: 'RolesPowerDetail',
  components: {
    // RolesPowerDetail
  },
  props: {
    childrenList: {
      type: Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style lang="less" scoped>
  
  .el-row{
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.26);
  }
  .el-row:last-child{
    border: none;
  }
  .el-col{
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .last-col{
    margin: 10px 10px;
  }
</style>