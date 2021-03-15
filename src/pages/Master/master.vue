<template>
	<div>
		<div class="masert">
			<div class="maserttop">
				<div class="masert_bind">
					<div class="left masert_menu" v-if="mymt4id.length>0" @click="mt4_select_toggle()">
						<img class="tmenu_follstatu" v-if="zhmt4sh==1" src="../../assets/images/master/mt4_state_on.png" alt="">
						<img class="tmenu_follstatu" v-if="zhmt4sh==0" src="../../assets/images/master/mt4_state_off.png" alt="">
						<div class="left">MT4：{{mymt4idselect}}</div>
						<img class="tmenu_follpull" src="../../assets/images/master/select_icon.png" alt="">
					</div>
					<router-link :to="{name:'bindmt4'}" class="left masert_bindgo" v-else>
						<div class="masert_bindicon"></div>
						<div class="left">MT4未绑定</div>
					</router-link>

					<div class="right masert_sort" @click="sort_select_toggle()">
						<img class="sortimg" src="../../assets/images/master/sort_icon.png" alt="">
						<div class="left">排序</div>
					</div>
				</div>
				<div class="masert_user">
					<div class="masert_userbox single">
						<!-- <img class="masert_img" v-for="(item,index) in followsignal" :key="index" :style="{'left':(25*index)+'px','zIndex':(index+2)}" :src="item.u_img" alt=""> -->
						<p class="left">已选信号(<span class="trfont1">{{followsignal.length}}</span>)</p>
						<p class="left" v-for="(item,index) in followsignal" :key="index">{{item.name}}<span v-if="index+1!=followsignal.length">&nbsp;+&nbsp;</span></p>
					</div>
					<div v-if="token=='' || token==undefined" @click="nextfollow" class="masert_next">下一步</div>
					<router-link v-else to="/follow">
						<div class="masert_next">下一步</div>
					</router-link>

				</div>
			</div>
		</div>
		<!-- 占位盒子 -->
		<div class="masertseat"></div>

		<div class="mwrapper" ref="wrapper">
			<div style="padding: 1px 0;">
				<!-- <div :to="'/masterdetail/'+item.mt4id"> -->
				<div class="masertmenu" v-for="(item,index) in master_list" :key="index" @click="clickmrdetail(item,index)">
					<div class="tmenutop">
						<div class="left">
							<img class="tmenuhead" :src="item.image" alt="">
							<div class="tmenu_name single">{{item.name}}</div>
							<img class="tmenuicon" :src="item.mt4serveri" alt="">
						</div>
						<div class="right tmenubtn1" v-if="item.show==1 && item.state==1" @click.stop="follow(item,index)">跟&nbsp;&nbsp;随</div>
						<div class="right tmenubtn2" v-else-if="item.show==1 && item.state==2" @click.stop="remove(item,index)">移&nbsp;&nbsp;除</div>
						<div class="right tmenubtn3" v-else-if="item.show==1 && item.state==3">
							<img class="tmenubtn_img2" src="../../assets/images/master/o_listening.png" alt="">
							<div class="left">正在监听</div>
						</div>					
						<div class="right tmenubtn4" v-else-if="item.show==3">
							<div>同步异常</div>
							<div>即将下架</div>
						</div>
						
					</div>
					<ul class="tmenu_info">
						<li>
							<img class="tmenu_chart" :src="item.chart" alt="">
						</li>
						<li>
							<p class="masterfont1">利润率</p>
							<p class="tmenu_profit">{{item.profit}}%</p>
						</li>
						<li>
							<p class="masterfont1">最大回撤</p>
							<p>{{item.trade_drawdown}}%</p>
						</li>
						<li>
							<p class="masterfont1">交易胜率</p>
							<p>{{item.trade_win}}%</p>
						</li>
						<li>
							<p class="masterfont1">跟随人数</p>
							<p>{{item.follow}}</p>
						</li>
					</ul>
				</div>
				<!-- <div class="loadingbox" v-if="indexloading">
					<img src="../../assets/images/master/indexloading.gif" alt=""/>
				</div> -->
				<div class="dmyload" v-if="indexloading">
					<div class="zstartpoint1"></div>
					<div class="zstartpoint2"></div>
					<div class="zstartpoint3"></div>
				</div>
			</div>
		</div>

		<!-- 选择mt4列表 -->
		<div class="bomb" v-if="select_mt4show">
			<div class="bombin">
				<ul class="select_list">
					<li v-for="(item,index) in mymt4id" :key="index" @click="select_mt4(item,index)">
						<span>{{item.mt4id}}</span>
						<img v-if="mymt4idselect==item.mt4id" class="select_listicon" src="../../assets/images/master/mt4_selected.png" alt="">	
					</li>
				</ul>
				<div class="select_listseat" @click="select_mt4close()"></div>
			</div>
		</div>

		<!-- 选择排序 -->
		<div class="bomb" v-if="select_sort">
			<div class="bombin">
				<ul class="select_list">
					<li v-for="(item,index) in sorttypelist" :key="index" @click="click_sort(item,index)">
						<div class="select_sorttext">{{item.text}}</div>
						<img v-if="sorttype==item.id" class="select_sorticon" src="../../assets/images/master/sort_selected.png" alt="">
						<img v-else class="select_sorticon" src="../../assets/images/master/sort_select.png" alt="">	
					</li>
				</ul>
				<div class="select_listseat" @click="select_mt4close()"></div>
			</div>
		</div>

		<div class="toast" v-if="showtoast">{{showtoastext}}</div>
		<!-- 占位盒子 -->
		<div class="seat"></div>
		
	</div>
