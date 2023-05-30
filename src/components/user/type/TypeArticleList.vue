<template>
  <div>
    <div v-if="articles.length===0" class="empty">
      <img src="../../../assets/images/empty.png" alt="">
      <p>啥也没有嗷,快来发布第一篇吧~~</p>
    </div>
    <div v-else class="type-article-item" v-for="article of articles">
      <div class="type-article-item-left">
        <h2 @click="showArticleDetail(article.id)">{{ article.title }}</h2>
        <p>{{ article.blogDescribe }}</p>
        <div class="type-article-item-left-user">
          <img :src="`${imgBaseUrl}${article.userInfoDto.avatar}`" alt="" title="查看Ta的首页"
               @click="showUserDetail(article.userInfoDto.userId)">
          <span>{{ article.userInfoDto.username }}</span>
          <span>发布于:{{ article.createTime }}</span>
        </div>
      </div>
      <div class="type-article-item-right" @click="showArticleDetail(article.id)">
        <img :src="`${imgBaseUrl}${article.cover}`" alt="" title="查看博客详情">
      </div>
    </div>
  </div>
</template>

<script>
import {getArticleByType} from "@/api";

export default {
  name: "ArticleList",
  data() {
    return {
      articles: []
    }
  },
  methods: {
    init(type) {
      getArticleByType(type).then(res => {
        const response = res.data
        if (response.code === 200) {
          this.articles = response.data
        } else this.$notify.error(response.msg)
      })
    },
    showArticleDetail(id) {
      this.$router.push(`/article/${id}`)
    },
    showUserDetail(userId) {
      this.$router.push("/center/" + userId)
    },
  },
  mounted() {
    this.init(this.$route.params.typeName)
  },
  watch: {
    '$route.params.typeName'(newVal) {
      this.init(newVal)
    }
  }
}
</script>

<style scoped>
@import url("../../../assets/css/user/TypeArticleList.css");
</style>