<template>
  <div class="__cc">
    <p>{{msg}}</p>
    <h3>这是aac的儿子__cc</h3>
    <p>{{cctime}}</p>
    <x-button @click.native='uo2baba'>孝敬一下爸爸</x-button>
    <router-link to='/bbb'><x-button>eventbus 传值 给 tobbb</x-button></router-link>
  </div>
</template>

<script>

import Bus from '../eventbus'
export default {
  name: 'cc',
  // props 接收来自父亲的值
  props: ['time'],
  data () {
    return {
      msg: 'Welcome to cc',
      // 将来自父亲的值保存下来
      cctime: this.time,
      tocc: '嘿嘿cc发出的数据'
    }
  },
  methods: {
    // 传值给爸爸组件
    uo2baba () {
      this.$emit('cc-son', '10000元');
    },
    // 传数据给 bbb (eventbus)
    tobbb () {
      Bus.$emit('fromcc', this.tocc);
    }
  },
  beforeDestroy () {
    // 这个时候接收的组件已经created了，可以监听到数据
    this.tobbb();

  },
  destroyed () {
    // 注销事件（防止多次触发，新旧组件都要）
    Bus.$off('fromcc', this.tocc);
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
