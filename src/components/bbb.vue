<template>
  <div class="hello">
    <p>{{msg}}</p>
    <p>来自cc的数据：{{ccdata}}</p>
  </div>
</template>

<script>

import Bus from '../eventbus'
export default {
  name: 'BBB',
  data () {
    return {
      msg: 'Welcome to Bbb',
      ccdata: '',   // 来自cc的数据（eventbus）
    }
  },
  created () {
    // 监听 cc 传递的数据(eventbus)
    Bus.$on('fromcc', this.getcc);
  },
  methods: {
    getcc (val) {
      console.log('val: ', val);
      this.ccdata = val;
    }
  },
  beforeDestroy () {
    // 注销事件（防止多次触发，新旧组件都要）
    Bus.$off('fromcc', this.getcc);
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
