<template>
  <div class="title-wrapper">
      <div v-show="haveBack" class="icon-wrapper" @click="back"><i class="iconfont icon-fanhui"></i></div>
      <div class="title-name">{{this.title}}</div><div v-show="haveDel" class="icon-wrapper2"><i class="iconfont icon-shanchu"></i></div><div v-show="haveMore" class="icon-wrapper2"><i class="iconfont icon-gengduo"></i></div><div v-show="haveShare" class="icon-wrapper2"><i class="iconfont icon-fenxiang1"></i></div><div v-show="haveSet" class="icon-wrapper2"><i class="iconfont icon-shezhi"></i></div><div v-show="haveWord" class="icon-wrapper2 word-size" @click="clickRight">{{this.word}}</div>
  </div>
</template>

<script>
export default {
  props: {
    word: {
      type: String,
      default: '标题'
    },
    title: {
      type: String,
      default: '标题'
    },
    haveWord: {
      type: Boolean,
      default: false
    },
    haveBack: {
      type: Boolean,
      default: false
    },
    haveDel: {
      type: Boolean,
      default: false
    },
    haveMore: {
      type: Boolean,
      default: false
    },
    haveShare: {
      type: Boolean,
      default: false
    },
    haveSet: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    back () {
      this.$emit('back')
    },
    clickRight () {
      this.$emit('right')
    }
  }
}
</script>
<style lang="less" scoped>
  .title-wrapper{
    width: 100%;
    position: fixed;
    top: 0;
    overflow: hidden;
    background: #ffc023;
    height: 45px;
    line-height: 45px;
    text-align: center;
    box-sizing: border-box;
    color: #fff;
    .icon-wrapper{
      width: 45px;
      height: 45px;
      position: absolute;
      top: 0;
      left: 0;
    }
    .icon-wrapper2{
      width: 45px;
      height: 45px;
      position: absolute;
      top: 0;
      right: 0;
    }
    .word-size{
      font-size: 18px;
      right: 5px;
    }
    .icon-fanhui,.icon-shanchu,.icon-gengduo,.icon-fenxiang1,.icon-shezhi{
      font-size: 22px;
    }
    .title-name{
      font-size: 20px;
    }
  }
</style>
