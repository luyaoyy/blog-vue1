<template>
  <div class="container">
    <NavigationBar></NavigationBar>
    <div class="s bk">
      <p class="wow animate__zoomIn">{{ phrase }}</p>
    </div>
    <div class="s father" style="background-color: #f9b1b1">
      <div class="out">
        <div class="left">
          <div class="webInfo wow animate__zoomInLeft">
            <img src="../../assets/images/a.png" alt="" style="width: 80px;height: 80px;border-radius: 50%">
            <p>luyys</p>
            <div class="info-title">
              <div class="title-item">文章</div>
              <div class="title-item">标签</div>
              <div class="title-item">分类</div>
            </div>
            <div class="info-number">
              <div class="number-item">49</div>
              <div class="number-item">58</div>
              <div class="number-item">8</div>
            </div>
            <button @click="$router.push('/chat')">前往小屋
              <div class="star-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="25" height="25">
                  <path fill="#fd1853" d="M427.313,88.686c-47.803-47.803-125.213-47.803-173.016,0l-17.087,17.087l-17.087-17.087
    c-47.803-47.803-125.213-47.803-173.016,0c-47.803,47.803-47.803,125.213,0,173.016l190.103,190.103
    c4.88,4.88,11.316,7.322,17.752,7.322c6.435,0,13.871-2.442,18.751-7.322l190.103-190.103
    C475.116,213.899,475.116,136.489,427.313,88.686z"></path>
                </svg>
              </div>
              <div class="star-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20">
                  <path fill="#fd1853" d="M427.313,88.686c-47.803-47.803-125.213-47.803-173.016,0l-17.087,17.087l-17.087-17.087
    c-47.803-47.803-125.213-47.803-173.016,0c-47.803,47.803-47.803,125.213,0,173.016l190.103,190.103
    c4.88,4.88,11.316,7.322,17.752,7.322c6.435,0,13.871-2.442,18.751-7.322l190.103-190.103
    C475.116,213.899,475.116,136.489,427.313,88.686z"></path>
                </svg>

              </div>
              <div class="star-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="9" height="9">
                  <path fill="#fd1853" d="M427.313,88.686c-47.803-47.803-125.213-47.803-173.016,0l-17.087,17.087l-17.087-17.087
    c-47.803-47.803-125.213-47.803-173.016,0c-47.803,47.803-47.803,125.213,0,173.016l190.103,190.103
    c4.88,4.88,11.316,7.322,17.752,7.322c6.435,0,13.871-2.442,18.751-7.322l190.103-190.103
    C475.116,213.899,475.116,136.489,427.313,88.686z"></path>
                </svg>

              </div>
              <div class="star-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="10" height="10">
                  <path fill="#fd1853" d="M427.313,88.686c-47.803-47.803-125.213-47.803-173.016,0l-17.087,17.087l-17.087-17.087
    c-47.803-47.803-125.213-47.803-173.016,0c-47.803,47.803-47.803,125.213,0,173.016l190.103,190.103
    c4.88,4.88,11.316,7.322,17.752,7.322c6.435,0,13.871-2.442,18.751-7.322l190.103-190.103
    C475.116,213.899,475.116,136.489,427.313,88.686z"></path>
                </svg>
              </div>
              <div class="star-5">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20">
                  <path fill="#fd1853" d="M427.313,88.686c-47.803-47.803-125.213-47.803-173.016,0l-17.087,17.087l-17.087-17.087
    c-47.803-47.803-125.213-47.803-173.016,0c-47.803,47.803-47.803,125.213,0,173.016l190.103,190.103
    c4.88,4.88,11.316,7.322,17.752,7.322c6.435,0,13.871-2.442,18.751-7.322l190.103-190.103
    C475.116,213.899,475.116,136.489,427.313,88.686z"></path>
                </svg>
              </div>
              <div class="star-6">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="7" height="7">
                  <path fill="#fd1853" d="M427.313,88.686c-47.803-47.803-125.213-47.803-173.016,0l-17.087,17.087l-17.087-17.087
    c-47.803-47.803-125.213-47.803-173.016,0c-47.803,47.803-47.803,125.213,0,173.016l190.103,190.103
    c4.88,4.88,11.316,7.322,17.752,7.322c6.435,0,13.871-2.442,18.751-7.322l190.103-190.103
    C475.116,213.899,475.116,136.489,427.313,88.686z"></path>
                </svg>
              </div>
            </button>
          </div>
          <div class="weather-info wow animate__zoomInLeft">
            <Weather></Weather>
          </div>
          <div class="ccc wow animate__zoomInLeft">

          </div>
        </div>
        <div class="right">
          <div class="hot wow animate__zoomIn">
            <HotArticle></HotArticle>
          </div>
          <div class="news wow animate__zoomIn">
            <News></News>
          </div>
          <div class="articles">
            <Article></Article>
          </div>
        </div>
      </div>
    </div>
    <BottomBar></BottomBar>
  </div>
</template>

<script>
import NavigationBar from "@/components/user/NavigationBar";
import Article from "@/components/user/Article";
import HotArticle from "@/components/user/HotArticle";
import Weather from "@/components/user/Weather";
import News from "@/components/user/News";
import BottomBar from "@/components/user/BottomBar";
import {getWord} from "@/api";

export default {
  name: "Home",
  data() {
    return {
      phrase: Object,
      isShow: false
    }
  },
  methods: {},
  mounted() {
    getWord().then(res => {
      this.phrase = res.data
    })
  },
  components: {
    News,
    Weather,
    HotArticle,
    NavigationBar,
    Article,
    BottomBar
  }
}
</script>

<style scoped>
@import url("../../assets/css/user/Home.css");
</style>