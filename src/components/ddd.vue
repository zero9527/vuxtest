<template>
  <div class="hello">
    <p>{{msg}}</p>
    <h3>这是aac的假儿子ddd</h3>
    <x-table>
      <thead>
        <tr>
          <th>姓名</th>
          <th>时间</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for='d in data' @click='detail(d.name)'>
          <td>{{d.name}}</td>
          <td>{{d.time}}</td>
        </tr>
      </tbody>
    </x-table>
    <toast v-model='showToast' type="text" :width='toastwidth' :time="toasttime" is-show-mask :text="toastext" :position="toastP"></toast>
    <div class='loadmore' v-show='more' @click='loadmore'>加载更多...</div>
  </div>
</template>

<script>
import Bus from '../eventbus'
import { XTable } from 'vux'
export default {
  name: 'ddd',
  components: {
    XTable
  },
  data () {
    return {
      msg: 'Welcome to ddd',
      data: [],
      rawdata: [],
      more: true,
      page: 0,
      toastext: '',
      toasttime: 800,
      toastwidth: 'auto',
      showToast: false,
      toastP: 'top',
      pagedata: '',
    }
  },
  created () {
    let vm = this;
    if(!vm.pagedata){
      vm.$ajax.get('src/assets/data.json')
      .then(function(res){
        res.data.forEach(function(item, index){
          item.time = getLocalTime(item.time);
        })
        // 数据分组
        vm.getGroup(res.data, function(res){
          vm.data = res;
        });
      })
      .catch(function(err){
        console.log('err: ',err);
      })
    }

    // 状态保持
    Bus.$on('pagedata', vm.datarestore);
  },
  methods: {
    // toast 弹窗
    toastFn (toastP, text) {
      this.toastP = toastP
      this.showToast = true
      this.toastext = text
    },
    // 数据分组
    getGroup (val, callback) {
      let vm = this;
      let arr = []; // 存放分组后的数据
      for(var i=0; i<val.length; i++){
        if((i/10)%1 === 0){ // 10的倍数
          // console.log('i: ',i);
          arr.push([]);
          for(var j=i; j<val.length; j++){
            if(j < (i+10)){   // 按每10个一组
              // console.log('val[j]: ',val[j]);
              arr[arr.length-1].push(val[j]);
            }
          }

        }
      }
      console.log('arr: ',arr);
      // 原始数据
      vm.rawdata = arr;
      // 把第一组数据发出去
      callback(arr[0]);
    },
    // 加载更多
    loadmore () {
      // console.log('page: ',this.page);
      // console.log('data: ',this.data);
      // console.log('rawdata: ',this.rawdata);
      if(this.page+1 >= this.rawdata.length){
        console.log('暂无数据');
        this.toastFn('top', '暂无数据');
        this.more = false;
      }else{
        // 每点一次加载更多，page+1直到无数据
        // 按页数取分组数据
        this.page++;
        for(var i=0; i<this.rawdata[this.page].length; i++){
          this.data.push(this.rawdata[this.page][i]);
        }
      }
    },
    // 获取详情数据
    detail (name) {
      this.$router.push('/ddd/detail'+'?name=' + name);
    },
    // 数据恢复（状态恢复）
    datarestore (pagedata, callback) {
      let vm = this;
      vm.pagedata = pagedata;
      console.group();
      console.log('before_data: ',vm.data);
      vm.data.length = 0;
      for(var i=0; i<pagedata.length; i++){
        vm.data.push({
          name: pagedata[i].name,
          time: pagedata[i].time,
          city: pagedata[i].city,
          age: pagedata[i].age
        })
      }
      console.log('after_data: ',vm.data);
      console.groupEnd();
      callback(pagedata);
    },
    getStore (data){
      console.log('data: ',data);
    }
  },
  beforeDestroy () {
    let vm = this;
    // Bus.$emit('page', vm.page);
    Bus.$emit('pagedata', vm.data);
  },
  destroyed () {
    let vm = this;
    // Bus.$off('page', vm.page);
    Bus.$off('pagedata');
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.loadmore {
  text-align: center;
  border-top: 1px solid #eee;
}
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