</template>

<style>
	@import '../../assets/css/master.css';
</style>

<script>
import http from '@/lib/http';
import { formatTime,globalData } from '@/lib/utils';
import BScroll from 'better-scroll';
	export default {
		data(){
			return {
				showtoast:false,
				page:1,
				select_sort:false,
				sorttypelist:[
					{ id: '1', text: '综合' },
					{ id: '2', text: '利润率' },
					{ id: '3', text: '跟单人数' },
					{ id: '4', text: '风险' },
					{ id: '5', text: '预期收益' },
					{ id: '6', text: '交易时长' }
				],
				sorttype:1,
				indexloading:true,
				list_normal:[],
				followsignal:[],
				master_list:[],
				showtoastext:'',
				mymt4id:[],
				zhmt4sh:localStorage.zhmt4sh,
				mymt4idselect:localStorage.mymt4idselect,
				select_mt4show:false,
				mtindex:0,
				token:''
			}
		},
		created(){
			const that = this;
			that.token = localStorage.token;	
			// 个人信息接口
			http.post('/api.mobile/get_userinfo', {})
			.then(function (res) {					
				if(res.code == 200) {					
					var item = res.result;				
					that.mymt4id = item.mt4_arr;
				}
			})
			// console.log(that.mymt4id);
			
			that.Signalindex(that.page,that.sorttype);
			that.getstatus();
			
		},
		methods: {
			nextfollow(){
				var that = this;
				that.showtoastext = '您还未登录';
				that.showtoast = true;
				setTimeout(() => {
					that.showtoast = false;
				}, 1000);
			},
			// 选择排序
			click_sort:function(item,index){
				const that = this;
				that.sorttype = item.id;
				that.page = 1;
				that.master_list = [];
				localStorage.master_list = '';				
				that.indexloading = true;
				that.select_sort = false;				
				//获取用户跟单数据				
				http.post('/api.signal/index', {page:that.page,type:that.sorttype})
				.then(function (res) {
					var today=new Date();
					var year=today.getFullYear();
					if ((today.getMonth()+1)<10){
						var month = '0'+(today.getMonth()+1)
					}else{
						var month = today.getMonth() + 1
					}
					if (today.getDate() < 10) {
						var day = '0' + today.getDate()
					} else {
						var day = today.getDate()
					}
					var vv = year + month + day					
					if(res.code == 200) {
						var data = res.result.data;
						var mylist = [];						
						if(data.length>0){
							that.indexloading = false
							data.forEach(item => {
								var charti = 'http://static.v.yshfx.com/upload/image/wxchart/' + item.mt4id+'.png?v='+vv
								mylist.push({
									bn: item.bn,
									id: item.id,
									mt4id: item.mt4id,
									mt4server: item.mt4server,
									chart: charti,
									image: item.img,
									country: item.country_img,
									name: item.name,
									mt4serveri: item.service_img,
									areaCanvas: item.rand_profit,
									profit: parseFloat(item.profit).toFixed(2),
									trade_week: item.trade_week,
									follow: item.follow,
									trade_drawdown: parseFloat(item.trade_drawdown).toFixed(2),
									trade_win: parseFloat(item.trade_win).toFixed(2),
									avg_mprofit: parseFloat(item.avg_mprofit).toFixed(2),
									state: '1',//跟随者信息(state:1-跟随，2-移除，3-正在监听，4-下架)
									show: item.show	//前端主信号显示控制（1：显示  2：隐藏 3:即将下架）
								})								
							})
							var list = that.master_list.concat(mylist);														
							// that.master_list = list;
							var fitem = eval('('+localStorage.followsignal+')');
							for(var k=0;k<list.length;k++){
								// console.log(fitem)																												
								for(var i=0;i<fitem.length;i++){																			
									if (list[k].bn == fitem[i].bn){										
										if (fitem[i].status==1){											
											//正在监听
											// console.log('循环')
											list[k].state ='3';
										} else if (fitem[i].status== 0) {
											//移除
											list[k].state = '2';
										} 
									}
								}
							}
							that.master_list = list;
							localStorage.master_list = JSON.stringify(that.master_list);
							that.master_list = eval('('+localStorage.master_list+')');
							
						}else{
							that.indexloading = false;
						}
						// console.log("跟随交易长度"+data.length)
						if(!that.scroll){
							that.$nextTick(() => {
								that.scroll = new BScroll(that.$refs.wrapper, {
									click: true
								})
							})
							that.loadMore();
						}else{
							that.scroll.refresh();
						}
					}
				})
				that.getstatus();
				// console.log(that.master_list)
			},
			sort_select_toggle:function(){
				const that = this;
				that.select_sort = true;
			},
			// 选择mt4
			mt4_select_toggle:function(){
				const that = this;
				that.select_mt4show = true;				
			},
			select_mt4close:function(){
				const that = this;
				that.select_mt4show = false;
				that.select_sort = false;
			},
			select_mt4:function(item,index){
				const that = this;
				that.mtindex = index;
				that.mymt4idselect = item.mt4id;
				that.zhmt4sh = item.sh;								
				//获取用户跟单数据
				if(item.mt4id!=localStorage.mymt4idselect){
					localStorage.mymt4idselect = item.mt4id;
					localStorage.zhmt4sh = item.sh;
					that.select_mt4show = false;
					that.followsignal = [];
					that.master_list = [];
					that.page = 1;
					that.Signalindex(that.page,that.sorttype);
					http.post('/api.order/get_master_signal', {slave_mt4id:localStorage.mymt4idselect})
					.then(function (res) {						
						if(res.code == 200) {						
							localStorage.followsignal = JSON.stringify(res.result.data);
							that.followsignal = eval('('+localStorage.followsignal+')');
						}
					})
					that.getstatus();
				}	
			},
			//点击跳转到详情页面
			clickmrdetail:function(item,index){
				const that = this;
				var id = item.mt4id;
				that.$router.push({path:'/masterdetail',query:{id:id}});
			},
			getstatus:function(){
				const that = this;
				//跟单状态
				http.post('/api.order/get_status', {slave_mt4id:localStorage.mymt4idselect})
				.then(function (res) {
					if(res.code == 200) {
						that.mystatus = res.result.status;
						localStorage.mystatus = res.result.status;
					}else{
						that.mystatus = 2;
						localStorage.mystatus = 2;
					}
				})
			},
			getmastersignal:function(mt4id){
				const that = this;
				localStorage.followsignal = '';
				http.post('/api.order/get_master_signal', {slave_mt4id:localStorage.mymt4idselect})
					.then(function (res) {						
						if(res.code == 200) {
							var item = res.result.data;
							var followsignali=[];
							var text = new RegExp('-');
							var text2 = new RegExp('%');
							if (item.length > 0) {
								if (text2.test(item[0].weight)){//比例
									localStorage.switchType = 0
								}else{
									localStorage.switchType = 1
								}
								item.forEach(fi => {
									if (text.test(fi.weight)) {//反
										var directioni ='反';
										var weighti = fi.weight.substr(1, fi.weight.length)
									} else {//正
										var directioni = '正';
										var weighti = fi.weight
									}
									if (fi.maxloss=='0'){
										var maxlossi='不限'
									}else{
										var maxlossi = fi.maxloss
									}
									if (fi.maxhold == '0') {
										var maxholdi = '不限'
									} else {
										var maxholdi = fi.maxhold
									}
									followsignali.push({
										mt4id: fi.mt4id,
										mt4server: fi.mt4server,
										name: fi.name,
										u_img: fi.u_img,
										country_img: fi.country_img,
										service_img: fi.service_img,
										weight: weighti,
										maxloss: maxlossi,
										maxhold: maxholdi,
										status: fi.status,//0等待 1监听中
										bn:fi.bn,
										direction: directioni
									})
								})								
								that.switchType = localStorage.switchType;
								localStorage.followsignal = JSON.stringify(followsignali);
								that.followsignal = eval('('+localStorage.followsignal+')');
								
							}else{
								that.followsignal = [];
								localStorage.followsignal = '';
							}
						}
						
					})
			},
			
			// 获取数据接口
			Signalindex(page,type) {
				const that = this;
				http.post('/api.signal/index', {page:page,type:type})
				.then(function (res) {
					var today=new Date();
					var year=today.getFullYear();
					if ((today.getMonth()+1)<10){
						var month = '0'+(today.getMonth()+1)
					}else{
						var month = today.getMonth() + 1
					}
					if (today.getDate() < 10) {
						var day = '0' + today.getDate()
					} else {
						var day = today.getDate()
					}
					var vv = year + month + day					
					if(res.code == 200) {
						var data = res.result.data;
						var mylist = [];						
						if(data.length>0){
							that.indexloading = false
							data.forEach(item => {
								var charti = 'http://static.v.yshfx.com/upload/image/wxchart/' + item.mt4id+'.png?v='+vv
								mylist.push({
									bn: item.bn,
									id: item.id,
									mt4id: item.mt4id,
									mt4server: item.mt4server,
									chart: charti,
									image: item.img,
									country: item.country_img,
									name: item.name,
									mt4serveri: item.service_img,
									areaCanvas: item.rand_profit,
									profit: parseFloat(item.profit).toFixed(2),
									trade_week: item.trade_week,
									follow: item.follow,
									trade_drawdown: parseFloat(item.trade_drawdown).toFixed(2),
									trade_win: parseFloat(item.trade_win).toFixed(2),
									avg_mprofit: parseFloat(item.avg_mprofit).toFixed(2),
									state: '1',//跟随者信息(state:1-跟随，2-移除，3-正在监听，4-下架)
									show: item.show	//前端主信号显示控制（1：显示  2：隐藏 3:即将下架）
								})								
							})
							var list = that.master_list.concat(mylist);														
							// that.master_list = list;
							http.post('/api.order/get_master_signal', {slave_mt4id:localStorage.mymt4idselect})
							.then(function (res) {						
								if(res.code == 200) {						
									localStorage.followsignal = JSON.stringify(res.result.data);
									that.followsignal = eval('('+localStorage.followsignal+')');
									if(localStorage.followsignal!=undefined){
									var fitem = eval('('+localStorage.followsignal+')');
									for(var k=0;k<list.length;k++){
										// console.log(fitem)																												
										for(var i=0;i<fitem.length;i++){																			
											if (list[k].bn == fitem[i].bn){										
												if (fitem[i].status==1){											
													//正在监听
													// console.log('循环')
													list[k].state ='3';
												} else if (fitem[i].status== 0) {
													//移除
													list[k].state = '2';
												} 
											}
										}
									}
								}							
								that.master_list = list;
								localStorage.master_list = JSON.stringify(that.master_list);
								that.master_list = eval('('+localStorage.master_list+')');							
								}
							})
							// console.log(localStorage.followsignal)
							// console.log("跟随交易长度"+data.length)
							if(!that.scroll){
								that.$nextTick(() => {
									that.scroll = new BScroll(that.$refs.wrapper, {
										click: true
									})
								})
								that.loadMore();
							}else{
								that.scroll.refresh();
							}
						}else{
							that.indexloading = false;
						}
						
					}
				})
			},
			// 加载更多
			loadMore() {        
				this.$nextTick(() => {
					//touchEnd（手指离开以后触发） 通过这个方法来监听下拉刷新
					this.scroll.on('touchEnd', (pos) => {
						if(this.scroll.maxScrollY>pos.y+10){
							this.page += 1;
							this.Signalindex(this.page,this.sorttype);
							//使用refresh 方法 来更新scroll  解决无法滚动的问题
							this.scroll.refresh();
						}
					})
				});
			},

			// 点击跟随
			follow:function(item,index){
				const that = this;
				// console.log(item)		
				if (that.followsignal.length>=10){
					that.showtoastext = '超出组合上线';
					that.showtoast = true;
					setTimeout(() => {
						that.showtoast = false;
					}, 1000);
					return false
				}else{
					that.master_list[index].state = '2';
					if (localStorage.mystatus==1){
						var statusi=0
					} else if (localStorage.mystatus == 2) {
						var statusi =0
					}
					if (localStorage.switchType==1){
						var weighti='0.01';
					}else{
						var weighti = '10%';
					}
					that.followsignal.push({
						id:item.id,
						userimg:item.image,
						mt4id:item.mt4id,
						mt4server: item.mt4server,
						name: item.name,
						u_img: item.image,
						country_img: item.country,
						service_img: item.mt4serveri,
						bn: item.bn,
						direction:'正',
						weight: weighti,
						maxloss: '不限',
						maxhold: '不限',
						status: statusi
					})
					// console.log(that.followsignal)
					localStorage.setItem("followsignal",JSON.stringify(that.followsignal));
					localStorage.followsignal = JSON.stringify(that.followsignal);
					localStorage.setItem("master_list",JSON.stringify(that.master_list));
					localStorage.master_list = JSON.stringify(that.master_list);
				}
			},
			// 点击移除
			remove:function(item,index){
				const that = this;
				item.state = '1';				
				for(var i=0;i<that.followsignal.length;i++){
					// console.log(that.followsignal[i]);					
					if(that.followsignal[i].bn==that.master_list[index].bn){
						console.log(that.followsignal[i].bn+'master_list[index].id'+that.master_list[index].bn)
						// console.log(that.followsignal[i].bn)						
						that.followsignal.splice(i,1);
						console.log(that.followsignal)
						localStorage.followsignal = JSON.stringify(that.followsignal);
						localStorage.master_list = JSON.stringify(that.master_list);
					}
				}				
			},
			masershow:function(){
				const that = this;
				that.showtoastext = '详情请到网页版观看';
				that.showtoast = true;
				setTimeout(() => {
					that.showtoast = false;
				}, 1200);				
			},
			
		}
	}
</script>