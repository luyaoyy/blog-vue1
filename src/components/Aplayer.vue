<template>
  <div>
    <div id="player" style="z-index: 9999"></div>
  </div>
</template>

<script>
import APlayer from 'aplayer'
import {getMusicListById} from "@/api";

export default {
  name: "Aplayer",
  data() {
    return {}
  },
  methods: {},
  mounted() {
    this.$store.state.aplayer = new APlayer({
      container: document.getElementById('player'),
      listFolded: false,
      fixed: true,
      autoplay: true,
      audio: [...this.$store.state.musicList]
    })
  },
  watch: {
    '$store.state.user.userId': {//监控userId，也就等同于监控user，用于用户登出登入时更新音乐列表
      handler(newVal) {
        setTimeout(() => {
          const userId = newVal
          if (userId == null) {
            getMusicListById().then(res => {
              const response = res.data
              if (response.code === 200) {
                this.$store.state.aplayer.list.clear()
                response.data.forEach(item => {
                  const music = {
                    title: item.title,
                    artist: item.artist,
                    pic: this.imgBaseUrl + item.pic,
                    url: this.imgBaseUrl + item.url,
                  }
                  item.pic = this.imgBaseUrl + item.pic
                  item.url = this.imgBaseUrl + item.url
                  this.$store.state.aplayer.list.add(music)
                })
              } else this.$notify.error(response.msg)
            })
          } else {
            getMusicListById(userId).then(res => {
              const response = res.data
              if (response.code === 200) {
                this.$store.state.aplayer.list.clear()
                response.data.forEach(item => {
                  const music = {
                    title: item.title,
                    artist: item.artist,
                    pic: this.imgBaseUrl + item.pic,
                    url: this.imgBaseUrl + item.url,
                  }
                  item.pic = this.imgBaseUrl + item.pic
                  item.url = this.imgBaseUrl + item.url
                  this.$store.state.aplayer.list.add(music)
                })
              } else this.$notify.error(response.msg)
            })
          }
        })
      },
      immediate: true
    },
  }
}
</script>

<style scoped>

</style>