<template>
  <div>
    <p class="news-title">公告栏</p>
    <div class="news-content">
      <div class="news-left">
        <div class="news-item" v-for="(item,index) of news" :key="index">
          <p @mouseover="hover(index)" @click="showDetail">{{ item.title }}</p>
          <p>{{ item.createTime.substring(5) }}</p>
        </div>
      </div>
      <div class="news-right">
        <img :src="coverUrl" alt="" @click="showDetail" title="公告详情">
      </div>
    </div>
  </div>
</template>

<script>
import {getNewsList} from "@/api";

export default {
  name: "News",
  data() {
    return {
      news: [],
      coverUrl: '',
      newsId: 0
    }
  },
  methods: {
    init() {
      getNewsList().then(res => {
        const response = res.data
        if (response.code === 200) {
          this.news = response.data
          this.coverUrl = this.imgBaseUrl + this.news[0].cover
          this.newsId = this.news[0].newsId
        }
      })
    },
    hover(index) {
      this.coverUrl = this.imgBaseUrl + this.news[index].cover
      this.newsId = this.news[index].newsId
    },
    showDetail() {
      this.$router.push('/news/' + this.newsId)
    }
  },
  mounted() {
    this.init()
  },
}
</script>

<style scoped>
@import url("../../assets/css/user/News.css");
</style>