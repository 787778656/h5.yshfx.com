<template>
	<div>
		<!-- <div class="hope">
      敬请期待！
    </div> -->
		<div class="vipswiper">
			<swiper :options="swiperOption" ref="mySwiper">
				<!-- slides -->
				<swiper-slide v-for="(item, index) in vipArray" :key="index" @click="change(index)">
					<li>
						<img class="vipswiper_img" :src="item.img" alt="">
						<p class="viplevel">{{item.level}}</p>
						<div v-if="myvip == 'vip0'">
							<div class="vipnow">
								<img src="../../assets/images/mine/vipicon.png" alt="">
								<div>下一等级</div>
							</div>
							<p class="vipalready">升级为{{item.level}}享受更多权益</p>
						</div>
						<div v-else-if="myvip == item.sign">
							<div class="vipnow">
								<img src="../../assets/images/mine/vipicon.png" alt="">
								<div>当前等级</div>
							</div>
							<p class="vipalready">您已经是{{item.level}}</p>
						</div>
						<div v-else>
							<div class="vipnow">
								<img src="../../assets/images/mine/vipicon.png" alt="">
								<div>下一等级</div>
							</div>
							<p class="vipalready">升级为{{item.level}}享受更多权益</p>
						</div>
					</li>
				</swiper-slide>
				<!-- Optional controls -->
				<div class="swiper-pagination" slot="pagination"></div>
			</swiper>
			<!-- <li v-for="(item, index) in vipArray" :key="index" @click="change(index)">
				<img class="vipswiper_img" :src="item.img" alt="">
				<p class="viplevel">{{item.level}}</p>
				<div class="vipnow">
					<img src="../../assets/images/mine/vipicon.png" alt="">
					<div>当前等级</div>
				</div>
				<p class="vipalready">您已经是普通用户</p>
			</li> -->
		</div>		
		<div class="vipbrook">
			<div class="vipbrook_intext">
				<p>试试这些经纪商获永久vip哦~</p>
				<!-- <router-link :to="{name:'agency'}">点击了解</router-link> -->
				<!-- <div class="toRescue" @click="toRescue">点击了解</div> -->
				<router-link :to="{name:'agency'}" class="toRescue">立即开通</router-link>
			<!-- <div class="vipbrook_in">
				<img class="vipbrook_inimg left" src="../../assets/images/vip/vip_bottom2.png" alt="">
				<a href="https://www.ausforex.com/zh-cn/account/registering-a-live-account-e30.shtml?key=7bYS%2fnKgaR0%3d" class="vipbrook_btn left">立即开通</a>
				<a href="https://www.myfxmarkets.com/account.do?method=openAccount&language=zh&ibCode=880876" class="vipbrook_btn right">立即开通</a>
				<img class="vipbrook_inimg2 right" src="../../assets/images/vip/vip_bottom.png" alt="">					
			</div> -->
			</div>
		</div>
		<div class="vipbanner">
			<p class="viptitle">尊敬的用户，您享受以下专属权益</p>
			<ul class="vipright">
				<li>
					<img class="viprightimg" src="../../assets/images/vip/vipicon1.png" alt="">
					<p>跨平台<br/>MT4账户</p>
				</li>
				<li>
					<img class="viprightimg" src="../../assets/images/vip/vipicon2.png" alt="">
					<p>模拟<br/>(demo)账户</p>
				</li>
				<li>
					<img class="viprightimg" src="../../assets/images/vip/vipicon3.png" alt="">
					<p>交易<br/>统计工具</p>
				</li>
				<!-- <li v-if="nowvip == 0">
					<img class="viprightimg" src="../../assets/images/vip/vipicon4_2.png" alt="">
					<p>复制跟单<br/>(单一信号)</p>
				</li> -->
				<li>
					<img class="viprightimg" src="../../assets/images/vip/vipicon4.png" alt="">
					<p>复制跟单<br/>(单一信号)</p>
				</li>
				<li v-if="nowvip == 1">
					<img class="viprightimg" src="../../assets/images/vip/vipicon5_2.png" alt="">
					<p>组合跟单<br/>(多信号)</p>
				</li>
				<li v-else>
					<img class="viprightimg" src="../../assets/images/vip/vipicon5.png" alt="">
					<p>组合跟单<br/>(多信号)</p>
				</li>
				<li>
					<img class="viprightimg" src="../../assets/images/vip/vipicon6.png" alt="">
					<p>风控工具</p>
				</li>
				<li v-if="nowvip == 1">
					<img class="viprightimg" src="../../assets/images/vip/vipicon7_2.png" alt="">
					<p>反向跟单</p>
				</li>
				<li v-else>
					<img class="viprightimg" src="../../assets/images/vip/vipicon7.png" alt="">
					<p>反向跟单</p>
				</li>
				<li v-if="nowvip == 1 || nowvip == 2">
					<img class="viprightimg" src="../../assets/images/vip/vipicon8_2.png" alt="">
					<p>绑定多<br/>mt4账户</p>
				</li>
				<li v-else>
					<img class="viprightimg" src="../../assets/images/vip/vipicon8.png" alt="">
					<p>绑定多<br/>mt4账户</p>
				</li>
			</ul>
			<router-link v-if="nowvip == 0" :to="{name:'agency'}" class="vipopen2">立即开通</router-link>
			<div v-else-if="nowvip == 1">
				<!-- <router-link v-if="myvip == 'vip1'" :to="{name:'openup',query:{id:1}}" class="vipopen2">续费</router-link>
				<router-link v-else :to="{name:'openup',query:{id:1}}" class="vipopen2_bug">立即开通</router-link> -->
				<router-link v-if="myvip == 'vip1'" :to="{name:'agency',query:{id:1}}" class="vipopen2">续费</router-link>
				<router-link v-else :to="{name:'agency',query:{id:1}}" class="vipopen2_bug">立即开通</router-link>
			</div>
			<div v-else-if="nowvip == 2">
				<!-- <router-link v-if="myvip == 'vip2'" :to="{name:'openup',query:{id:2}}" class="vipopen2">续费</router-link>
				<router-link v-else :to="{name:'openup',query:{id:2}}" class="vipopen2_bug">立即开通</router-link> -->
				<router-link v-if="myvip == 'vip2'" :to="{name:'agency',query:{id:2}}" class="vipopen2">续费</router-link>
				<router-link v-else :to="{name:'agency',query:{id:2}}" class="vipopen2_bug">立即开通</router-link>
			</div>
			<div v-else-if="nowvip == 3">
				<!-- <router-link v-if="myvip == 'vip3'" :to="{name:'openup',query:{id:3}}" class="vipopen2">续费</router-link>
				<router-link v-else :to="{name:'openup',query:{id:3}}" class="vipopen2_bug">立即开通</router-link> -->
				<router-link v-if="myvip == 'vip3'" :to="{name:'agency',query:{id:3}}" class="vipopen2">续费</router-link>
				<router-link v-else :to="{name:'agency',query:{id:3}}" class="vipopen2_bug">立即开通</router-link>
			</div>

			<!-- <router-link v-if="nowvip == 1" :to="{name:'openup',query:{id:1}}" class="vipopen2">立即开通</router-link>
			<router-link v-if="nowvip == 2" :to="{name:'openup',query:{id:2}}" class="vipopen2">立即开通</router-link>
			<router-link v-if="nowvip == 3" :to="{name:'openup',query:{id:3}}" class="vipopen2">立即开通</router-link> -->
			<!-- <a v-else href="" class="vipopen2">立即开通</a> -->
		</div>
		
	</div>
