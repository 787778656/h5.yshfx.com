<template>
	<div>
		<div class="createtop">
			<img class="createicon" src='../../assets/images/master/create_rules.png'/>
			<div class="creatext">创建规则</div>
		</div>
		<div class="crbox">
			<p>1. 上传的账户必须为实盘（live）账户；</p>
			<p>2. 签约交易者按照 <span class="crfont1" @click="showExample">平均跟随人数</span> 获得收益；</p>
			<p><span class="crfont1">详情咨询客服了解</span></p>
		</div>
		<ul class="ibox crbox2">
			<li>
				<div class="crtitle left">经纪商</div>
				<input class="crinp left" type="text" placeholder="请选择经纪商" v-model="selectbroker"/>
				<div class="crightimgbox" @click="showcover()">
					<img class="crightimg" src="../../assets/images/master/right_icon2.png" alt="">
				</div>
			</li>
			<li>
				<div class="crtitle left">服务器</div>
				<input class="crinp left" type="text" placeholder="请选择服务器" v-model="selectserverlive"/>
				<div class="crightimgbox" @click="showserver()">
					<img class="crightimg" src="../../assets/images/master/right_icon2.png" alt="">
				</div>
			</li>
			<li>
				<div class="crtitle left">名称</div>
				<input class="crinp left" type="text" placeholder="请选择信号的名称" v-model="bordername"/>
			</li>
			<li>
				<div class="crtitle left">账号</div>
				<input class="crinp left" type="text" placeholder="请选择MT4账号" v-model="borderid"/>
			</li>
			<li>
				<div class="crtitle left">密码</div>
				<input class="crinp left" type="text" placeholder="请选择MT4密码" v-model="borderpwd"/>
			</li>
		</ul>
		<div class="creremark">
			<img class="cretip" src="../../assets/images/master/tips.png" alt="">
			<div class="crewatch">该类型交易者平台会综合评估信号质量，由平台固定支付信号服务费用(用户免费)。</div>
		</div>
		<button class="crbtn" @click="submit()">提&nbsp;&nbsp;&nbsp;&nbsp;交</button>

		<!-- 选择经纪商 -->
		<div class="bomb" v-if="rdectionbox">
			<div class="bombin">
				<div class="sfixedbox" @click="hidecover()"></div>
				<div class="sfixed upborders">
					<div class="upborders_search">
						<div class="upborders_searchimg2" @click="searchbroker()">
							<img class="upborders_searchimg" src="../../assets/images/master/searchicon.png" alt="">
						</div>
						<div class="upborders_line"></div>
						<input class="upborders_searchinp" type="text" v-model="searchtext" placeholder="搜索您的经纪商"/>
					</div>
					<div class="upbordersrcoll">
						<ul class="upbordersbox">
							<li v-for="(item,index) in allbroker" :key="index" v-bind:class='{livefont:borderindex==index}' @click="bordersele(item,index)">{{item.SHOWNAME}}</li>
						</ul>
					</div>
					<div class="upborders_hand" @click="hidecover()">手动输入经纪商</div>
				</div>
			</div>
		</div>
		<!-- 选择服务器 -->
		<div class="bomb" v-if="serverlive">
			<div class="bombin">
				<div class="sfixedbox" @click="serverclose()"></div>
				<div class="sfixed upborders">
					<div class="upborders_server">请选择服务器</div>
					<div class="upbordersrcoll">
						<ul class="upbordersbox">
							<li v-for="(item,index) in serverlistlives" :key="index" v-bind:class='{livefont:liveindex==index}' @click="chooselive(item,index)">{{item.SERVERNAME}}</li>
						</ul>
					</div>
					<div class="upborders_hand" @click="serverclose()">手动输入经纪商</div>
				</div>
			</div>
		</div>
		<div class="masterbomb" v-if="phonemsgbox">{{phonemsg}}</div>

		<!-- 平均跟随人数 -->
		<div class="bomb" v-if="Example1">
			<div class="fobombin">
				<div class="fobomb">
					<div class="borderbombtitle">平均跟随人数</div>
					<div class="border_bombnei">平均跟随人数指一个月内平均跟随的人数，例如：某月1日有100个人跟随，2日有120人，
						3日有200人……那么每日的跟随人数总和除以30日则为平均跟随人数，每月1日进行统计结算。</div>
					<button @click="closeExample()" class="fobombbtn">知道了</button>
				</div>
			</div>
		</div>

		<!-- 提交成功 -->
		<div class="bomb" v-if="tipsuccess">
			<div class="fobombin">
				<div class="fobomb">
					<div class="borderbombtitle">提交成功</div>
					<div class="border_bombnei">
						等待审核（1个工作日），请您保持正常交易，以便审核人员更多参考，请至个人中心我的信号查看状态
					</div>
					<button @click="sucConfirm()" class="fobombbtn">确认</button>
				</div>
			</div>
		</div>

	</div>
</template>

<style>
	@import '../../assets/css/create.css';
	@import '../../assets/css/follow.css';
</style>

