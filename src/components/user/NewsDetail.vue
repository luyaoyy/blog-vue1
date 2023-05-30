<template>
  <div>
    <div class="news-detail-out">
      <div style="height: 8vh">
        <NavigationBar></NavigationBar>
      </div>
      <div class="news-detail-content">
        <div class="news-content-title">
          <img :src="`${imgBaseUrl}${newsInfo.cover}`" alt="">
          <p>{{newsInfo.title}}</p>
        </div>
        <div v-html="newsInfo.content" class="news-detail-info">

        </div>
        <div class="news-publish-time">
          发布于:{{newsInfo.createTime}}
        </div>
      </div>
    </div>
    <BottomBar></BottomBar>
  </div>
</template>

<script>
import {getDetailById} from "@/api";
import BottomBar from "@/components/user/BottomBar";
import NavigationBar from "@/components/user/NavigationBar";

export default {
  name: "NewsDetail",
  components: {NavigationBar, BottomBar},
  data() {
    return {
      newsInfo: {}
    }
  },
  methods: {
    init() {
      getDetailById(this.$route.params.newsId).then(res => {
        const response = res.data
        if (response.code === 200) this.newsInfo = response.data
        else this.$notify.error(response.msg)
      })
    }
  },
  mounted() {
    this.init()
  },
}
</script>

<style scoped>
@import url("../../assets/css/user/NewsDetail");
</style>