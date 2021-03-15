<template>
	<div>
		<img v-if="$route.params.id==0" class="helpimg" src="../../assets/images/mine/help1.jpg" alt="">
		<img v-if="$route.params.id==1" class="helpimg" src="../../assets/images/mine/help2.jpg" alt="">
    <img v-if="$route.params.id==2" class="helpimg" src="../../assets/images/mine/help3.jpg" alt="">
		<img v-if="$route.params.id==3" class="helpimg" src="../../assets/images/mine/help4.jpg" alt="">	
	</div>
</template>

<style>
	.helpimg{width: 100%;margin-top: 0.5rem;}
</style>

<script>
export default {
  data(){
    return {
      
    }
  },
  created(){
    
  },
  methods: {
    getParams () {
        // 取到路由带过来的参数
        let routerParams = this.$route.params.id
        // 将数据放在当前组件的数据内
        this.msg = routerParams
      },
  },
  watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
      '$route': 'getParams'
    }
}
</script>
