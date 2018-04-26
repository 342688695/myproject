<template>
<div>
 <Ctitle title="分享" :have-back='haveBack' @back="clickBack"></Ctitle>
 <div class="message-wrapper" ref="wrapper">
   <div>
    <ul>
      <li class="hot-key-li">
        <div class="key-img-wrapper">
           <img :src="this.shareDetail.headpic" class="head-portraint">
          <div class="content-name">
            <h1><span class="name-style">{{this.shareDetail.nickname}}</span><span class="fouse" v-show="!this.shareDetail.attstatus"><i class="iconfont icon-jia"></i>关注</span><span class="nofouse" v-show="this.shareDetail.attstatus">已关注</span></h1>
            <p class="send-msg"><span class="time-margin"><i class="iconfont icon-shijian"></i>{{this.shareDetail.showTime}}</span><i class="iconfont icon-qiandao1"></i>打卡{{this.shareDetail.seqnum}}次</p>
          </div>
        </div>
       <div class="key-content-warpper"> 
          <div class="content-detail">
            <span class="detail-theme">#{{this.shareDetail.clockintitle}}#</span>{{this.shareDetail.content}}
          </div>
          <div class="content-img">
            <img :src="imgList" v-for="(imgList,index) in this.shareDetail.imgthumb" :key="index" :class="doclassname()">
          </div>
          <div class="share-praise-list">
            <span class="priase-word">赞:</span>
            <div class="praiseWarpper" ref="praiseWarpper"><div class="praise-div" ref="praiseDiv"><img :src="item.headpic" class="parise-imgs"  v-for="item in sharePraiseList"></div></div>
          </div>
        </div>
      </li>
    </ul>
    <div class="result-wrapper">
      <div class="result-title">评论({{this.replyList.length}})</div>
      <ul v-show="this.replyList.length>0">
        <li v-for="(reply,index) in replyList" class="reply-li" :key="index">
          <div class="replay-img">
            <img :src="reply.headpic" class="reply-sign">
          </div>
          <div class="reply-content">
            <div class="content-name">{{reply.nickname}}<span class="praise-count" :class="reply.msgpraisestatus?'active':''">{{reply.praise}}<i class="iconfont icon-dianzan"></i></span></div>
            <div class="content-time">{{reply.showTime}}</div>
            <div class="content-detail" @click="replycontent(reply.id, reply.nickname, index)">{{reply.content}}</div>
            <div class="content-reply" v-for="(item,index) in reply.replyListS" :key="index"><span class="reply-nickname">{{item.nickname}}</span><span v-show="item.replyname">回复<span class="reply-nickname">{{item.replyname}}</span></span>:<span class="reply-content">{{item.content}}</span></div>
          </div>
        </li>
      </ul>
      <div class="no-reply" v-show="!this.replyList.length>0">【还没有评论】</div>
    </div>
   </div>
  </div>
  <reply :praisestatus='this.shareDetail.praisestatus' @send='clickSure' :placeholder='replyname' ref="reply"></reply>
</div>
</template>

