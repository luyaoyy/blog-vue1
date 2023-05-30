<template>
  <div class="header">
    <div class="inner-header flex">
      <h1>{{ article.title }}</h1>
      <p>
        <span>发表于:{{ article.createTime }} </span>
        <span>修改于:{{ article.updateTime }}</span>
      </p>
      <p>
        <span>标签:{{ article.tag }}</span>
        <span style="font-size: 18px">分类:{{ article.type }}</span>
      </p>
      <p>
        <span>作者:{{ author }}</span>
        <span style="font-size: 18px">阅读次数:{{ count }}</span>
      </p>
    </div>

    <div>
      <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
           viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
        <defs>
          <path id="gentle-wave"
                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"/>
        </defs>
        <g class="parallax">
          <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7"/>
          <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)"/>
          <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)"/>
          <use xlink:href="#gentle-wave" x="48" y="7" fill="#fff"/>
        </g>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "Wave",
  data() {
    return {
      author: ''
    }
  },
  methods: {},
  mounted() {
  },
  props: ['article', 'count'],
  watch: {
    article(val) {//避免报错 传入的article初始化读到底层的 article.userInfoDto.username 属性会控制台报错
      this.$nextTick(() => {
        this.author = val.userInfoDto.username
      })
    }
  }
}
</script>

<style scoped>
@import url("../../assets/css/user/Wave.css");

</style>