<template>
	<div>
		<div class="hiswrapper" ref="wrapper" v-if="!nodata">
			<div style="padding: 1px 0;">
				<div v-for="(item,index) in signal" :key="index">
					<div class="mystop">{{index+1}}.信号：{{item.name}}</div>
					<div class="mysbox">
						<ul class="mysbox_in">
							<li>
								<div class="left">
									<img class="mysicon" src="../../assets/images/mine/signal1.png" alt="">
									<span>信号编号</span>
								</div>
								<div class="right">#{{item.bn}}</div>
							</li>
							<li>
								<div class="left">
									<img class="mysicon" src="../../assets/images/mine/signal2.png" alt="">
									<span>信号类型</span>
								</div>
								<div class="right">签约</div>
							</li>
							<li>
								<div class="left">
									<img class="mysicon" src="../../assets/images/mine/signal3.png" alt="">
									<span>信号状态</span>
								</div>
								<div class="right">{{item.status}}</div>
							</li>
							<li>
								<div class="left">
									<img class="mysicon" src="../../assets/images/mine/signal4.png" alt="">
									<span>当前跟随人数</span>
								</div>
								<div class="right"><span style="color:#611987;">{{item.follow}}</span>人</div>
							</li>
						</ul>
						<div class="mysbox_down">
							<button class="mysedit1" v-if="item.state==1" @click="deletesignal(item,index)">下&nbsp;&nbsp;架</button>
							<button class="mysedit2" v-else>下&nbsp;&nbsp;架</button>
							<button @click="modify(item,index)" v-if="item.state!==1 && item.state!==0" class="mysstop1">修&nbsp;&nbsp;改</button>
							<button class="mysstop2" v-else>修&nbsp;&nbsp;改</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 没有数据的时候 -->
		<div v-else style='background:#f7f7f9;'>
			<img class="nodata" src="../../assets/images/master/nodata.png" alt=""/>
		</div>
		<div class="mysbox_seat"></div>
		<div class="mysbtn_fixed">
			<router-link :to="{name:'upsignal'}"><button class="mysbtn">新增信号</button></router-link>
		</div>

		<!-- 是否下架弹框 -->
		<div class="bomb" v-if="mysbomb">
			<div class="bombin">
				<div class="myscustom">
					<div class="mysbombtitle">提示</div>
					<p class="myscustom_inp">是否下架？</p>
					<div class="myscustom_btn">
						<button @click="fwcancel()">取消</button>
						<button @click="fwconfirm()">确定</button>
					</div>
				</div>
			</div>
		</div>

		<div class="masterbomb" v-if="phonemsgbox">{{phonemsg}}</div>
	</div>
</template>

