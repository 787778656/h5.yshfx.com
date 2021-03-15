<template>
	<div>
		<div class="account_header">
			<span class="account_title">充值金额(元)</span>
			<div class="imoney">{{imoney}}</div>
		</div>
		<div class='redetail'>
			<div class='redetailt'>选择该服务下的价格</div>
			<ul class='server1'>
				<li class='server2' @click="rechselect(index)" v-for="(item,index) in vip" :key="index" v-bind:class='{rechimg:index==rechindex}'>
					<div class='remoney'><span class='em'>{{item.money}}</span>元</div>
					<img class='vipem' src='../../assets/images/mine/vipem.png'/>
				</li>
			</ul>	
		</div>
		<div class='typebox'>
			<div class='typeboxt'>选择充值方式</div>
			<div class='typeboxd'>
				<img src='../../assets/images/master/rechargeicon.png' class='rechargeicon'/>
				<img src='../../assets/images/master/wxicon.png' class='logins_wx'/>
				<div class='typeboxh1'>微信支付</div>
			</div>
		</div>
		<div class='btn'>
			<div class="moresiganlbox" @click="showbomb()">充值</div>
		</div>
		<div class="masterbomb" v-if="phonemsgbox">{{phonemsg}}</div>
	</div>
</template>

<style>
@import '../../assets/css/recharge.css';
</style>
<script>
import http from '@/lib/http';
  export default {
    data(){
      return{
        vip: [
			{ id: '1', money: '500'},
			{ id: '2', money: '1000'},
			{ id: '3', money: '2000'},
			{ id: '4', money: '5000' },
			{ id: '5', money: '10000' },
			{ id: '6', money: '20000' }
		],
		vip1id: '1',
		imoney: 500,
		rechindex: 0,
		phonemsgbox:false,
		phonemsg:'',
      }
    },
    components:{
      
	},
	methods:{
		rechselect: function(index) {
			const that = this;
			// console.log(this.vip[index].money)
			that.imoney = this.vip[index].money;
			that.rechindex = index;
		},
		showbomb:function(){
			const that = this;
			that.phonemsg = '暂未开放';
			that.phonemsgbox = true;
			setTimeout(() => {
				that.phonemsgbox = false;
			}, 1000);
			// http.post('/api.pay/pay', {amount:that.imoney})
			// .then(function (res) {
			// 	if(res.code == 200) {
			// 		console.log(res)
			// 		that.phonemsg = res.msg;
			// 		that.phonemsgbox = true;
			// 		setTimeout(() => {
			// 			that.phonemsgbox = false;
			// 			that.$router.back(-1);
			// 		}, 1500);
			// 	}else{
			// 		that.phonemsg = res.msg;
			// 		that.phonemsgbox = true;
			// 		setTimeout(() => {
			// 			that.phonemsgbox = false;                            
			// 		}, 1500);
			// 	}
			// }).catch(function (err) {
			// 	that.phonemsg = '充值失败';
			// 	that.phonemsgbox = true;
			// 	setTimeout(() => {
			// 		that.phonemsgbox = false;
			// 	}, 1000);
			// });
		}
	}

  }
</script>