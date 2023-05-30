<template>
  <div class="sysMusic-content">
    <el-card class="sysMusic-card wow animate__zoomIn" v-for="music of sysMusic" >
        <img :src="`${imgBaseUrl}${music.pic}`" alt="">
      <div class="sysMusic-info">
        <span>《{{music.title}}》</span>
        <div style="margin: 3% 0">
          <span>{{ music.artist }}</span>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import {getSysMusicList} from "@/api";
import {WOW} from "wowjs";
export default {
  name: "SystemMusic",
  data() {
    return {
      sysMusic:[]
    }
  },
  methods: {
    init(){
      getSysMusicList().then(res=>{
        const response=res.data
        if (response.code===200) this.sysMusic=response.data
        else this.$notify.error(response.msg)
      })
    }
  },
  mounted() {
    this.init()
  },
  watch: {
    sysMusic() {
      this.$nextTick(() => {
        new WOW().init()
      })
    }
  }
}
</script>

<style scoped>
@import url("../../../assets/css/user/SystemMusic.css");
</style>