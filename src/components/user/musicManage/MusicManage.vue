<template>
  <div class="music-manage-out">
    <div style="height: 5vh">
      <NavigationBar></NavigationBar>
    </div>
    <div class="music-manage-content">
      <el-container>
        <el-aside width="15%">
          <el-menu :default-active="$router.currentRoute.path"
                   class="el-menu-vertical-demo"
                   router>
            <el-menu-item index="/musicManage/systemMusic">
              <i class="el-icon-menu"></i>
              <span slot="title">站主推荐</span>
            </el-menu-item>
            <el-menu-item index="/musicManage/myMusic">
              <i class="el-icon-mic"></i>
              <span slot="title">我的音乐</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </div>
    <BottomBar></BottomBar>
  </div>
</template>

<script>
import NavigationBar from "@/components/user/NavigationBar";
import BottomBar from "@/components/user/BottomBar";

export default {
  name: "MusicManage",
  components: {BottomBar, NavigationBar},
  data() {
    return {}
  },
  methods: {},
  mounted() {
  },
}
</script>

<style scoped>
@import url("../../../assets/css/user/MusicManage.css");
</style>