<template>
	<div>
		<div class="ausection">
            
			<div class="zhinamebox" style="border:none;">
				<div class="left">
					<img class="zhi_nameright" src="../../assets/images/mine/s_account.png" alt="">
					<div class="left">昵称</div>
				</div>
				<div class="right">
					<!-- <img class="lock" src="../../assets/images/master/right_icon2.png"> -->
					<div class="right">{{nikename}}</div>
				</div>
			</div>
            					
		</div>
		<button class="exitbtn" @click="exitlogin()">退出登录</button>
	</div>	
</template>

<style>
	.ausection{background-color: #fff;border-top: 1px solid #DEDFE0;border-bottom: 1px solid #DEDFE0;
		padding: 0px 0.7rem;margin-top: 0.5rem;}
	.ausection>.zhinamebox:nth-child(2){border: none;}
	.zhinamebox{height: 2.3rem;border-bottom: 1px solid #DEDFE0;line-height: 2.3rem;font-size: 0.85rem;}
	.phototext,.zhi_nameleft{width: 27%;float: left;text-align: left;}
	.zhi_nameright{width: 1rem;float: left;height: 1rem;border:none;float: left;margin-top: 0.65rem;margin-right: 0.5rem;}
	.sectionright{float: left;width: 72%;height: 2.3rem;}
	.submit{width: 93%;height: 2.2rem;background-color: #DC4537;color: white;margin: 3rem auto 1rem;border:none;border-radius: 6px;font-size: 1.1rem;
		display: block;}
	.lock{width: 0.5rem;height: 0.9rem;margin-left: 0.5rem;float: right;margin-top: 0.65rem;}
	.exitbtn{background-color: #fff;border-top: 1px solid #DEDFE0;border-bottom: 1px solid #DEDFE0;height: 2.5rem;width: 100%;margin-top: 0.5rem;
	border-left: none;border-right: none;font-size: 0.95rem;}
</style>
<script>
import http from '@/lib/http';
import { globalData } from '@/lib/utils';
export default {
	data(){		
      return{
        nikename:''
      }
    },
    components:{
      
	},
	created(){
		const that = this;
		that.nikename = globalData.nickname;
	},
	methods:{
		exitlogin:function(){
			const that = this;
			localStorage.clear();
			that.$router.push({path:'/login',query:{}});
		}
	}

}
</script>
