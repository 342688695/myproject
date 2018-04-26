<template>
  <div class="tab">
    <router-link tag="div" class="tab-item"  to="/target/card">
    <span class="tab-link">打卡</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/target/hotKey">
      <span class="tab-link">热门</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/target/fouce">
      <span class="tab-link">关注
      </span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/target/store">
      <span class="tab-link">商城</span>
    </router-link>
  </div>
</template>
<script>
export default {}
</script>
<style lang="less" scoped>
@import "../../common/less/z.less";
@import "../../common/less/variables";
.tab {
  background: @yellow;
  height: 60px;
  line-height: 60px;
  display: flex;
  text-align: center;
  padding: 0 50px;
  .tab-item {
    flex: 1;
    color: @white;
    .fl();
    .font-s(20px);
    .tab-link {
      padding-bottom: 5px;
    }
  }
  .router-link-active {
    .tab-link {
      border-bottom: 2px solid @white;
    }
  }
}
</style>
