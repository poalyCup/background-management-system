<template>
  <el-aside :width="isCollapse? '':'150px'">
    <!-- 菜单栏收起和展开 -->
    <div @click="menuCollapse">|||</div>
    <el-menu background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"
              unique-opened :collapse="isCollapse" :collapse-transition="false" router
              :default-active="$route.path">
      <el-submenu :index="item.id + '' " v-for="item in menuList" :key="item.id">
        <template slot="title">
          <i :class="iconList[item.id]"></i>
          <span>{{ item.authName }}</span>
        </template>
        <el-menu-item :index="'/'+iitem.path" v-for="iitem in item.children" :key="iitem.id">
          <template>
            <i class="el-icon-menu"></i>
            <span>{{ iitem.authName }}</span>
          </template>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  neme: 'MenuTab',
  data(){
    return {
      iconList: {
        '125': 'iconfont icon-users',
        '103': 'iconfont icon-tijikongjian',
        '101': 'iconfont icon-shangpin',
        '102': 'iconfont icon-danju',
        '145': 'iconfont icon-baobiao'
      },
      isCollapse: false
    }
  },
  props: {
    menuList: {
      typeL: Array,
      default(){
        return []
      }
    }
  },
  methods: {
    menuCollapse() {
      this.isCollapse = !this.isCollapse
    }
  },
  created() {
    
  }
}
</script>

<style lang="less" scoped>
  .el-aside{
    overflow: hidden;
    background-color: #Aee;
    > div{
      height: 24px;
      display: flex;
      justify-content: center;
      line-height: 24px;
      font-size: 12px;
      cursor: pointer;
    }
  }
  .el-menu{
    border-right: none;
  }
  .iconfont{
    margin-right: 10px;
  }
</style>