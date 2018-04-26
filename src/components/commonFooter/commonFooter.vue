<template>
  <div class="footer-wrapper">
    <router-link tag="div" class="tab-item"  to="/message">
    <i class="iconfont icon-xinxi"></i>
    <span class="tab-link">信息</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/target">
      <i class="iconfont icon-renwu"></i>
      <span class="tab-link">目标</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/test">
      <i class="iconfont icon-faxian"></i>
      <span class="tab-link">发现</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/baby">
      <i class="iconfont icon-wode1"></i>
      <span class="tab-link">我的</span>
    </router-link>
  </div>
</template>
<script>
export default {}
</script>
<style lang="less" scoped>
@import "../../common/less/z.less";
@import "../../common/less/variables.less";
@import "../../common/less/mixin.less";
.footer-wrapper {
  width: 100%;
  position: fixed;
  bottom: 0;
  height: 50px;
  background: @gray;
  display: flex;
  text-align: center;
  .tab-item {
    padding: 10px 0;
    flex: 1;
    color: @normal;
    .fl();
    .font-s(10px);
    .iconfont{
      color:@normal;
      font-size: 20px;
      display: block;
    }
    .iconfont.icon-xinxi{
      font-size: 25px;
    }
    .iconfont.icon-renwu{
      font-size: 23px;
    }
    .iconfont.icon-faxian{
      font-size: 23px;
    }
    }
    .router-link-active{
      .iconfont{
       color:@yellow
      }
      .tab-link{
        color:@balck
      }
    }
}
</style>
