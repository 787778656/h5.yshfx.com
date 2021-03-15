<template>
	<div class="loginphone_out">
        <div class="bailogin_header2">
            <img src="../../assets/images/sign/logo.png" alt="">
        </div>
        <div class="lpbox">
            <div class="lpmenu">
                <img class="lpmenuimg" src="../../assets/images/sign/id_icon.png" alt="">
                <input class="lpmenuinp" v-model="phonenum" type="number" placeholder="请输入您的手机号"/>
            </div>
            <div class="lpmenu">
                <img class="lpmenuimg" src="../../assets/images/sign/password_icon.png" alt="">
                <input class="lpmenuinp" type="text" v-model="password" placeholder="请输入密码"/>
            </div>
            <button class="lpbtn" @click="login()">登&nbsp;&nbsp;&nbsp;录</button>
            <router-link :to="{name:'register',query:{id:2}}"><div class="login_forget">忘记密码？</div></router-link>
        </div>
        <router-link :to="{name:'register',query:{id:1}}"><p class="newuser">注册新用户</p></router-link>
        <div class="loginbomb" v-if="phonemsgbox">{{phonemsg}}</div>
	</div>	
</template>

<style>
    .loginphone_out{background-color: #fff;padding-bottom: 5rem;}
	.bailogin_header2{width: 100%;height: 13rem;}
	.bailogin_header2>img{width: 5rem;height: 5rem;margin-top: 4rem;}
    .newuser{margin-top: 1.5rem;font-size: 0.8rem;text-decoration: underline;}
    .lpbox{padding: 0px 1rem;background-color: #fff;}
    .lpbtn{width: 100%;height: 2.2rem;border-radius: 50px;color: white;border: none;outline: none;font-size: 0.85rem;background-color: #611987;}
    .lpmenu{width: 100%;height: 2.2rem;margin-bottom: 0.8rem;}
    .lpmenuimg{width: 1.5rem;height: 1.5rem;margin-right: 0.5rem;float: left;margin-top: 0.35rem;float: left;}
    .lpmenuinp{width: 87%;border: 1px solid #611987;outline: none;text-indent: 1em;font-size: 0.8rem;height: 2.2rem;border-radius: 50px;}
    .loginbomb{padding: 0.5rem 1rem;width:4rem;background-color: rgba(0, 0, 0, 0.5);color: white;position: fixed;top: 40%;border-radius: 50px;
    left: 0px;right: 0px;margin: 0 auto;z-index: 11;}
    .login_forget{text-align: right;margin-top: 0.5rem;text-decoration: underline;color: #611987;}
</style>
<script>
import http from '@/lib/http';
import { globalData } from '@/lib/utils';
import { checkIdcard } from '@/lib/verify';
export default {
	data(){		
      return{
        isShow:false,
        phonemsg:'暂无消息',
        phonemsgbox:false,
        phonenum:'',
        password:'',
      }
    },
    components:{
      
	},
	created(){
        const that = this;
		
	},
	methods:{
		login:function(){
            const that = this;        
            if(that.phonenum==""){                
                that.phonemsg = "请输入手机号";
                that.phonemsgbox = true;
                setTimeout(() => {
                    that.phonemsgbox = false;
                },1000)
            }else if(that.password==""){
                that.phonemsg = "请输入密码";
                that.phonemsgbox = true;
            }else if(that.phonenum.length!=11){
                that.phonemsg = "手机号错误";
                that.phonemsgbox = true;
                setTimeout(() => {
                    that.phonemsgbox = false;
                },1000)
            }else{
                http.post('/api.mobile/signin', {login:that.phonenum,password:that.password})
				.then(function (res) {
                    // console.log(res)					
					if(res.code == 200) {
                        localStorage.setItem("token",res.result.token);           
                        globalData.token = localStorage.token;
                        // console.log(localStorage.token)
                        that.phonemsg = "登录成功";
                        that.phonemsgbox = true;
                        setTimeout(() => {
                            that.phonemsgbox = false;
                            // path + '?id=' + id;
                            // this.$router.push({path:'/Home/home',query:{token:localStorage.toke}});
                            window.location.href = '/wap/index?token='+localStorage.token;
                        },1000)
                        
                    }else{
                        that.phonemsg = "登录失败";
                        that.phonemsgbox = true;
                        setTimeout(() => {
                            that.phonemsgbox = false;
                        },1000)
                    }
                })
            }
        },
	}

}
</script>
