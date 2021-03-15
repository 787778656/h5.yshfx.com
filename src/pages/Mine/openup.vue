<template>
	<div>
		<div class="account_header">
			<span class="account_title">应付金额(元)</span>
			<div class="imoney">{{imoney}}</div>
		</div>
		<div class='openvip_box'>
			<div class='redetailt'>选择该服务下的价格</div>
			<ul class='openvip'>
				<li class="openvip_list" @click="rechselect(index)" v-for="(item,index) in myvip" :key="index" v-bind:class='{rechimg:index==rechindex}'>
					<div class="openvip_money"><span class="em">{{item.money}}</span>元</div>
					<div class="openvip_line"></div>
					<p class="openvip_month">{{item.time}}</p>
					<img src='../../assets/images/mine/vipem.png' class='vipem'/>
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
			<div class="moresiganlbox" @click="bugvip()">购买</div>
		</div>
		<div class="masterbomb" v-if="phonemsgbox">{{phonemsg}}</div>
	</div>
</template>

<style>
	@import '../../assets/css/manage.css';
	@import '../../assets/css/recharge.css';
</style>
<script type="text/ecmascript-6">
import http from '@/lib/http'
  export default {
    data(){
      return{
		  	myvip:[],
			vip1: [
				{ id: '1', money: '599', time: '月', },
				{ id: '2', money: '1529', time: '3月' },
				{ id: '3', money: '4319', time: '年' },
			],
			vip2: [
				{ id: '1', money: '999', time: '月', },
				{ id: '2', money: '2549', time: '3月' },
				{ id: '3', money: '7199', time: '年' },
			],
			vip3: [
				{ id: '1', money: '1599', time: '月', },
				{ id: '2', money: '4029', time: '3月' },
				{ id: '3', money: '11519', time: '年' },
			],
			imoney: 0,
			rechindex: 0,
			phonemsgbox:false,
			phonemsg:'暂未开放'
      }
    },
    components:{
      
	},
	created(){
		const that = this;
		// console.log(that.$route.query)
		var vipid = that.$route.query.id;
		if(vipid==1){
			that.myvip = that.vip1;
			
		}else if(vipid==2){
			that.myvip = that.vip2;
		}else if(vipid==3){
			that.myvip = that.vip3;
		}
		that.imoney = that.myvip[0].money;
	},
	methods:{
		rechselect: function(index) {
			// console.log(this.myvip[index].money)
			this.rechindex = index;
			this.imoney = this.myvip[index].money
		},
		bugvip:function(){
			const that = this;
			// that.phonemsgbox = true;
			that.getTrueWxpay();
		},
		// 微信原生支付
        getTrueWxpay() {
			var vipid = this.$route.query.id;
            // console.log(uid,this.wx_money);
            http.post('/pay.wxpay/jspay',{
				server: 'vip'+ vipid,
                amount: this.imoney
            }).then((res) => {
                // console.log(res.data.jsApiParameters)
                if(res.code == 200) {
                    // console.log(res.data.jsApiParameters)
                    const pay_params = res.data.jsApiParameters
                    if (typeof WeixinJSBridge == "undefined"){
                        if( document.addEventListener ){
                            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                        }else if (document.attachEvent){
                            document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
                            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                        }
                    }else{
                        this.onBridgeReady(pay_params);
                    }
                }else{
                    this.$layer.dialog({
                        content: '微信支付调起失败！'
                        ,btn: ['确定']
                    })
                }
            })            
		},
		 onBridgeReady(params) {
            const pay_params = JSON.parse(params);
            // console.log(pay_params);
            WeixinJSBridge.invoke(
                'getBrandWCPayRequest', {
                    "appId": pay_params.appId,     //公众号名称，由商户传入     
                    "timeStamp": pay_params.timeStamp,         //时间戳，自1970年以来的秒数     
                    "nonceStr": pay_params.nonceStr, //随机串     
                    "package": pay_params.package,     
                    "signType": pay_params.signType,         //微信签名方式：     
                    "paySign": pay_params.paySign //微信签名 
                },
                function(res){
                    if(res.err_msg == "get_brand_wcpay_request:ok" ){
                    this.$layer.dialog({
                        content: '支付成功！'
                        ,btn: ['确定']
                    })
                } 
            }); 
        },
	}

  }
</script>