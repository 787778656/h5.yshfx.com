<template>
	<div>
        <div class="lowerlevel">请输入您邀请用户的微信昵称或手机号</div>
        <div class="lowerlevel_id">
            <div class="left">您的ID</div>
            <div class="right">
                <span class="lowerfont1">{{userid}}</span>
                <img class="lowerlevel_icon" src="../../assets/images/master/lock.png" alt="">
            </div>
        </div>
        <div class="loweradd_sele">添加用户的信息（请选择其中一项）</div>
		<div class="lowerorder">
            <div class="drawbox">
				<div class="left">昵称</div>
				<input class="drawinp" type="text" v-model="username" ref="drawinp" placeholder="请输入添加用户的昵称"/>
			</div>
			<div class="drawbox" style="border:none;">
				<div class="left">手机号</div>
				<input class="drawinp" type="text" v-model="userphone" ref="drawinp" placeholder="请输入添加用户的手机号"/>
			</div>
		</div>		
		<div class="draw_remark">
			<img class="tipicon" src="../../assets/images/master/tips.png" alt="">
			<p class="remarktext">该申请将由后台管理员审核并为您关联下级</p>
		</div>
		<button class="drawbtn" @click="showbomb()">提&nbsp;&nbsp;&nbsp;交</button>
		<div class="masterbomb" v-if="phonemsgbox">{{phonemsg}}</div>
	</div>
</template>

<script>
import http from '@/lib/http';
import { formatTime } from '@/lib/utils';
export default {
	data(){		
      return{
			phonemsgbox:false,
			phonemsg:'',
			userid:'',
			username:'',
			userphone:''
      }
    },
    components:{
      
	},
	created(){
		const that = this;
        // 个人信息接口
        http.post('/api.mobile/get_userinfo', {})
		.then(function (res) {					
			if(res.code == 200) {					
				var item = res.result;				
				// console.log(item);
				that.userid = item.uid;                
                
			}
        })
	},
	methods:{
		showbomb:function(){
			const that = this;
			if(that.username=='' && that.userphone==''){
				that.phonemsg = '请输入用户信息';
				that.phonemsgbox = true;
				setTimeout(() => {
					that.phonemsgbox = false;
				}, 1500);
			}else{
				http.post('/api.account/sid_update', {name:that.username,phone:that.userphone})
				.then(function (res) {
					if(res.code == 200) {
                        that.phonemsg = res.msg;
                        that.phonemsgbox = true;
                        setTimeout(() => {
                            that.phonemsgbox = false;
                            that.$router.push({path:'/Home/home'});
                        }, 1500);
                    }else{
                        that.phonemsg = res.msg;
                        that.phonemsgbox = true;
                        setTimeout(() => {
                            that.phonemsgbox = false;                            
                        }, 1500);
                    }
                }).catch(function (err) {
                    that.phonemsg = '修改失败';
                    that.phonemsgbox = true;
                    setTimeout(() => {
                        that.phonemsgbox = false;
                    }, 1000);
                });
			}
			
		}
	}

}
</script>

<style>
	@import '../../assets/css/recharge.css';
</style>
