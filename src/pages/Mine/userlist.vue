<template>
<div>
	<div class="detailwrapper" ref="wrapper">
        <div style="padding: 1px 0;" v-if="!nodata">
            <div class="detail-box" v-for="(item,index) in detailList" :key="index">
                <div class="detail-item">
                    <div class="detail-left left">
                        <img class="detail-icon" src="../../assets/images/mine/time.png" />
                        <div class="detail-text">用户</div>
                    </div>
                    <div class="detail-right right" v-if="item.nickname!=''">{{item.nickname}}</div>
                    <div class="detail-right right" v-else>{{item.login}}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-left left">
                        <img class="detail-icon" src="../../assets/images/mine/type.png" />                        
                        <div class="detail-text">MT4账户</div>
                    </div>
                    <div class="detail-right right" v-if="item.zhmt4uid==''">---</div>
                    <div class="detail-right right" v-else>{{item.zhmt4uid}}</div>
                </div>
            </div>
            <div class="load_more" v-if="loadMorestatu">{{loadMoreText}}</div>
        </div>
        <div v-else style='background:#f7f7f9;'>
            <img class="nodata" src="../../assets/images/master/nodata.png" />
        </div>
        <div class="masterbomb" v-if="phonemsgbox">{{phonemsg}}</div>
	</div>
    <router-link to="/lowerlevel" class="add_myuser">手动添加下级用户</router-link>
</div>
    
</template>

<style>
    @import '../../assets/css/follow.css';
    .detail-box{border-top: 1px solid #dedfe0;border-bottom: 1px solid #dedfe0;background: #fff;
            padding: 0.4rem 0.675rem;box-sizing: border-box;margin-top: 0.54rem;}
    .detail-box:last-child{margin-bottom: 0.54rem;}
    .detail-item{overflow: hidden;height: 1.3rem;line-height: 1.3rem;}
    .detail-left,.detail-right{overflow: hidden;}
    .detail-icon{width: 0.9rem;height: 0.9rem;float: left;margin: 0.2rem 0.7rem 0 0;}
    .detail-text{color: #333;float: left;}
    .detail-right.in{color: #017eff;}
    .detail-right.out{color: #ff0000;}
    .detailwrapper{width: 100%;height: 100%;position: fixed;top: 0px;left: 0px;right: 0px;bottom: 0px;overflow-y: scroll;overflow-x: hidden;}
    .load_more{padding: 0.54rem 0;background-color: #fff;color: #999999;}
    .add_myuser{width: 92%;height: 2.2rem;line-height: 2.2rem;color: #fff;background-color: #611987;position: fixed;left: 0px;right: 0px;bottom:0.6rem;
    margin: 0 auto;font-size: 0.8rem;border: none;outline: none;border-radius: 50px;}
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
        nodata:true,
        typenum:''
      }
    },
    components:{
      
    },
    created(){
        const that = this;
        that.typenum = that.$route.query.typenum;
        that.getDetail(that.list_page,that.typenum);
    },
    methods: {
        getDetail(page,typenum) {
            const that = this;
            http.post('/api.mobile/sons_user',{ page:page,type:typenum })
            .then((res) => {                
                if(res.code = 200) {
                    console.log(res)                    
                    var detaildata = res.sons.data
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
                            if (item.login != '') {
                                var login = item.login.substring(0, 3) + '****' + item.login.substring(item.login.length-4);
                            }else{
                                var login='';
                            }  
							that.detailList.push({
								imoney: item.imoney,
                                login: login,
                                nickname: item.nickname,
                                parent_id: item.parent_id,
                                server: item.server,
                                u_img: item.u_img,
                                uid: item.uid,
                                zhmt4uid: item.zhmt4uid
                            })                            
                        });                         
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