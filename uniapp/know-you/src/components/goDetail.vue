<template>
  <view @click="handleClick">
    <!--    slot这个是图片-->
    <slot></slot>
  </view>
</template>

<script>
export default {
  props: {
    list: Array,
    index: Number,
  },
  methods: {
    //父组件传递的数据设置为全局的
    handleClick() {
      // 1数据缓存下拉
      getApp().globalData.imgList = this.list;
      getApp().globalData.imgIndex = this.index;
      // 2点击跳转页面
      uni.navigateTo({
        url: "/pages/imgDetail/index"
      })

    }
  }
}
</script>

<style>
</style>
