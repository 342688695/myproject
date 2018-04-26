<template>
<transition name="slide">
<div class="login-wrapper">
   <div class="login-title-wrapper">
      <i class="iconfont icon-fanhui" @click="back"></i>
      <span class="title">登录</span>
   </div>
   <div class="divider"></div>
   <div class="content-wrapper">
     <div class="phone-wrapper">
       <h1>手机号</h1>
       <div class="input-wrapper">
        <i class="iconfont icon-bohao icon-right"></i>
        <input type="number" placeholder="请输入手机号" class="cmInput" ref="username" v-model="username">
       </div>
     </div>
     <div class="phone-wrapper">
       <h1>密码</h1>
       <div class="input-wrapper">
        <i class="iconfont icon-password icon-right"></i>
        <input type="password" placeholder="请输入密码" class="cmInput" ref="password" v-model="password">
       </div>
     </div>
     <div class="button-wrapper">
      <button class="login-btn" @click="login">登录</button>
     </div>
   </div>
  </div>
</transition>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import { getLogin } from '../../api/login.js'
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    back () {
      this.$router.push('/index')
    },
    login () {
      getLogin(this.username, this.password).then((res) => {
        if (res.returnCode === '00000' && res.status === 'success') {
          let baseData = res.data.baseData
          this.setBaseData(baseData)
          this.saveUserId(baseData.userId)
          this.saveToken(baseData.token)
          this.saveUserName(this.username)
          this.savePassword(this.password)
          this.$router.push('/target')
        }
      })
    },
    ...mapMutations({
      setBaseData: 'SET_BASEDATA'
    }),
    ...mapActions([
      'saveUserId',
      'saveToken',
      'saveUserName',
      'savePassword'
    ])
  }
}
</script>
<style lang="less" scoped>
@import '../../common/less/variables.less';
@import '../../common/less/mixin.less';
.login-wrapper{
  position: fixed;
  top:0;
  bottom: 0;
  height: 100%;
  width: 100%;
  background: @background;
  background-size: cover;
  z-index: 100;
  .login-title-wrapper{
    display: flex;
    align-items: center;
    height: 45px;
    line-height: 45px;
    .icon-fanhui{
        width: 10%;
        font-size: 25px;
        color:@titlebg;
    }
    .title{
      font-size: 20px;
      width: 80%;
      text-align: center;
      color:@titlebg;
    }
  }
  .divider{
    height: 5px;
    background: @devider;
  }
  .content-wrapper{
    width: 80%;
    position: fixed;
    top:100px;
    left: 50%;
    transform: translateX(-50%);
    .phone-wrapper{
      h1{
        font-size: 20px;
        font-weight: @fontWeight;
        margin-bottom: 25px;
      }
      .input-wrapper{
        .border-1px(@titlebg);
        padding: 10px 0; 
        display: flex;
        align-items: center;
        .icon-right{
          margin-left: 15px;
          padding-right: 15px;
          font-size: 26px;
          color:@iconbg;
          border-right: 1px solid @devider;
        }
        .cmInput{
          font-size: 18px;
          margin-left: 18px;
        }
      }
      
    }
    .phone-wrapper+.phone-wrapper{
      margin-top: 35px;
    }
    .button-wrapper{
      text-align: center;
      .login-btn{
      width: 275px;
      height: 50px;
      background: @orange;
      border: none;
      border-radius: 20px;
      color:@white;
      font-size: 20px;
      margin-top: 40px;
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

