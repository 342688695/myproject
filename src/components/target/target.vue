<template>
  <div class="target-wrapper">
    <tab></tab>
    <keep-alive>
    <router-view></router-view> 
    </keep-alive>
    <Cfooter></Cfooter>
  </div>
</template>

<script>
import Tab from '../tab/tab'
import Cfooter from '@/components/commonFooter/commonFooter'
export default {
  components: {
    Tab,
    Cfooter
  }
}
</script>

<style  scoped>
</style>
