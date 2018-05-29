<template>
  <div class="hello">
    <p>{{msg}}</p>
    <router-link to='/'>
      <x-button>当前顶级路由</x-button>
    </router-link>
    <x-button @click.native='back'>后退</x-button>
    <router-link to='/aac/aa'>
      <x-button>aa</x-button>
    </router-link>
    <router-link to='/aac/cc'>
      <x-button>cc</x-button>
    </router-link>
    <router-link to='/bbb'>
      <x-button>同级组件bbb</x-button>
    </router-link>
    <!-- 跳转到 ddd 假装是 aac的儿子-->
    <router-link to='/aac/ddd'>
      <x-button>同级？子？组件ddd</x-button>
    </router-link>
    <!-- 以上aa, cc将被渲染在下面router-view中 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'aac',
  data () {
    return {
      msg: 'Welcome to aac'
    }
  },
  methods: {
    // 后退
    back () {
      history.back();
    }
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