<script>
import http from '@/lib/http';
import {brokers,serverlistlive,serverlistdemo} from '@/lib/brokers';
export default {
	data(){
		return {
			rdectionbox:false,//经纪商是否显示
			rules:[
				{num:'1-10',profit:'10元/人/月'},
				{ num: '11-20', profit: '20元/人/月' },
				{ num: '21-50', profit: '30元/人/月' },
				{ num: '51-100', profit: '50元/人/月' },
				{ num: '101-200', profit: '70元/人/月' },
				{ num: '201-300', profit: '100元/人/月' },
				{ num: '301-500', profit: '130元/人/月' },
				{ num: '500-1000', profit: '150元/人/月' },
				{ num: '1000以上', profit: '180元/人/月' },
			],
			headswitch: 'live',
			allbroker: [],	//所有经纪商
			serverlistlives: [],	//对应的live服务器
			selectbroker: '',	//选中的经纪商
			selectserverlive: '',	//选中的服务器
			choosetype: '',	//broker serverlive serverdemo
			searchtext: '',	//搜索的经纪商
			serverlive: false,//选择服务器是否显示
			bordername:'',//名称
			borderid:'',//账号
			borderpwd:'',//密码
			phonemsg:'',//提示框文字
			phonemsgbox:false,//提示框状态
			borderindex:-1,//经纪商索引号变色
			liveindex:-1,//服务器索引号变色
			Example1:false,//平均跟随人数
			Example2:false,//阶梯收益
			tipsuccess:false,//提交成功弹框
		}
	},
	created(){
		const that = this;
		// console.log(serverlistlive)
		that.allbroker = brokers;
	},
	methods: {
		// 点击搜索经纪商
		searchbroker:function(){
			const that = this;
			that.allbroker = [];
			brokers.forEach(item => {
				if(item.SHOWNAME!=undefined){
					if ((item.SHOWNAME.toLowerCase()).indexOf(that.searchtext.toLowerCase())!=-1){
						that.allbroker.push({
							'SHOWNAME': item.SHOWNAME,
							'ID': item.ID
						})
					}
				}
			});	
		},
		// 点击显示经纪商
		showcover:function(){
			const that = this;
			that.allbroker = brokers;
			that.rdectionbox = true;
		},
		// 点击隐藏经纪商
		hidecover:function(){
			const that = this;
			that.rdectionbox = false;
		},
		// 点击显示服务器
		showserver:function(){
			const that = this;
			if(that.selectbroker==''){
				that.phonemsg = '请选择经纪商';
				that.phonemsgbox = true;
				setTimeout(() => {
					that.phonemsgbox = false;
				}, 1000);
			}else{
				that.serverlive = true;
			}			
		},
		// 点击隐藏服务器
		serverclose:function(){
			const that = this;
			that.serverlive = false;
		},

		// 选择经纪商
		bordersele:function(item,index){
			const that = this;
			that.selectbroker = item.SHOWNAME;
			that.selectserverlive = '';
			that.borderindex = index;
			that.liveindex = -1;//服务器索引号变色			
			that.serverlistlives = eval('('+serverlistlive['bk'+item.ID]+')');
			// console.log(that.serverlistlives)
			setTimeout(() => {
				that.rdectionbox = false;
			}, 300);
		},
		// 选择服务器
		chooselive:function(item,index){
			const that = this;
			that.selectserverlive = item.SERVERNAME;
			that.liveindex = index;
			setTimeout(() => {
				that.serverlive = false;
			}, 300);			
		},
		// 点击平均跟随人数
		showExample(){
			const that = this;
			that.Example1 = true;
		},
		// 点击阶梯收益
		showExample2(){
			const that = this;
			that.Example2 = true;
		},
		closeExample(){
			const that = this;
			that.Example1 = false;
			that.Example2 = false;
		},
		// 隐藏提交成功弹框
		sucConfirm:function(){
			const that = this;
			that.tipsuccess = false;
			setTimeout(() => {
				that.$router.go(-1);
			}, 1000);
		},
		// 点击提交
		submit:function(){
			const that = this;
			if(that.selectbroker==''){
				that.phonemsg = '请选择经纪商';
				that.phonemsgbox = true;
				setTimeout(() => {
					that.phonemsgbox = false;
				}, 1000);
			}else if(that.selectserverlive==''){
				that.phonemsg = '请选择服务器';
				that.phonemsgbox = true;
				setTimeout(() => {
					that.phonemsgbox = false;
				}, 1000);
			}else if(that.bordername==''){
				that.phonemsg = '请输入信号的名称';
				that.phonemsgbox = true;
				setTimeout(() => {
					that.phonemsgbox = false;
				}, 1000);
			}else if(that.borderid==''){
				that.phonemsg = '请输入MT4帐号';
				that.phonemsgbox = true;
				setTimeout(() => {
					that.phonemsgbox = false;
				}, 1000);
			}else if(that.borderpwd==''){
				that.phonemsg = '请输入MT4密码';
				that.phonemsgbox = true;
				setTimeout(() => {
					that.phonemsgbox = false;
				}, 1000);
			}else{
				var data={
					'business': that.selectbroker,
					'mt4server': that.selectserverlive,
					'sign_name': that.bordername,
					'mt4id': that.borderid,
					'mt4pwd': that.borderpwd,
					'type': 1
				}
				http.post('/api.signal/add_master_signal', {data:JSON.stringify(data)})
				.then(function (res) {
					if(res.code == 200) {
						that.allbroker = [];//经纪商数组
						that.serverlistlives = [];//服务器数组
						that.selectbroker = '';//名称
						that.selectserverlive = '';//账号
						that.bordername = '';//名称
						that.borderid = '';//账号
						that.borderpwd = '';//密码
						that.borderindex = -1;//经纪商索引号变色
						that.liveindex = -1;//服务器索引号变色
            			that.tipsuccess = true;
					}else{
            			that.phonemsg = res.msg;
						that.phonemsgbox = true;
						setTimeout(() => {
							that.phonemsgbox = false;
						}, 1500);
					}
				})
			}
		}
	}
  
}
</script>