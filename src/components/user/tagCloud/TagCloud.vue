<template>
  <div>
    <div class="tags-out">
      <div style="height: 10vh">
        <NavigationBar></NavigationBar>
      </div>
      <div class="tags-content">
        <p style="font-size: 30px; text-align: center;">标签分类({{ tags.length }})</p>
        <el-divider></el-divider>
        <div id="wordCloud" class="tag-cloud"></div>
        <div class="tags-count">
          <ul>
            <li v-for="tag of tags">
              <span>{{ tag.name }}</span>
              <span>({{ tag.value }})</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <BottomBar></BottomBar>
  </div>
</template>

<script>
import * as echarts from 'echarts/core';
import {TitleComponent} from 'echarts/components';

echarts.use([TitleComponent]);
import 'echarts-wordcloud';
import {getTags} from "@/api";
import NavigationBar from "@/components/user/NavigationBar";
import BottomBar from "@/components/user/BottomBar";

export default {
  name: 'TagCloud',
  components: {BottomBar, NavigationBar},
  data() {
    return {
      tags: []
    };
  },
  methods: {
    init() {
      getTags().then(res => {
        const response = res.data
        if (response.code === 200) this.tags = response.data.map(item => {
          const pojo = JSON.parse(item)
          const tag = {
            name: pojo.tag,
            value: pojo.count
          }
          return tag
        })
        else this.$notify.error(response.msg)
      })
    },
    initChart() {
      const myChart = echarts.init(document.getElementById('wordCloud'));
      const option = {
        // backgroundColor: "rgba(190,131,246,1)",
        series: [
          {
            type: "wordCloud",
            //用来调整词之间的距离
            gridSize: 30,
            rotationRange: [0, 0],
            //用来调整字的大小范围
            sizeRange: [18, 40],
            // maskImage: maskImage,
            //随机生成字体颜色
            textStyle: {
              color: () => {
                return (
                    "rgb(" +
                    Math.round(Math.random() * 255) +
                    ", " +
                    Math.round(Math.random() * 255) +
                    ", " +
                    Math.round(Math.random() * 255) +
                    ")"
                );
              }
            },
            //位置相关设置
            left: "center",
            top: "center",
            right: null,
            bottom: null,
            width: "100%",
            height: "100%",
            //数据
            data: this.tags
          }
        ]
      };
      myChart.setOption(option);
      // 点击某个字
      myChart.on('click', (params) => {
        this.$router.push("/list/" + params.data.name)
      });
    }
  },
  mounted() {
    this.init()
  },
  watch: {
    tags() {
      this.$nextTick(() => {
        this.initChart()//初始化标签云图
      })
    }
  }

}

</script>
<style scoped>
@import url("../../../assets/css/user/TagCloud.css");
</style>