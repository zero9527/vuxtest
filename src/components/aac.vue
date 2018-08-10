<template>
  <div class="aac">
    <p>{{msg}}</p>
    <router-link to='/'>
      <x-button>当前顶级路由</x-button>
    </router-link>
    <!-- 上传文件 upnum 为最大上传图片数量 -->
    <upimg :upnum='upnum'></upimg>
    <x-button @click.native='back'>后退</x-button>

    <!-- 将time传给子组件 cc，然后cc 用props接 -->
    <!-- <cc :time='time' @cc-son='receiveFromCc'></cc> -->

    <!-- 跳转到 ddd 假装是 aac的儿子-->
    <router-link to='/aac/list_state'>
      <x-button>同级？子？组件list_state</x-button>
    </router-link>
    <!-- 以上aa, cc 是当前组件aac 的嵌套路由，将被渲染在下面router-view中 -->
    <!-- <router-view></router-view> -->
    <group title='来自vuex的数据'>
      <p>{{$store.state.count}}</p>
      <p>{{$store.state.text}}</p>
    </group>
  </div>
</template>

<script>
import Bus from '../eventbus'
import upimg from '@/components/upimg'
// import cc from '@/Components/cc'

import store from '../assets/js/store.js'
export default {
  name: 'aac',
  store,
  components: {
    // cc,
    upimg
  },
  data () {
    return {
      msg: 'Welcome to aac',
      time: '来自aac ' + new Date(),
      name: 'haha',
      upnum: 3, // 图片数量
    }
  },
  methods: {
    // 后退
    back () {
      history.back();
    },
    // 接收子组件 cc emit来的数据
    receiveFromCc (data) {
      console.log('ccData: ',data);
    },
    getupimg (img) {
      // 接收的img
      console.log('img: ',img)
    }
  },
  created () {
    // console.log('router: ',this.$router);
    // 接收upimg组件 $emit的upimg数据
    Bus.$on('upimg', this.getupimg);
    console.log('count: ',this.$store);
  },
  destroyed (){
    // 注销事件
    Bus.$off('upimg',this.getupimg);
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
