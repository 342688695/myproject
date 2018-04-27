<template>
  <div class="store-wrapper" ref="wrapper">
    <div>
      <div class="store-title">
            <p class="title-nomal"><i class="iconfont icon-jifenshangcheng"></i><span class="count">{{this.integral}}</span>积分</p>
            <p>玩转商城的法宝</p>
          </div>
          <div class="store-detail">
            <div class="detail-title"><div class="title-line"></div><div class="title-circle"></div>积分商城<div class="title-circle"></div><div class="title-line"></div></div>
            <ul class="detail-ul">
              <li class="detail-li" :key="good.id" v-for="good in goodList" @click="selectItem(good)">
                <img v-lazy="good.banner" class="detail-img">
                <p class="detail-goods">{{good.name}}</p>
                <p class="detail-count"><i class="iconfont icon-jifenshangcheng"></i><span class="count-ing">{{good.integral}}</span>积分</p>
              </li>
            </ul>
          </div>
    </div>
  </div>
  
</template>

<script>
import BScroll from 'better-scroll'
import { getStoreDetail } from '../../api/store'
import {mapGetters, mapMutations} from 'vuex'
export default {
  data () {
    return {
      goodList: [],
      integral: ''
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true
      })
    })
  },
  computed: {
    ...mapGetters([
      'baseData',
      'userid',
      'token'
    ])
  },
  created () {
    this._getStoreDetail()
  },
  activated () {
    this._getStoreDetail()
  },
  methods: {
    selectItem (good) {
      this.$router.push({
        path: `/goods${good.id}`
      })
      this.setGoods(good)
    },
    ...mapMutations({
      setGoods: 'SET_GOODS',
      setMyIntegral: 'SET_MYINTEGRAL'
    }),
    _getStoreDetail () {
      if (!this.userid) {
        this.$router.push('/login')
        return
      }
      getStoreDetail(this.userid, this.token).then((res) => {
        if (res.returnCode === '00000' && res.status === 'success') {
          this.goodList = res.data.goodList
          this.integral = res.data.integral
          this.setMyIntegral(this.integral)
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../common/less/z.less';
@import '../../common/less/mixin.less';
@import '../../common/less/variables';
.store-wrapper{
  width: 100%;
  position: fixed;
  top:60px;
  bottom: 50px;
  overflow: hidden;
  .store-title{
    text-align: center;
    box-sizing: border-box;
    color:@balck;
    font-size: 14px;
    height: 100px;
    .border-1px(@background);
    .title-nomal{
      padding-top: 25px;
      margin-bottom: 16px;
      .icon-jifenshangcheng{
        color:@orange;
        font-size: 30px;
      } 
      .count{
        font-size: 29px;
        margin: 0 5px;
      }
    }
  }
  .store-detail{
    .detail-title{
      font-size: 14px;
      text-align: center;
      padding-top: 22px;
      margin-bottom: 15px;
      .title-line{
        width: 30px;
        height: 1px;
        background: @deepBalck;
        display: inline-block;
        vertical-align: middle;
      }
      .title-circle{
        width: 5px;
        height: 5px;
        background: @deepBalck;
        border-radius: 50%;
        display: inline-block;
        margin: 0 10px;
      }
    }
    .detail-ul{
      .clearfix();
      width: 100%;
      padding: 0 15px;
      box-sizing: border-box;
      .detail-li{
        .fl();
        width: 48.5%;
        text-align: center;
        margin-bottom: 20px;
          .detail-img{
            width: 100%;
            height: 130px;
          }
          .detail-goods{
            font-size: 15px;
            color:@balck;
            font-weight: 700;
            margin: 15px 0  10px 0;
          }
          .detail-count{
            color:@orange;
            font-size: 12px;
            .count-ing{
              font-size: 16px;
              margin: 0 5px;
            }
          }
        &:nth-of-type(even){
          margin-left: 3%;
        }  
      }
    }
  }
}

</style>
