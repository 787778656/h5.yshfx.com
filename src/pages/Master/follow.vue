<template>
	<div>
		<div class="fobanner">
			<div class="ibox follbox">
				<div class="follboxmt4" v-if="mymt4id.length>0" @click="mt4_select_toggle()">
					<div class="left">
						<img class="follstatu" v-if="zhmt4sh==1" src="../../assets/images/master/mt4_state_on.png" alt="">
						<img class="follstatu" v-if="zhmt4sh==0" src="../../assets/images/master/mt4_state_off.png" alt="">
						<div class="left">MT4：{{mymt4idselect}}</div>
					</div>
					<img class="frightimg" src="../../assets/images/master/right_icon2.png" alt="">
				</div>
				<router-link :to="{name:'bindmt4'}" v-else class="follboxmt4">
					<div class="left">
						<div class="masert_bindiconfol"></div>
						<div class="left">MT4未绑定</div>
					</div>
					<img class="frightimg" src="../../assets/images/master/right_icon2.png" alt="">
				</router-link>			
				<div class="follboxmt4" style="border:none;">
					<div class="left follmo">当前跟单模式：比例跟单 <span class="follshi" @click='explamel()'>示例</span></div>
					<button class="follbtn" v-if="mystatus==2" @click="confirmswitch()">立即跟单</button>
					<button class="follbtn" v-if="mystatus==1" @click="stopswitch()">停止跟单</button>
				</div>
			</div>
		</div>
		<div class="fobanner_seat"></div>
		<div class="ibox" v-for="(item,index) in followsignal" :key="index">
			<div class="fmenutop">
				<div class="left">
					<img class="fmenuhead" :src="item.u_img" alt="">
					<img :src="item.country_img" class="list_person_country" alt=""/>
					<div class="fmenu_name single">{{item.name}}</div>
					<img class="fmenuicon" :src="item.service_img" alt="">
				</div>
				<div class="right fmenubtn1">
					<span v-if="item.status==0">等待监听</span>
					<span v-if="item.status==1" style='color:#009c37'>监听中</span>
					<span v-if="item.status==2" style='color:#ff8932'>修改后生效</span>
				</div>
			</div>
			<ul class="fnamebox">
				<li v-if="item.status!=1" @click="rweight(item,index)">
					<div class="left">权重</div>
					<div class="right">
                    	<img class="folllock" src="../../assets/images/master/right_icon.png" alt="">						
						<div class="right follsele">
							<span v-if="isChecked">{{item.weight}}</span>
							<span v-else>{{item.weight}}</span>
						</div>
					</div>
				</li>
				<li v-else>
					<div class="left">权重</div>
					<div class="right">
                    	<img class="folllock" src="../../assets/images/master/right_icon.png" alt="">
						<div class="right follsele" style="color:#999;">
							<span>{{item.weight}}</span>
						</div>
					</div>
				</li>
				<li v-if="item.status!=1">
					<div class="left">跟单方向（VIP）</div>
					<div class="right">
                    	<img class="folllock" src="../../assets/images/master/right_icon.png" alt="">
						<div class="right follsele" @click="clickdirection(item,index)">{{item.direction}}</div>
					</div>
				</li>
				<li v-else>
					<div class="left">跟单方向（VIP）</div>
					<div class="right">
                    	<img class="folllock" src="../../assets/images/master/right_icon.png" alt="">
						<div class="right follsele" style="color:#999;">{{item.direction}}</div>
					</div>
				</li>
				<li v-if="item.status!=1">
					<div class="left">最大持仓单量限制</div>
					<div class="right">
                    	<img class="folllock" src="../../assets/images/master/right_icon.png" alt="">
						<div class="right follsele" @click="clickmaxhold(item,index)">{{item.maxhold}}</div>
					</div>
					
				</li>
				<li v-else>
					<div class="left">最大持仓单量限制</div>
					<div class="right">
                    	<img class="folllock" src="../../assets/images/master/right_icon.png" alt="">
						<div class="right follsele" style="color:#999;">{{item.maxhold}}</div>
					</div>
				</li>
			</ul>
			<div class="folbotbtn_menu">				
				<button class="folbotbtn1" @click="deletestatus(item,index)">删除</button>
				<div v-if="mystatus==1" class="right">
					<button v-if="item.status==1" class="folbotbtn2" @click="modifystatus(item,index)">修改</button>				
					<button v-else class="folbotbtn3" @click="finishstatus(item,index)">完成</button>
				</div>
			</div>
		</div>
		<router-link :to="{name:'master'}"><div class="foltian ibox2">添加信号</div></router-link>
		<div class="creremark">
			<img class="cretip" src="../../assets/images/master/tips.png" alt="">
			<div class="crewatch">
				<p>启动：首次启动将会立即同步当前信号持仓订单；</p>
				<p>修改：将在信号下一次发生交易后生效；</p>
				<p>删除：将立即移除信号下的交易订单。</p>
			</div>
		</div>
		
		<!-- 切换mt4 -->
		<div class="bomb" v-if="mt4_select">
			<div class="bombin">
				<ul class="fselectul">
					<li v-for="(item,index) in mymt4id" :key="index" @click="select(item,index)">
						<img v-if="item.sh==1" class="fselectulred" src="../../assets/images/master/mt4_state_on.png"/>
						<img v-else class="fselectulred" src="../../assets/images/master/mt4_state_off.png"/>
						<div class="left">MT4:{{item.mt4id}}</div>
						<img v-if="item.mt4id==selected" src="../../assets/images/master/mt4_selected.png" class="fmt4_select_icon" alt=""/>
					</li>
				</ul>
				<div class="fselectulbox" @click="mt4_selectclose()"></div>
			</div>
		</div>
		<!-- 权重选择器 -->
		<div class="bomb" v-if="rweightbox">
			<div class="bombin">
				<div class="sfixedbox" @click="rweightclose()"></div>
				<div class="sfixed">					
					<div class="sfixedtop">
						<div class="left" @click="rweightclose()">取消</div>
						<div class="left sfixedtop_box">
							<div v-bind:class='{fobomb_remarkf2:isChecked==false}'>比例跟单</div>
							<div class="left sfixedtop_weui">
								<span class="weui-switch" :class="{'weui-switch-on' : isChecked}" :value="value" @click="toggle" style="position:relative">
								<div v-if="isChecked && direction.length > 0" class="weuidiv1">
									{{direction[0]}}
								</div>
								<div v-if="!isChecked && direction.length > 0" class="weuidiv2">
									{{direction[1]}}
								</div>
								</span>
							</div>
							<div v-bind:class='{fobomb_remarkf2:isChecked==true}'>固定手数</div>
						</div>
						<div class="right fobomb_remarkf" @click="rweightclose()">确定</div>
					</div>
					<ul class="sfixedlist right_sfixedlist" v-show="isChecked">
						<li v-for="(item,index) in sfixedright" :key="index" v-bind:class='{dirightactive:rightindex==index}' @click="rweightsele(item,index)">{{item}}</li>
					</ul>
					<ul class="sfixedlistysh right_sfixedlist2" v-show="!isChecked">
						<li v-for="(item,index) in sfixedright" :key="index" v-bind:class='{dirightactive:rightindex==index}' @click="rweightsele(item,index)">{{item}}</li>
						<li @click="left_ysh"><img class="right_ysh2" src="../../assets/images/master/icon_r.png"/></li>
						<li @click="right_ysh"><img class="right_ysh" src="../../assets/images/master/icon_r.png"/></li>
					</ul>
				</div>
			</div>
		</div>
		<!-- 跟单方向 -->
		<div class="bomb" v-if="rdectionbox">
			<div class="bombin">
				<div class="sfixedbox" @click="rdirecclose()"></div>
				<div class="sfixed">
					<ul class="sfixedlist">
						<li v-for="(item,index) in directionlist" :key="index" @click="rdectionsele(item,index)">{{item}}</li>
					</ul>
				</div>
			</div>
		</div>
		<!-- 最大持仓 -->
		<div class="bomb" v-if="rholdbox">
			<div class="bombin">
				<div class="sfixedbox" @click="rholdclose()"></div>
				<div class="sfixed">
					<ul class="sfixedlist">
						<li v-for="(item,index) in holdlist" :key="index" @click="rholdselect(item,index)">{{item}}</li>
					</ul>
				</div>
			</div>
		</div>
		<!-- 最大浮亏限制自定义弹框 -->
		<div class="bomb" v-if="fwcustom">
			<div class="bombin">
				<div class="fwcustom">
					<div class="fobombtitle">请输入最大浮亏限制(美元)</div>
					<input class="fwcustom_inp" type="number" v-model="fwcustomnum" placeholder="自定义"/>
					<div class="fwcustom_btn">
						<button @click="fwcancel()">取消</button>
						<button @click="fwconfirm()">确定</button>
					</div>
				</div>
			</div>
		</div>

		<!-- 权重自定义弹框 -->
		<div class="bomb" v-if="fwright">
			<div class="bombin">
				<div class="fwcustom">
					<div class="fobombtitle">请输入权重</div>
					<input class="fwcustom_inp" type="number" v-model="fwrightnum" placeholder="自定义"/>
					<div class="fwcustom_btn">
						<button @click="fwcancel()">取消</button>
						<button @click="fwright_confirm()">确定</button>
					</div>
				</div>
			</div>
		</div>

		<!--确认跟单  -->
		<div class="bomb" v-if="confirm">
			<div class="fobombin">
				<div class="fobomb">
					<div class="fobombtitle">请确认以下内容</div>
					<div class="fobombnei">
						<p>1. 实时无确认复制订单</p>
						<p>2. 同步当前信号持仓订单</p>
						<p>3. 交易账户将按照比例跟单</p>
						<p>4. 实际交易登录MT4查看如何登陆？</p>
					</div>
					<div class="fobomb_remark">
						<img src="../../assets/images/sign/agree.png" alt="">
						<div>我已同意并阅读<router-link :to="{name:'protocol'}" class="fobomb_remarkf">《服务+协议》</router-link></div>
					</div>
					<button class="fobombbtn" @click="bindconfirm()">确&nbsp;&nbsp;认</button>
				</div>
			</div>
		</div>
		<!-- 示例 -->
		<div class="bomb" v-if="explamelbox">
			<div class="fobombin">
				<div class="fobomb">
					<div class="fobombtitle">示例</div>
					<div class="fobombnei">
						<p class="foll_font2">例如：您的可用预付款为1000美元，信号当前净值为2000美元（当有多个信号时，此值为所有信号的净值总和），您设置的比例为50%，
							当信号创建了一个1手的订单时，那么系统将会自动为您创建一个0.25手（1000/2000*50%*1=0.25手）的订单。</p>
					</div>
					<button class="fobombbtn" @click="explamelknow()">知道了</button>
				</div>
			</div>
		</div>
		<!--启动成功  -->
		<div class="bomb" v-if="success">
			<div class="fobombin">
				<div class="fobomb2">
					<img class="fobomb2_icon" src="../../assets/images/master/confirmsuccess.png" alt="">
					<p class="fobomb2_text">启动成功，等待下单</p>
					<p class="fobomb2_text2">(等待时无需其他操作)</p>
				</div>
			</div>
		</div>
		<!--停止提醒  -->
		<div class="bomb" v-if="stoporderswitch">
			<div class="fobombin">
				<div class="fobomb2">
					<img class="fobomb2_icon" src="../../assets/images/master/stopordertip.png" alt="">
					<p class="fobomb2_text">停止跟单交易</p>
					<p class="fobomb_remarkf">(系统订单将会平仓)</p>
					<div>
						<button class="fobomb_con1" @click="stoporder()">确认</button>
						<button class="fobomb_con2" @click="stopswitchclose()">取消</button>
					</div>
				</div>
			</div>
		</div>
		<div class="ftoast" v-if="showtoast">{{showtoastext}}</div>
	</div>
