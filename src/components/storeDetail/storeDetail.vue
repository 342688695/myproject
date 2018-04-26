<template>
<transition name="slide">
  <div class="store-detail">
    <div ref="wrapper" class="store-detail-wrapper">
      <div>
        <div class="store-img-wrapper">
          <i class="iconfont icon-fanhui" @click="back"></i>
          <img :src="goods.banner" class="img-bg">
        </div>
        <div class="store-img-word">
          <div class="titile">{{this.goods.name}}</div>
          <pre class="content">{{this.introduce}}</pre>
        </div>
      </div>  
    </div>
    <div class="goods-exchange">
        <div class="exchange-title">消耗<span class="count">{{this.goods.integral}}</span>积分</div>
        <div class="exchange-btn" :class="parseInt(this.myintegral) >= parseInt(this.goods.integral)?'active':''" ref="exbtn">{{parseInt(this.myintegral)>=parseInt(this.goods.integral)?'立即兑换':'积分不足'}}</div>
    </div>
  </div>
</transition>  
</template>

<script>
import BScroll from 'better-scroll'
import {mapGetters} from 'vuex'
import { getstoreDetail } from '../../api/storedetail'
export default {
  data () {
    return {
      introduce: ''
    }
  },
  computed: {
    ...mapGetters([
      'goods',
      'baseData',
      'myintegral',
      'userid',
      'token'
    ])
  },
  created () {
    this._getstoreDetail()
  },
  updated () {
    this._getstoreDetail()
    this.scroll.refresh()
  },
  mounted () {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true
      })
    })
  },
  methods: {
    back () {
      this.$router.push('/target/store')
    },
    _getstoreDetail () {
      getstoreDetail(this.userid, this.token, this.goods.id).then((res) => {
        if (res.returnCode === '00000' && res.status === 'success') {
          this.introduce = res.data.item.introduce
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
.store-detail{
  position: fixed;
  top:0;
  bottom: 0;
  min-height: 100%;
  width: 100%;
  z-index: 5;
  background: @white;
    .store-detail-wrapper{
    width: 100%;
    position: fixed;
    top:0;
    bottom: 80px;
    overflow: hidden;
    .store-img-wrapper{
      height: 270px;
      position: relative;
      .img-bg{
        width: 100%;
        height: 100%;
      }
      .icon-fanhui{
        position: fixed;
        padding: 10px 10px 10px 0;
        font-size: 25px;
      }
    }
    .store-img-word{
      .titile{
        height: 65px;
        padding-left: 20px;
        font-size: 20px;
        color:@balck;
        line-height: 65px;
        border-bottom: 1px solid @background;
      }
      .content{
        color:@goodsword;
        padding: 20px;
        white-space: pre-wrap;
      }
    }
  }
  .goods-exchange{
    width: 100%;
    position: fixed;
    bottom: 0;
    height: 80px;
    z-index: 5;
    line-height: 80px;
    border-top: 1px solid @background;
    .exchange-title{
      width: 52%;
      font-size: 16px;
      color:@balck;
      text-align: center;
      display: inline-block;
      .count{
        color:@yellow;
        font-size: 20px;
      }
    }
    .exchange-btn{
      display: inline-block;
      width: 160px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      border-radius: 10px;
      background:@devider;
      color:@white;
      font-size: 20px;
      &.active{
      background:@yellow;
      }
    }
  }
}
.slide-enter-active, .slide-leave-active{
  transition: all 0.3s
}
.slide-enter, .slide-leave-to{
  transform: translate3d(100%, 0, 0)
}
</style>