</template>

<script>
	import { globalData } from '@/lib/utils';	
	import { swiper, swiperSlide } from 'vue-awesome-swiper';
	export default {
		data(){
			return {
				vipArray: [
					// {img:require('../../assets/images/mine/vipbg0.png'),level:'永久vip',sign:'vip0'},
					{img:require('../../assets/images/mine/vipbg1.png'),level:'VIP1',sign:'vip1'},
					{img:require('../../assets/images/mine/vipbg2.png'),level:'VIP2',sign:'vip2'},
					{img:require('../../assets/images/mine/vipbg3.png'),level:'VIP3',sign:'vip3'},
				],
				swiperOption: {
					pagination: '.swiper-pagination',
					paginationClickable: true,
					onSlideChangeEnd:(swiper) => {
						this.nowvip = swiper.activeIndex+1;
					},
					slidesPerView: 'auto',
					centeredSlides: true
				},
				myvip: '',
				nowvip: 1
			}
		},
		components: {
			swiper,
			swiperSlide
		},
		computed: {
			swiper() {
				return this.$refs.mySwiper.swiper
			},
			myvip_level() {
				return parseInt(this.myvip.substr(3))
			}
		},
		created(){
			const vipserver = localStorage.vipserver;
			this.myvip = vipserver;
			this.nowvip = parseInt(this.myvip.substr(3))+1;
		},
		mounted() {
			this.swiper.slideTo(this.myvip_level);
		},
		methods: {
			autoPlay () {
			this.mark++;
			if (this.mark === 4) {
				this.mark = 0
			}
			},
			play () {
			this.timer = setInterval(this.autoPlay, 2500)
			},
			change (i) {
			this.mark = i
			},
			stop () {
			clearInterval(this.timer)
			},
			move () {
			this.timer = setInterval(this.autoPlay, 2500)
			},

			toRescue() {
				window.location.href = 'http://www.yshfx.com/other/protocol_vip.html';
			},

		}
	}
</script>

<style>
	@import '../../assets/libs/swiper/css/swiper.css';
	@import '../../assets/css/vip.css';
</style>

