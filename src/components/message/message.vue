<template>
  <div class="message-wrapper" ref="wrapper">
    <ul class="messgae-ul">
        <li v-for="item in messageList" class="message-li">
          <img :src="item.img" class="message-img">
          <div class="message-div">
            <div class="message-word">
              <p class="message-title">{{item.title}}<span class="message-time" v-show="item.tipTime">{{timeFormat(item.tipTime)}}</span></p>
              <p class="message-subtitle">{{item.tipContent}}</p>
            </div>
            <i class="iconfont icon-return-copy" v-show="!item.tipContent"></i>
          </div>
        </li>
    </ul>
  <Ctitle title="信息"></Ctitle>
  <Cfooter></Cfooter>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import Cfooter from '@/components/commonFooter/commonFooter'
import { getMessageDetail } from '../../api/message.js'
import {mapGetters, mapActions} from 'vuex'
import { getLogin } from '../../api/login.js'
import Ctitle from '../../base/title/title.vue'
export default {
  data () {
    return {
      messageList: []
    }
  },
  created () {
    this._getMessageDetail()
  },
  activated () {
    this.$nextTick(() => {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.wrapper, {
          click: true
        })
      } else {
        this.scroll.refresh()
      }
    })
  },
  computed: {
    ...mapGetters([
      'userid',
      'token',
      'username',
      'password'
    ])
  },
  methods: {
    ...mapActions([
      'saveToken'
    ]),
    timeFormat (time) {
      let returnYear = new Date(time).getFullYear()
      let returnMonth = new Date(time).getMonth() + 1
      if (returnMonth < 10) {
        returnMonth = '0' + returnMonth
      }
      let returnDate = new Date(time).getDate() + 1
      if (returnDate < 10) {
        returnDate = '0' + returnDate
      }
      let returnHours = new Date(time).getHours()
      if (returnHours < 10) {
        returnHours = '0' + returnHours
      }
      let returnMinutes = new Date(time).getMinutes()
      if (returnMinutes < 10) {
        returnMinutes = '0' + returnMinutes
      }
      let today = new Date().getTime()
      let messageTime = new Date(time).getTime()
      let downTime = today - messageTime
      if (downTime > 86400000) {
        // 超过24小时
        return `${returnYear + '-' + returnMonth + '-' + returnDate}`
      } else {
        return `今天${returnHours + ':' + returnMinutes}`
      }
    },
    _getMessageDetail () {
      getMessageDetail(this.userid, this.token).then((res) => {
        console.log(res)
        if (res.status === 'error' && res.returnCode === '10003') {
          getLogin(this.username, this.password).then((logres) => {
            this.saveToken(logres.data.baseData.token)
            this._getMessageDetail()
          })
        }
        if (res.returnCode === '00000' && res.status === 'success') {
          this.messageList = res.data.list
        }
      })
    }
  },
  components: {
    Cfooter,
    Ctitle
  }
}
</script>
<style lang="less" scoped>
@import '../../common/less/z.less';
@import '../../common/less/variables';
.message-wrapper{
    width: 100%;
    position: fixed;
    top: 45px;
    bottom: 50px;
    .messgae-ul{
      overflow: hidden;
      margin-left: 10px;
       .message-li{
      height: 70px;
      display: flex;
      align-items: center;
      .message-img{
        flex: 0 0 50px;
        width: 50px;
        height: 50px;
        margin-right: 10px;
      }
      .message-div{
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid @background;
        .message-word{
          width: 100%;
          .message-title{
          font-size: 14px;
          .clearfix();
          .message-time{
            .fr();
            color: @iconbg;
            margin-right: 10px;
          }
          }
          .message-subtitle{
            font-size: 12px;
            color: @iconbg;
          }
        }
        .icon-return-copy{
          flex: 0 0 30px;
          font-size: 20px;
        }
      }
    }
  }
  
}
</style>
