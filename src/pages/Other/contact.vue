<template>
	<div>
		<ul class="contactbox">
            <li v-for="(item,index) in contact" :key="index">
                <div class="questionbox">
                    <div class="left">{{item.text}}</div>
                    <div class="right">{{item.phone}}</div>
                </div>
            </li>
		</ul>	
	</div>
</template>

<style>
	.contactbox{background-color: #fff;margin-top: 0.5rem;border-top: 1px solid #DEDFE0;}
	.contactbox li{border-bottom: 1px solid #DEDFE0;padding: 0 0.7rem;color: #333;}
	.questionbox{height: 2.3rem;line-height: 2.3rem;}
	.right_gray{width: 0.55rem;height: 0.8rem;float: right;margin-top: 0.6rem;}
</style>

<script>
export default {
	data(){		
      return{
        contact:[
			{id:0,text:'客服QQ',phone:'632131300'},
			{id:1,text:'客服微信',phone:'cslj999'},
			{id:2,text:'客服电话',phone:'4000603758'},
			{id:3,text:'客服邮箱',phone:'yshfx888@163.com'}
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