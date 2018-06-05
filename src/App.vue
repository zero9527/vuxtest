<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>
<style>
@import '../src/assets/css/common.css'
</style>
<style lang="less">
@import '~vux/src/styles/reset.less';
#navbar {display: none;}
body {
  background-color: #fbf9fe;
}
</style>
