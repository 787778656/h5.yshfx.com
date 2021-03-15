<template>
	<div>
		<ul class="detailnav">
			<li v-for="(item,index) in detailnav" @click="clickdetailnav(item,index)" :key="index" v-bind:class='{navactive:navindex==item.id}'>{{item.text}}</li>
		</ul>
		<div class="navseat"></div>
		<div v-show="navindex==0">
			<div class="ibox2">
				<div class="delheader">
					<div class="left deluser_left">
						<div class="deluser_rele">
							<img class="deluser" :src="master_img" alt=""/>
							<!-- <img class="deluser2" :src="master_country" alt=""/> -->
						</div>
						<div class="left">
							<p class="delname single">{{master_name}}</p>
							<img class="delis_ea" src="../../assets/images/master/is_ea.png" alt="">
						</div>
					</div>
					<div class="right">
						<img class="delicon" :src="master_broker" alt="">
						<p class="delread">订阅者:<span>{{master_order}}</span></p>
					</div>				
				</div>
			</div>
			<div class="delbox" :style="{height:height1+'rem'}">
				<ul class="left delbox_left">
					<li></li>
					<li v-for="(item,index) in date_months" :key="index">{{index}}</li>
					<li></li>
				</ul>
				<div class="left delbox_center">
					<div class="delbox_monthmenun">
						<ul class="delbox_month1">
							<li v-for="(item,index) in date_month" :key="index">
								<div class="delfont1">{{index+1}}月</div>
							</li>
						</ul>
						<ul class="delbox_month" :style="{height:height2+'rem'}">
							<li>
								<div v-for="(item,index) in date_months" :key="index">{{item[1]}}</div>
							</li>
							<li>
								<div v-for="(item,index) in date_months" :key="index">{{item[2]}}</div>
							</li>
							<li>
								<div v-for="(item,index) in date_months" :key="index">{{item[3]}}</div>
							</li>
							<li>
								<div v-for="(item,index) in date_months" :key="index">{{item[4]}}</div>
							</li>
							<li>
								<div v-for="(item,index) in date_months" :key="index">{{item[5]}}</div>
							</li>
							<li>
								<div v-for="(item,index) in date_months" :key="index">{{item[6]}}</div>
							</li>
							<li>
								<div v-for="(item,index) in date_months" :key="index">{{item[7]}}</div>
							</li>
							<li>
								<div v-for="(item,index) in date_months" :key="index">{{item[8]}}</div>
							</li>
							<li>
								<div v-for="(item,index) in date_months" :key="index">{{item[9]}}</div>
							</li>
							<li>
								<div v-for="(item,index) in date_months" :key="index">{{item[10]}}</div>
							</li>
							<li>
								<div v-for="(item,index) in date_months" :key="index">{{item[11]}}</div>
							</li>
							<li>
								<div v-for="(item,index) in date_months" :key="index">{{item[12]}}</div>
							</li>
						</ul>
					</div>
					<div class="delbox_bot">共计</div>
				</div>
				<ul class="delbox_right">
					<li class="delfont1">YTD</li>
					<li v-for="(item,index) in date_total" :key="index">{{item}}</li>
					<li>{{total_profit}}</li>
				</ul>
			</div>
			<div class="ibox2 delinfo_menu">
				<ul class="delinfo">
					<li v-for="(item,index) in data.data_l" :key="index">
						<div class="left">{{item.title}}</div>
						<div class="right">{{item.text}}</div>
					</li>
				</ul>
				<ul class="delinfo2">
					<li v-for="(item,index) in data.data_r" :key="index">
						<div class="left">{{item.title}}</div>
						<div class="right">{{item.text}}</div>
					</li>
				</ul>
			</div>
			<div class="delswiper">
				<swiper :options="swiperOption" ref="mySwiper">
					<swiper-slide v-for="(item, index) in swiperitem" :key="index" @click="change(index)">
						<li>
							<div class="delswiper_text" v-for="(switem, swindex) in item.data" :key="swindex">
								<div class="left">{{switem.title}}</div>
								<div class="right">{{switem.data}}</div>
							</div>
						</li>
					</swiper-slide>
					<div class="swiper-pagination" slot="pagination"></div>
				</swiper>
			</div>
			<div class="detail_shuoming">
				<p>策略说明：</p>
				<p class="detail_shuoming2">{{mydetail}}</p>
			</div>
		</div>

		<!--历史部分  -->
		<div v-show="navindex==1">
		<div class="mahiswrapper" ref="wrapper">
			<div style="padding: 1px 0;">
				<div class="historybox_wai" v-show="!nohistory">						
					<div class="history1 historybox_in" v-for="(item,index) in list" :key="index" @click="showhistory(item,index)">
						<div class="hislist">
							<div class="histext1">
								<div class="left">
									<span>{{item.symbol}}</span>
									<span v-if="item.profit>=0" class="hisfont1">{{item.op}}&nbsp;&nbsp;{{item.lots}}</span>
									<span v-else class="hisfont2">{{item.op}}&nbsp;&nbsp;{{item.lots}}</span>
								</div>
								<div class="right">{{item.open_time}}</div>
							</div>
							<div class="histext1">
								<div class="left">{{item.open_price}}→{{item.close_price}}</div>
								<div class="right hisfont1" v-if="item.profit>=0">{{item.profit}}({{item.point}})</div>
								<div class="right hisfont2" v-else>{{item.profit}}({{item.point}})</div>
							</div>
						</div>
						<ul class="historyinfo" v-if="item.listshow">
							<li>
								<div class="left">止损：{{item.stoploss}}</div>
								<div class="right">止盈：{{item.takeprofit}}</div>
							</li>
							<li>
								<div class="left">手续费：{{item.commission}}</div>
								<div class="right">库存费：{{item.swap}}</div>
							</li>
							<li class="historytime">平仓时间：{{item.close_time}}</li>
						</ul>
					</div>
					<div v-if="listlength" class="historydown">已经到底啦~</div>			
				</div>
				<!-- 没有数据的时候 -->
				<div v-show="nohistory" style='background:#f7f7f9;'>
					<img class="nodata" src="../../assets/images/master/nodata.png" />
				</div>
			</div>
		</div>
		</div>
		<!-- 持仓部分 -->
		<div v-show="navindex==2">
		<div class="hiswrapper" ref="wrapper2">
			<div style="padding: 1px 0;">
				<!-- <div v-if="navindex==2"> -->
				<div class="historybox_wai" v-show="!nohold">
					<div class="history1 historybox_in" v-for="(item,index) in holslist" :key="index" @click="hoshowhistory(item,index)">
						<div class="hislist">
							<div class="histext1">
								<div class="left">
									<span>{{item.symbol}}</span>
									<span class="hisfont1">{{item.symbol}}</span>
									<span v-if="item.profit>=0" class="hisfont1">{{item.op}}&nbsp;&nbsp;{{item.lots}}</span>
									<span v-else class="hisfont2">{{item.op}}&nbsp;&nbsp;{{item.lots}}</span>
								</div>
								<div class="right">{{item.open_time}}</div>
							</div>
							<div class="histext1">
								<div class="left">建仓价格：{{item.open_price}}</div>
								<div class="right hisfont1" v-if="item.profit>=0">{{item.profit}}({{item.point}})</div>
								<div class="right hisfont2" v-else>{{item.profit}}({{item.point}})</div>
							</div>
						</div>
						<ul class="historyinfo" v-if="item.listshow">
							<li>
								<div class="left">止损：{{item.stoploss}}</div>
								<div class="right">止盈：{{item.takeprofit}}</div>
							</li>
							<li>
								<div class="left">手续费：{{item.commission}}</div>
								<div class="right">库存费：{{item.swap}}</div>
							</li>
						</ul>
					</div>
					<ul class="historyinfo2">
						<li>
							<div class="left">佣&nbsp;&nbsp;&nbsp;金：</div>
							<div class="right tradefont2">{{totalcommission}}</div>
						</li>
						<li>
							<div class="left">库存费：</div>
							<div class="right tradefont2">{{totalswap}}</div>
						</li>
						<li>
							<div class="left">利&nbsp;&nbsp;&nbsp;润：</div>
							<div v-if="totalprofit>0" style="color:#007eff;" class="right tradefont1">{{totalprofit}}</div>
							<div v-else style="color:#e73b29;" class="right tradefont1">{{totalprofit}}</div>
						</li>
					</ul>			
				</div>
				<!-- 没有数据的时候 -->
				<div v-show="nohold" style='background:#f7f7f9;'>
					<img class="nodata" src="../../assets/images/master/nodata.png" />
				</div>
			</div>
			
		</div>
		</div>
		<!-- 评论部分 -->
		<div v-show="navindex==3">
			<div class="commitwrapper" ref="wrapper3">
				<div style="padding: 1px 0;">
					<!-- <div v-if="navindex==3"> -->
						<div class="ibox2">
							<div class="commitTitle">
								<img class="icomment_t" src="../../assets/images/master/icomment_t.png" alt="">评论
							</div>
							<div class="commit_list">
								<ul>
									<li class="clearfix" v-for="(item,index) in icomment" :key="index">
										<img class="commit_img" :src="item.u_img" alt="">
										<div class="commit-content">
											<h5 class="font-common">{{item.username}}<span class="commit_date">{{item.modify_time}}</span></h5>
											<p>{{item.comment}}</p>
										</div>
									</li>
								</ul>
							</div>
						</div>
						
					<!-- </div> -->
				</div>
				
			</div>
			<div id="post_commit" v-show="navindex==3">
				<h5 class="font-common">
					<img class="icomment_t" src="../../assets/images/master/icomment2.png" alt="">发布评论
				</h5>
				<div class="commit_area">
					<textarea v-model="commitext" id="commit_content" cols="30" rows="5" placeholder="请输入评论">					
					</textarea>
					<button class="post_btn" @click="comsubmit()">发布评论</button>
				</div>
			</div>
		</div>
		<!-- 跟随者部分 -->
		<div v-show="navindex==4">
			<div class="follormenu">
				<div class="ibox2">
					<div class="Mam">
						<p>
							<img class="icont" src="../../assets/images/master/ifollow1.png" alt="">
							当前跟随者：
							<span class="fr"><i>{{total.follow}}</i>人</span>
						</p>
						<p style="margin-top:0.3rem;">
							<img class="icont" src="../../assets/images/master/ifollow2.png" alt="">
							交易资金：
							<span class="fr"><i>${{total.tBalance}}</i></span>
						</p>
					</div>
				</div>
			</div>
		</div>
			<div class="comwrapper" ref="wrapper4" v-show="navindex==4">
				<div style="padding: 1px 0;">
					<!-- <div v-if="navindex==4"> -->
						<ul class="content_list">
							<li class="content_listA" v-for="(item,index) in ifollowlist" :key="index">
								<div class="clearfix content_user">						
									<div class="left content_text">
										<img class="content_userimg" :src="item.u_img" alt="">
										<p class="fl single">用户：{{item.nickname}}</p>
									</div>
									<div class="fr content_text2 single">经纪商：{{item.zhmt4server}}</div>
								</div>
								<div class="content_detail" >
									<p>
										跟单结余：<span class="fr">{{item.balance}}</span>
									</p>
									<p>
										比例跟单：<span class="fr fcg">{{item.weight}}</span>
									</p>
									<p>
										跟单方向：<span class="fr">{{item.direction}}</span>
									</p>
									<p>
										最大持仓限定：<span class="fr">{{item.maxhold}}</span>
									</p>
								</div>
							</li>
						</ul>
					<!-- </div> -->
				</div>
			</div>
		

		<div class="masterbomb" v-if="phonemsgbox">{{phonemsg}}</div>
	</div>
