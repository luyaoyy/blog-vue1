<template>
  <div class="menu-out">
    <nav id='menu'>
      <ul>
        <li>
          <router-link to="/home">
            <el-icon class="el-icon-s-home"></el-icon>
            Home
          </router-link>
        </li>
        <li><a class='dropdown-arrow' href="javascript:void(false)">文章</a>
          <ul class='sub-menus'>
            <li><router-link to="/type">归档</router-link></li>
            <li><router-link to="/tags">标签</router-link></li>
            <li><router-link to="/home">随机一篇</router-link></li>
          </ul>
        </li>
        <li><router-link to="/chat">聊天小屋</router-link></li>
        <li><router-link to="/home" class='dropdown-arrow'>休闲娱乐</router-link>
          <ul class='sub-menus'>
            <li><router-link to="/home">画廊</router-link></li>
            <li><router-link to="/musicManage">音乐管理</router-link></li>
          </ul>
        </li>
        <li>
          <router-link to="/messageBoard">
            留言板
          </router-link>
        </li>
        <li><router-link to="/home">关于站主</router-link></li>
      </ul>
    </nav>
    <div class="menu-right">
     <span>
        <el-dropdown v-if="$store.state.user==null">
        <span class="el-dropdown-link">
          <el-icon class="el-icon-user"></el-icon>
        </span>
        <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="isShow">登入</el-dropdown-item>
        <el-dropdown-item @click.native="isShowRegister">注册</el-dropdown-item>
        <el-dropdown-item>忘记密码</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown v-if="$store.state.user">
        <span class="el-dropdown-link">
          <el-avatar :src="`${imgBaseUrl}${$store.state.user.avatar}`" style=" margin-bottom: 10px;" ></el-avatar>
        </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="$router.push(`/center/${$store.state.user.userId}`)">个人中心</el-dropdown-item>
            <el-dropdown-item @click.native="logout">注销</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
     </span>
      <span>
        <el-icon class="el-icon-search"></el-icon>
      </span>
      <span>
         <button @click="$router.push('/publish')">发布</button>
      </span>
    </div>
    <LoginForm></LoginForm>
    <RegisterForm></RegisterForm>
  </div>
</template>

<script>
import LoginForm from "@/components/user/LoginForm";
import RegisterForm from "@/components/user/RegisterForm";

export default {
  name: "NavigationBar",
  data() {
    return {}
  },
  methods: {
    isShow() {
      this.$bus.$emit("isShow", true)
    },
    isShowRegister() {
      this.$bus.$emit("isShowRegister", true)
    },
    logout(){
      this.$store.state.user=null
      localStorage.removeItem("user")
      this.$notify.success("您已注销成功!")
      this.$router.push("/home")
    }
  },
  mounted() {
  },
  components: {
    RegisterForm,
    LoginForm
  }
}
</script>

<style scoped>
@import url("../../assets/css/user/NavigationBar.css");

</style>
<style>

</style>