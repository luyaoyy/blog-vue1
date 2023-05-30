<template>
  <div>
    <div style="display: flex;flex-wrap: wrap;width: 100%;">
      <div class="div wow animate__zoomIn" v-for="article of articles" @click="showDetail(article.id)">
        <img :src="`${imgBaseUrl}${article.cover}`" alt="" class="img">
        <div class="info">
          <h2>{{ article.title }}</h2>
          <p>
            <span>发表于:{{ article.createTime }}</span>|
            <span>修改于:{{ article.updateTime }}</span>
          </p>
          <p>
            <span>{{ article.tag.replaceAll("|"," ") }} | </span>
            <span>{{ article.type }}</span>
          </p>
          <p>
            <span>作者:{{ article.userInfoDto.username }}</span>
          </p>
        </div>
      </div>
    </div>
    <div style="text-align: center">
      <el-pagination
          background
          layout="prev, pager, next"
          @current-change="handleNext"
          :page-size="9"
          :current-page="$store.state.current"
          :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>

import {WOW} from 'wowjs'
import {getArticleList} from "@/api";

export default {
  name: "Article",
  data() {
    return {
      articles: [],
      total: 0
    }
  },
  methods: {
    init(current) {
      getArticleList(current).then(res => {
        const response = res.data
        if (response.code === 200) {
          this.articles = response.data.records
          this.total = response.data.total
        } else {
          this.$notify.error("请求出错!")
        }
      })
    },
    showDetail(id) {
      this.$router.push(`/article/${id}`)
    },
    handleNext(current) {
      this.$store.state.current=current
      this.init(current)
    }
  },
  mounted() {
    this.$watch('articles', ()=>{//只监听一次
      this.$nextTick(() => {
        new WOW().init()
      })
    });
    this.init(this.$store.state.current)
  }
}
</script>

<style scoped>
@import url("../../assets/css/user/Article.css");

</style>
