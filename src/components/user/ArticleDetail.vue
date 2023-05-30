<template>
  <div class="wow animate__zoomIn">
    <NavigationBar></NavigationBar>
    <Wave :article="article" :count="count"></Wave>
    <div class="detail-out">
      <div class="detail-content">
        <div v-html="article.htmlContent" class=" html-content" id="images">
        </div>
        <div class="detail-right">
          <div class="detail-userInfo wow animate__zoomInRight">
            <div class="detail-userBk">
              <img :src="`${imgBaseUrl}${userInfo.background}`" alt="">
            </div>
            <div class="detail-userAvatar">
              <img :src="`${imgBaseUrl}${userInfo.avatar}`" alt=""
                   @click="showUser(userInfo.userId)">
            </div>
            <div class="detail-userName">
              <p>{{ userInfo.username }}</p>
              <p>{{ userInfo.motto }}</p>
            </div>
          </div>
          <div class="similar-recommend wow animate__zoomInRight">
            <p>推荐文章</p>
            <div v-if="recommend.length===0" class="empty">
              <img src="../../assets/images/empty.png" alt="">
              <span>暂无相关推荐~</span>
            </div>
            <div v-else>
              <div class="recommend-item" v-for="item of recommend">
                <div @click="showDetail(item.id)">
                  <img :src="`${imgBaseUrl}${item.cover}`" alt="">
                </div>
                <p @click="showDetail(item.id)">{{ item.title }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <BottomBar></BottomBar>
  </div>
</template>

<script>
import NavigationBar from "@/components/user/NavigationBar";
import request from "@/api/request";
import Wave from "@/components/user/Wave";
import {WOW} from "wowjs";
import BottomBar from "@/components/user/BottomBar";
import Viewer from 'viewerjs';
import 'viewerjs/dist/viewer.css';
import {getArticleList, getRecommendArticle, showArticleDetail} from "@/api";

export default {
  name: "ArticleDetail",
  components: {BottomBar, Wave, NavigationBar},
  data() {
    return {
      article: Object,
      count: 0,
      userInfo: {},
      recommend: []
    }
  },
  methods: {
    init() {
      showArticleDetail(this.$route.params.id).then(res => {
        const result = res.data
        if (result.code === 200) {
          this.article = result.data.article
          this.userInfo = this.article.userInfoDto
          this.count = result.data.count
          getRecommendArticle(this.article.tag, this.article.id).then(res => {
            const response = res.data
            if (response.code === 200) this.recommend = response.data
            else this.$notify.error(response.msg)
          })
        } else this.$notify.error("请求出错!")
      })
    },
    showUser(userId) {
      this.$router.push("/center/" + userId)
    },
    showDetail(id) {
      this.$router.push(`/article/${id}`)
    }
  },
  mounted() {
    this.init()
    new WOW().init()

  },
  watch: {
    article() {
      this.$nextTick(() => {//必须要这一不
        const viewer = new Viewer(document.getElementById('images'), {});
      })
    },
    '$route.params.id'() {
      // this.$router.go(1)//刷新当前组件，不复用组件，防止图片不能放大
      this.init()
    }
  }
}
</script>

<style scoped>
@import url("../../assets/css/user/ArticleDetail.css");
</style>