<script>
import BScroll from 'better-scroll'
import { getshareDetail } from '../../api/shareDetail.js'
import {mapGetters, mapActions} from 'vuex'
import { getLogin } from '../../api/login.js'
import Ctitle from '../../base/title/title.vue'
import Reply from '../../base/reply/reply.vue'
import { getreplyDetail } from '../../api/replyDetail.js'
export default {
  data () {
    return {
      haveBack: true,
      sharePraiseList: [],
      replyList: [],
      replyname: '请输入内容',
      parentId: '',
      index: 0
    }
  },
  activated () {
    this.replyname = '请输入内容'
    this._getshareDetail()
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
  updated () {
    setTimeout(() => {
      this._initSlider()
      this._setSliderWidth()
    }, 20)
  },
  computed: {
    ...mapGetters([
      'userid',
      'token',
      'username',
      'password',
      'shareDetail'
    ])
  },
  methods: {
    clickSure (msg) {
      this._sendMsg(msg, this.parentId, this.index)
    },
    replycontent (id, name, index) {
      this.index = index
      console.log(this.index)
      this.$refs.reply.msg = ''
      console.log(id, name)
      this.replyname = `回复${name}`
      this.parentId = id
    },
    clickBack () {
      this.$router.go(-1)
    },
    doclassname () {
      const length = this.shareDetail.imgthumb.length
      if (length > 1) {
        return 'three-imgs'
      }
      return 'one-img'
    },
    ...mapActions([
      'saveToken'
    ]),
    _sendMsg (msg) {
      console.log(this.index)
      let level, parentId
      console.log(this.parentId, msg)
      if (this.replyname === '请输入内容') {
        level = 1
        parentId = 0
      } else {
        level = 2
        parentId = this.parentId
      }
      let content = msg
      getreplyDetail(this.userid, this.token, this.shareDetail.id, content, level, parentId).then((res) => {
        if (res.returnCode === '00000' && res.status === 'success') {
          if (level > 1) {
            if (!this.replyList[this.index].replyListS) {
              this.replyList[this.index].replyListS = []
            }
            this.replyList[this.index].replyListS.push({
              content: res.data.item.content,
              headpic: res.data.item.headpic,
              nickname: res.data.item.nickname,
              praise: res.data.item.praise,
              parentid: this.parentId
            })
          } else {
            this.replyList.push({
              content: res.data.item.content,
              headpic: res.data.item.headpic,
              nickname: res.data.item.nickname,
              praise: res.data.item.praise,
              showTime: '刚刚',
              id: res.data.item.id,
              replyListS: []
            })
          }
          this.replyname = '请输入内容'
        }
      })
    },
    _getshareDetail () {
      getshareDetail(this.userid, this.token, this.shareDetail.id).then((res) => {
        if (res.status === 'error' && res.returnCode === '10003') {
          getLogin(this.username, this.password).then((logres) => {
            this.saveToken(logres.data.baseData.token)
            this._getshareDetail()
          })
        }
        if (res.returnCode === '00000' && res.status === 'success') {
          console.log(res)
          this.replyList = res.data.replyList
          this.sharePraiseList = res.data.sharePraiseList
        }
      })
    },
    _setSliderWidth () {
      if (!this.sharePraiseList.length) {
        return
      }
      let child = this.$refs.praiseDiv.children
      let liWidth = child[0].clientWidth
      let liLength = child.length
      this.$refs.praiseDiv.style.width = liLength * (liWidth + 5) - 4 + 'px'
    },
    _initSlider () {
      this.slider = new BScroll(this.$refs.praiseWarpper, {
        scrollX: true,
        scrollY: false,
        click: true
      })
    }
  },
  components: {
    Ctitle,
    Reply
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
    bottom: 49px;
    overflow: hidden;
    .hot-key-li{
     padding: 20px 10px 5px 10px;
     .key-img-wrapper{
       height: 100%;
       display: flex;
      .head-portraint{
        height: 40px;
        width: 40px;
        border-radius: 50%;
        flex: 0 0 40px;
      }
      .content-name{
        flex: 1;
        margin-left: 10px;
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
     }
     .key-content-warpper{
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
          width: 117px;
          height: 117px;
          margin-bottom: 2px;
          }
          .three-imgs+.three-imgs{
            margin-left: 2px;
          }
          .three-imgs:nth-of-type(4n){
            margin-left: 0px;
          }
        }
      .share-praise-list{
          height: 50px;
          font-size: 14px;
          line-height: 50px;
          display: flex;
          align-items: center;
          .praiseWarpper{
            width: 100%;
            overflow: hidden;
          }
          .praise-div{
            overflow: hidden;
            white-space:nowrap;
            margin-left: 10px;
            height: 30px;
            .parise-imgs{
              .fl();
              width: 30px;
              height: 30px;
              line-height: 30px;
              border-radius: 50%;
            }
          }
          .parise-imgs+.parise-imgs{
            margin-left: 4px;
          }
        }
     }
  }
  .result-wrapper{
    .result-title{
      height: 25px;
      line-height: 25px;
      width: 100%;
      background:@index-devider; 
      font-size: 12px;
      color:@iconbg;
      padding-left: 10px;
    }
    .no-reply{
      color: @index-word;
      height: 100px;
      line-height: 100px;
      text-align: center;
      font-size: 14px;
    }
    .reply-li{
      padding: 10px 0 10px 10px;
      display: flex;
      .replay-img{
        flex: 0 0 40px;
        margin-right: 10px;
        .reply-sign{
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
      }
      .reply-content{
        flex: 1;
        .content-name{
          .clearfix();
          font-size: 12px;
          color:@index-word;
          margin-right: 10px;
          .praise-count{
            .fr();
            color:@iconbg;
            .icon-dianzan{
            padding: 0 0 0 5px;
            box-sizing: border-box;
            }
          }
          .praise-count.active{
            color:@orange;
          }
        }
        .content-time{
           font-size: 9px;
           color:@iconbg;
        }
        .content-detail{
          font-size: 14px;
          color:@balck;
          margin: 5px 0;
        }
        .content-reply{
           font-size: 14px;
           color:@balck;
           background: @index-devider;
           padding:5px 10px;
           color:@index-word;
           .reply-nickname{
             color:@orange
           }
           .reply-content{
             margin-left: 10px;
           }
        }
      }
    }
  }
}
</style>

