<template>
  <div class="es6">
  	<h4 class='tcenter estitle'>{{msg}}</h4>
  </div>
</template>

<script>
export default {
  name: 'es6',
  data () {
  	return {
  		msg: 'es6练习',
  	}
  },
  created () {
  	/**
  	 * 1、数组排序
  	 */
  	let arr = [1,23,234,56,1,4356,23];
  	// es5: 
  	let newarr = [];
  	arr.forEach(function(item, index){
  		if(newarr.indexOf(item) < 0){
  			newarr.push(item);
  		}
  	})
  	console.log('newarr: ',newarr);

  	// es6: 
  	arr = [...new Set(arr)];
  	console.log('arr: ',arr);
  	//++++++++++++++++
  	
  	/**
  	 * 2、数组排序
  	*/
  	// sort方法
  	arr.sort(function(x, y){
  		return x-y
  	})
  	console.log('arr: ',arr);

  	// 冒泡排序
  	let arr1 = [1,23,234,56,1,4356,23];
  	arr1 = [...new Set(arr1)];
  	for(var i=0; i<arr1.length; i++){
  		for(var j=i+1; j<arr1.length; j++){
  			if(arr1[i] > arr1[j]){
	  			var tump = arr1[i];
	  			arr1[i] = arr1[j];
	  			arr1[j] = tump;
	  		}
  		}
  	}
  	console.log('arr1: ',arr1);

  	// 判断是否整数
  	console.log(11%1 === 0);
  	
  }
}
</script>

<style lang="less">
.estitle {
	padding: 10px 0;
	border-radius: 0 0 6px 6px;
	box-shadow: 0 0 1px rgba(0,0,0,.3);
}
</style>
