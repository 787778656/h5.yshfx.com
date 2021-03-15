<template>
    <div class="marketpic_box">
        <div style="padding:1px 0px;">
            <p>点击图片，生成我的推广图片</p>
            <ul class="marketpic">
                <router-link :to="{path:'/marketdownload',query:{id:item.bg_num,img:item.img}}" v-for="(item,index) in market" :key="index">
                    <li>
                        <img class="marketpic_img" :src="'http://static.v.znforex.com/upload/image/'+item.img" alt="">
                        <div class="marketpic_in">{{item.content}}</div>
                    </li>
                </router-link>
            </ul>
            <div class="marketpic_more" v-if="loadall">已加载全部~</div>
            <div class="masterbomb" v-if="phonemsgbox">{{phonemsg}}</div>
        </div>
    </div>
</template>

<style>
@import '../../assets/css/marketpic.css';
</style>

<script>
import http from '@/lib/http';
export default {
     data(){
        return{
            market:[],
            page:1,
            phonemsg:'',
            phonemsgbox:false,
            loadall:false,
        }
     },
     components:{
      
	},
	created(){
		const that = this;		
		that.marketList(that.page);
	},
	mounted() {
		
	},
	methods:{
        marketList:function(page){
            const that = this;
            http.post('/api.account/marketing_pic', {page:page})
            .then(function (res) {
                if(res.code == 200) {
                    // console.log(res.result.data)
                    that.market = res.result.data;
                    if(res.result.data.length>0){
                        if(that.page==1){
                            that.loadall = true;
                        }
                        // console.log("跟随交易长度"+data.length)
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
                    that.phonemsg = res.msg;
                    that.phonemsgbox = true;
                    setTimeout(() => {
                        that.phonemsgbox = false;
                    }, 1500);
                }
            }).catch(function (err) {
                that.phonemsg = '加载失败';
                that.phonemsgbox = true;
                setTimeout(() => {
                    that.phonemsgbox = false;
                }, 1000);
            });
        },
        // 加载更多
        loadMore() {        
            this.$nextTick(() => {
                //touchEnd（手指离开以后触发） 通过这个方法来监听下拉刷新
                this.scroll.on('touchEnd', (pos) => {
                    if(this.scroll.maxScrollY>pos.y+10){
                        this.page += 1;
                        this.marketList(this.page);
                        //使用refresh 方法 来更新scroll  解决无法滚动的问题
                        this.scroll.refresh();
                    }
                })
            });
        },
    }
}

</script>


