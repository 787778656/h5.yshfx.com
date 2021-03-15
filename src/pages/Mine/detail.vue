<template>
    <div class="detailwrapper" ref="wrapper">
        <div style="padding: 1px 0;" v-if="!nodata">
            <div class="detail-box" v-for="(item,index) in detailList" :key="index">
                <div class="detail-item">
                    <div class="detail-left left">
                        <img class="detail-icon" src="../../assets/images/mine/time.png" />
                        <div class="detail-text">申请时间</div>
                    </div>
                    <div class="detail-right right">{{item.time}}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-left left">
                        <img class="detail-icon" src="../../assets/images/mine/money.png" />
                        <div class="detail-text">申请金额</div>
                    </div>
                    <div class="detail-right right" :class="item.amount > 0?'in':'out'">{{item.amount}}元</div>
                </div>
                <div class="detail-item">
                    <div class="detail-left left">
                        <img class="detail-icon" src="../../assets/images/mine/type.png" />
                        <div class="detail-text">类　　别</div>
                    </div>
                    <div class="detail-right right">{{item.remark}}</div>
                </div>
            </div>
            <div class="load_more" v-if="loadMorestatu">{{loadMoreText}}</div>
        </div>
        <div v-else style='background:#f7f7f9;'>
            <img class="nodata" src="../../assets/images/master/nodata.png" />
        </div>
        <div class="masterbomb" v-if="phonemsgbox">{{phonemsg}}</div>
    </div>
    
</template>

<style>
    @import '../../assets/css/follow.css';
    @import '../../assets/css/credit.css';
</style>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import http from '@/lib/http';
  import { formatTime } from '@/lib/utils';
  export default {
    data(){
      return{
        detailList:[],
        list_page: 1,
        loadMoreText: '已加载全部数据',
        loadMorestatu:false,
        phonemsg:'',//提示框文字
        phonemsgbox:false,//提示框状态
        nodata:true
      }
    },
    components:{
      
    },
    created(){
        const that = this;
        that.getDetail(that.list_page);
    },
    methods: {
        getDetail(page) {
            const that = this;
            http.post('/api.mobile/withdrawInfo',{ page:page })
            .then((res) => {                
                if(res.code = 200) {                    
                    var detaildata = res.result.data
                    if(detaildata.length <=0){                        
                        if(that.list_page==1){
                            that.nodata = true;
                        }else{
                            that.nodata = false;
                            that.loadMorestatu = true
                        }
                    }else{
                        that.nodata = false;                       
                        var detaili=[];
                        detaildata.forEach(item => {                            
                            var timei = formatTime(item.add_time)
                            if ((item.amount.toString()).indexOf('-')!=-1){
                                var pni=0
                            }else{
                                var pni = 1
                            }
                            detaili.push({
                                time: timei,
                                amount: item.amount,
                                remark: item.remark,
                                pn:pni
                            })                            
                        });
                        var detailii=that.detailList.concat(detaili);
                        that.detailList = detailii;
                         
                        if(!that.scroll){
                            that.$nextTick(() => {
                                that.scroll = new BScroll(that.$refs.wrapper, {click:true})
                            })
                            that.loadMore();
                        }else{
                            that.scroll.refresh();
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
        loadMore() {        
            this.$nextTick(() => {
                //touchEnd（手指离开以后触发） 通过这个方法来监听下拉刷新
                this.scroll.on('touchEnd', (pos) => {
                    if(this.scroll.maxScrollY>pos.y+10){
                        this.list_page += 1;
                        this.getDetail(this.list_page);
                        //使用refresh 方法 来更新scroll  解决无法滚动的问题
                        this.scroll.refresh();
                    }
                })
            });
        },
    },
    
    mounted() {
        
    }

  }
</script>