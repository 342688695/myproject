<template>
<div class="reply-wrapper">
   <input type="text" class="reply-input" :placeholder="placeholder" v-model="msg" id="txt"><i class="iconfont icon-dianzan" :class="praisestatus?'active':''"></i><span class="send-message" @click="send">发送</span>
</div>
</template>

<script>
export default {
  data () {
    return {
      msg: '',
      parentId: ''
    }
  },
  props: {
    praisestatus: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: '请输入内容'
    }
  },
  methods: {
    send () {
      this.$emit('send', this.msg, this.parentId)
      this.msg = ''
    },
    focus () {
      document.getElementById('txt').focus()
    },
    blur () {
      document.getElementById('txt').blur()
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../common/less/variables.less';
.reply-wrapper{
  width: 100%;
  height: 49px;
  background: @index-devider;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  padding: 0 10px;
  box-sizing: border-box;
  .reply-input{
    flex: 1;
    height: 35px;
    line-height: 35px;
    font-size: 14px;
    background: @background;
    border-radius: 20px;
    text-indent: 1em;
  }
  .icon-dianzan{
    flex: 0 0 30px;
    font-size: 25px;
    color:@index-word;
    padding: 0 2px;
    text-align: center;
    &.active{
      color:@orange
    }
  }
  .send-message{
    flex: 0 0 70px;
    font-size: 14px;
    background: @yellow;
    border-radius: 20px;
    width: 70px;
    height: 35px;
    line-height: 35px;
    text-align: center;
  }
}
</style>

