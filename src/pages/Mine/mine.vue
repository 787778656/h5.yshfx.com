<template>
	<div>
		<div class="mybanner">
			<div class="bannertop">
				<div class="bantop_left" v-if="token!=undefined">
					<img v-if="userInfo.u_img=='' || userInfo.u_img=='http://static.v.yshfx.com/upload/image/'" src="../../assets/images/master/trade_head.png" alt=""/>
					<img v-else :src="userInfo.u_img"/>
					<span v-if="userInfo.nickname==''">{{userInfo.login}}</span>
					<span v-else>{{userInfo.nickname}}</span>
				</div>
				<router-link to="/detail" class="bantop_right">
					<img src="../../assets/images/mine/w_right.png"/>
					<span>明细</span>
				</router-link>
			</div>
			<router-link v-if="token=='' || token==undefined" :to="{name:'loginphone'}"><div class="mine_nologin">未登录，点击登录</div></router-link>
			<div v-else>
				<p>总资产(元)</p>
				<p class="money">{{totalmoney}}</p>			
				<p>可用余额(元)：{{imoney}}</p>
			</div>
		</div>
		<div class='account_pay'>
			<router-link to="/withdrawal" class='account_pay_list' style='border-right:none;'>
				<img src='../../assets/images/mine/tx.png' class='account_pay_icon'/>
				<div class='account_pay_t'>提现</div>
				<div class="order_right">
					<img src="../../assets/images/master/right_icon2.png" alt=""/>
				</div>
			</router-link>
		</div>
		<ul class="mineorder">
			<router-link :to="item.href" v-for="(item,index) in minelist1" :key="index">
				<li>
					<div class="orderleft">
						<img :src="item.img" alt=""/>
						<div>{{item.text}}</div>
					</div>
					<div class="order_right">
						<img src="../../assets/images/master/right_icon2.png" alt=""/>
					</div>
				</li>
			</router-link>
		</ul>
		<ul class="mineorder">
			<router-link :to="item.href" v-for="(item,index) in minelist3" :key="index">
				<li>
					<div class="orderleft">
						<img :src="item.img" alt=""/>
						<div>{{item.text}}</div>
					</div>
					<div class="order_right">
						<img src="../../assets/images/master/right_icon2.png" alt=""/>
					</div>
				</li>
			</router-link>
		</ul>
		<ul class="mineorder">
			<router-link :to="item.href" v-for="(item,index) in minelist4" :key="index">
				<li>
					<div class="orderleft">
						<img :src="item.img" alt=""/>
						<div>{{item.text}}</div>
					</div>
					<div class="order_right">
						<img src="../../assets/images/master/right_icon2.png" alt=""/>
					</div>
				</li>
			</router-link>
		</ul>

		<ul class="mineorder">
			<router-link :to="item.href" v-for="(item,index) in minelist5" :key="index">
				<li>
					<div class="orderleft">
						<img :src="item.img" alt=""/>
						<div>{{item.text}}</div>
					</div>
					<div class="order_right">
						<div class="order_righttext">{{item.remark}}</div>
						<img src="../../assets/images/master/right_icon2.png" alt=""/>
					</div>
				</li>
			</router-link>
		</ul>
		<div class="loginbomb" v-if="phonemsgbox">{{phonemsg}}</div>
		<!-- 占位盒子 -->
		<div class="seat"></div>
		<!--div class="minelogin" v-if="phonemsgbox2">
			<div class="minelogin_out">
				<router-link :to="{name:'login'}"><button class="minelogin_btn">注册/登录</button></router-link>
			</div>
		</div>-->
	</div>
</template>
<style>
	@import '../../assets/css/mine.css';
</style>

