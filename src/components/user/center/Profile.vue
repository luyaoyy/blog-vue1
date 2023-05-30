<template>
  <div>
    <div class="profile-out">
      <div style="height: 8vh">
        <NavigationBar></NavigationBar>
      </div>
      <div class="wow animate__fadeInLeft profile-background">
        <input type="file" style="display: none" id="backgroundFile" @change="showBackground">
        <label for="backgroundFile"> <img :src="backgroundUrl" alt="" id="background"></label>
      </div>
      <div class="wow animate__fadeInLeft profile-content">
        <div class="profile-avatar">
          <input type="file" style="display: none" id="avatarFile" @change="showAvatar">
          <label for="avatarFile"> <img :src="avatarUrl" alt="" id="avatar"></label>
        </div>
        <div class="profile-guide">
          <p style="color: #ff506a">*点击头像或背景等对应信息即可更改</p>
          <p>
            <el-button type="success" size="small" @click="sub">修改</el-button>
          </p>
        </div>

        <div>
          <span class="split">&nbsp;</span>
          <span style="color: black">帐号信息</span>
          <div class="profile-info">
            <p>
              <span>角色:</span>
              <span>普通用户</span>
            </p>
            <el-divider></el-divider>
            <p>
              <span>用户状态:</span>
              <span>正常</span>
            </p>
            <el-divider></el-divider>
            <p>
              <span>注册时间:</span>
              <span>{{ user.createTime }}</span>
            </p>
            <el-divider></el-divider>
          </div>
        </div>
        <div style="margin-top: 3%">
          <span class="split">&nbsp;</span>
          <span style="color: black">基本信息</span>
          <div class="profile-base">
            <p>
              <span>用户名:</span>
              <el-input v-model="user.username" style="width: 70%"></el-input>
            </p>
            <p>
              <span>性别:</span>
              <el-radio-group v-model="user.gender">
                <el-radio-button label="1">男</el-radio-button>
                <el-radio-button label="2">女</el-radio-button>
                <el-radio-button label="0">保密</el-radio-button>
              </el-radio-group>
            </p>
            <p>
              <span>格言:</span>
              <el-input v-model="user.motto" style="width: 70%"></el-input>
            </p>
            <p>
              <span>职业:</span>
              <el-input v-model="user.career" style="width: 70%"></el-input>
            </p>
          </div>
        </div>
        <div style="margin-top: 3%;color: black">
          <span class="split">&nbsp;</span>
          <span style="color: black">帐号安全</span>
          <div>
            <p>暂不支持加密密码修改!!</p>
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
import {getAllInfoById, updateInfo} from "@/api";
import {WOW} from "wowjs";

export default {
  name: "Profile",
  components: {BottomBar, NavigationBar},
  data() {
    return {
      user: {},
      avatarUrl: '',
      backgroundUrl: '',
      avatarFile: null,
      backgroundFile: null
    }
  },
  methods: {
    init() {
      getAllInfoById(this.$route.params.userId).then(res => {
        const response = res.data
        if (response.code === 200) {
          this.user = response.data
          this.avatarUrl = this.imgBaseUrl + this.user.avatar
          this.backgroundUrl = this.imgBaseUrl + this.user.background
        } else this.$notify.error(response.msg)
      })
    },
    showAvatar() {
      let file = document.getElementById('avatarFile').files[0]
      this.avatarUrl = window.URL.createObjectURL(file)
      this.avatarFile = file
    },
    showBackground() {
      let file = document.getElementById('backgroundFile').files[0]
      this.backgroundUrl = window.URL.createObjectURL(file)
      this.backgroundFile = file
    },
    sub() {
      updateInfo(this.avatarFile, this.backgroundFile, this.user).then(res => {
        const response = res.data
        if (response.code === 200) {
          this.$store.state.user = response.data
          localStorage.setItem("user", JSON.stringify(response.data))
          this.$router.back()
          this.$notify.success(response.msg)
        } else this.$notify.error(response.msg)
      })
    }
  },
  mounted() {
    this.init()
  },
  watch:{
    user(){
      this.$nextTick(() => {
        new WOW().init()
      })
    }
  }
}
</script>

<style scoped>
@import url("../../../assets/css/user/Profile.css");
</style>