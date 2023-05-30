<template>
  <div class="publish-out">
    <div style="height: 5vh">
      <NavigationBar></NavigationBar>
    </div>
    <div class="publish-top">
      <div class="publish-top-d1">
        <span>发布博客:</span>
        <el-input v-model="blog.title" placeholder="请输入4~8长度的博客标题" class="publish-title"></el-input>
        <el-input v-model="blog.blogDescribe" placeholder="请输入4~10长度的博客描述" class="publish-desc"></el-input>
        <el-button type="primary" size="small" @click="handlePublish">发布</el-button>
      </div>
      <div class="publish-top-d3">
        <p>请选择博客封面:</p>
        <div class="publish-cover">
          <el-upload action="auto"
                     list-type="picture-card"
                     :limit="1"
                     ref="upload"
                     :http-request="sub"
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
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </div>
      </div>
      <div class="publish-top-d2">
        <p>请选择标签:</p>
        <div class="publish-tag">
          <el-tabs type="border-card">
            <el-tab-pane v-for="(item,index) of types" :label="item.type">
              <el-checkbox-group v-model="pickTags[index]" :max="3">
                <el-checkbox-button v-for="(t) of item.tags" :label="t"></el-checkbox-button>
              </el-checkbox-group>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
    <div style="width: 77.5%;margin: 0 auto;">
      <mavon-editor v-model="blog.content" :ishljs="true" code-style="monokai-sublime" ref="md" @imgAdd="uploadImg"
                    style="min-height: 80vh;z-index: 99"/>
    </div>
    <BottomBar></BottomBar>
  </div>
</template>
<script>


import {getTypesAndTags, publishBlog, uploadBlogImg} from "@/api";
import NavigationBar from "@/components/user/NavigationBar";
import BottomBar from "@/components/user/BottomBar";

export default {
  name: "PublishBlog",
  components: {BottomBar, NavigationBar},
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      cover: '',//存用户上传博客封面的存放路径
      blog: {},//博客全部信息
      pickTags: [],//存用户已选择的博客标签
      types: []//存放可选博客分类和分类中的全部标签
    }
  },
  mounted() {
    getTypesAndTags().then(res => {//获取数据库已有的博客类别和对应标签
      const response = res.data
      if (response.code === 200) {
        const len = response.data.length
        for (let i = 0; i < len; i++) {
          this.pickTags.push([])
        }
        response.data.forEach(item => {
          const one = {}
          let type = Object.keys(item)[0]
          let value = Object.values(item)[0]
          one.type = type
          one.tags = value
          this.types.push(one)
        })
      }
    })
  },
  methods: {
    auto() {
      this.$refs.upload.submit()
    },
    sub(file) {//自动上传回调方法
      const img = {file: file.file}
      console.log(file)
      uploadBlogImg(img).then(res => {
        const response = res.data
        if (response.code === 200) {
          this.cover = response.data
        } else this.$notify.error(response.msg)
      })
    },
    handlePublish() {
      const pick = []//存放用户选择不同类型中的全部标签
      const type = []//存放用户选择的不同类
      this.pickTags.forEach((item, index) => {
        if (item.length > 0) type.push(this.types[index].type)
        item.forEach(i => {
          pick.push(i)
        })
      })
      const blog = {
        userId: this.$store.state.user.userId,
        title: this.blog.title,
        htmlContent: this.$refs.md.d_render,
        mdContent: this.$refs.md.d_value,
        blogDescribe: this.blog.blogDescribe,
        tag: pick.join('|'),//标签数组转换成字符串存入数据库
        type: type.join('|'),//类别数组转换字符串存入数据库
        cover: this.cover,
        createTime: new Date().getTime(),
      }
      publishBlog(blog).then(res => {
        const response = res.data
        if (response.code === 200) {
          this.$notify.success(response.msg)
          this.$router.back()
        } else {
          this.$notify.error(response.msg)
        }
      })
    },
    uploadImg(pos, $file) {
      const file = {file: $file}
      uploadBlogImg(file).then(res => {
        const response = res.data
        if (response.code === 200) {
          const url = this.imgBaseUrl + response.data
          this.$refs.md.$img2Url(pos, url);
        } else this.$notify.error(response.msg)
      })
    },
    handleRemove(file) {
      const fileList = this.$refs.upload.fileList
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  },
  watch: {
    tag(newVal, oldVal) {
      if (newVal.length > 3) {
        this.$notify.error("最多选择3个标签!")
        this.tag = oldVal
      }
    }
  }
};
</script>

<style scoped>
@import url("../../assets/css/user/PublishBlog.css");
</style>

