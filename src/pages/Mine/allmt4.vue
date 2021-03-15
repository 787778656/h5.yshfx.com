<template>
	<div>
		<div class="ibox mymtbox" v-for="(item,index) in mymt4id" :key="index">
            <div class="mtnamebox">
				<div class="left">
					<img class="mt_nameright" src="../../assets/images/mine/m_server.png" alt="">
					<div class="left">服务器</div>
				</div>
				<div class="right">{{item.mt4server}}</div>
			</div>
			<div class="mtnamebox">
				<div class="left">
					<img class="mt_nameright" src="../../assets/images/mine/m_mt4_name.png" alt="">
					<div class="left">MT4账号</div>
				</div>
				<div class="right">
					<p v-if="item.sh==0">{{item.mt4id}}<span style="color:red;">(审核中)</span></p>
					<p v-else-if="item.sh==1">{{item.mt4id}}</p>
					<p v-else-if="item.sh==2">{{item.mt4id}}<span style="color:red;">(审核未通过)</span></p>
				</div>
			</div>
			<div class="mtnamebox" style="border:none;">
				<router-link :to="{name:'bindmt4',query:{id:item.id}}"><button class="mtchange">更换</button></router-link>
			</div>			
		</div>
		<img v-if="nodata" class="nodata" src="../../assets/images/master/nodata.png" alt="">
		
		<div class="mtoast" v-if="showtoast">{{showtoastext}}</div>
		<div class="vipbrook_mt4seat"></div>
		
		<div class="addmt4">
			<button class="addmt4_btn" @click="addmt4()">增加MT4账号</button>
		</div>
		
	</div>	
</template>

<style>
	@import '../../assets/css/vip.css';
	.vipbrook_mt4seat{width: 100%;height: 6rem;}
	.mymtbox{padding: 0px 0.5rem;}
	.mtnamebox{width:100%;height: 2.3rem;border-bottom: 1px solid #DEDFE0;font-size: 0.75rem;line-height: 2.3rem;}
	.mt_nameright{width: 0.8rem;float: left;height: 0.8rem;border:none;float: left;margin-right: 0.5rem;margin-top: 0.7rem;}
	.mtlock{width: 0.5rem;height: 0.9rem;margin-left: 0.5rem;float: right;margin-top: 0.7rem;}
	.addmt4{background-color: white;padding: 0.5rem 0px;width: 100%;position: fixed;bottom: 0px;left: 0px;right: 0px;border-top: 1px solid #dedfe0;}
	.addmt4_btn{background-color: #611987;width: 94%;height: 2.3rem;color: #fff;font-size: 0.9rem;border: none;border-radius: 50px;}
	.mtchange{width: 4rem;height: 1.6rem;border: none;background-color: #611987;color: #fff;border-radius: 50px;float: right;margin-top: 0.3rem;outline: none;}
	.mtoast{width: 8rem;height: 2.5rem;line-height: 2.5rem;background-color: rgba(0, 0, 0, 0.8);border-radius: 50px;position: fixed;
	top: 40%;left: 0px;right: 0px;margin: 0 auto;color: #fff;}
	.vipbrook2_agency{margin-top: 0.5rem;}
</style>
<script type="text/ecmascript-6">
import http from '@/lib/http';
import { globalData } from '@/lib/utils';
export default {
	data(){		
		return{
			mymt4id:[],
			nodata:false,
			showtoast:false,
			showtoastext:'详情请到网页版观看',
		}
    },
    components:{
      
	},
	created(){
		
	},
	mounted() {
		const that = this;	
		that.mymt4info();  
	},
	methods:{
		// 获取数据接口
		mymt4info () {
			const that = this;
			http.post('/api.account/get', {})
			.then(function (res) {				
				if(res.code == 200) {
					console.log(res)
					if(res.result.length>0){
						that.nodata = false
						that.mymt4id = res.result;
					}else{
						that.nodata = true
					}
					localStorage.setItem("mymt4id",JSON.stringify(res.result));
					localStorage.mymt4id = JSON.stringify(res.result);
					localStorage.setItem("mymt4idselect",res.result[0].mt4id);
					localStorage.mymt4idselect = res.result[0].mt4id;
					localStorage.setItem("zhmt4server",res.result[0].mt4server);
					localStorage.zhmt4server = res.result[0].mt4server;
					localStorage.setItem("zhmt4sh",res.result[0].sh);
            		localStorage.zhmt4sh = res.result[0].sh;					
					
				}else{
					that.nodata = true
				}
			})
		},
		//点击增加mt4
		addmt4:function(){
			const that = this;
			if (localStorage.vipserver == 'vip3') {
				if (that.mymt4id.length > 0) {
					if (that.mymt4id.length >= 5) {
						that.showtoastext = '最多绑定5个mt4';
						that.showtoast = true;
						setTimeout(() => {
							that.showtoast = false;
						}, 1000);
					} else {
						that.$router.push({path:'/bindmt4',query:{}});
					}
				}
			} else {
				if (that.mymt4id.length == 0) {
					that.$router.push({path:'/bindmt4',query:{}});
				} else {
					// that.$router.push({path:'/bindmt4',query:{}});
					that.showtoastext = '您还未购买vip3';
					that.showtoast = true;
					setTimeout(() => {
						that.showtoast = false;
					}, 1000);
				}
			}
		} 
	}

}
</script>
