<template>
	<div>
		<div class="bailogin_header">
			<img src="../../assets/images/sign/logo.png" alt="">
		</div>
		<router-link :to="{name:'loginphone'}">
			<div class="loginbtn2">
				<img class="login_sj" src="../../assets/images/mine/loginphone.png" alt=""/>
				<div class="left">输入手机号登录</div>
			</div>
		</router-link>
		<router-link :to="{name:'register',query:{id:1}}"><p class="newuser">注册新用户</p></router-link>
	</div>
</template>

<style>
	.bailogin_header{width: 100%;height: 13rem;}
	.bailogin_header>img{width: 5rem;height: 5rem;margin-top: 4rem;}
	.login_sj{width: 1.2rem;height: 1.2rem;float: left;margin:0.5rem 0.4rem 0px 4rem;}
	.loginbtn{background-color: #1AAD16;}
	.loginbtn2,.loginbtn{width: 90%;height: 2.2rem;color: #fff;border-radius: 50px;margin: 0 auto 0.5rem;line-height: 2.2rem;font-size: 0.85rem;}
	.loginbtn2{background-color: #611987;}
	.newuser{margin-top: 1.5rem;font-size: 0.8rem;text-decoration: underline;}
</style>

<script>
export default {
	data(){		
      return{
        
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