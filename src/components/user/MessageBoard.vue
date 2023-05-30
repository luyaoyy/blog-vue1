<template>
  <div>
    <div class="board-out">
      <div style="height: 10vh">
        <NavigationBar></NavigationBar>
      </div>
      <div class="board-content">
        <el-timeline>
          <el-timeline-item v-for="message of messages" :key="message.messageId"
                            :timestamp="`${message.messageCreateTime}`" placement="top">
            <el-card class="message-content wow animate__zoomIn">
              <div class="board-userInfo">
                <img :src="`${imgBaseUrl}${message.userInfoDto.avatar}`" alt="">
                <p>
                  {{ message.userInfoDto.username }}
                </p>
              </div>
              <div>
                <p>
                  {{ message.messageContent }}
                </p>
                <button v-if="($store.state.user!=null&&message.userInfoDto.userId===$store.state.user.userId)"
                        @click="deleteMessage">删除
                </button>
              </div>
            </el-card>
          </el-timeline-item>
        </el-timeline>
        <div style="text-align: center">
          <el-pagination
              background
              layout="prev, pager, next"
              @current-change="handleNext"
              :page-size="4"
              :total="total">
          </el-pagination>
        </div>
        <div class="board-action">
          <button @click="showDialog">
            <div class="svg-wrapper-1">
              <div class="svg-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path fill="currentColor"
                        d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path>
                </svg>
              </div>
            </div>
            <span>Send</span>
          </button>
        </div>
      </div>
    </div>
    <BottomBar></BottomBar>
    <el-dialog
        :visible.sync="dialogVisible"
        @close="message=''"
        width="30%">
      <div class="message-send">
        <div class="group">
          <input required="" type="text" class="input" v-model="message">
          <span class="highlight"></span>
          <span class="bar"></span>
          <label>留下想说的话吧</label>
        </div>
        <button @click="send">send</button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import NavigationBar from "@/components/user/NavigationBar";
import BottomBar from "@/components/user/BottomBar";
import {WOW} from 'wowjs'
import {getMessageList, sendMessage} from "@/api";

export default {
  name: "MessageBoard",
  components: {BottomBar, NavigationBar},
  data() {
    return {
      messages: [],
      message: '',
      total: 0,
      dialogVisible: false
    }
  },
  methods: {
    init(current) {
      getMessageList(current).then(res => {
        const response = res.data
        if (response.code === 200) {
          this.messages = response.data.records
          this.total = response.data.total
        } else {
          this.$notify.error(response.msg)
        }
      })
    },
    handleNext(current) {
      this.init(current)
    },
    showDialog() {
      if (this.$store.state.user == null) this.$notify.error("请登入后留言!")
      else this.dialogVisible = true
    },
    send() {
      const message = {
        userId: this.$store.state.user.userId,
        messageContent: this.message,
      }
      sendMessage(message).then(res => {
        const response = res.data
        console.log(response)
        if (response.code === 200) {
          this.$notify.success("留言成功!")
          this.dialogVisible = false
          this.init(1)
        } else this.$notify.error(response.msg)
      })
    },
    deleteMessage() {
      this.$notify.warning("说出去的话咋能撤回呢~")
    }
  },
  mounted() {
    this.init(1)
  },
  watch: {
    messages() {
      this.$nextTick(() => {
        new WOW().init()
      })
    }
  }
}
</script>

<style scoped>
@import url('../../assets/css/user/MessageBoard.css');
</style>