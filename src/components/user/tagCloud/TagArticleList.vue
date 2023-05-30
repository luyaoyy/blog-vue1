<template>
  <div>
    <div>
      <div class="tag-article-top">
        <div style="height: 10vh">
          <NavigationBar></NavigationBar>
        </div>
        <div class="tag-title">{{ $route.params.tag }}</div>
      </div>
      <div style="background-color:#f9b1b1;overflow: hidden">
        <div class="tag-article-list">
          <el-timeline>
            <el-timeline-item
                v-for="article of articles"
                :key="article.id"
                placement="top"
                :timestamp="article.createTime">
              <div class="tag-article-item">
                <div class="tag-article-info">
                  <p @click="showArticleDetail(article.id)">{{ article.title }}</p>
                  <p>
                    <el-icon class="el-icon-user-solid" style="margin-right: 10px"></el-icon>
                    {{ article.userInfoDto.username }}
                  </p>
                </div>
                <div>
                  <img :src="`${imgBaseUrl}${article.cover}`" alt="" title="查看博客详情"
                       @click="showArticleDetail(article.id)">
                </div>
              </div>
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>
    </div>
    <BottomBar></BottomBar>
  </div>
</template>

<script>
import NavigationBar from "@/components/user/NavigationBar";
import {getArticleByTag} from "@/api";
import BottomBar from "@/components/user/BottomBar";

export default {
  name: "TagArticleList.",
  components: {BottomBar, NavigationBar},
  data() {
    return {
      articles: []
    }
  },
  methods: {
    init() {
      getArticleByTag(this.$route.params.tag).then(res => {
        const response = res.data
        if (response.code === 200) this.articles = response.data
        else this.$notify.error(response.msg)
      })
    },
    showArticleDetail(id) {
      this.$router.push(`/article/${id}`)
    },
  },
  mounted() {
    this.init()
  },
}
</script>

<style scoped>
@import url("../../../assets/css/user/TagArticleList.css");
</style>