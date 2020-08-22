<template>
    <el-container class="home-container">
      <el-header>
        <div>
          <img src="../assets/logo.png" alt="">
          <span>后台管理系统</span>
        </div>
        <el-button type="info" @click="logout">退出</el-button>
      </el-header>
      <el-container>
        <!-- <el-aside :width="isCollapse? '':'150px'"> -->
          <!-- 菜单栏收起和展开 -->
          <!-- <div @click="menuCollapse">|||</div>
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
        </el-aside> -->
        <MenuTab :menuList="menuList"></MenuTab>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
</template>

<script>
import { getMenuList } from '../network/home'
import MenuTab from '../views/home/MenuTab'

export default {
  name: 'Hoem',
  components: {
    MenuTab
  },
  data() {
    return {
      menuList: [],
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
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    menuCollapse() {
      this.isCollapse = !this.isCollapse
    }
  },
  created (){
    getMenuList().then(res => {
      this.menuList = res.data
    })
  }
}
</script>

<style lang="less" scoped>
  .home-container{
    height: 100%;
  }
  .el-header{
    background-color: #a5ce7a;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    > div{
      display: flex;
      align-items: center;
      font-size: 20px;
      img{
        width: 50px;
        margin-right: 20px;
      }
    }
  }
  .el-aside{
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