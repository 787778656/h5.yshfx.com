<template>
	<div>
		<Banner swiperid='go'>
        <div slot='swiper-con' class='swiper-slide'>
          <img class="swiperimg" src='../../assets/images/master/banner.png'/>
        </div>       
    </Banner>
    <router-link to="/notice" class="noticebox_href">
      <div class='noticebox'>
        <img src='../../assets/images/master/notice.png' class='notice'/>
        <div class='noticet'>{{mynotice}}</div>
        <img src='../../assets/images/master/noticei.png' class='noticei'/>
        <div class='pointbox' v-if="noticebox"></div>
      </div>
    </router-link>
    <ul class="ilist ibox">
      <a class="ilistmq" href="https://s.tradingview.com/widgetembed/?symbol=OANDA%3AEURUSD&interval=30&hidesidetoolbar=0&symboledit=1&saveimage=0&toolbarbg=2f3241&watchlist=FX%3AEURUSD%1FFX%3AEURJPY%1FOANDA%3AUSDJPY%1FOANDA%3AUSDCHF%1FFX_IDC%3AXAUUSD%1FFX_IDC%3AXAGUSD%1FOANDA%3AGBPUSD%1FOANDA%3AGBPJPY%1FFX%3AEURGBP%1FFX%3AEURAUD%1FOANDA%3AAUDUSD%1FOANDA%3AAUDJPY%1FBITSTAMP%3ABTCUSD%1FFX%3AEURCHF%1FFOREXCOM%3AUSDCAD%1FOANDA%3AAUDCAD%1FFX_IDC%3AUSDNZD%1FOANDA%3AEURNZD%1FOANDA%3AUSDSGD%1FOANDA%3AAUDNZD%1FOANDA%3AAUDCHF%1FFOREXCOM%3AAUDNZD%1FOANDA%3ACADJPY%1FOANDA%3ANZDUSD%1FOANDA%3ANZDCAD%1FOANDA%3ANZDJPY%1FOANDA%3AGBPAUD%1FOANDA%3AGBPCAD%1FOANDA%3AGBPCHF%1FFOREXCOM%3AGBPNZD&studies=%5B%5D&hideideas=1&theme=Light&style=1&timezone=Asia%2FShanghai&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=zh_CN&utm_source=h5.znforex.com&utm_medium=widget&utm_campaign=chart&utm_term=OANDA%3AEURUSD">      
        <li>
          <img class="ilistimg" src="../../assets/images/market/quotation1.png" alt=""/>
          <div>行情/工具</div>
        </li>
      </a>
      <a class="ilistmq" href="https://www.mql5.com/zh/economic-calendar/widget?mode=5">      
        <li>
          <img class="ilistimg" src="../../assets/images/market/quotation2.png" alt=""/>
          <div>经济日历</div>
        </li>
      </a>
      <router-link :to="{name:'trade'}" class="ilistmq">
        <li>
          <img class="ilistimg" src="../../assets/images/market/quotation3.png" alt=""/>
          <div>我的交易</div>
        </li>
      </router-link>
      <router-link :to="{name:'invite'}" class="ilistmq">
        <li>
          <img class="ilistimg" src="../../assets/images/market/quotation4.png" alt=""/>
          <div>邀请好友</div>
        </li>
      </router-link>
    </ul>

    <router-link :to="{name:'master'}" class="ibox2 home_tradestar">
      <div class="excellent">
        <div class="left">
          <img class="excellent_img" src="../../assets/images/mine/aboutus1.png" alt="">
          <span>交易明星</span>
        </div>
        <div class="right">          
          <img class="excellent_icon" src="../../assets/images/master/icon_r.png" alt="">
          <span>更多</span>        
        </div>
      </div>
      <ul class="cattle">
        <li>
          <img class="cattleuser" :src="signalimg1" alt="">
          <div class="cattlebox">
            <p class="single">{{signalName1}}</p>
            <p>{{profit1}}%</p>
            <p class="cattlefont1">历史收益率</p>
          </div>
        </li>
        <li>
          <img class="cattleuser" :src="signalimg2" alt="">
          <div class="cattlebox">
            <p class="single">{{signalName2}}</p>
            <p>{{profit2}}%</p>
            <p class="cattlefont1">历史收益率</p>
          </div>
        </li>
        <li>
          <img class="cattleuser" :src="signalimg3" alt="">
          <div class="cattlebox">
            <p class="single">{{signalName3}}</p>
            <p>{{profit3}}%</p>
            <p class="cattlefont1">历史收益率</p>
          </div>
        </li>
      </ul>
    </router-link>
   <div class="ibox2">
      <div class="excellent">
        <div class="left">
          <img class="excellent_img" src="../../assets/images/market/cattlebody.png" alt=""/>
          <!-- <span>优秀经纪人</span> -->
          <span>合作经济商</span>
        </div>
      </div>
      <div class="broker">
        <ul>
          <li><img src="../../assets/images/market/broker03.png"><span>XM</span><button @click="broker03">立即开户</button></li>
          <li><img src="../../assets/images/market/broker06.png"><span>Trademax</span><button @click="broker06">立即开户</button></li>
          <li><img src="../../assets/images/market/broker02.png"><span>澳汇</span><button @click="broker02">立即开户</button></li>
          <li><img src="../../assets/images/market/broker04.png"><span>AVA</span><button @click="broker04">立即开户</button></li>
          <li><img src="../../assets/images/market/broker01.png"><span>FXTM 富拓</span><button @click="broker01">立即开户</button></li>
          <li><img src="../../assets/images/market/broker05.png"><span>CXM 希盟</span><button @click="broker05">立即开户</button></li>
        </ul>
      </div>
      <!-- <div class="excebody">
        <div class="excebody1 left">
          <img class="exceicon" src="../../assets/images/market/indextwo.png" alt=""/>
          <img class="exceuser" src="../../assets/images/market/goodsuser1.jpg" alt=""/>
          <p class="excename">{{mamName2}}</p>
          <p class="excenum">¥{{mamprofit2}}</p>
          <p class="exceprofit">当前返佣</p>
        </div>
        <div class="excebody2">
          <div class="excebody_in">
            <img class="exceicon" src="../../assets/images/market/indexone.png" alt=""/>
            <img class="exceuser2" src="../../assets/images/market/goodsuser2.jpg" alt=""/>
            <p class="excename">{{mamName1}}</p>
            <p class="excenum">¥{{mamprofit1}}</p>
            <p class="exceprofit">当前返佣</p>
          </div>
        </div>
        <div class="excebody1 right">
          <img class="exceicon" src="../../assets/images/market/indexthree.png" alt=""/>
          <img class="exceuser" src="../../assets/images/market/goodsuser3.jpg" alt=""/>
          <p class="excename">{{mamName3}}</p>
          <p class="excenum">¥{{mamprofit3}}</p>
          <p class="exceprofit">当前返佣</p>
        </div>
      </div> -->
    </div>
    <div class="loginbomb" v-if="phonemsgbox">{{phonemsg}}</div>
    <!-- 占位盒子 -->
    <div class="seat"></div>

	</div>
