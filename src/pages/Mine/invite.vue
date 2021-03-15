<template>
	<div>
		 <div class="invite">
			 <div class="share_tips">
				<div class="share_text">分享即可邀请好友</div>
				<span class="sharejiao"></span>
			</div>
		 </div>
		<div class="invite_menu">
			<div class="invite_box">
				<div class="invite_top">
					<img class="invite_head" :src="u_img" alt="">
					<div class="left">
						<p class="invite_name">{{nickname}}</p>
						<p class="invite_remark">邀请好友，攒人脉，赚更多</p>
					</div>
				</div>
				<div class="invite_code">
					<div class="invite_img">
						<img :src="img_path2" alt="">
						<!-- <img src="../../assets/images/master/9221_qr.png" alt=""> -->
					</div>
					<p>您的邀请码：{{uid}}</p>
				</div>
			</div>
			<button class="invitebtn">点击右上角分享</button>
		</div>
		
	</div>
</template>

<script>
import http from '@/lib/http';
import { globalData } from '@/lib/utils';
export default {
	data(){		
      return{
        nickname:'',
        u_img:'',
		img_path2:'',
		uid:'',
      }
    },
    components:{
      
	},
	created(){
		const that = this;
		// 个人信息
		http.post('/api.mobile/get_userinfo', {})
		.then(function (res) {					
			if(res.code == 200) {					
				var item = res.result;
				that.nickname = res.result.nickname;
				that.u_img = res.result.u_img;
				that.uid = res.result.uid;
				http.post('/api.mobile/getQRcode',{scene:"uid="+that.uid,width:430})
				.then((res) => {
					// console.log(res);
					var img = res.split('static.v.yshfx.com')[1];
					that.img_path2 = 'http://static.v.yshfx.com'+img;
				})
			}
		})
		
	},
	methods:{
		
	}

}
</script>

<style>
	.invite{width: 100%;height: 8rem;background: url(../../assets/images/mine/invitebanner.jpg) no-repeat center;
	background-size: cover;position: relative;}
	.invite_menu{padding: 2rem 1rem;}
	.invite_box{width: 75%;background-color: #fff;margin: 0 auto;}
	.invite_top{height: 1.7rem;padding: 0.7rem;border-bottom: 2px dashed #eee;text-align: left;}
	.invite_head{float: left;width: 1.8rem;height: 1.8rem;border-radius: 50%;margin-right: 0.5rem;}
	.invite_remark{color: #999;}
	.invite_name{font-weight: bold;}
	.invite_code{padding: 0.7rem;}
	.invite_img{width: 7rem;height: 7rem;border: 1px solid #EAE9E9;margin: 0 auto;}
	.invite_img>img{width: 100%;height: 100%;}
	.invite_code>p{margin-top: 0.5rem;color: #666;}
	.invitebtn{width: 100%;height: 2.2rem;background-color: #611987;color: white;margin: 3rem auto 1rem;border:none;border-radius: 50px;font-size: 1rem;
		display: block;}
	.share_tips{height: 1.4rem;background: #fff;color: #666;border-radius: .7rem;position: absolute;top:0.8rem;right:0.4rem;font-size: .54rem;z-index: 2;padding: 0 .4rem;}
	.share_text{float: left;line-height: 1.4rem;margin-right: .4rem;position: relative;}
	.sharejiao {
		position: absolute;
		content: "";
		border-width: 0.3rem;
		border-style: solid;
		border-color: transparent transparent #fff #fff;
		transform: rotate(135deg);
		right: 1rem;
		top: -0.25rem;
	}

</style>