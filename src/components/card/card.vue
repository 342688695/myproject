<template>
  <div class="card-wrapper" ref="wrapper">
    <div> 
      <div class="card-traget">
        <div class="traget-title">
          <span class="title-normal"><i class="iconfont icon-qizi"></i>我的目标</span>
          <span class="title-small"><i class="iconfont icon-jia"></i>添加目标</span>
        </div>
        <div class="scroll-img">
          <mt-swipe :auto="3000"  class="swipe-wrapper">
          <mt-swipe-item class="img-wrapper" v-for="(aim,index) in aimList" :key="index"> 
            <div class="words">
              <h1 class="title">{{aim.title}}</h1>
              <h2 class="sub-title">第{{aim.ing}}/{{aim.all}}天<span class="title-circle">·</span>{{aim.ingAll}}%</h2>
              <mt-progress :value="percent(aim.ingAll)" :bar-height="10" class="img-progress"></mt-progress>
            </div>
            <img :src="aim.img" alt="滚动分享图片" class="img-list">
          </mt-swipe-item>
        </mt-swipe>
        </div>
      </div> 
      <div class="divider"></div>
      <div class="card-traget">
        <div class="traget-title">
          <span class="title-normal"><i class="iconfont icon-qiandao"></i>我的打卡</span>
          <span class="title-small"><i class="iconfont icon-jia"></i>添加打卡</span>
        </div>
        <div class="card-detail">
          <ul class="detail-wrapper">
            <li class="detail-single" v-for="(clock,index) in clockInList" :key="index">
              <div class="single-left">
                <div>
                  <i class="iconfont icon-gou" :class="clock.todayDo>0?'active':''"  @click="signIn(index)"></i>
                </div>
                <div class="card-msg">
                  <div class="msg-title">{{clock.title}}</div>
                  <div class="msg-circle"><i class="iconfont icon-circle" :class="clock.week[0] > 0? 'icon-shixinyuan' : 'icon-kongxinyuan'"></i><i class="iconfont icon-circle" :class="clock.week[1] > 0? 'icon-shixinyuan' : 'icon-kongxinyuan'"></i><i class="iconfont icon-circle" :class="clock.week[2] > 0? 'icon-shixinyuan' : 'icon-kongxinyuan'"></i><i class="iconfont icon-circle" :class="clock.week[3] > 0? 'icon-shixinyuan' : 'icon-kongxinyuan'"></i><i class="iconfont icon-circle" :class="clock.week[4] > 0? 'icon-shixinyuan' : 'icon-kongxinyuan'"></i><i class="iconfont icon-circle" :class="clock.week[5] > 0? 'icon-shixinyuan' : 'icon-kongxinyuan'"></i><i class="iconfont icon-circle" :class="clock.week[6] > 0? 'icon-shixinyuan' : 'icon-kongxinyuan'"></i></div>
                </div>
              </div>
              <div class="card-today">
              <div v-show="!(clock.todayDo>0)"><i class="iconfont icon-ren"></i>{{clock.countnum}}</div>
              <div v-show="!(clock.todayDo>0)"><span class="space">今天</span>{{clock.todaynum}}</div>
              <div v-show="clock.todayDo>0"><i class="iconfont icon-shangchuan"></i></div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="divider"></div>
      <div class="card-share">
        <div class="share-title">
          <span class="title-normal"><i class="iconfont icon-fenxiang"></i>我的分享<span class="word-small">(共{{this.shareListCount}}项)</span></span>
          <span class="title-small">
            <i class="iconfont icon-return-copy"></i>
          </span>
        </div>
        <div class="share-detail" ref="shareWrapper">
          <ul class="detail-ul" ref="shareGroup">
            <li class="share-li" :key="share.id" v-for="share in shareList">
              <img v-lazy="share.banner" alt="滚动分享图片" class="img-list">
              <p class="share-topic">#{{share.title}}#</p>
              <p class="share-content">{{share.content}}</p>
              <div class="share-icons">
                <i class="iconfont icon-dianzan"></i><span class="space">{{share.praise}}</span>
                <i class="iconfont icon-pinglun"></i><span class="space">{{share.msg}}</span>
              </div>        
            </li>
          </ul>
        </div>
      </div>
      <div class="divider"></div>
      <div class="card-share">
        <div class="share-title">
          <span class="title-normal"><i class="iconfont icon-remen"></i>热门话题</span>
          <span class="title-small">
            <i class="iconfont icon-return-copy"></i>
          </span>
        </div>
        <div class="hot-topic" ref="hotTopic">
          <ul class="topic-ul" ref="topicUl">
            <li class="topic-li" :key="topic.id" v-for="topic in topicList">
              <img v-lazy="topic.banner" alt="热门图片" class="img-list">
              <span class="topic-title">{{topic.title}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import {mapGetters} from 'vuex'
import { getTargetDetail } from '../../api/card'
import { getTopicDetail } from '../../api/topic'
import { setSignIn } from '../../api/signIn'

export default {
  data () {
    return {
      aimList: [],
      clockInList: [],
      shareList: [],
      topicList: [],
      shareListCount: ''
    }
  },
  computed: {
    ...mapGetters([
      'baseData',
      'userid',
      'token'
    ])
  },
  mounted () {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true
      })
    })
  },
  updated () {
    setTimeout(() => {
      this._setSliderWidth()
      this._initSlider()
      this._setTopicWidth()
      this._initTopic()
    }, 20)
  },
  created () {
    // this._getCardDetail()
    // this._getTopicDetail()
  },
  activated () {
    this._getCardDetail()
    this._getTopicDetail()
  },
  methods: {
    signIn (index) {
      this._setSignIn(index)
    },
    percent (value) {
      return Number(value)
    },
    _setSignIn (index) {
      setSignIn(this.userid, this.token, this.clockInList[index].id).then((res) => {
        if (res.returnCode === '00000' && res.status === 'success') {
          let day = new Date().getDay()
          this.clockInList[index].todayDo = '1'
          this.clockInList[index].week[day - 1] = '1'
        }
      })
    },
    _getTopicDetail () {
      if (!this.userid) {
        this.$router.push('/login')
        return
      }
      getTopicDetail(this.userid, this.token).then((res) => {
        if (res.returnCode === '00000' && res.status === 'success') {
          this.topicList = res.data.list
        } else {
          this.$router.push('/login')
        }
      })
    },
    _getCardDetail () {
      if (!this.userid) {
        this.$router.push('/login')
        return
      }
      getTargetDetail(this.userid, this.token).then((res) => {
        if (res.returnCode === '00000' && res.status === 'success') {
          this.aimList = res.data.aimList
          this.clockInList = res.data.clockInList
          this.shareList = res.data.shareList
          this.shareListCount = res.data.shareListCount
        } else {
          this.$router.push('/login')
        }
      })
    },
    _setSliderWidth () {
      if (!this.shareList.length) {
        return
      }
      let child = this.$refs.shareGroup.children
      let liWidth = child[0].clientWidth
      let liLength = child.length
      this.$refs.shareGroup.style.width = liLength * (liWidth + 10) - 10 + 'px'
    },
    _initSlider () {
      this.slider = new BScroll(this.$refs.shareWrapper, {
        scrollX: true,
        scrollY: false,
        click: true
      })
    },
    _setTopicWidth () {
      if (!this.topicList.length) {
        return
      }
      let child = this.$refs.topicUl.children
      let liWidth = child[0].clientWidth
      let liLength = child.length
      this.$refs.topicUl.style.width = liLength * (liWidth + 10) - 10 + 'px'
    },
    _initTopic () {
      this.topic = new BScroll(this.$refs.hotTopic, {
        scrollX: true,
        scrollY: false,
        click: true
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../common/less/z.less';
@import '../../common/less/variables';
.card-wrapper{
  width: 100%;
  position: fixed;
  top:60px;
  bottom: 50px;
  overflow: hidden;
  .card-traget{
    padding: 15px;
    .traget-title{
      line-height: 20px;
      display: flex;
      align-items: center;
      justify-content:space-between;
      .title-normal{
        font-size:18px;
        .icon-qizi{
        font-size:22px;
        color: @orange;
        margin-right: 10px;
        }
      }
      .title-small{
        color:@iconbg;
        font-size: 14px;
      }
      .icon-qiandao{
        font-size:22px;
        color: @rose;
        margin-right: 10px;
      }
      
    }
    .scroll-img{
      width:100%;
      margin-top: 10px;
      .swipe-wrapper{
        height: 150px;
      .img-wrapper{
        .words{
            text-align: center;
            width: 100%;
            height: 100%;
            color: @white;
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
             z-index: 5;
             .ellipsis-basic();
             padding: 44px 0 31px 0;
             box-sizing: border-box;
          .title{
            font-size: 22px;
            margin-bottom: 15px;
          }
          .sub-title{
            color: @white;
            font-size: 16px;
            .title-circle{
              margin: 0 6px;
            }
          }
          .img-progress{
            width: 66.67%;
            .bc();
            height: 20px;
            line-height: 20px;
          }
        }
        .img-list{
          width:100%;
          height: 150px;
          border-radius: 10px;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 4;
        }
      }
    }
  }
    
  }
  .divider{
    height: 10px;
    background: @index-devider;
  }
  .card-detail{
    margin-bottom: 5px;
    margin-top: 10px;
    .detail-wrapper{
      border-radius: 20px;
      background: @buff;
      padding: 7px;
      .detail-single{
        height: 70px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: @white;
        box-sizing: border-box;
         border-radius: 10px;
         padding: 0 17px;
         .single-left{
           width: 80%;
           display: flex;
           align-items: center;
         }
         .icon-gou{
           flex: 0 0 45px;
           font-size: 45px;
           color:@index-circle;
           margin-right: 15px;
          &.active{
            color:@yellow;
          } 
         }
         .card-msg{
           .msg-title{
             font-size: 16px;
           }
           .msg-circle{
             .icon-circle{
                font-size: 10px;
                margin-right: 3px;
                color:@index-empty-circle;
             }
           }
         }
         .card-today{
           color:@index-word;
           font-size: 10px;
           text-align: right;
           .space{
             margin-right: 5px;
           }
           .icon-shangchuan{
             font-size: 30px;
             color:@iconbg;
           }
         }
      }
      .detail-single+.detail-single{
        margin-top: 7px;
      }
    }
  }
  .card-share{
    padding: 15px;
    .share-title{
       display: flex;
       justify-content: space-between;
       align-items: center;
       .title-normal{
        font-size: 18px;
        .word-small{
          font-size: 10px;
          color:@iconbg;
          margin-left: 5px;
        }
        .icon-fenxiang{
          color:@yellow;
          font-size: 22px;
          margin-right: 10px;
        }
        .icon-remen{
           color:@hotTopic;
          font-size: 22px;
          margin-right: 10px;
        }
    
       .title-small{
      color:@iconbg;
      }
      }
    }
    .share-detail{
      margin-top: 10px;
      margin-bottom: 5px;
      .detail-ul{
        .clearfix();
        overflow: hidden;
        white-space: nowrap;
        .share-li{
        .fl();
        overflow: hidden;
        width: 150px;
        height: 185px;
        background: @index-devider;
        border-radius: 10px;
        padding: 10px;
        box-sizing: border-box;
        .img-list{
          width: 130px;
          height: 95px;
        }
        .share-topic{
          margin-top: 18px;
          color:@topic;
          font-size: 12px;
        }
        .share-content{
          color:@iconbg;
          .ellipsis-basic();
          font-size:11px;
        }
        .share-icons{
          line-height: 20px;
          font-size: 10px;
          color:@iconbg;
          .icon-dianzan,.icon-pinglun{
            vertical-align: middle;
          }
          .space{
            margin-left: 5px;
          }
        }
      }
      }
      .share-li+.share-li{
        margin-left: 10px;
      }
      
    }
    .hot-topic{
      margin-top: 10px;
      margin-bottom: 5px;
      .topic-ul{
        .clearfix();
        overflow: hidden;
        white-space: nowrap;
        .topic-li{
          .fl();
          width: 225px;
          height: 115px;
          position: relative;
          .img-list{
          width: 225px;
          height: 115px;
          } 
         .topic-title {
          text-align: center;
          width: 100%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%,-50%);
          color:@white;
          font-size: 14px;
          .ellipsis-basic();
        } 
      }
      .topic-li+.topic-li{
        margin-left: 10px;
      }
      }
    }
  }
}
</style>