</template>

<style>
	@import '../../assets/css/masterdetail.css';
</style>

<script>	
	import 'swiper/dist/css/swiper.css';
	import { swiper, swiperSlide } from 'vue-awesome-swiper';
	import http from '@/lib/http';
	import { formatTime,globalData } from '@/lib/utils';
	import BScroll from 'better-scroll';
	export default {
		data(){
			return {
				navindex:0,
				detailnav:[
					{id:0,text:'概况',href:{name:'masterdetail'}},
					{id:1,text:'历史',href:{name:'history'}},
					{id:2,text:'持仓',href:{name:'hold'}},
					{id:3,text:'评论',href:{name:'comment'}},
					{id:4,text:'跟随者',href:{name:'master_follower'}},
				],				
				totalcommission:0,
				totalswap:0,
				totalprofit:0,				
				phonemsgbox:false,
				phonemsg:'',
				master_img:'',
				master_country:'',
				master_name: '',
				master_broker: '',
				master_order: '',
				mydetail: '',
				total_profit: '',
				data: {
					data_l: [],
					data_r: []
				},
				swiperitem: [],
				date_month: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
				date_months: {},
				date_total: [],
				height1: '',
				height2:'',
				swiperOption: {
					pagination: '.swiper-pagination',
					paginationClickable: true,
					onSlideChangeEnd:(swiper) => {
						this.nowvip = swiper.activeIndex;
					},
					slidesPerView: 'auto',
					centeredSlides: true
				},
				myvip: '',
				nowvip: 0,
				ifollowlist:[],
				total:{},
				page:1,
				hispage:1,
				holerpage:1,
				folerpage:1,
				compage:1,
				nodata:false,
				list:[],
				nohistory: false,
				comnohistory: false,
				infoshow:false,
				listlength: false,
				mt4id:0,
				flist:[],
				fnohistory: false,
				finfoshow:false,
				flistlength: false,
				holslist:[],
				nohold: false,
				hinfoshow:false,
				holdlistlength: false,
				icomment:[],
				commitext:'',
				scroll1:null,
				scroll2:null,
				scroll3:null,
				scroll4:null,
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
			const that = this;	
			// console.log('页面id'+that.$route.query.id)		
			that.mt4id = that.$route.query.id;			
			that.detail(that.mt4id);
		},
		mounted() {
			
		},
		methods: {
			// 点击切换detailnav导航
			clickdetailnav:function(item,index){
				const that = this;
				that.navindex = index;
				if(that.navindex==0){
					that.detail(that.mt4id);
				}else if(that.navindex==1){
					that.list = [];
					that.getmasterhistory(that.hispage);
				}else if(that.navindex==2){
					that.holslist = [];
					that.getmasterhold(that.holerpage);
				}else if(that.navindex==3){
					that.icomment = [];
					that.geticomment(that.compage);
				}else if(that.navindex==4){
					that.ifollowlist = [];
					that.ifollow(that.ifollpage);
				}
			},

			// 详情部分
			detail:function(mt4id){
				const that = this;
				const vipserver = 'vip3';
				that.myvip = vipserver;
				that.nowvip = parseInt(this.myvip.substr(3));
				http.post('/api.signal/detail', {mt4id:mt4id})
				.then(function (res) {
					// console.log(res)          					
					if(res.code == 200) {
						var itemaccount = res.result.account;
						var itematrade = res.result.trade;
						var itematrade2 = res.result.trade;
						var date_months = {};
						var date_totals = [];
						for (var i in itematrade) {
							if (i != 'total_profit') {
								date_totals.push(itematrade[i].year_total_profit)
								delete itematrade[i].year_total_profit
								date_months[i] = itematrade[i]
							}
						}
						that.master_img = itemaccount.img;
						that.master_country = itemaccount.country_img;
						that.master_name = itemaccount.name;
						that.master_broker = itemaccount.service_img;
						that.master_order = itemaccount.follow;
						that.mydetail = itemaccount.detail;
						console.log(itemaccount.detail)
						that.date_months = date_months;
						that.date_total = date_totals;
						that.height1 = (date_totals.length * 1.4+2.7);
						that.height2 = (date_totals.length * 1.4);
						
						that.data = {
							data_l: [
								{ title: '利润率', text: itemaccount.profit_margin },
								{ title: '初始入金', text: itemaccount.money + ' USD' },
								{ title: '利润', text: itemaccount.profit + ' USD' },
								{ title: '账户净值', text: itemaccount.equity + ' USD' },
								{ title: '跟随资金', text: itemaccount.tBalance + ' USD' }
							],
							data_r: [
								{ title: '最大回撤', text: itemaccount.trade_drawdown },
								{ title: '周', text: itemaccount.trade_week },
								{ title: '最近交易', text: itemaccount.max_time },
								{ title: '每周交易', text: itemaccount.week_trade_num },
								{ title: '平均持有时间', text: itemaccount.holding_time }
							]
						};
						that.swiperitem = [
							{
								page: '1',
								data: [
									{ title: '总交易', data: itemaccount.trade_total },
									{ title: '盈利交易', data: itemaccount.profit_trade },
									{ title: '亏损交易', data: itemaccount.loss_trade },
									{ title: '利润因子', data: itemaccount.profit_factor }
								]
							},
							{
								page: '2',
								data: [
									{ title: '最好交易', data: itemaccount.trade_best },
									{ title: '最差交易', data: itemaccount.trade_worst },
									{ title: '预期回报', data: itemaccount.trade_return },
									{ title: '夏普比率', data: itemaccount.sharpe_ratio }
								]
							},
							{
								page: '3',
								data: [
									{ title: '最大连续赢利', data: itemaccount.sprofit_max },
									{ title: '最大连续盈利', data: itemaccount.sprofit_max_num },
									{ title: '最大连续亏损', data: itemaccount.sloss_max },
									{ title: '最大连续失误', data: itemaccount.mistakes_max }
								]
							},
							{
								page: '4',
								data: [
									{ title: '毛利', data: itemaccount.gross_profit + 'USD(' + itemaccount.gross_profit_num + ')' },
									{ title: '毛利亏损', data: itemaccount.gross_loss + 'USD(' + itemaccount.gross_loss_num + ')' },
									{ title: '平均利润', data: itemaccount.avg_profit + 'USD(' + itemaccount.avg_profit_num + ')' },
									{ title: '平均损失', data: itemaccount.avg_loss + 'USD(' + itemaccount.avg_loss_num + ')' }
								]
							},
							{
								page: '5',
								data: [
									{ title: '每月增长', data: itemaccount.avg_mprofit },
									{ title: '年度预测', data: itemaccount.avg_mprofit_year }
								]
							}
						];
						that.total_profit = itematrade.total_profit;
					}else{
						that.phonemsg = res.msg;
						that.phonemsgbox = true;
						setTimeout(() => {
						that.phonemsgbox = false;
						}, 1000);
					}
				})
			},
			
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

			// 历史部分
			getmasterhistory:function(mypage){
				const that = this;
				var id = that.mt4id;
				http.post('/api.signal/iorders', {account:id,tab:'history',page:mypage})
				.then(function (res) {        					
					if(res.code == 200) {
						// console.log(res.result.data)
						var data = res.result.data;
						if (data.length > 0) {
							data.forEach(item => {
								var point = Math.abs(Math.ceil((item.close_price - item.open_price) * (Math.pow(10, item.dlen))));
								that.list.push({
									'symbol': item.symbol,
									'op': item.op == '1' ? 'sell' : 'buy',	////类型op(1:'sell'  其他：'buy'   )
									'lots': item.lots,
									'open_time': formatTime(item.open_time - 8 * 3600 + 2),
									'open_price': item.open_price,
									'close_price': item.close_price,
									'profit': item.profit,
									'point': point,
									'takeprofit': item.takeprofit,
									'stoploss': item.stoploss,
									'commission': item.commission,
									'swap': item.swap,
									'close_time': formatTime(item.close_time - 8 * 3600 + 2),
									'listshow': false
								});
							})							
						}else{
							if(that.hispage==1){
								that.nohistory = true;								
							}else{
								that.listlength = true;
							}
						}
						if(!that.scroll1){
							that.$nextTick(() => {
								that.scroll1 = new BScroll(that.$refs.wrapper, {click:true})
							})
							that.hisloadMore();
						}else{
							that.scroll1.refresh();
						}			
					}else{
						that.nohistory = true;
						that.phonemsg = res.msg;
						that.phonemsgbox = true;
						setTimeout(() => {
							that.phonemsgbox = false;
						}, 1000);
					}
				})
			},
			// 加载更多
			hisloadMore() {
				const that = this;        
				that.$nextTick(() => {
					//touchEnd（手指离开以后触发） 通过这个方法来监听下拉刷新
					that.scroll1.on('touchEnd', (pos) => {
						if(that.scroll1.maxScrollY>pos.y+10){
							that.nohistory = false;
							that.hispage += 1;
							that.getmasterhistory(that.hispage);
							//使用refresh 方法 来更新scroll  解决无法滚动的问题
							that.scroll1.refresh();
						}
					})
				});
			},
			showhistory:function(item,index){
				// console.log(index);
				item.listshow = !item.listshow;
			},

			// 持仓部分
			getmasterhold:function(mypage){
				const that = this;
				var id = that.mt4id;
				http.post('/api.signal/iorders', {account:id,tab:'hold',page:mypage})
				.then(function (res) {        					
					if(res.code == 200) {
						// console.log(res.result.data)
						var data = res.result.data;
						if (data.length > 0) {
							that.hnohistory = false;
							that.nohold = false;
							data.forEach(item => {
								var point = Math.abs(Math.ceil((item.close_price - item.open_price) * (Math.pow(10, item.dlen))));
								that.holslist.push({
									'symbol': item.symbol,
									'op': item.op == '1' ? 'sell' : 'buy',	////类型op(1:'sell'  其他：'buy'   )
									'lots': item.lots,
									'open_time': formatTime(item.open_time - 8 * 3600 + 2),
									'open_price': item.open_price,
									'close_price': item.close_price,
									'profit': item.profit,
									'point': point,
									'takeprofit': item.takeprofit,
									'stoploss': item.stoploss,
									'commission': item.commission,
									'swap': item.swap,
									'close_time': formatTime(item.close_time - 8 * 3600 + 2),
									'listshow': false
								});
							})
							that.totalcommission = (res.result.commission*100/100).toFixed(2);
							that.totalswap = res.result.swap;
							that.totalprofit = res.result.profit;
							if(!that.scroll2){
								that.$nextTick(() => {
									that.scroll2 = new BScroll(that.$refs.wrapper2, {click:true})
								})
								that.holdloadMore();
							}else{
								that.scroll2.refresh();
							}

						}else{
							if(that.holerpage==1){
								that.hnohistory = true;
								that.nohold = true;
								that.listlength = true;
							}
						}			
					}else{
						that.hnohistory = true;
						that.nohold = true;
						that.phonemsg = res.msg;
						that.phonemsgbox = true;
						setTimeout(() => {
							that.phonemsgbox = false;
						}, 1000);
					}
				})
			},
			// 加载更多
			holdloadMore() {
				const that = this;        
				that.$nextTick(() => {
					//touchEnd（手指离开以后触发） 通过这个方法来监听下拉刷新
					that.scroll2.on('touchEnd', (pos) => {
						if(that.scroll2.maxScrollY>pos.y+10){
							that.holerpage += 1;
							that.getmasterhold(that.holerpage);
							//使用refresh 方法 来更新scroll  解决无法滚动的问题
							that.scroll2.refresh();
						}
					})
				});
			},
			hoshowhistory:function(item,index){
				// console.log(999,index);
				item.listshow = !item.listshow;
			},

			// 评论部分
			geticomment:function(mypage){
				const that = this;
				var id = that.mt4id;
				http.post('/api.signal/icomment', {mt4id:id,page:mypage})
				.then(function (res) {        					
					if(res.code == 200) {
						var data = res.result.data;
						if (data.length > 0) {
							data.forEach(item => {
								if (item.u_img == '') {
									var img = 'http://static.v.yshfx.com/image/commit_head.jpg'
								} else {
									if (item.u_img.indexOf('http') == -1) {
										var img = 'http://static.v.yshfx.com/upload/image/' + item.u_img
									} else {
										var img = item.u_img
									}
								}
								that.icomment.push({
									'u_img': img,
									'username': item.username == '' ? item.login.substr(0, 4) + '****' + item.login.substr(8, 11) : item.username,
									'comment': item.comment,
									'modify_time': formatTime(item.modify_time)
								})
							})
							if(!that.scroll3){
								that.$nextTick(() => {
									that.scroll3 = new BScroll(that.$refs.wrapper3, {click:true})
								})
								that.comloadMore();
							}else{
								that.scroll3.refresh();
							}
						}else{
							that.listlength = true;
						}			
					}else{
						that.comnohistory = true;
						that.phonemsg = res.msg;
						that.phonemsgbox = true;
						setTimeout(() => {
							that.phonemsgbox = false;
						}, 1000);
					}
				})
			},
			// 加载更多
			comloadMore() {        
				this.$nextTick(() => {
					this.scroll3.on('touchEnd', (pos) => {
						if(this.scroll3.maxScrollY>pos.y+10){
							this.comnohistory = false;
							this.compage += 1;
							this.geticomment(this.compage);
							this.scroll3.refresh();
						}
					})
				});
			},

			// 发表评论
			comsubmit:function(){
				const that = this;
				if(that.commitext==''){
					that.phonemsg = "请输入评论";
					that.phonemsgbox = true;
					setTimeout(() => {
						that.phonemsgbox = false;
					},1500)
				}else{
					var id = that.mt4id;
					http.post('/api.signal/comment', {content:that.commitext,mt4id:id})
					.then(function (res) {        					
						if(res.code == 200) {
							that.phonemsg = '提交成功';
							that.phonemsgbox = true;
							setTimeout(() => {
								that.phonemsgbox = false;
							}, 1000);
							that.commitext = '';
						}else{
							that.phonemsg = res.msg;
							that.phonemsgbox = true;
							setTimeout(() => {
								that.phonemsgbox = false;
							}, 1000);
						}
					})
				}
			},
			// 跟随者部分
			ifollow:function(mypage){
				const that = this;
				var id = that.mt4id;
				http.post('/api.signal/follow', {account:id,page:mypage})
				.then(function (res) {        					
					if(res.code == 200) {
						var data = res.result.data;
						var mydata = res.result;					
						if (data.length > 0) {
							data.forEach(item => {
								if (item.u_img == '') {
									var img = 'http://static.v.yshfx.com/image/commit_head.jpg'
								} else {
									if (item.u_img.indexOf('http') == -1) {
										var img = 'http://static.v.yshfx.com/upload/image/' + item.u_img
									} else {
										var img = item.u_img
									}
								}
								if (item.weight.indexOf('-') == -1) {
									var direc = '正向'
								} else {
									var direc = '反向'
								}
								that.ifollowlist.push({
									u_img: img,
									nickname: item.nickname == '' ? item.login.substr(0, 4) + '****' + item.login.substr(8, 11) : item.nickname,
									zhmt4server: item.zhmt4server,
									balance: item.balance,
									weight: item.weight,
									direction: direc,
									maxhold: item.maxhold
								})
							});
							that.total = {
								follow: mydata.follow,
								tBalance: mydata.tBalance
							}
							if(!that.scroll4){
								that.$nextTick(() => {
									that.scroll4 = new BScroll(that.$refs.wrapper4, {click:true})
								})
								that.followloadMore();
							}else{
								that.scroll4.refresh();
							}							
						}else{
							if (that.page == 1) {
								that.nodata = true
							}
							that.total = {
								follow: mydata.follow,
								tBalance: mydata.tBalance
							}
						}
									
					}else{
						that.followdata = true;
						that.phonemsg = res.msg;
						that.phonemsgbox = true;
						setTimeout(() => {
							that.phonemsgbox = false;
						}, 1000);
					}
				})
			},
			// 加载更多
			followloadMore() {
				const that = this;        
				that.$nextTick(() => {
					//touchEnd（手指离开以后触发） 通过这个方法来监听下拉刷新
					that.scroll4.on('touchEnd', (pos) => {
						if(that.scroll4.maxScrollY>pos.y+10){
							that.followdata = false;
							that.folerpage += 1;
							that.ifollow(that.folerpage);
							that.scroll4.refresh();
						}
					})
				});
			}			
			
        },
	}
</script>