<style>
	/* 自定义弹框 */
	.myscustom{background-color: #fff;width: 14rem;position: absolute;top: 30%;left: 0px;right: 0px;margin: 0 auto;border-radius: 4px;}
	.myscustom_inp{margin-top: 1rem;}
	.myscustom_btn{border-top: 1px solid #dedfe0;margin-top: 1.5rem;}
	.myscustom_btn>button{width: 49%;height: 2rem;border: none;outline: none;background-color: #fff;}
	.myscustom_btn>button:nth-child(2){border-left: 1px solid #dedfe0;color: #611987;}
	.mysbombtitle{height: 2rem;line-height: 2rem;border-bottom: 1px solid #dedfe0;}

	.hiswrapper{width: 100%;height: 92%;position: fixed;top: 0px;left: 0px;right: 0px;overflow-y: scroll;}
	.mystop{height: 2.3rem;line-height: 2.3rem;text-align: left;padding: 0px 0.5rem;}
	.mysbox{background-color: white;border-top: 1px solid #DEDFE0;border-bottom: 1px solid #DEDFE0;}
	.mysbox_in{padding: 0.5rem 0.5rem;}
	.mysbox_in>li{height: 1.2rem;line-height: 1.2rem;}
	.mysicon{width: 0.8rem;height: 0.8rem;margin-right: 0.5rem;float: left;margin-top: 0.2rem;}
	.mysbox_down{border-top: 1px solid #DEDFE0;height: 1.8rem;padding: 0.3rem 0.5rem;}
	.mysstop1,.mysstop2,.mysedit1,.mysedit2{width: 4rem;height: 1.8rem;margin-left: 0.5rem;border-radius: 50px;float: right;}
	.mysedit1{border: none;color: #fff;background-color: #611987;}
	.mysedit2{border: 1px solid #ccc;color: #fff;background-color: #ccc;}
	.mysstop1{border: 1px solid #611987;background-color: #fff;color: #611987;}
	.mysstop2{background-color: #fff;color: #ccc;border: 1px solid #ccc;}
	.masterbomb{padding: 0.5rem 1rem;width:6rem;background-color: rgba(0, 0, 0, 0.5);color: white;position: fixed;top: 40%;border-radius: 50px;
	left: 0px;right: 0px;margin: 0 auto;z-index: 11;}
	.mysbtn_fixed{background-color: white;width: 100%;height: 2.7rem;position: fixed;bottom: 0px;left: 0px;right: 0px;z-index: 3;border-top: 1px solid #DEDFE0;}
	.mysbtn{width: 90%;height: 2rem;background-color: #611987;border: none;border-radius: 50px;margin-top: 0.3rem;color: #fff;}
	.mysbox_seat{width: 100%;height: 2.2rem;}
</style>

<script>
	import http from '@/lib/http';
	import { formatTime,globalData } from '@/lib/utils';
	import BScroll from 'better-scroll';
	export default {
		data(){
			return {
				signal:[],
				page:1,
				nodata:false,
				phonemsgbox:false,
				phonemsg:'',
				mysbomb:false,
				selectid:0,
			}
		},
		created(){			
			const that = this;
			that.mysignal(that.page);
		},
		methods: {
			// 点击跳转页面
			modify:function(item,index){
				const that = this;
				console.log(item.id)
				this.$router.push({path:'/modify',query:{mt4server:item.mt4server,sign_name:item.name,mt4id:item.mt4id}});
			},
			// 点击下架
			deletesignal:function(item,index){
				const that = this;
				that.selectid = item.id;
				that.mysbomb = true;
			},

			// 点击取消下架
			fwcancel:function(){
				const that = this;
				that.mysbomb = false;
			},
			// 点击确定下架
			fwconfirm:function(){
				const that = this;
				that.mysbomb = false;
				http.post('/api.signal/edit_master_signal', {mt4id:that.selectid,show:3})
				.then(function (res) {						        					
					if(res.code == 200) {
						that.page = 1;
						that.signal = [];
						that.nodata = false;
						that.mysignal(that.page);
					}else{
						that.phonemsg = res.msg;
						that.phonemsgbox = true;
						setTimeout(() => {
							that.phonemsgbox = false;
						}, 1000);
					}
				})
			},
			// 我的信号接口
			mysignal:function(mypage){
				const that = this;
				http.post('/api.signal/get_my_master_signal', {mt4id:that.selectid,show:3})
				.then(function (res) {						        					
					if(res.code == 200) {
						var data = res.data.data;
						console.log(data)											
						if (data.length > 0) {
							data.forEach(item => {								
								if (item.status == 0) {
									var status = '待审核';
								} else if (item.status == 1) {
									var status = '已审核';
								} else if (item.status == 2) {
									var status = '已拒绝';
								} else if (item.status == 3) {
									var status = '已下架';
								} else if (item.status == 4) {
									var status = '即将下架';
								}	
								that.signal.push({
									id:item.id,
									name: item.sign_name,
									bn: item.bn,
									follow: item.follow,
									state: item.status,
									status: status,
									show: item.show,
									business: item.business,
									mt4server: item.mt4server,
									mt4id: item.mt4id,
									mt4pwd: item.mt4pwd
								})
							});
							// console.log("跟随交易长度"+data.length)
							that.$nextTick(() => {
								that.scroll = new BScroll(that.$refs.wrapper, {click:true})
							})
							that.loadMore();							
						}else{
							if (that.page == 1) {
								that.nodata = true
							}
							that.total = {
								follow: data.follow,
								tBalance: data.tBalance
							}
						}
									
					}else{
						that.nodata = true;
						that.phonemsg = res.msg;
						that.phonemsgbox = true;
						setTimeout(() => {
							that.phonemsgbox = false;
						}, 1000);
					}
				})
			},
			// 加载更多
			loadMore() {
				const that = this;        
				that.$nextTick(() => {
					//touchEnd（手指离开以后触发） 通过这个方法来监听下拉刷新
					that.scroll.on('touchEnd', (pos) => {
						// 下拉动作
						// if(pos.y > 50){
						//     console.log("下拉刷新成功")
						//     that.dropDown = false
						// }
						//上拉加载 总高度>下拉的高度+10 触发加载更多
						if(that.scroll.maxScrollY>pos.y+10){
							that.nohistory = false;
							that.page += 1;
							that.mysignal(that.page);
							//使用refresh 方法 来更新scroll  解决无法滚动的问题
							that.scroll.refresh();
						}
					})
				});
			},
		}
	}
	
</script>