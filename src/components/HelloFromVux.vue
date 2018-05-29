<template>
  <div>
    <div class="vux-demo">
      <img class="logo" src="../assets/vux_logo.png">
      <h1> </h1>
    </div>
    <group title="cell demo">
      <cell title="VUX" value="cool" is-link></cell>
    </group>
    <router-link to='/aac'><x-button>aac</x-button></router-link>
    <x-button @click.native='tobbb'>bbb</x-button>
    <!-- loading -->
    <div style="padding: 15px;">
      <x-button @click.native="showLoading" type="primary">显示loading (2s后关闭)</x-button>
    </div>
    <!-- 地图 -->
    <div>
      <group>
        <x-address @on-hide="logHide" @on-show="logShow" :title="title" v-model="value" :list="addressData" @on-shadow-change="onShadowChange" placeholder="请选择地址" inline-desc="可以设置placeholder" :show.sync="showAddress"></x-address>
        <cell title="上面value值" :value="value"></cell>
      </group>
    </div>
    <!-- 日期 -->
    <group title="noon">
      <datetime title="noon" v-model="noonValue" format="YYYY-MM-DD A"></datetime>
    </group>
    <!-- 轮播图 -->
    <div class='swiper'>
      <swiper :list="demo01_list" v-model="demo01_index" @on-index-change="demo01_onIndexChange"></swiper>
    </div>
    <!-- 图片预览 -->
    <img class="previewer-demo-img" v-for="(item, index) in preimgList" :src="item.src" width="100" @click="show(index)">
    <div v-transfer-dom>
      <previewer :list="preimgList" ref="previewer" :options="preimgoptions" @on-index-change="logIndexChange"></previewer>
    </div>
  </div>
</template>
<!-- 
<i18n>
Show loading:
  en: show loading (close in 2s)
</i18n> -->

<script>
import { Group, Cell, XAddress, ChinaAddressV4Data, Value2nameFilter as value2name, Datetime, Swiper, Previewer, TransferDom } from 'vux'

// 轮播图图片
const baseList = [{
  url: 'javascript:',
  img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg',
  title: '送你一朵fua'
}, {
  url: 'javascript:',
  img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg',
  title: '送你一辆车'
}, {
  url: 'javascript:',
  img: 'https://static.vux.li/demo/5.jpg', // 404
  title: '送你一次旅行',
  fallbackImg: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg'
}]

export default {
  directives: {
    TransferDom,
  },
  components: {
    Group,
    Cell,
    XAddress,     // 地址
    Datetime,     // 日期插件
    Swiper,       // 轮播图
    Previewer,    // 图片预览
    TransferDom,  // 过度效果
  },
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      title: '标题',
      showAddress: false,
      msg: 'Hello World!',
      value: [],
      noonValue: '2018-04-13 PM',
      addressData: ChinaAddressV4Data,
      demo01_list: baseList,
      demo01_index: 0,
      preimgList: [
        {
          msrc: 'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
          src: 'http://ww1.sinaimg.cn/large/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
          w: 800,
          h: 400
        },
        {
          msrc: 'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwvqwuoaj20xc0p0t9s.jpg',
          src: 'http://ww1.sinaimg.cn/large/663d3650gy1fplwvqwuoaj20xc0p0t9s.jpg',
          w: 1200,
          h: 900
        },
        {
          msrc: 'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwwcynw2j20p00b4js9.jpg',
          src: 'http://ww1.sinaimg.cn/large/663d3650gy1fplwwcynw2j20p00b4js9.jpg'
        }
      ],
      preimgoptions: {
        getThumbBoundsFn (index) {
          // find thumbnail element
          let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
          // get window scroll Y
          let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
          // optionally get horizontal scroll
          // get position of element relative to viewport
          let rect = thumbnail.getBoundingClientRect()
          // w = width
          return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
          // Good guide on how to get element coordinates:
          // http://javascript.info/tutorial/coordinates
        }
      },
      logIndexChange (arg) {
        console.log(arg)
      }
    }
  },
  methods: {
    tobbb (e){
      this.$router.push('/bbb');
      console.log(e);
    },
    showLoading () {
      this.$vux.loading.show({
        text: 'Loading'
      })
      setTimeout(() => {
        this.$vux.loading.hide()
      }, 2000)
    },
    doShowAddress () {
      this.showAddress = true
      setTimeout(() => {
        this.showAddress = false
      }, 2000)
    },
    onShadowChange (ids, names) {
      console.log(ids, names)
    },
    changeData () {
      this.value2 = ['430000', '430400', '430407']
    },
    changeDataByLabels () {
      this.value2 = ['广东省', '广州市', '天河区']
    },
    changeDataByLabels2 () {
      this.value2 = ['广东省', '中山市', '--']
    },
    getName (value) {
      return value2name(value, ChinaAddressV4Data)
    },
    logHide (str) {
      console.log('on-hide', str)
    },
    logShow (str) {
      console.log('on-show')
    },
    demo01_onIndexChange (index) {
      this.demo01_index = index
    },
    show (index) {
      this.$refs.previewer.show(index)
    }
  }
}
</script>

<style scoped>
.vux-demo {
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px
}
.copyright {
  font-size: 12px;
  color: #ccc;
  text-align: center;
}
.text-scroll {
  border: 1px solid #ddd;
  border-left: none;
  border-right: none;
}
.text-scroll p{
  font-size: 12px;
  text-align: center;
  line-height: 30px;
}
.black {
  background-color: #000;
}
.title{
  line-height: 100px;
  text-align: center;
  color: #fff;
}
.animated {
  animation-duration: 1s;
  animation-fill-mode: both;
}
.vux-indicator.custom-bottom {
  bottom: 30px;
}
@-webkit-keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  100% {
    opacity: 1;
    transform: none;
  }
}
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  100% {
    opacity: 1;
    transform: none;
  }
}
.fadeInUp {
  animation-name: fadeInUp;
}
.swiper-demo-img img {
  width: 100%;
}
.swiper,
.previewer-demo-img {
  margin: 2vh 0;
}
</style>
