<template>
  <div class="hot-key-wrapper" ref="wrapper">
    <ul>
      <loading title='正在刷新...' v-show="showRefresh"></loading>
      <li class="hot-key-li" v-for="(list,index) in hotkeyList" :key="index">
        <div class="key-img-wrapper">
          <img :src="list.headpic" class="head-portraint">
        </div>
        <div class="key-content-warpper">
          <div class="content-name">
            <h1><span class="name-style">{{list.nickname}}</span><span class="fouse" v-show="false"><i class="iconfont icon-jia"></i>关注</span><span class="nofouse" v-show="false">已关注</span></h1>
            <p class="send-msg"><span class="time-margin"><i class="iconfont icon-shijian"></i>{{list.showTime}}</span><i class="iconfont icon-qiandao1"></i>打卡{{list.seqnum}}次</p>
          </div>
          <div class="content-detail" @click="selectShare(list)">
            <span class="detail-theme">#{{list.clockintitle}}#</span>{{list.content}}
          </div>
          <div class="content-img">
            <img :src="imgList" :class="list.imgthumb.length>1?'three-imgs':'one-img'" :key="index" v-for="(imgList, index) in list.imgthumb">
          </div>
          <div class="content-icon">
            <span class="icon-span" @click="clickpraise(index)"><i class="iconfont icon-dianzan" :class="list.praisestatus==='0'?'active':''"></i>{{list.praise}}</span>
            <span class="icon-span"><i class="iconfont icon-pinglun"></i>{{list.msg}}</span>
          </div>
        </div>
      </li>
      <loading title='正在加载数据...' v-show="showFlag"></loading>
    </ul>
    <loading title='正在加载...' v-show="!this.hotkeyList.length"></loading>
     <div class="share-btn"><i class="iconfont icon-share"></i></div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import {mapGetters, mapActions, mapMutations} from 'vuex'
import { getFouceDetail } from '../../api/fouse.js'
import { setPraise } from '../../api/praise.js'
import moment from 'moment'
import Loading from '../../base/loading/loading'
import { getLogin } from '../../api/login.js'
export default {
  data () {
    return {
      dateTime: moment().format('YYYY-MM-DD HH:mm:ss'),
      hotkeyList: [],
      showFlag: false,
      showRefresh: false
    }
  },
  computed: {
    ...mapGetters([
      'baseData',
      'userid',
      'token',
      'praiseList',
      'username',
      'password'
    ])
  },
  created () {
    this._initFouceDetail()
  },
  activated () {
    this._findFoucePriase()
  },
  methods: {
    selectShare (list) {
      this.$router.push(`/shareDetail${list.id}`)
      this.setShareDetail(list)
    },
    ...mapMutations({
      setShareDetail: 'SET_SHAREDETAIL'
    }),
    ...mapActions([
      'saveToken'
    ]),
    clickpraise (index) {
      this._setPraise(index)
    },
    _initFouceDetail () {
      getFouceDetail(this.userid, this.token, this.dateTime).then((res) => {
        if (res.status === 'error' && res.returnCode === '10003') {
          getLogin(this.username, this.password).then((logres) => {
            this.saveToken(logres.data.baseData.token)
            this._initFouceDetail()
          })
        }
        if (res.returnCode === '00000' && res.status === 'success') {
          this.showRefresh = false
          this.hotkeyList = res.data.list
          this.dateTime = res.data.dateTime
        }
      })
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.wrapper, {
            click: true
          })
          this.scroll.on('touchEnd', (pos) => {
            // 下拉动作
            if (pos.y > 50) {
              this.showRefresh = true
              this.dateTime = moment().format('YYYY-MM-DD HH:mm:ss')
              this._initFouceDetail()
              this.scroll.refresh()
            }
          })
          this.scroll.on('scrollEnd', () => {
            if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
              this.showFlag = true
              this._initFouceDetail()
              this.scroll.refresh()
            }
          })
        } else {
          this.scroll.refresh()
        }
      })
    },
    _getFouceDetail () {
      getFouceDetail(this.userid, this.token, this.dateTime).then((res) => {
        if (res.returnCode === '00000' && res.status === 'success') {
          this.showRefresh = false
          this.hotkeyList = this.hotkeyList.concat(res.data.list)
          this.dateTime = res.data.dateTime
          this.scroll.refresh()
        } else {
          this.$router.push('/login')
        }
      })
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.wrapper, {
            click: true
          })
          this.scroll.on('touchEnd', (pos) => {
            // 下拉动作
            if (pos.y > 50) {
              this.showRefresh = true
              this.dateTime = moment().format('YYYY-MM-DD HH:mm:ss')
              this._initFouceDetail()
              this.scroll.refresh()
            }
          })
          this.scroll.on('scrollEnd', () => {
            if (this.scroll.y <= (this.scroll.maxScrollY + 200)) {
              this.showFlag = true
              this.dateTime = moment().format('YYYY-MM-DD HH:mm:ss')
              this._getFouceDetail()
              this.scroll.refresh()
            }
          })
        } else {
          this.scroll.refresh()
        }
      })
    },
    _setPraise (index) {
      if (this.hotkeyList[index].praisestatus === '0') {
        return
      }
      setPraise(this.userid, this.token, this.hotkeyList[index].id).then((res) => {
        if (res.returnCode === '00000' && res.status === 'success') {
          this.hotkeyList[index].praisestatus = '0'
          let parise = (parseInt(this.hotkeyList[index].praise)) + 1
          this.hotkeyList[index].praise = parise
          let msg = (parseInt(this.hotkeyList[index].msg))
          this.hotkeyList[index].msg = msg
          let id = this.hotkeyList[index].id + ''
          this.insertPraiseList({
            praise: parise,
            msg: msg,
            id: id
          })
        } else {
          this.$router.push('/login')
        }
      })
    },
    _findFoucePriase () {
      let hotKeyLength = this.hotkeyList.length
      let length = this.praiseList.length
      let count = 0
      for (let i = 0; i < hotKeyLength; i++) {
        for (let j = 0; j < length; j++) {
          if (this.hotkeyList[i].id === this.praiseList[j].id) {
            this.hotkeyList[i].praisestatus = '0'
            this.hotkeyList[i].msg = this.praiseList[j].msg
            this.hotkeyList[i].praise = this.praiseList[j].praise
            count = count + 1
            if (count === length) {
              return
            }
          }
        }
      }
    },
    ...mapActions([
      'insertPraiseList'
    ])
  },
  components: {
    Loading
  }
}
</script>

