<template>
  <div >
    <div class="center-bk">
      <div style="height: 10vh">
        <NavigationBar></NavigationBar>
      </div>
      <div class="center-out">
        <div class="center-top">
          <img :src="`${imgBaseUrl}${userInfo.background}`" alt="" class="center-background">
          <div class="center-avatar">
            <img :src="`${imgBaseUrl}${userInfo.avatar}`" alt="">
            <div>
              <p>{{ userInfo.username }}</p>
              <p>{{ userInfo.motto }}</p>
            </div>
            <div class="center-avatar-right">
              <button v-if="$store.state.user!=null&&userInfo.userId===$store.state.user.userId" class="center-btnInfo"
                      @click="showProfile">修改资料
              </button>
              <button v-else class="center-btnAtt">关注</button>
            </div>
          </div>
        </div>

        <div class="center-tag">
          <el-tabs @tab-click="handleClick" v-model="activeName" type="border-card">
            <el-tab-pane name="article">
              <span slot="label"><i class="el-icon-edit-outline"></i>我的文章</span>
              <router-view v-if="activeName==='article'"></router-view>
            </el-tab-pane>
            <el-tab-pane label="收藏文章" name="favorite">
              <router-view v-if="activeName==='favorite'"></router-view>
            </el-tab-pane>
            <el-tab-pane label="关注用户" name="attention">
              <router-view v-if="activeName==='attention'"></router-view>
            </el-tab-pane>
            <el-tab-pane label="粉丝" name="fans">
              <router-view v-if="activeName==='fans'"></router-view>
            </el-tab-pane>
            <el-tab-pane label="评论" name="comment">
              <router-view v-if="activeName==='comment'"></router-view>
            </el-tab-pane>
          </el-tabs>
          <div>
          </div>
        </div>
      </div>
    </div>
    <BottomBar></BottomBar>
  </div>
</template>

<script>
import NavigationBar from "@/components/user/NavigationBar";
import BottomBar from "@/components/user/BottomBar";
import {getInfoById} from "@/api";

export default {
  name: "Center",
  components: {BottomBar, NavigationBar},
  data() {
    return {
      activeName: '',
      basePath: '',
      userInfo: {}
    }
  },
  methods: {
    init() {
      const currentPath = this.$route.path
      this.basePath = '/center/' + this.$route.params.userId + '/'
      this.activeName = currentPath.substring(currentPath.lastIndexOf('/') + 1)//处理tab栏激活状态
      getInfoById(this.$route.params.userId).then(res => {
        const response = res.data
        if (response.code === 200) {
          this.userInfo = response.data
        } else this.$notify.error(response.msg)
      })
    },
    handleClick(tab) {
      this.$router.replace(this.basePath + tab.name)
    },
    showProfile() {
      this.$router.push(`/profile/${this.userInfo.userId}`)
    }
  },
  mounted() {
    this.init()
  },
  watch: {
    '$route.params.userId'() {
      this.init()
    }
  }
}
</script>

<style scoped>
@import url("../../../assets/css/user/Center.css");
</style>