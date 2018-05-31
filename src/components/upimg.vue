<template>
  <div class="upimg">
    <input :type="maxnum ? 'button' : 'file'" :value='maxnum ? "达到最大数量" : ""' id='file' multiple="" @click='upfile($event)'>
    <div id='picShow'>
      <span v-for='p in picshowList'>
        <span 
          class="delPic"
          :time='p.time'
          @click='delpic($event)' >X</span>
        <img :src="p.src" alt="">
      </span>
    </div>
    <toast v-model='showToast' type="text" :time="800" is-show-mask :text="toastext" :position="toastP"></toast>
  </div>
</template>

<script>
// 图片上传插件
import Bus from '../eventbus'
import { upImg } from '../assets/js/upimg.js'
export default {
  name: 'upimg',
  props: ['upnum'],
  data () {
    return {
      picshowList: [],
      imgnum: 1,  // 图片数量（父组件传）
      maxnum: false,
      toastext: '',
      showToast: false,
      toastP: 'top'
    }
  },
  created () {
    // 接收父组件的数据
    this.imgnum = this.upnum;
    // console.log('this.upnum: ',this.upnum);
  },
  mounted () {
    var vm = this;
    console.log('upimg: ',upImg);
  },
  methods: {
    // toast 弹窗
    toastFn (toastP, text) {
      this.toastP = toastP
      this.showToast = true
      this.toastext = text
    },
    upfile (e) {
      let vm = this;
      let _this = e.currentTarget;
      console.log('this.upnum: ',vm.upnum);
      console.log('vm.picshowList.length: ',vm.picshowList.length);
      console.log('读取中...');

      if(vm.picshowList.length+1 == vm.imgnum) {
        vm.maxnum = true;
      }
      if(vm.picshowList.length == vm.imgnum){
        vm.toastFn('top', `最多只能传${vm.upnum}张`);
        console.log(`最多只能传${vm.upnum}张`);
        
      }else{
        // 显示loading 
        vm.$vux.loading.show({
          text: '读取中...'
        })
      }
      // 读取图片
      upImg( _this, function(){
        // 压缩提示(不压缩不进来)
        console.log('图片压缩中...');
        vm.$vux.loading.show({
          text: '压缩中...'
        })

      }, function(res){
        vm.$vux.loading.hide()
        // console.log('res: ',res);
        // binsrc: 用于上传到服务器
        // src: 用于图片预览
        if(res.src){
          vm.picshowList.push({
            binsrc: res.binsrc,
            src: res.src,
            time: new Date().getTime()
          })
          vm.upbus();
        }
       
      })
      setTimeout(function() {
        vm.$vux.loading.hide()
      },1000);

    },
    // 点击 xx 移除元素
    delpic (img) {
      let vm = this;
      img = img.currentTarget;
      let time = img.getAttribute('time');
      let imgPar = img.parentNode;
      for(var i=0; i<vm.picshowList.length; i++){
        if(vm.picshowList[i].time == time){
          // console.log('vm.picshowList[i]: ',vm.picshowList[i]);
          // 删除数据
          vm.picshowList.splice(i, 1);
          vm.upbus();
        }
      }
      if(vm.picshowList.length < vm.upnum){
        vm.maxnum = false;
      }
      // console.log('vm.picshowList: ',vm.picshowList);
    },
    upbus () {
      Bus.$emit('upimg', this.picshowList);
    },
    beforeDestroy () {
      this.upbus();
    },
    destroyed () {
      // 注销事件
      Bus.$off('upimg', this.upbus);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  @import '../assets/css/upimg.less';
</style>
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