</template>
<style>
  @import '../../assets/css/home.css';
</style>
<script>
  import qs from  'qs';
  import Banner from '../../components/banner';
  import http from '@/lib/http';
  import { formatTime,GetQueryString, getTimeRange } from '@/lib/utils';

export default {
	data(){
		return {
      phonemsg:'未登录',
      phonemsgbox:false,
      page:1,
      head_on:1,
      mamName1:'男神',
      mamName2:'年少有为',
      mamName3:'往后余生',
      mamprofit1:'1546.25',
      mamprofit2:'524.00',
      mamprofit3:'431.57',
      mamimg1:'',
      mamimg2:'',
      mamimg3:'',
      signalName1:'',
      signalName2:'',
      signalName3:'',
      signalimg1:'',
      signalimg2:'',
      signalimg3:'',
      profit1:'',
      profit2:'',
      profit3:'',
      userInfo:{},
      login:'',
      totalmoney:0,
      imoney:0,
      smoney:0,
      credit:0,
      noticebox:false,
      mynotice: '暂无消息',
      mqltime:'',
      followsignal:[]
		}
	},
	components: {
		Banner
  },
  created(){
    const that = this;
    that.mqltime = formatTime(Date.parse(new Date())/1000).substr(0,11);    
    if(localStorage.uid==undefined){
      localStorage.clear();
      localStorage.setItem("mystatus",2);
      localStorage.setItem("switchType",false);
      that.userinfo();
    }
    that.getToken();
    // 交易牛人
    http.post('/api.signal/index', {page:that.page,type:1})
    .then(function (res) {
      if(res.code == 200) {
        var signalList = res.result.data;
        that.signalName1 = signalList[0].name;
        that.signalName2 = signalList[1].name;
        that.signalName3 = signalList[2].name;
        that.profit1 = parseFloat(signalList[0].profit).toFixed(2);
        that.profit2 = parseFloat(signalList[1].profit).toFixed(2);
        that.profit3 = parseFloat(signalList[2].profit).toFixed(2);
        that.signalimg1 = signalList[0].img;
        that.signalimg2 = signalList[1].img;
        that.signalimg3 = signalList[2].img;
      }
    })
    // 公告部分
    http.post('/api.account/get_msg', {})
    .then(function (res) {
      if(res.code == 200) {
        if(res.data.length>0){
          that.noticebox = false;
          var data = res.data;
          that.mynotice = data[0].msg
        }else{
          that.noticebox = true;
          that.mynotice = '暂无消息'
        }
      }else{
        that.noticebox = true;
        that.mynotice = '暂无消息'
      }
    })
	},
	methods: {
		// 获取token
		getToken() {
      const that = this;
      var typebind = GetQueryString("type");
      if(typebind!=undefined || typebind!=''){
        if(typebind == 'binding'){
          that.$router.push({name:'bindphone'});
        }
      }else{
        that.$router.push({name:'home'});
      }

      if(GetQueryString("token") !=null && GetQueryString("token").toString().length>1){
          var token = GetQueryString("token");
          localStorage.setItem('token',token);
      }
      // console.log('是否有token')
      // console.log(GetQueryString("token"))
      
    },
    userinfo() {
			const that = this;
			http.post('/api.mobile/get_userinfo', {})
			.then(function (res) {					
				if(res.code == 200) {					
					var item = res.result;
					localStorage.setItem("nickname",item.nickname);
          localStorage.setItem("uid",item.uid);
          // console.log('mt4_arr的长度'+res.result.mt4_arr.length);
          localStorage.setItem("mymt4id",JSON.stringify(res.result.mt4_arr));
          localStorage.mymt4id = JSON.stringify(res.result.mt4_arr);
          if(localStorage.mymt4idselect==undefined){
            for(var i=0;i<item.mt4_arr.length;i++){
              localStorage.setItem("mymt4idselect",item.mt4_arr[0].mt4id);
              localStorage.mymt4idselect = item.mt4_arr[0].mt4id;
              localStorage.setItem("zhmt4server",item.mt4_arr[0].mt4server);
              localStorage.zhmt4server = item.mt4_arr[0].mt4server;
              localStorage.setItem("zhmt4sh",item.mt4_arr[0].sh);
              localStorage.zhmt4sh = item.mt4_arr[0].sh;
            }
          }        
					// vip等级
					if (item.server==''){
						localStorage.setItem("vipserver","vip0");
						localStorage.setItem("current",0);
						var vipserver = localStorage.vipserver						
					}else{
						localStorage.setItem("vipserver",item.server);
						var current = item.server.substr(3,5);
						localStorage.setItem("current",current);
						var vipserver = localStorage.vipserver					
          }
          that.getmastersignal()		
				}
			})
    },//userInfo结束符
    
    getmastersignal:function(){
      const that = this;
      localStorage.followsignal = '';
      // console.log(localStorage.mymt4idselect)
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
            localStorage.followsignal = JSON.stringify(followsignali);
            that.followsignal = eval('('+localStorage.followsignal+')');
            
          }else{
            that.followsignal = [];
            localStorage.followsignal = '';
          }
        }
      })
    },

    broker01() {
      window.location.href = 'https://www.forextimechina.com.cn/zh?partner_id=4932273';
    },
    broker02() {
      window.location.href = 'https://www.ausforex.asia/zh-cn/account/registering-a-live-account-e30.shtml?key=7bYS%2fnKgaR0%3d';
    },
    broker03() {
      window.location.href = 'https://clicks.pipaffiliates.com/c?c=557850&l=zh-hans&p=1';
    },
    broker04() {
      window.location.href = 'https://www.avatrade.cn/?tag=140789';
    },
    broker05() {
      window.location.href = 'https://broker.cxmtrading.com/introduce?iid=S&uid=5578';
    },
    broker06() {
      window.location.href = 'https://portal.tmgm.com/register?node=Mjk2MDE=&language=zh';
    },
      
  
  
  },  
	
}
</script>
