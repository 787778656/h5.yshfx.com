<template>
<div>
    <div class="tradeinfo_wrape" ref="wrapper">
        <div style="padding: 1px 0;">
            <div class="ibox">
                <div class="trheader" v-if="mymt4id.length>0" @click="mt4_select_toggle()">
                    <img class="tradered" v-if="zhmt4sh==1" src="../../assets/images/master/mt4_state_on.png"/>
                    <img class="tradered" v-if="zhmt4sh==0" src="../../assets/images/master/mt4_state_off.png"/>
                    <div class="trheader_text">MT4:{{mymt4idselect}}</div>
                    <img class="trheader_follpull" src="../../assets/images/master/select_icon.png" alt="">
                </div>
                <router-link :to="{name:'bindmt4'}" class="trheader" v-else>
                    <img class="tradered" src="../../assets/images/master/mt4_state_off.png"/>
                    <div class="trheader_text">MT4:未绑定</div>
                </router-link>
                <div class="truser">
                    <div class="truserimg left">
                        <img v-if="u_img=='' || u_img=='http://static.v.yshfx.com/upload/image/'" class="truserimg_tx" src="../../assets/images/master/trade_head.png" alt="">
                        <img v-else class="truserimg_tx" :src="u_img" alt="">
                        <img v-if="vipserver==0" class="truserimg_vip" src="../../assets/images/master/vip0.png" alt="">
                        <img v-else-if="vipserver==1" class="truserimg_vip" src="../../assets/images/master/vip1.png" alt="">
                        <img v-else-if="vipserver==2" class="truserimg_vip" src="../../assets/images/master/vip2.png" alt="">
                        <img v-else-if="vipserver==3" class="truserimg_vip" src="../../assets/images/master/vip3.png" alt="">
                    </div>
                    <div class="trusername">
                        <p class="single">账户：{{nickname}}</p>
                        <p class="single">MT4账户：{{tradeinfo.mt4id}}</p>
                    </div>
                    <div class="trusername">
                        <p class="single">MT4服务器：{{tradeinfo.mt4server}}</p>
                        <p>交易密码：{{tradeinfo.mt4pwd}}</p>
                    </div>
                </div>
            </div>
            <ul class="ibox trinfo">
                <li>
                    <div class="left">利润率</div>
                    <div class="right trfont1">{{tradeinfo.profit_rate}}</div>

                </li>
                <li>
                    <div class="left">净值</div>
                    <div class="right trfont2">${{tradeinfo.equity}}</div>
                </li>
                <li>
                    <div class="left">余额</div>
                    <div class="right">${{tradeinfo.balance}}</div>
                </li>
                <li>
                    <div class="left">已用预付款</div>
                    <div class="right">${{tradeinfo.margin}}({{tradeinfo.margin_pre}})</div>
                </li>
                <li>
                    <div class="left">实时获利</div>
                    <div class="right trfont3">${{tradeinfo.profit}}</div>
                </li>
                <li>
                    <img class="tricon" src="../../assets/images/master/tips.png" alt=""/>
                    <div class="left">实时数据以您的MT4帐号为准</div>
                </li>
            </ul>
            <ul class="tradenav">
                <li @click="holdbind(item,index)" v-for="(item,index) in tradenav" :key="index" v-bind:class='{tactive:index==trindex}'>{{item}}</li>
            </ul>
            <!-- 历史部分 -->
            <div v-if="trindex==0">
                <div class="tradebox_wai" v-if="!nohistory">                        
                    <div class="historybox_in" v-for="(item,index) in historyi" :key="index" @click="showhistory(item,index)">
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
                                <div class="right hisfont1" v-if="item.profit>=0">{{item.profit}}({{item.dot}})</div>
                                <div class="right hisfont2" v-else>{{item.profit}}({{item.dot}})</div>
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
                <div style='background:#f7f7f9;' v-else>
                    <img class="nodata" src="../../assets/images/master/nodata.png" />
                </div>
            </div>

            <!-- 持仓部分 -->
            <div v-if="trindex==1">
                <div class="tradehistorybox_wai" v-if="nohold">            
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
                                <div class="left">{{item.open_price}}→{{item.close_price}}</div>
                                <div class="right hisfont1" v-if="item.profit>=0">{{item.profit}}</div>
                                <div class="right hisfont2" v-else>{{item.profit}}</div>
                            </div>
                        </div>
                        <ul class="historyinfo" v-if="item.show">
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
                    <ul class="historyinfo2" v-if="holslist.length>0">
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
                            <div v-if="totalprofit>=0" style="color:#007eff;" class="right tradefont1">{{totalprofit}}</div>
                            <div v-else style="color:#e73b29;" class="right tradefont1">{{totalprofit}}</div>
                        </li>
                    </ul>   
                </div>
                <!-- 没有数据的时候 -->
                <div style='background:#f7f7f9;' v-else>
                    <img class="nodata" src="../../assets/images/master/nodata.png" />
                </div>
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

