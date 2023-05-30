<template>
  <div>
    <div class="type-out">
      <div style="height: 10vh">
        <NavigationBar></NavigationBar>
      </div>
      <div class="type-content">
        <div class="type-top">
          <p>归档分类({{typeAndCount.length}})</p>
          <hr>
          <div class="type-show">
            <div class="type-card" v-for="(type,index) of typeAndCount" :key="type.type"
                 @click="$router.replace(`/type/${type.type}/list`)" :class="{'card-active':type.type===$route.params.typeName}">
              <div class="type-card-left">{{ type.type }}</div>
              <div class="type-card-right">
                {{ type.count }}
              </div>
            </div>
          </div>
        </div>
        <div class="type-article">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <BottomBar></BottomBar>
  </div>
</template>

<script>
import {getTypes} from "@/api";
import BottomBar from "@/components/user/BottomBar";
import NavigationBar from "@/components/user/NavigationBar";

export default {
  name: "Type",
  components: {NavigationBar, BottomBar},
  data() {
    return {
      typeAndCount: [],
    }
  },
  methods: {
    init() {
      getTypes().then(res => {
        const response = res.data
        if (response.code === 200) {
          this.typeAndCount = response.data.map(item => {
            return JSON.parse(item)
          })
          if (this.$route.params.typeName == null) this.$router.replace(`/type/${this.typeAndCount[0].type}/list`)
        } else this.$notify.error(response.msg)
      })
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style scoped>


@import url("../../../assets/css/user/Type.css");
</style>