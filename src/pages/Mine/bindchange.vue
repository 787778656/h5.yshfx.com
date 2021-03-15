<template>
	<div>
		<div class="title">账号绑定</div>
		<div class="ausection3">
            <router-link to="/bindphone">
                <div class="zhinamebox" style="border:none;">
                    <img class="zhi_nameright" src="../../assets/images/mine/bindphone.png" alt="">
                    <div class="left">绑定手机号</div>
                    <img class="lock" src="../../assets/images/master/right_icon2.png">
                </div>
            </router-link>			
		</div>
	</div>	
</template>

<style>
	.title{background-color: #F7F7F9;height: 2.3rem;line-height: 2.3rem;color: #555;padding: 0px 0.7rem;text-align: left;}
	.ausection3{background-color: #fff;border-top: 1px solid #DEDFE0;border-bottom: 1px solid #DEDFE0;
		padding: 0px 0.7rem;}
	.ausection>.zhinamebox:nth-child(2){border: none;}
	.zhinamebox{height: 2.3rem;border-bottom: 1px solid #DEDFE0;line-height: 2.3rem;}
	.phototext,.zhi_nameleft{width: 27%;float: left;text-align: left;}
	.zhi_nameright{width: 1rem;float: left;height: 1rem;border:none;float: left;margin-top: 0.65rem;margin-right: 0.5rem;}
	.sectionright{float: left;width: 72%;height: 2.3rem;}
	.submit{width: 93%;height: 2.2rem;background-color: #DC4537;color: white;margin: 3rem auto 1rem;border:none;border-radius: 6px;font-size: 1rem;
		display: block;}
	.lock{width: 0.5rem;height: 0.9rem;margin-left: 0.5rem;float: right;margin-top: 0.65rem;}
	
</style>
<script>
export default {
	data(){		
      return{
        isShow:false
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