</div>  
</template>

<style>
    @import '../../assets/css/master.css';
    @import '../../assets/css/masterdetail.css';
</style>
<script>
import http from '@/lib/http';
import { formatTime,globalData } from '@/lib/utils';
import BScroll from 'better-scroll';
export default {
    data(){     
      return{
        tradenav:["历史","持仓"],
        historyi:[],
        holslist:[],
        historypage:1,
        holdpage:1,
        trindex:0,
        navindex:0,
        tradeinfo: {},
        nohistory: false,
        nohold: false,
        nickname:'',
        mymt4idselect:localStorage.mymt4idselect,
        zhmt4sh:localStorage.zhmt4sh,
        mymt4id:[],
        u_img:'',
        vipserver:0,
        select_mt4show:false,
        listlength:false,
        holdlistlength:false,
        totalcommission:0,
        totalswap:0,
        totalprofit:0,
        followsignal:[],
        switchType:''
      }
    },
    components:{
      
    },
    created(){
        const that = this;
        that.getUserinfo();
        that.getTrade();
        that.getHistory();
        that.getHold();
        
    },
    methods:{
        holdbind:function(item,index){
            console.log(6666)
            const that = this;
            that.trindex = index;            
        },
        showhistory:function(item,index){
            const that = this;
            console.log('youshenme有什么')
            item.listshow = !item.listshow;         
        },
        hoshowhistory:function(item,index){
            const that = this;
            item.show = !item.show;         
        },
        // 个人信息接口
        getUserinfo:function(){
            const that = this;
            http.post('/api.mobile/get_userinfo', {})
            .then(function (res) {                  
                if(res.code == 200) {                   
                    var item = res.result;
                    that.nickname = item.nickname;
                    that.u_img = item.u_img;
                    that.mymt4id = item.mt4_arr;
                    if (item.server==''){
                        that.vipserver = 0
                    }else{
                        that.vipserver = item.server.substr(3,5);
                    }
                    
                }
            })
        },
        // 显示选择mt4
        mt4_select_toggle:function(){
            const that = this;
            that.select_mt4show = true;            
        },
        select_mt4close:function(){
            const that = this;
            that.select_mt4show = false;            
        },        
        
        // 我的交易信息
        getTrade(){
            const that = this;            
            http.post('/api.signal/history_total_active', {
                slave_mt4id:localStorage.mymt4idselect
            })
            .then(function (res) {                  
                if(res.code == 200) {                   
                    var item = res.result;
                    if (item.sh ==1){
                        var mt4idi = item.mt4id
                    }else{
                        var mt4idi = item.mt4id+'(审核中)'
                    }

                    if (!item.mt4id || item.mt4id==''){
                        var mt4idi ='未绑定'
                    }
                    that.tradeinfo.balance = item.balance,
                    that.tradeinfo.beginMoney = item.beginMoney,
                    that.tradeinfo.equity = item.equity,
                    that.tradeinfo.margin = item.margin,
                    that.tradeinfo.margin_pre = item['margin-pre'],
                    that.tradeinfo.mt4id = mt4idi,
                    that.tradeinfo.mt4pwd = item.mt4pwd ? item.mt4pwd:'未绑定',
                    that.tradeinfo.mt4server = item.mt4server ? item.mt4server :'未绑定',
                    that.tradeinfo.profit = item.profit,
                    // that.tradeinfo.profit_rate = item.profit_rate,
                    that.tradeinfo.profit_rate = (((parseFloat(item.balance) - parseFloat(item.beginMoney)) / parseFloat(item.beginMoney)) * 100).toFixed(2) + "%"
                    that.tradeinfo.sh = item.sh;
                    // console.log( that.tradeinfo)
                }
            })
        },
        // 我的历史交易
        getHistory(){
            const that = this;            
            http.post('/api.signal/iorders', {
                'account': localStorage.mymt4idselect,
                'tab':'history',
                'page': that.historypage
            })
            .then(function (res) {                  
                if(res.code == 200) {                   
                    var data = res.result.data;
                    if (data.length<=0){
                        if (that.historypage==1){
                            that.nohistory=true                            
                        }else{
                            that.listlength = true;
                        }
                    }else{
                        that.nohistory = false;
                        data.forEach(item => {
                            var doti = Math.abs(((item.close_price - item.open_price) * (Math.pow(10, item.dlen))).toFixed(2))
                            var lots = ((item.lots/100)*100).toFixed(2);
                            var profit = ((item.profit/100)*100).toFixed(2);
                            that.historyi.push({
                                'symbol': item.symbol,
                                'op': item.op=='1'?'sell':'buy',
                                'lots': lots,
                                'open_time': formatTime(item.open_time - 8 * 3600 + 2),
                                'open_price': item.open_price,
                                'close_price': item.close_price,
                                'profit': profit,
                                'dot': doti,
                                'stoploss': item.stoploss,
                                'takeprofit': item.takeprofit,
                                'commission': item.commission,
                                'swap': item.swap,
                                'close_time': formatTime(item.close_time - 8 * 3600 + 2),
                                'listshow':false
                            })
                        })
                        if(!that.scroll){
                            that.$nextTick(() => {
                                that.scroll = new BScroll(that.$refs.wrapper, {click:true})
                            })
                            that.hisloadMore();
                        }else{
                            that.scroll.refresh();
                        }
                    }
                }else{
                    if (that.historypage == 1) {
                        that.nohistory = true
                    }
                }
            })
        },
        // 加载更多
        hisloadMore() {
            const that = this;        
            that.$nextTick(() => {
                //touchEnd（手指离开以后触发） 通过这个方法来监听下拉刷新
                that.scroll.on('touchEnd', (pos) => {
                    if(that.scroll.maxScrollY>pos.y+10){
                        that.nohistory = false;
                        that.historypage += 1;
                        that.getHistory();
                        //使用refresh 方法 来更新scroll  解决无法滚动的问题
                        that.scroll.refresh();
                    }
                })
            });
        },
        // 是否显示历史交易损止
        showhistory:function(item,index){
            // console.log(index);
            item.listshow = !item.listshow;
        },

        // 我的持仓
        getHold(){
            const that = this;            
            http.post('/api.signal/iorders', {
                'account': localStorage.mymt4idselect,
                'tab':'hold',
                'page': that.holdpage,
                'type':'ismy'
            })
            .then(function (res) {                  
                if(res.code == 200) {                   
                    var data = res.result.data;
                    if (data.length<=0){
                        if (that.holdpage==1){
                            that.nohold=false
                        }else{
                            that.holdlistlength = true;
                        }
                    }else{
                        that.nohold=true
                        var myshu = 0.00002;
                        
                        data.forEach(item => {
                            var doti = Math.abs(((item.close_price - item.open_price) * (Math.pow(10, item.dlen))).toFixed(2));
                            var lots = ((item.lots/100)*100).toFixed(2);
                            var profit = ((item.profit/100)*100).toFixed(2);
                            that.holslist.push({
                                'symbol': item.symbol,
                                'op': item.op == '1' ? 'sell' : 'buy',
                                'lots': lots,
                                'open_time': formatTime(item.open_time - 8 * 3600 + 2),
                                'open_price': item.open_price,
                                'close_price': item.close_price,
                                'profit': profit,
                                'stoploss': item.stoploss,
                                'takeprofit': item.takeprofit,
                                'commission': item.commission,
                                'swap': item.swap,
                                'show': false
                            })
                        })
                        that.totalcommission = (res.result.commission*100/100).toFixed(2)
                        that.totalswap = (res.result.swap*100/100).toFixed(2)
                        that.totalprofit = (res.result.profit*100/100).toFixed(2)
                        if(!that.scroll){
                            that.$nextTick(() => {
                                that.scroll = new BScroll(that.$refs.wrapper, {click:true})
                            })
                            that.holdloadMore();
                        }else{
                            that.scroll.refresh();
                        }
                    }
                }else{
                    if (that.holdpage == 1) {
                        that.nohold = false
                    }
                }
            })
        },
        // 加载更多
        holdloadMore() {
            const that = this;        
            that.$nextTick(() => {
                //touchEnd（手指离开以后触发） 通过这个方法来监听下拉刷新
                that.scroll.on('touchEnd', (pos) => {
                    if(that.scroll.maxScrollY>pos.y+10){
                        that.nohold = false;
                        that.holdpage += 1;
                        that.getHold;
                        //使用refresh 方法 来更新scroll  解决无法滚动的问题
                        that.scroll.refresh();
                    }
                })
            });
        },

        select_mt4:function(item,index){
            const that = this;
            that.mymt4idselect = item.mt4id;
            localStorage.mymt4idselect = item.mt4id;
            that.zhmt4sh = item.sh;
            localStorage.zhmt4sh = item.sh;
            that.tradeinfo = {};
            that.historyi = [];
            that.holslist = [];
            that.historypage = 1;
            that.holdpage = 1;
            that.totalcommission = 0;
            that.totalswap = 0;
            that.totalprofit = 0;
            // console.log(item.mt4id)
            // that.select_mt4show = false;
            //跟单状态（1，2）
            http.post('/api.order/get_status', {slave_mt4id:item.mt4id})
            .then(function (res) {                  
                if(res.code == 200) {                   
                    localStorage.mystatus = res.result.status;                   
                }else{
                    localStorage.mystatus = 2;
                }
            });
            //获取用户跟单数据
            http.post('/api.order/get_master_signal', {slave_mt4id:item.mt4id})
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
                            });
                        });
                        that.followsignal = followsignali;
                        that.switchType = localStorage.switchType;
                        // 检测是否正在监听
                        var master_list = eval('('+localStorage.master_list+')');                        
                        for (var i = 0; i < master_list.length;i++){
                            if (master_list[i].show==1){
                                master_list[i].state ='1' 
                            }
                            for (var j = 0; j < that.followsignal.length;j++){
                                if (master_list[i].bn == that.followsignal[j].bn){
                                    if (that.followsignal[j].status==1){//正在监听
                                        master_list[i].state ='3'
                                    } else if (that.followsignal[j].status== 0) {//移除
                                        master_list[i].state = '2'
                                    } 
                                }
                            }
                        }
                        localStorage.master_list = JSON.stringify(master_list);
                        localStorage.followsignal = JSON.stringify(that.followsignali);
                    }else{
                        that.followsignal = [];
                        localStorage.followsignal = '';
                    };
                };
            });
            that.getTrade();
            that.getHistory();
            that.getHold();
            that.getUserinfo()               
        },
    
    }

}
</script>
