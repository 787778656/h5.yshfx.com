<template>
	<div>
		<div class="feed">
			<div class="feedtitle">
				<img class="feedicon" src="../../assets/images/mine/person.png" alt="">
				<div class="feedname">姓名</div>
			</div>
			<input class="feedinp" type="text" v-model="username" placeholder="请输入您的姓名">
			<div class="feedtitle">
				<img class="feedicon" src="../../assets/images/mine/phone.png" alt="">
				<div class="feedname">电话</div>
			</div>
			<input class="feedinp" type="text" v-model="userphone" placeholder="请输入您的电话">
			<div class="feedtitle">
				<img class="feedicon" src="../../assets/images/mine/mail.png" alt="">
				<div class="feedname">电邮地址</div>
			</div>
			<input class="feedinp" type="text" v-model="email" placeholder="请输入您的电邮地址">
			<div class="feedtitle">
				<img class="feedicon" src="../../assets/images/mine/file.png" alt="">
				<div class="feedname">意见及反馈</div>
			</div>
			<textarea class="feedarea" v-model="feedtext" placeholder="请在此填写您的意见及反馈"></textarea>
			<button class="feedbtn" @click="feedclick()">提&nbsp;&nbsp;&nbsp;交</button>
			<div class="loginbomb" v-if="phonemsgbox">{{phonemsg}}</div>
		</div>
	</div>
</template>

<style>
	.feed{padding: 0px 0.7rem;text-align: left;}
	.feedtitle{font-size: 0.75rem;height: 2rem;line-height: 2.3rem;}
	.feedicon{width: 0.7rem;height: 0.75rem;float: left;margin-top: 0.7rem;}
	.feedname{float: left;margin-left: 0.5rem;}
	.feedinp{width: 100%;height: 2rem;border: 1px solid #D8D8D8;font-size: 0.75rem;text-indent: 1em;}
	.feedarea{width: 94%;border: 1px solid #D8D8D8;height: 6.5rem;font-size: 0.75rem;padding: 3%;color: #333;}
	.feedbtn{width: 100%;height: 2.2rem;color: #fff;border-radius: 50px;background-color: #611987;
	border: none;outline: none;font-size: 0.9rem;margin-top: 2rem;}
	.loginbomb{padding: 0.5rem 1rem;width:5rem;background-color: rgba(0, 0, 0, 0.5);color: white;position: fixed;top: 40%;border-radius: 4px;
    left: 0px;right: 0px;margin: 0 auto;z-index: 11;text-align: center;}
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
        username:'',
		userphone:'',
		email:'',
		feedtext:''
      }
    },
    components:{
      
	},
	created(){
        const that = this;		
	},
	methods:{
		feedclick:function(){
			const that = this;
			if(that.username==""){                
                that.phonemsg = "请输入姓名";
                that.phonemsgbox = true;
                setTimeout(() => {
                    that.phonemsgbox = false;
                },1000)
            }else if(that.userphone==""){                
                that.phonemsg = "请输入手机号";
                that.phonemsgbox = true;
                setTimeout(() => {
                    that.phonemsgbox = false;
                },1000)
            }else if(that.userphone.length!=11){
                that.phonemsg = "手机号错误";
                that.phonemsgbox = true;
                setTimeout(() => {
                    that.phonemsgbox = false;
                },1000)
            }else if(that.feedtext==""){
                that.phonemsg = "请输入建议";
				that.phonemsgbox = true;
				setTimeout(() => {
                    that.phonemsgbox = false;
                },1000)
            }else{
                http.post('/api.signal/user_content', {name:that.username,mobile:that.userphone,email:that.email,message:that.feedtext})
				.then(function (res) {
                    console.log(res)					
					if(res.code == 200) {
                        that.phonemsg = "提交成功";
                        that.phonemsgbox = true;
                        setTimeout(() => {
							that.phonemsgbox = false;
							that.$router.push({path:'/Mine/mine',query:{}})
                            // window.location.href = {name:'mine'};
                        },1000)
                        
                    }else{
                        that.phonemsg = "提交失败";
                        that.phonemsgbox = true;
                        setTimeout(() => {
                            that.phonemsgbox = false;
                        },1000)
                    }
                }).catch(function (err) {
                    that.phonemsg = "提交失败";
                    that.phonemsgbox = true;
                    setTimeout(() => {
                        that.phonemsgbox = false;
                    },1000)
					console.log(err);
				});
            }
        },
	}

}
</script>