<template>
	<div>
		<div class="drawtop">
			<div class="drawtop_text">剩余可提现金额（元）</div>
			<p class="drawtop_money">{{imoney}}</p>
		</div>
		<div class="mineorder">
			<div class="drawbox">
				<div class="left">金额</div>
				<input class="drawinp" type="number" v-model="moneyinp" ref="drawinp" placeholder="请输入提现金额"/>
			</div>
            <div class="drawbox">
				<div class="left">支付宝账号</div>
				<input class="drawinp" type="text" v-model="accountinp" ref="drawinp" placeholder="请输入支付宝账号"/>
			</div>
			<div class="drawbox" style="border:none;">
				<div class="left">姓名</div>
				<input class="drawinp" type="text" v-model="nameinp" ref="drawinp" placeholder="请输入真实姓名"/>
			</div>
		</div>		
		<div class="draw_remark">
			<img class="tipicon" src="../../assets/images/master/tips.png" alt="">
			<p class="remarktext">提现成功后将于<span>24小时</span>内到账（节假日顺延）<br/>提现<span>10元</span>起提</p>
		</div>
		<button class="drawbtn" @click="showbomb()">确认提现</button>
		<div class="masterbomb" v-if="phonemsgbox">{{phonemsg}}</div>
	</div>
</template>

<style>
	@import '../../assets/css/recharge.css';
</style>
<script>
import http from '@/lib/http';
import { formatTime } from '@/lib/utils';
export default {
	data(){		
      return{
			phonemsgbox:false,
			phonemsg:'',
			imoney:0.00,
			moneyinp:'',
			accountinp:'',
			nameinp:''
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
				that.imoney = item.imoney;                
                
			}
        })
	},
	methods:{
		showbomb:function(){
			const that = this;
			if(that.moneyinp==''){
				that.phonemsg = '请输入提现金额';
				that.phonemsgbox = true;
				setTimeout(() => {
					that.phonemsgbox = false;
				}, 1500);
			}else if(that.moneyinp<10){
				that.phonemsg = '提现10元起提';
				that.phonemsgbox = true;
				setTimeout(() => {
					that.phonemsgbox = false;
				}, 1500);
			}else if(parseFloat(that.moneyinp) > parseFloat(that.imoney)){
				that.phonemsg = '提现金额不能大于用户账户余额';
				that.phonemsgbox = true;
				setTimeout(() => {
					that.phonemsgbox = false;
				}, 1500);
			}else if(that.accountinp==''){
				that.phonemsg = '请输入支付宝账号';
				that.phonemsgbox = true;
				setTimeout(() => {
					that.phonemsgbox = false;
				}, 1500);
			}else if(that.nameinp==''){
				that.phonemsg = '请输入真实姓名';
				that.phonemsgbox = true;
				setTimeout(() => {
					that.phonemsgbox = false;
				}, 1500);
			}else{
				var remark = that.nameinp+'_Alipay';
				http.post('/api.mobile/withdraw', {amount:that.moneyinp,account:that.accountinp,remark:remark})
				.then(function (res) {
					if(res.code == 200) {
						that.accountinp = '';
						that.moneyinp = '';
                        that.phonemsg = res.msg;
                        that.phonemsgbox = true;
                        setTimeout(() => {
                            that.phonemsgbox = false;
                            that.$router.back(-1);
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