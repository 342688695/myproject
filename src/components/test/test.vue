<template>
  <div class="discovery-wrapper" ref="wrapper">
    <div>
      <div class="discovery-title">
        <ul class="title-ul">
          <li class="title-li">
              <img src="./challenge@2x.png" class="icons">
            <p>挑战</p>
          </li>
          <li class="title-li">
           <img src="./know@2x.png" class="icons">
            <p>知道</p>
          </li>
          <li class="title-li">
          <img src="./case@2x.png" class="icons">
            <p>经典案例</p>
          </li>
        </ul>
      </div>
      <div class="space"></div>
      <div class="discovery-brefast">
        <div class="brefast-title">
          <span><i class="iconfont icon-wucan"></i>{{this.brefastList.name}}</span><i class="iconfont icon-return-copy"></i>
        </div>
        <ul class="brefast-ul">
          <li v-for="item in brefastList.list" class="brefast-li">
             <img :src="item.smallpic" class="brefast-imgs">
             <p class="brefast-name">{{item.title}}</p>
             <p class="brefast-time">{{item.adddate}}</p>
          </li>
        </ul>
      </div>
      <div class="space"></div>
      <div class="discovery-brefast nopadding">
        <div class="brefast-title">
          <span><i class="iconfont icon-jiankang"></i>{{this.childList.name}}</span><i class="iconfont icon-return-copy"></i>
        </div>
        <ul class="child-ul">
          <li v-for="item in this.childList.list" class="child-li">
            <div class="left-wrapper"><img :src="item.smallpic" class="child-imgs"></div>
            <div class="right-wrapper">
              <p class="right-title">{{item.title}}</p>
              <p class="right-time">{{item.adddate}}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="space"></div>
      <div class="discovery-brefast nopadding">
        <div class="brefast-title">
          <span><i class="iconfont icon-ketang"></i>{{this.classList.name}}</span><i class="iconfont icon-return-copy"></i>
        </div>
        <ul class="child-ul">
          <li v-for="item in this.classList.list" class="child-li">
            <div class="left-wrapper"><img :src="item.smallpic" class="child-imgs"></div>
            <div class="right-wrapper">
              <p class="right-title">{{item.title}}</p>
              <p class="right-time">{{item.adddate}}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="space"></div>
      <div class="discovery-brefast nopadding">
        <div class="brefast-title">
          <span><i class="iconfont icon-jianshen"></i>{{this.sportList.name}}</span><i class="iconfont icon-return-copy"></i>
        </div>
        <ul class="child-ul">
          <li v-for="item in this.sportList.list" class="child-li">
            <div class="left-wrapper"><img :src="item.smallpic" class="child-imgs"></div>
            <div class="right-wrapper">
              <p class="right-title">{{item.title}}</p>
              <p class="right-time">{{item.adddate}}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <Ctitle title="发现"></Ctitle>
    <Cfooter></Cfooter>
  </div>
</template>

<script>
import Cfooter from '@/components/commonFooter/commonFooter'
import { getDiscoveryDetail } from '../../api/discovery.js'
import {mapGetters} from 'vuex'
import BScroll from 'better-scroll'
import Ctitle from '../../base/title/title.vue'
export default {
  data () {
    return {
      brefastList: [],
      childList: [],
      classList: [],
      sportList: []
    }
  },
  created () {
    this._initDiscoveryDetail()
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
      'token'
    ])
  },
  methods: {
    _initDiscoveryDetail () {
      getDiscoveryDetail(this.userid, this.token).then((res) => {
        if (res.returnCode === '00000' && res.status === 'success') {
          console.log(res)
          this.brefastList = res.data.articleList[0]
          this.childList = res.data.articleList[1]
          this.classList = res.data.articleList[2]
          this.sportList = res.data.articleList[3]
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
@import '../../common/less/variables.less';
.discovery-wrapper{
    width: 100%;
    position: fixed;
    top: 45px;
    bottom: 50px;
    overflow: hidden;
    .discovery-title{
      .title-ul{
        height: 95px;
        display: flex;
        align-items: center;
        .title-li{
          width: 33.3%;
          text-align: center;
          color:#333;
          .icons{
            width: 35px;
            height: 35px;
            display: inline-block;
          }
        }
      }

    }
    .space{
      background: @discoveryspace;
      height: 10px;
      width: 100%;
    }
    .discovery-brefast{
      padding: 0 15px;
      .brefast-title{
        height: 55px;
        line-height: 55px;
        font-size: 14px;
        display: flex;
        justify-content: space-between;
        .icon-wucan,.icon-ketang{
          color:@discovery2;
          font-size: 22px;
          margin-right: 16px;
          vertical-align: middle;
        }
        .icon-jiankang,.icon-jianshen{
          color:@discovery1;
          font-size: 22px;
          margin-right: 16px;
          vertical-align: middle;
        }
      }
      .brefast-ul{
        .clearfix();
          .brefast-li{
            width: 49%;
            .fl();
            margin-bottom:10px;
            .brefast-imgs{
              width: 100%;
              height: 110px;
            }
            .brefast-name{
              font-size: 14px;
              color: @balck;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .brefast-time{
              font-size: 10px;
              color: @iconbg;
            }
          }
          .brefast-li:nth-of-type(even){
            margin-left: 2%;
          }
      }
    }
    .discovery-brefast.nopadding{
      padding: 0;
      .brefast-title{
        margin: 0 15px;
      }
      .child-ul{
        margin-left: 15px;
        border-top: 1px solid @discoverline;
        .child-li{
          height: 110px;
          display: flex;
          align-items: center;
          .right-wrapper{
            padding: 0 25px 0 15px;
            .right-title{
              font-size: 14px;
              color: @balck;
            }
            .right-time{
              color:@iconbg;
              font-size: 10px;
            }
          }
          .child-imgs{
            width: 100px;
            height: 80px;
          }
        }
        .child-li+.child-li{
          border-top: 1px solid @discoverline;
        }
      }
    }
}

</style>
