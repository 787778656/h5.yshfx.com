<template>
	<div>		
		<div class="ibox2 maid">我的返佣（元）：<span class="mfont1">{{total_money}}</span></div>
		<router-link :to="{name:'userlist',query:{typenum:1}}" class="ibox2 maidhref">
			<p class="maidtitle">一级推广<span class="mfont2">（一度人脉）</span></p>
			<ul class="maidone">
				<li>
					<p class="mfont3">{{arr_sub}}</p>
					<p class="mfont4">注册人数</p>
					<img class="maidarow" src="../../assets/images/mine/threestar.png" alt="">
				</li>
				<li>
					<p class="mfont3">{{arr_sub_mt4}}</p>
					<p class="mfont4">绑定用户</p>
					<img class="maidarow" src="../../assets/images/mine/threestar.png" alt="">
				</li>
				<li style="border:none;">
					<p class="mfont3">{{arr_sub_buy}}</p>
					<p class="mfont4">购买用户</p>
					<img class="maidarow" src="../../assets/images/mine/threestar.png" alt="">
				</li>
			</ul>
		</router-link>
		<!-- <router-link :to="{name:'userlist',query:{typenum:2}}" class="ibox2 maidhref">
			<p class="maidtitle">二级推广<span class="mfont2">（二度人脉）</span></p>
			<ul class="maidone">
				<li>
					<p class="mfont3">{{arr_sub2}}</p>
					<p class="mfont4">注册人数</p>
					<img class="maidarow" src="../../assets/images/mine/threestar.png" alt="">
				</li>
				<li>
					<p class="mfont3">{{arr_sub2_mt4}}</p>
					<p class="mfont4">绑定用户</p>
					<img class="maidarow" src="../../assets/images/mine/threestar.png" alt="">
				</li>
				<li style="border:none;">
					<p class="mfont3">{{arr_sub2_buy}}</p>
					<p class="mfont4">购买用户</p>
					<img class="maidarow" src="../../assets/images/mine/threestar.png" alt="">
				</li>
			</ul>
		</router-link> -->
		<!-- <div class="maidremark">
			<img src="../../assets/images/master/tip.png" alt="">
			<p class="maidwatch">查看<router-link to="/maid_rule">《奖励规则》</router-link></p>
		</div> -->
		<router-link class="maidbtn" to="/invite">立即邀请</router-link>
		<div class="mtoast" v-if="showtoast">{{showtoastext}}</div>
	</div>
</template>

<script>
import http from '@/lib/http';
import { globalData } from '@/lib/utils';
export default {
	data(){		
      return{
        showtoastext:'',
        showtoast:false,
        arr_sub:0,
        arr_sub_mt4: 0,
		arr_sub_buy: 0,
		arr_sub2: 0,
		arr_sub2_mt4: 0,
		arr_sub2_buy: 0,
		total_money:0
      }
    },
    components:{
      
	},
	created(){
        const that = this;
        http.post('/api.mobile/get_invite_data',{})
        .then((res) => {
            // console.log(res);
            if(res.code == 200) {
                var item = res.result;
                that.arr_sub = item.arr_sub,
				that.arr_sub2 = item.arr_sub2,
				that.arr_sub2_buy = item.arr_sub2_buy,
				that.arr_sub2_mt4 = item.arr_sub2_mt4,
				that.arr_sub_buy = item.arr_sub_buy,
				that.arr_sub_mt4 = item.arr_sub_mt4,
				that.total_money = item.total_money
            }else{
				that.showtoastext = res.msg;
				that.showtoast = true;
				setTimeout(() => {
					that.showtoast = false;
				}, 1000);
			}
        })
	},
	methods:{
		
	}

}
</script>


<style>
	.maid{line-height: 1.5rem;font-size: 0.75rem;}
	.mfont1{color: #611987;}
	.mfont2{font-size: 0.6rem;color: #666;}
	.mfont3{font-size: 1rem;color: #611987;line-height: 1.7rem;margin-top: 0.2rem;}
	.mfont4{font-size: 0.65rem;color: #666;}
	.maidone{width:100%;height: 3.5rem;margin-top: 0.7rem;}
	.maidone>li{width:33%;height:100%;float: left;position: relative;border-right: 1px solid #dedfe0;}
	.maidtitle{text-align: left;}
	.maidarow{width: 0.7rem;height: 0.7rem;position:absolute;right:0.3rem;bottom:0px;}
	.maidremark{padding: 0.5rem;}
	.maidremark>img{width: 0.8rem;height: 0.8rem;float: left;margin-top: 0.1rem;margin-right: 0.5rem;}
	.maidwatch{color: #999;float: left;}
	.maidwatch>a{text-decoration: underline;color: #611987;}
	.maidbtn{width: 92%;height: 2.5rem;position: fixed;bottom: 0.8rem;left: 0px;right: 0px;margin: 0 auto;background-color: #611987;color: #fff;
	font-size: 1rem;line-height: 2.5rem;border-radius: 50px;}
	.mtoast{width:6rem;height: 1.5rem;line-height: 1.5rem;background-color: rgba(0, 0, 0, 0.8);border-radius: 6px;position: fixed;
	top: 40%;left: 30%;margin: 0 auto;color: #fff;padding: 0.5rem;}
	.maidhref{display: block;}
</style>