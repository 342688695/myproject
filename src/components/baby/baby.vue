<template>
  <div class="mine-wrapper" ref="wrapper">
    <div>
      <div class="mine-info">
      <img :src="this.baseData.headPic" class="info-img"><span class="info-name">{{this.baseData.userInfo?this.baseData.userInfo.nickname:''}}</span>
     </div>
      <ul class="mine-ul">
        <li v-for="(item, index) in mineList" :key="index" class="mine-li">
          <img :src="item.iconUrl" class="li-img">
          <div class="li-div">
            <span>{{item.name}}</span>
            <span class="second-span" v-show="item.extra">{{item.extra}}积分</span>
          </div>
          <i class="iconfont icon-return-copy"></i>
        </li>
        <li class="mine-li" @click="quit" v-show="mineList.length">
          <i class="iconfont icon-tuichu"></i>
          <div class="li-div">
            <span>退出登录</span>
          </div>
          <i class="iconfont icon-return-copy"></i>
        </li>
      </ul>
    </div>
    <Cfooter></Cfooter>
    <Ctitle title="我的" :haveSet=haveSet></Ctitle>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import Cfooter from '@/components/commonFooter/commonFooter'
import { getMineDetail } from '../../api/mine.js'
import { getLogin } from '../../api/login.js'
import {mapGetters, mapMutations, mapActions} from 'vuex'
import {clearStorage} from '../../common/js/cache.js'
import Ctitle from '../../base/title/title.vue'
export default {
  data () {
    return {
      mineList: [],
      haveSet: true
    }
  },
  watch: {
    baseData (curVal) {
      if (Object.keys(curVal).length !== 0) {
        console.log('非空对象')
        this._initMineDetail()
      }
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.wrapper, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      })
    }
  },
  computed: {
    ...mapGetters([
      'baseData',
      'userid',
      'token',
      'username',
      'password'
    ])
  },
  created () {
    if (Object.keys(this.baseData).length === 0) {
      console.log('空对象')
      this._initLogin()
    } else {
      console.log('非空对象')
      this._initMineDetail()
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.wrapper, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      })
    }
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
  methods: {
    ...mapActions([
      'saveToken'
    ]),
    ...mapMutations({
      setBaseData: 'SET_BASEDATA'
    }),
    _initLogin () {
      getLogin(this.username, this.password).then((res) => {
        if (res.returnCode === '00000' && res.status === 'success') {
          console.log('重新登录')
          this.setBaseData(res.data.baseData)
        }
      })
    },
    _initMineDetail () {
      getMineDetail(this.userid, this.token).then((res) => {
        if (res.status === 'error' && res.returnCode === '10003') {
          getLogin(this.username, this.password).then((logres) => {
            this.saveToken(logres.data.baseData.token)
            this._initMineDetail()
          })
        }
        if (res.returnCode === '00000' && res.status === 'success') {
          this.mineList = res.data.itemMenu
        }
      })
    },
    quit () {
      console.log(1)
      clearStorage()
      this.$router.push('/')
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
@import '../../common/less/mixin.less';
.mine-wrapper{
    width: 100%;
    position: fixed;
    top: 45px;
    bottom: 50px;
    overflow: hidden;
    .mine-info{
      height: 105px;
      width: 100%;
      .bg-image('bg');
      background-size: cover;
      display: flex;
      align-items: center;
      .info-img{
        width: 75px;
        height: 75px;
        margin-left: 10%;
        margin-right: 13px;
        border-radius: 50%;
      }
      .info-name{
        font-size: 18px;
      }
    }
    .mine-ul{
      .mine-li{
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        .li-img{
          width:20px;
          height: 22px;
          margin: 0 15px;
          flex:  0 0 20px;
        }
        .icon-tuichu{
          font-size: 21px;
          margin: 0 15px;
          flex:  0 0 20px;
          color: #919191;             
        }
        .li-div{
          .clearfix();
          flex: 1;
          height: 35px;
          line-height: 35px;
          font-size: 14px;
          border-bottom: 1px solid @background;
          .second-span{
            .fr();
            margin-right: 10px;
          }
        }
        .icon-return-copy{
          font-size: 20px;
           flex:  0 0 30px;
        }
      }
    }
}    
</style>

