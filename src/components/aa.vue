<template>
  <div class="aa">
    <p>{{msg}}</p>
    <h3>这是aac的儿子__aa</h3>
    <form action="" id='form'>
        <input type="file" id='file' multiple="">
        <div id='picShow'>
          <span v-for='p in picshowList'>
            <span class="delPic" @click.native='delPic'>X</span>
            <img src="p.src" alt="">
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
    var file = document.querySelector('#file');
    file.onclick = function(){
        var _this = this;

        // 读取图片
        upImg( _this, function(){
            // 压缩提示(不压缩不进来)
            console.log('图片加载中...');

        }, function(res){
            console.log('res: ',res);
            
            if(res.src){
                vm.picshowList.src = res.src;
                console.log('vm.picshowList: ',vm.picshowList);
            }
        })
    }

  },
  methods: {
    // upfile (e) {

    //     // 读取图片
    //     upImg( e.currentTarget, function(){
    //         // 压缩提示(不压缩不进来)
    //         console.log('图片加载中...');

    //     }, function(res){
    //         console.log('res: ',res);
            
    //         if(res.src){
    //             picshowList.src = res.src;

    //             img.src = res.src;      // 显示图片
    //             span.appendChild(img);
    //             picShow.appendChild(span);
    //             // console.log(formdata.getAll('UploadForm[]'));
    //         }
    //     })
    // },
    delpic (img) {
      console.log('img: ',img);
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
