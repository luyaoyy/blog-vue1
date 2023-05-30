<template>
  <div>
    <p class="hot-title">热门文章推荐</p>
    <div style="padding: 0 3%">
      <el-carousel :interval="5000" type="card">
        <el-carousel-item v-for="article in articleList" class="card-item" style="border-radius: 10px"
                          @click.native="showDetail(article.id)">
          <img :src="`${imgBaseUrl}${article.cover}`">
          <div class="hot-info">
            <h1>{{ article.title }}</h1>
            <p>{{ article.blogDescribe }}</p>
            <p>作者:{{ article.userInfoDto.username }}</p>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import {getHotArticleList} from "@/api";

export default {
  name: "HotArticle",
  data() {
    return {
      articleList: []
    }
  },
  methods: {
    showDetail(id) {
      this.$router.push(`/article/${id}`)
    }
  },
  mounted() {
    getHotArticleList().then(res => {
      const data = res.data
      if (data.code === 200) {
        this.articleList = data.data
      } else this.$notify("获取热点博客失败:" + data.msg)
    })
  },
}
</script>

<style scoped>
@import url("../../assets/css/user/HotArticle.css");
</style>