<script type="text/ecmascript-6">
import http from '@/lib/http';
import { globalData } from '@/lib/utils';
  export default {
    data(){
      return{
        minelist1:[
          	// {id:0, text: '绑定手机',img:require('../../assets/images/mine/phone1.png'),href:'/bindchange'},
			{id:0, text: 'MT4管理',img:require('../../assets/images/mine/mt41.png'),href:'/allmt4'},
			{id:1, text: '账号设置',img:require('../../assets/images/mine/set1.png'),href:'/setting'}
		],
		minelist3:[
          	{id:0, text: '跟单设置',img:require('../../assets/images/mine/setting1.png'),href:{name:'follow'}},
			{id:1, text: '上传信号',img:require('../../assets/images/mine/upload1.png'),href:{name:'upsignal'}},
			{id:2, text: '我的信号',img:require('../../assets/images/mine/mysignal1.png'),href:'/mysignal'},
			{id:3, text: 'vip0',img:require('../../assets/images/mine/vip1.png'),href:'/vip'}
		],
		minelist4:[
			{id:0, text: '邀请好友',img:require('../../assets/images/mine/ma1.png'),href:'/invite'},
			{id:1, text: '我的返佣',img:require('../../assets/images/mine/invite1.png'),href:'/maid'}
		],
		minelist5:[
			{id:0, text: '意见反馈',img:require('../../assets/images/mine/feedback1.png'),remark:'',href:'/feedback'},
			{id:1, text: '关于我们',img:require('../../assets/images/mine/aboutus1.png'),remark:'V1.1.1',href:{name:'aboutus'}},
			{id:2, text: '帮助',img:require('../../assets/images/mine/help1.png'),remark:'',href:{name:'help'}},
			{id:3, text: '联系我们',img:require('../../assets/images/mine/service1.png'),remark:'',href:{name:'contact'}}
		],
		phonemsg:'未登录',
		phonemsgbox:false,
		phonemsgbox2:false,
		token:localStorage.token,
		userInfo:{},
		login:'',
		totalmoney:0,
		imoney:0,
		smoney:0,
      }
    },
    components:{
      
	},
	created(){
		const that = this;		
		// console.log(that.token)
		if(localStorage.token==""){
			that.phonemsgbox2 = true
		}else{
			that.phonemsgbox2 = false
		}
	},
	mounted() {
		const that = this;
		// console.log(that.$route.params.id)
		that.userinfo();     
	},
	methods:{
		// 跳转到我的红包
		clickredbag:function(){
			const that = this;
			window.location.href = 'http://h5.znforex.com/game/shouhb.html?token='+localStorage.token;
		},
		// 拨打电话
		callphone:function(){
			window.location.href = 'tel:400-016-0508';
		},
		// 获取数据接口
		userinfo() {
			const that = this;
			http.post('/api.mobile/get_userinfo', {})
			.then(function (res) {					
				if(res.code == 200) {					
					var item = res.result;
					localStorage.setItem("nickname",item.nickname);
					localStorage.setItem("uid",item.uid);
					// vip等级
					if (item.server==''){
						localStorage.setItem("vipserver","vip0");
						localStorage.setItem("current",0);
						var vipserver = localStorage.vipserver						
					}else{
						localStorage.setItem("vipserver",item.server);
						var current = item.server.substr(3,5);
						localStorage.setItem("current",current);
						var vipserver = localStorage.vipserver					
					}
					// vip剩余天数
					if (item.server_expire == 0) {
						var server_expire = 0;
					} else {
						var endtime = Date.parse(new Date(item.server_expire * 1000))
						var starttime = Date.parse(new Date());
						var expire = Math.abs(parseInt((endtime - starttime) / 1000 / 3600 / 24));
						var server_expire = expire;						
					}
					var credit = (parseFloat(item.credit_limit) - parseFloat(item.credited)).toFixed(2);//信用金
					var credit_limit = parseFloat(item.credit_limit).toFixed(2);//信用金
					var imoney = parseFloat(item.imoney).toFixed(2);
					var smoney = parseFloat(item.smoney).toFixed(2);
					// console.log(credit)
					var totalmoney = (parseFloat(credit) + parseFloat(imoney) + parseFloat(smoney)).toFixed(2);
					if (item.server==''){
						var vipservertext = 'vip服务';
					}else{						
						var vipservertext = vipserver + '(剩余' + server_expire+'天)'						
					}
					that.userInfo.nickname = item.nickname;
					that.imoney = imoney;
					that.smoney = smoney;
					that.totalmoney = totalmoney;
					that.userInfo.u_img = item.u_img;
					that.userInfo.server_expire = server_expire;
					that.userInfo.vipserver = vipserver;
					that.minelist3[3].text = vipservertext;
					that.userInfo.login = item.login;
					// console.log(that.userInfo.login)				
				}
			})
		}//imamInfo结束符
	}//methods结束符

  }
</script>