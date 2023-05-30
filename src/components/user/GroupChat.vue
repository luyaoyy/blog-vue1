<template>
  <div>
    <div class="chat-out">
      <div style="height: 10vh">
        <NavigationBar></NavigationBar>
      </div>
      <div class="chat-content wow animate__zoomIn">
        <div class="chat-left">
          <p>在线用户({{ users.length }})</p>
          <ul>
            <li v-for="item of users">
              <span>&nbsp;</span>
              <span v-if="user.username===item">{{ item }}(我)</span>
              <span v-else>{{ item }}</span>
            </li>
          </ul>
        </div>
        <div class="chat-right">
          <p class="chat-right-title">聊天窗口</p>
          <div class="chat-right-content">
            <div v-for="word of words" style="padding: 0 2%">
              <div v-if="user.userId===word.userInfo.userId">
                <div class="chat-user-myself">
                  <p>{{ word.wordCreateTime }}</p>
                  <p>{{ word.userInfo.username }}</p>
                  <img :src="`${imgBaseUrl}${word.userInfo.avatar}`" alt="">
                </div>
                <div style="text-align: right">
                  <p class="word-content-myself">{{ word.content }}</p>
                </div>
              </div>
              <div v-else style="padding: 0 2%">
                <div class="chat-user-other">
                  <img :src="`${imgBaseUrl}${word.userInfo.avatar}`" alt="">
                  <p>{{ word.userInfo.username }}</p>
                  <p>{{ word.wordCreateTime }}</p>
                </div>
                <div class="pop-with-border">
                  <p class="word-content-other">{{ word.content }}</p>
                </div>
              </div>
            </div>
          </div>
          <div style="text-align: center;margin-top: 2%">
            <el-input v-model="content" style="width: 70%" placeholder="说点什么吧~"
                      @keydown.enter.native="send"></el-input>
            <el-button type="primary" @click="send">发送</el-button>
          </div>
        </div>
      </div>
    </div>
    <BottomBar></BottomBar>
  </div>
</template>

<script>
import NavigationBar from "@/components/user/NavigationBar";
import BottomBar from "@/components/user/BottomBar";
import {getWordList} from "@/api";
import {WOW} from "wowjs";
import user from "@/router/user";
import {interceptors} from "axios";

export default {
  name: "GroupChat",
  components: {BottomBar, NavigationBar},
  data() {
    return {
      users: [],
      user: {},
      content: '',
      words: []
    }
  },
  methods: {
    location() {
      const element = document.getElementsByClassName("chat-right-content")[0];
      element.scrollTop = element.scrollHeight;
    },
    dateTransform(date) {
      const Y = date.getFullYear() + '-';
      const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      const D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
      const h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':';
      const m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes());
      return Y + M + D + h + m
    },
    initMessage() {
      getWordList().then(res => {
        const response = res.data
        if (response.code === 200) this.words = response.data
        else this.$notify.error(response.msg)
      })
    },
    initWebSocket() {
      const wsUrl = `${this.wsBaseUrl}/chat/${this.$store.state.user.username}`
      this.websocket = new WebSocket(wsUrl);
      this.websocket.onmessage = this.websocketOnMessage;
      this.websocket.onopen = this.websocketOnOpen;
      this.websocket.onerror = this.websocketOnerror;
      this.websocket.onclose = this.websocketClose;
    },
    send() {
      if (this.content != null && this.content.trim() !== '') {
        const word = {
          system: false,
          userInfo: this.user,
          message: this.content
        }
        this.content = null
        this.websocket.send(JSON.stringify(word))
      } else this.$notify.error("请输入消息内容噢~")
    },
    websocketOnMessage(res) {
      const response = JSON.parse(res.data)
      if (response.system) {
        this.users = response.message
      } else {
        const word = response.message
        const date = this.dateTransform(new Date(word.wordCreateTime))
        word.wordCreateTime = date
        this.words.push(word)
      }
    },
    websocketOnOpen() {
      this.$notify.success(`${this.user.username}驾到，统统闪开~`)
    },
    websocketOnerror() {
    },
    websocketClose() {
      this.$notify.warning("你已和聊天室断开连接了噢~")
    }
  },
  mounted() {
    this.user = this.$store.state.user
    this.user.createTime = new Date(this.user.createTime)//防止对象转换错误，前端的user日期是字符串，要转回后端对象对应的date类型
    this.initWebSocket()
    this.initMessage()
  },
  watch: {
    user() {
      this.$nextTick(() => {
        new WOW().init()
      })
    },
    words() {
      this.$nextTick(() => {
        this.location()
      })
    }
  },
  beforeDestroy() {
    this.websocketClose()
  }
}
</script>

<style scoped>
@import url("../../assets/css/user/GroupChat.css");
</style>