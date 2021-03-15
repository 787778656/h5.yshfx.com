<template>
	<div>
		<ul class="question">
			<router-link :to="'/question/'+item.id" v-for="(item,index) in helplist" :key="index">
				<li>
					<div class="questionbox">
						<div>{{item.text}}</div>
						<img class="right_gray" src="../../assets/images/master/right_icon2.png">
					</div>
				</li>
			</router-link>
		</ul>	
	</div>
</template>

<style>
	.question{background-color: #fff;}
	.question>a>li{border-bottom: 1px solid #DEDFE0;padding: 0 0.7rem;color: #333;}
	.questionbox{height: 2.3rem;line-height: 2.3rem;}
	.right_gray{width: 0.55rem;height: 0.8rem;float: right;margin-top: 0.6rem;}
	.questionbox>div{float: left;}
</style>

<script>
export default {
	data(){		
      return{
        helplist:[
			{id:0,text:'亿思汇概述'},
			{id:1,text:'操作流程/风控设置'},
			{id:2,text:'数据/图表'},
			{id:3,text:'服务收费'}
		]
      }
    },
    components:{
      
	},
	created(){
		
	},
	methods:{
		
	}

}
</script>