</template>

<style>
	@import '../../assets/css/follow.css';
</style>

<script>
	import http from '@/lib/http';
	import { globalData } from '@/lib/utils';
	export default {
		data(){
			return {
				fwright:false,
				fwrightnum:'',
				rightindex:0,
				followsignal:[],
				explamelbox:false,
				confirm:false,
				success:false,
				stoporderswitch:false,
				mystatus:localStorage.mystatus,
				showtoastext:'',
				showtoast:false,
				isChecked: this.value,
				sfixedright:[],
				directionlist:['正','反'],
				holdlist:["1","2","3","4","不限","自定义"],
				rweightbox:false,
				followid:0,
				mymt4id:[],
				mymt4idselect:localStorage.mymt4idselect,
				zhmt4sh:localStorage.zhmt4sh,
				mt4_select:false,
				fwcustom:false,
				rdectionbox:false,
				rholdbox:false,
				selected:0,
				switchType:localStorage.switchType,
				fwcustomnum:'',
				yshnum:0,
				yshnumpage:1,
			}
		},
		props: {
			value: {
			type: Boolean,
			default: false
			},
		},
		watch: {
			value (val) {
				this.isChecked = val
			},
			isChecked(val) {
				this.$emit('change', val);
			}
		},
		created(){
			const that = this;			
			that.followsignal = eval('('+localStorage.followsignal+')');						
			that.mymt4id = eval('('+localStorage.mymt4id+')');
			var followsignali = [];
			var text = new RegExp('-');
			var text2 = new RegExp('%');
			that.followsignal.forEach(fi => {
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
			that.followsignal = followsignali;
			// console.log(that.isChecked)
			that.selected = that.mymt4id[0].mt4id;

			that.yshnum = 0;
			that.yshnumpage = 1;
			var mylist = [];
			for(var i=0;i<10;i++){
				that.yshnum += 10;
				mylist[i] = that.yshnum+'%';					
			}
			that.sfixedright = mylist;

			if(that.isChecked==false){
				that.yshnum = 0;
				that.yshnumpage = 1;
				var mylist = [];
				for(var i=0;i<10;i++){
					that.yshnum += 10;
					mylist[i] = that.yshnum+'%';					
				}
				that.sfixedright = mylist;
				console.log(that.sfixedright)
			}else{
				that.sfixedright = ['0.01','0.05','0.5','1','5','自定义']
			}
			// that.getstatus();
		},
		methods: {
			explamel:function(){
				const that = this;
				that.explamelbox = true;
			},
			explamelknow:function(){
				const that = this;
				that.explamelbox = false;
			},
			direction () {
				if (this.text) {
					return this.text.split('|')
				} else {
					return []
				}
			},    
			toggle() {
				const that = this;
				that.isChecked = !that.isChecked;
				// console.log(that.followsignal);	
				if(that.isChecked==false){
					that.yshnum = 0;
					that.yshnumpage = 1;
					var mylist = [];
					for(var i=0;i<10;i++){
						that.yshnum += 10;
						mylist[i] = that.yshnum+'%';					
					}
					that.sfixedright = mylist;
				}else{
					that.sfixedright = ['0.01','0.05','0.5','1','5','自定义']
				}
			},
			left_ysh(){
				const that = this;
				if(that.yshnumpage>1){					
					that.yshnum = that.yshnumpage*100-200;					
					that.yshnumpage -= 1;
					var mylist = [];
					for(var i=0;i<10;i++){
						that.yshnum += 10;
						// if(that.yshnum)
						mylist[i] = that.yshnum+'%';					
					}
					that.sfixedright = mylist;
				}
			},
			right_ysh(){
				const that = this;				
				if(that.yshnumpage<20){
					that.yshnum = 100*that.yshnumpage;
					that.yshnumpage += 1;
					var mylist = [];
					for(var i=0;i<10;i++){
						that.yshnum += 10;
						// if(that.yshnum)
						mylist[i] = that.yshnum+'%';					
					}
					that.sfixedright = mylist;
				}
				
			},

			// 最大浮亏取消
			fwcancel:function(){
				const that = this;
				that.fwcustom = false;
				that.fwright = false;
			},
			// 最大浮亏确定
			fwconfirm:function(){
				const that = this;
				that.fwcustom = false;
				// console.log(that.followid)				
				that.followsignal.forEach(fi => {
					if(fi.bn == that.followid){
						fi.maxhold = that.fwcustomnum;
					}					
				})
			},

			// 自定义权重确定
			fwright_confirm:function(){
				const that = this;
				that.fwright = false;
				console.log(that.fwrightnum)				
				that.followsignal.forEach(fi => {
					if(fi.bn == that.followid){
						fi.weight = that.fwrightnum;
					}				
				})
			},

			// 显示切换mt4
			mt4_select_toggle:function(){
				const that = this;
				that.mt4_select = true;
			},
			getFollows:function(){
				const that = this;
				http.post('/api.order/get_master_signal', {slave_mt4id:localStorage.mymt4idselect})
					.then(function (res) {						
						if(res.code == 200) {
							// console.log(res.result.data)
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
									// console.log(directioni)
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
								that.followsignal = followsignali;
								that.switchType = localStorage.switchType;
								localStorage.followsignal = JSON.stringify(that.followsignali);
							}else{
								that.followsignal = [];
								localStorage.followsignal = '';
							}
						}
						
					})
			},
			// 切换mt4
			select:function(item,index){
				const that = this;
				that.selected = item.mt4id;
				that.followsignal = [];
				that.mymt4idselect = item.mt4id;
				localStorage.mymt4idselect = item.mt4id;
				that.zhmt4sh = item.sh;
				localStorage.zhmt4sh = item.sh;
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
				//获取用户跟单数据
				if (that.mymt4id.length > 0) {
					that.getFollows();
				}
			},
			// 关闭切换mt4
			mt4_selectclose:function(){
				const that = this;
				that.mt4_select = false;
			},
			
			//点击选择权重
			rweightsele:function(item,index){
				const that = this;
				that.rightindex = index;
				if(item=='自定义'){
					that.rweightbox = false;
					that.fwright = true;
				}else{
					that.followsignal.forEach(fi => {
						// console.log(fi.bn)
						if(fi.bn == that.followid){
							fi.weight = item
						}					
					})
				}
			},

			// 点击选择最大持仓单量限制
			rholdselect:function(item,index){
				const that = this;
				that.followsignal.forEach(fi => {
					if(index==5){
						that.fwcustom = true;
					}else{
						that.followsignal.forEach(fi => {
							if(fi.bn == that.followid){
								fi.maxhold = item
							}					
						})
					}
					that.rholdbox = false;
				})
			},

			// 点击选择跟单方向
			rdectionsele:function(item,index){
				const that = this;
				that.rdectionbox = false;
				if (localStorage.vipserver == 'vip3' || localStorage.vipserver == 'vip2') {
					that.followsignal.forEach(fi => {					
						if(fi.bn == that.followid){
							fi.direction = item;							
						}					
					})
				} else {//不是vip3
					that.showtoastext = '您还不是vip2或vip3，不能反向跟单';
					that.showtoast = true;
					setTimeout(() => {
						that.showtoast = false;
					}, 1300);
				}
				
			},
			// 点击完成
			finishstatus:function(item,index){
				const that = this;
				if (localStorage.mymt4id.length > 0) {
					var master_list = eval('('+localStorage.master_list+')');
					var followsignal = that.followsignal;
					var time = Date.parse(new Date()) / 1000;
					var datai = [];
					if (item.direction == '反') {
						var weighti = '-' + item.weight
					} else {
						var weighti = item.weight
					}
					if(item.maxloss=='不限'){
						item.maxloss = 0
					}
					if(item.maxhold=='不限'){
						item.maxhold = 0
					}
					var datai = {
						'bn': item.bn,
						'name': item.name,
						'weight': weighti,
						// 'maxloss': '不限',
						'maxloss': item.maxloss,
						'maxhold': item.maxhold,
						'mt4id': item.mt4id,
						'slave_mt4id': localStorage.mymt4idselect
					}
					datai = JSON.stringify(datai)
					http.post('/api.order/update_order', {data:datai})
					.then(function (res) {
						console.log(res);
						if(res.code == 200) {
							item.status = 1;
							setTimeout(() => {
								that.success = false;
							}, 1000);
							master_list.forEach(mi => {
								if (item.bn == mi.bn) {
									mi.state = 3;
								}
							})
							that.success = true;
							localStorage.followsignal = JSON.stringify(followsignal);
							localStorage.master_list = JSON.stringify(master_list);
						}else{
							that.showtoastext = res.msg;
							that.showtoast = true;
							setTimeout(() => {
								that.showtoast = false;
							}, 1000);
						}
					})
				}else{
					that.showtoastext = '还未绑定mt4';
					that.showtoast = true;
					setTimeout(() => {
						that.showtoast = false;
					}, 1000);
				}
			},
			// 点击修改
			modifystatus:function(item,index){
				const that = this;
				var followsignal = that.followsignal;
				item.status=2;
				localStorage.followsignal = JSON.stringify(that.followsignal);
			},
			// 点击删除
			deletestatus:function(item,index){
				const that = this;
				var master_list = eval('('+localStorage.master_list+')');
				var followsignal = that.followsignal;
				if (followsignal.length == 1 && localStorage.mystatus == 1) {					
					that.showtoastext = '请先平仓';
					that.showtoast = true;
					setTimeout(() => {
						that.showtoast = false;
					}, 1000);
				} else {
					var time = Date.parse(new Date()) / 1000;
					http.post('/api.order/del_order', {slave_mt4id:localStorage.mymt4idselect,mt4id:item.mt4id})
					.then(function (res) {					
						if(res.code == 200) {
							that.showtoastext = '删除成功';
							that.showtoast = true;
							setTimeout(() => {
								that.showtoast = false;
							}, 1000);
							master_list.forEach(mi => {
								if (mi.bn == item.bn) {
									mi.state = 1
								}
							})
							followsignal.splice(index, 1);
							localStorage.followsignal = JSON.stringify(followsignal);
							localStorage.master_list = JSON.stringify(master_list);
						}else{
							that.showtoastext = res.msg;
							that.showtoast = true;
							setTimeout(() => {
								that.showtoast = false;
							}, 1000);
						}
					})
				}
			},
			// 点击停止跟单
			stopswitch:function(){
				const that = this;
				that.stoporderswitch = true;
			},
			// 点击取消停止跟单弹框
			stopswitchclose:function(){
				const that = this;
				that.stoporderswitch = false;
			},
			// 点击确定停止跟单弹框
			stoporder:function(){
				const that = this;
				if (localStorage.mymt4id.length > 0) {
					var followsignal = that.followsignal;
					var time = Date.parse(new Date()) / 1000;
					http.post('/api.order/update_order_status', {slave_mt4id:localStorage.mymt4idselect})
					.then(function (res) {					
						if(res.code == 200) {
							followsignal.forEach(fi => {
								fi.status = 0;
							})
							that.stoporderswitch = false;
							that.mystatus = 2;
							localStorage.mystatus = 2;
							localStorage.followsignal = JSON.stringify(followsignal);
							that.showtoastext = '停止跟单成功';
							that.showtoast = true;
							setTimeout(() => {
								that.showtoast = false;
							}, 1000);
						}else{
							that.stoporderswitch = false;
							that.showtoastext = res.msg;
							that.showtoast = true;
							setTimeout(() => {
								that.showtoast = false;
							}, 1000);
						}
					}).catch(function (err) {
						that.stoporderswitch = false;
						that.showtoastext = res.msg;
						that.showtoast = true;
						setTimeout(() => {
							that.showtoast = false;
						}, 1000);
						console.log(err);
					});
				}
			},
			//点击显示最大持仓量限制
			clickmaxhold:function(item,index){
				const that = this;
				that.rholdbox = true;
				that.followid = item.bn
			},
			//点击关闭最大持仓量限制
			rholdclose:function(item,index){
				const that = this;
				that.rholdbox = false;
				that.followid = item.bn;
			},

			//点击显示跟单方向
			clickdirection:function(item,index){
				const that = this;
				that.rdectionbox = true;
				that.followid = item.bn;
			},
			//关闭选择跟单方向
			rdirecclose:function(item,index){
				const that = this;
				that.rdectionbox = false;
				that.followid = item.bn;				
			}, 

			//点击显示选择权重
			rweight:function(item,index){
				const that = this;
				that.rweightbox = true;
				// 权重index
				for(var i=0;i<that.sfixedright.length;i++){
					if(item.weight==that.sfixedright[i]){
						that.rightindex = i;
					}
				}
				
				that.followid = item.bn
			}, 
			//关闭选择权重
			rweightclose:function(){
				const that = this;
				that.rweightbox = false;
			}, 
			// 点击立即跟单
			confirmswitch:function(){
				const that = this;
				if (localStorage.mymt4id.length > 0) {
					if (that.followsignal.length > 0) {
						if (that.followsignal.length > 1) {//多个跟随
							if (localStorage.vipserver == 'vip3' || localStorage.vipserver == 'vip2' || localStorage.vipserver == 'vip1') {
								that.confirm = true;
							} else {//不是vip3
								that.showtoastext = '您还未购买vip服务，不能组合跟单';
								that.showtoast = true;
								setTimeout(() => {
									that.showtoast = false;
								}, 1000);
							}
						} else {
							that.confirm = true;
						}
					} else {
						that.showtoastext = '请先添加信号';
						that.showtoast = true;
						setTimeout(() => {
							that.showtoast = false;
						}, 1000);
					}
				} else {
					that.showtoastext = '您还未绑定MT4帐号';
					that.showtoast = true;
					setTimeout(() => {
						that.showtoast = false;
						//  window.location.href = '../Home/home?token='+localStorage.token;
					}, 2000);
				}
			},
			// 确定跟单
			bindconfirm:function(){
				const that = this;
				console.log(that.mymt4id.length)
				if (that.mymt4id.length > 0) {
					var master_list = eval('('+localStorage.master_list+')');
					var followsignal = that.followsignal;
					var time = Date.parse(new Date()) / 1000;
					var datai = [];
					followsignal.forEach(fi => {
						if (fi.direction == '反') {
							var weighti = '-' + fi.weight
						} else {
							var weighti = fi.weight
						}
						if(fi.maxloss=='不限'){
							fi.maxloss = 0
						}
						if(fi.maxhold=='不限'){
							fi.maxhold = 0
						}
						datai.push({
							'bn': fi.bn,
							'name': fi.name,
							'weight': weighti,
							// 'maxloss': '0',
							// 'maxhold': '0',
							'maxloss': fi.maxloss,
							'maxhold': fi.maxhold,
							'mt4id': fi.mt4id
						})
					})
					datai = JSON.stringify(datai)
					http.post('/api.order/confirm', {slave_mt4id:localStorage.mymt4idselect,data:datai})
					.then(function (res) {
						// console.log(res);
						if(res.code == 200) {
							that.followsignal.forEach(fi => {
								fi.status = 1
							})
							that.confirm = false;
							that.mystatus = 1;
							that.success = true;
							localStorage.followsignal = JSON.stringify(that.followsignal);
							localStorage.mystatus = 1;
							setTimeout(() => {
								that.success = false;
							}, 1000);
							// console.log(that.master_list)
							that.master_list.forEach(mi => {
								that.followsignal.forEach(fi => {
									if (fi.bn == mi.bn) {
										mi.state = 3;
									}
								})
							})
							localStorage.master_list = JSON.stringify(that.master_list);
						}else{
							that.confirm = false;
							that.showtoastext = res.msg;
							that.showtoast = true;
							setTimeout(() => {
								that.showtoast = false;
							}, 1000);
						}
					})
				}else{
					that.confirm = false;
					that.showtoastext = '还未绑定mt4';
					that.showtoast = true;
					setTimeout(() => {
						that.showtoast = false;
					}, 1000);
				}
			},
		},
		mounted() {
			
        }
	}
</script>