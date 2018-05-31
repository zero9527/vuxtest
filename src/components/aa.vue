<template>
  <div class="aa">
    <p>{{msg}}</p>
    <h3>这是aac的儿子__aa</h3>
    <form action="" id='form'>
        <input type="file" id='file' multiple="" @click='upfile($event)'>
        <div id='picShow'>
          <span v-for='p in picshowList'>
            <span 
              class="delPic"
              :time='p.time'
              @click='delpic($event)'
              >X</span>
            <img :src="p.src" alt="">
          </span>
        </div>
    </form>
  </div>
</template>

<script>
import { upImg } from '../assets/js/upimg.js'
export default {
  name: 'aa',
  data () {
    return {
      msg: 'Welcome to AAB',
      picshowList: []
    }
  },
  mounted () {
    var vm = this;
    console.log('upimg: ',upImg);
    // var file = document.querySelector('#file');
    // file.onclick = function(){
    //   var _this = this;
    //   console.log('读取中...');
    //   // 显示loading 
    //   vm.$vux.loading.show({
    //     text: '读取中...'
    //   })
    //   // 读取图片
    //   upImg( _this, function(){
    //     // 压缩提示(不压缩不进来)
    //     console.log('图片压缩中...');
    //     vm.$vux.loading.show({
    //       text: '压缩中...'
    //     })

    //   }, function(res){
    //     console.log('res: ',res);
    //     // binsrc: 用于上传到服务器
    //     // src: 用于图片预览
    //     if(res.src){
    //       vm.picshowList.push({
    //         src: res.src,
    //         index: vm.picshowList.length
    //       })
    //     }
       
    //   })
    // }

  },
  methods: {
    upfile (e) {
      let vm = this;
      let _this = e.currentTarget;
      console.log('读取中...');
      // 显示loading 
      vm.$vux.loading.show({
        text: '读取中...'
      })
      // 读取图片
      upImg( _this, function(){
        // 压缩提示(不压缩不进来)
        console.log('图片压缩中...');
        vm.$vux.loading.show({
          text: '压缩中...'
        })

      }, function(res){
        console.log('res: ',res);
        // binsrc: 用于上传到服务器
        // src: 用于图片预览
        if(res.src){
          vm.picshowList.push({
            src: res.src,
            time: new Date().getTime()
          })
        }
       
      })
      setTimeout(function() {
        vm.$vux.loading.hide()
      },0);
    },
    delpic (img) {
      let vm = this;
      img = img.currentTarget;
      let time = img.getAttribute('time');
      let imgPar = img.parentNode;
      // console.log('img: ',img);
      // console.log('imgPar: ',imgPar);
      // 移除元素
      // imgPar.parentNode.removeChild(imgPar); 
      for(var i=0; i<vm.picshowList.length; i++){
        if(vm.picshowList[i].time == time){
          console.log('time: ',time);
          console.log('vm.picshowList[i]: ',vm.picshowList[i]);
          // 删除数据
          vm.picshowList.splice(i, 1);
        }
      }
      console.log('vm.picshowList: ',vm.picshowList);
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