<style lang="less" scoped>
@import '../../common/less/z.less';
@import '../../common/less/variables';
.hot-key-wrapper{
  width: 100%;
  position: fixed;
  top:60px;
  bottom: 50px;
  overflow: hidden;
  .hot-key-li{
     padding: 20px 10px 0 10px;
     border-bottom: 1px solid @hotsplit;
     .clearfix();
     display: flex;
     .key-img-wrapper{
       flex: 0 0 40px;
       height: 100%;
       margin-right: 10px;
      .head-portraint{
      height: 40px;
      width: 40px;
      border-radius: 50%;
      }
     }
     .key-content-warpper{
       flex: 1;
       .content-name{
         .name-style{
           width: 80%;
           font-size: @balck;
           font-size: 15px;
           font-weight: normal;
           display: inline-block;
         }
         .fouse{
           width: 20%;
           text-align: right;
           color:@orange;
           font-size: 15px;
           display: inline-block;
           .icon-jia{
             margin-right: 6px;
           }
         }
         .nofouse{
          width: 20%;
          text-align: right;
          color: @iconbg;
          font-size: 15px;
          display: inline-block;
         }
         .send-msg{
           color:@iconbg;
           font-size: 11px;
           line-height: 20px;
           .time-margin{
             margin-right: 10px;
           }
           .icon-shijian,.icon-qiandao1{
             margin-right: 5px;
             vertical-align: middle;
           }
         }
       }
       .content-detail{
         margin: 10px 0;
         line-height: 20px;
         font-size: 16px;
         .detail-theme{
           color: @topic;
         }
       }
       .content-img{
          font-size: 0;
          width: 100%;
          .clearfix();
           .one-img{
          .fl();
          width: 150px;
          height: 150px;
          } 
          .three-imgs{
          .fl();
          width: 100px;
          height: 100px;
          margin-bottom: 2px;
          }
          .three-imgs+.three-imgs{
            margin-left: 2px;
          }
          .three-imgs:nth-of-type(4n){
            margin-left: 0px;
          }
        }
        .content-icon{
          height: 50px;
          font-size: 0;
          line-height: 50px;
          .icon-dianzan,.icon-pinglun{
            vertical-align: middle;
            margin-right: 6px;
          }
          .icon-dianzan.active{
            color: @orange;
          }
          .icon-span{
            width: 70px;
            height: 100%;
            font-size: 12px;
            display: inline-block;
            color:@iconbg;
          }
        }
     }
  }
  .share-btn{
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border-radius: 50%;
    background: @yellow;
    position: fixed;
    bottom: 80px;
    right: 20px;
    color: @white;
    box-shadow: 2px 2px 2px @iconbg;
    .icon-share{
      font-size: 25px;
    }
  }
}
</style>
