<template>
  <transition name="slide" mode="out-in">
 <div class="login-wrapper">
    <div class="link-wrapper">
    <router-link tag="button" class="register" to="/register">
      立即注册
    </router-link>
     <router-link tag="button" class="login" to="/login">
      登录
    </router-link>
    </div>
  </div>
  </transition>
 
</template>

<script>
export default {
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
  .bg-image('login');
  background-size: cover;
  z-index: 100;
  .link-wrapper{
     position: fixed;
     bottom: 85px;
     left: 50%;
     transform: translateX(-50%);
  button{
    width: 270px;
    height: 45px;
    line-height: 45px;
    border: none;
    border-radius: 20px;
    font-size: 18px;
    color:@white;
  }
  button+button{
    margin-top: 20px;
  }
  .register{
    background: @orange;
  }
  .login{
    background: transparent;
    border: 1px solid @white;
  }
  }
}
.slide-enter-active, .slide-leave-active{
  transition: all 0.3s
}
.slide-enter, .slide-leave-to{
  transform: translate3d(-100%, 0, 0)
}
  
</style>

