<template>
  <div class="weather">
    <div class="card">
      <div class="container">
        <div class="cloud front">
          <span class="left-front"></span>
          <span class="right-front"></span>
        </div>
        <span class="sun sunshine"></span>
        <span class="sun"></span>
        <div class="cloud back">
          <span class="left-back"></span>
          <span class="right-back"></span>
        </div>
      </div>

      <div class="card-header">
        <span>中国<br>{{ weather.city }}</span>
        <span>{{ weather.date }}</span>
      </div>

      <span class="temp">{{ temp }}</span>

      <div class="temp-scale">
        <span>{{ time }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/api/request";

export default {
  name: "Weather",
  data() {
    return {
      weather: Object,
      temp:'',
      time: '',
      timer: Object
    }
  },
  methods: {},
  mounted() {
    request({
      url: '/weather/baidu',
      method: 'GET'
    }).then(res => {
      const data = res.data
      this.weather = data
      this.temp=data.weather[0].temp
    })
    this.timer = setInterval(() => {
      const date = new Date()
      let h = date.getHours()
      let m = date.getMinutes()
      let s = date.getSeconds()
      h = h < 10 ? "0" + h : h
      m = m < 10 ? "0" + m : m
      s = s < 10 ? "0" + s : s
      this.time = h + ":" + m + ":" + s
    }, 1000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  }
}
</script>

<style scoped>
@import url("../../assets/css/user/Weather.css");
</style>