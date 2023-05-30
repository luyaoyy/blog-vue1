<template>
  <div v-loading="$store.state.uploading" element-loading-text="歌曲上传中，请稍后...">
    <p style="text-align: right">
      <el-button type="primary" size="small" @click="handleUpload">上传<i class="el-icon-upload el-icon--right"></i>
      </el-button>
    </p>
    <div class="myMusic-content">
      <el-card class="sysMusic-card wow animate__zoomIn" v-for="music of myMusic">
        <img :src="`${imgBaseUrl}${music.pic}`" alt="">
        <div class="sysMusic-info">
          <span>《{{ music.title }}》</span>
          <div style="margin: 3% 0">
            <span>{{ music.artist }}</span>
            <el-popconfirm
                @confirm="delMyMusic(music.musicId)"
                :title="`确认删除《${music.title}》吗？`">
              <button slot="reference">删除</button>
            </el-popconfirm>
          </div>
        </div>
      </el-card>
      <el-empty description="啥也没有!" v-if="myMusic.length===0" style="margin: 0 auto"></el-empty>
    </div>
    <el-drawer
        title="上传音乐"
        :visible.sync="drawer"
        :direction="direction">
      <div style="padding: 0 5%">
        <div>
          <p>请输入歌曲名称:</p>
          <el-input v-model="music.title"></el-input>
          <p>请输入歌手名称:</p>
          <el-input v-model="music.artist"></el-input>
          <p>请选择歌曲封面:</p>
          <div>
            <el-upload action=""
                       list-type="picture-card"
                       :limit="1"
                       ref="imgUpload"
                       :http-request="subImg"
                       :on-remove="handleRemove"
                       :auto-upload="true">
              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{file}">
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                <span class="el-upload-list__item-actions">
                 <span class="el-upload-list__item-preview"
                       @click="handlePictureCardPreview(file)">
                    <i class="el-icon-zoom-in"></i>
                 </span>
                 <span v-if="!disabled"
                       class="el-upload-list__item-delete"
                       @click="handleRemove">
                  <i class="el-icon-delete"></i>
                </span>
              </span>
              </div>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible" :append-to-body="true">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </div>
          <p>请选择你的音乐:</p>
          <el-upload
              drag
              multiple
              action=""
              :limit="1"
              ref="upload"
              :auto-upload="false"
              :http-request="send">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传flac/mp3文件，且不超过30MB</div>
          </el-upload>

        </div>
        <p style="margin-top: 5%">
          <el-button @click="$refs.upload.submit()">确认上传</el-button>
        </p>
      </div>
    </el-drawer>
  </div>

</template>

<script>
import {addMusic, delMyMusic, getMusicListById, getMyMusicList, uploadBlogImg, uploadMusic} from "@/api";
import {WOW} from "wowjs";

export default {
  name: "MyMusic",
  data() {
    return {
      myMusic: [],
      drawer: false,
      dialogVisible: false,
      disabled: false,
      dialogImageUrl: '',
      direction: 'ltr',
      music: {}
    }
  },
  methods: {
    init() {
      getMyMusicList(this.$store.state.user.userId).then(res => {//根据userId获取该用户音乐列表，只获取用户音乐而不获取系统音乐
        const response = res.data
        if (response.code === 200) this.myMusic = response.data
        else this.$notify.error(response.msg)
      })
    },
    delMyMusic(musicId) {
      delMyMusic(musicId).then(res => {
        const response = res.data
        if (response.code === 200) {
          this.$notify.success(response.msg)
          getMusicListById(this.$store.state.user.userId).then(res => {
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
          this.init()//重新执行
        } else this.$notify.error(response.msg)
      })
    },
    handleUpload() {
      if (this.myMusic.length < 10) {
        this.drawer = true
      } else this.$notify.error("每个用户最多拥有10首音乐!")
    },
    send(file) {
      if (this.music.title == null || this.music.title.trim() === '') {
        this.$notify.error("歌曲名不能为空!")
        return
      }
      if (this.music.artist == null || this.music.artist.trim() === '') {
        this.$notify.error("歌手不能为空!")
        return;
      }
      if (this.music.pic == null) {
        this.$notify.error("请选择歌曲封面!")
        return;
      }

      if (this.myMusic.length < 10) {
        this.drawer = false
        this.$store.state.uploading = true
        uploadMusic(file.file).then(res => {
          const response = res.data
          if (response.code === 200) {//音乐上传成功执行下面代码
            const path = response.data
            const music = {
              userId: this.$store.state.user.userId,
              title: this.music.title,
              artist: this.music.artist,
              url: path,
              pic: this.music.pic,
              isSys: 0
            }
            addMusic(music).then(res => {
              const response = res.data
              if (response.code === 200) {
                getMusicListById(this.$store.state.user.userId).then(res => {
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
                this.init()
              } else this.$notify.error(response.msg)
              this.$store.state.uploading = false
            })
          } else {
            this.$notify.error(response.msg)
            this.$store.state.uploading = false
          }
        })
      } else this.$notify.error("每个用户最多拥有10首音乐!")
    },
    subImg(file) {//自动上传回调方法
      const img = {file: file.file}
      uploadBlogImg(img).then(res => {
        const response = res.data
        if (response.code === 200) {
          this.music.pic = response.data
        } else this.$notify.error(response.msg)
      })
    },
    handleRemove(file) {
      const fileList = this.$refs.imgUpload.fileList
      this.$refs.imgUpload.fileList.splice(fileList.indexOf(file), 1)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  },
  mounted() {
    this.init()
  },
  watch: {
    myMusic() {
      this.$nextTick(() => {
        new WOW().init()
      })
    }
  }
}
</script>

<style scoped>
@import url("../../../assets/css/user/SystemMusic.css");

/deep/ .el-drawer__header {
  font-size: 25px;
}
</style>