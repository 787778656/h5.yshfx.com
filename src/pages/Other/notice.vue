<template>
	<div>
		<div class="mynotice" v-if="!nodata">
            <router-link :to="{name:'noticedetail',query:{id:item.id,time:item.add_time,msg:item.msg}}" class="mynotice_list" v-for="(item,index) in noticelist" :key="index">
                <img v-if="item.status==1" class="mynotice_icon" src="../../assets/images/master/notice_yes.png" alt="">
                <img v-else-if="item.status==2" class="mynotice_icon2" src="../../assets/images/master/notice_no.png" alt="">
                <div class="mynotice_content">
                    <div>【系统消息】</div>
                    <p class="mynotice_text single">{{item.msg}}</p>
                    <div class="mynotice_time">{{item.add_time}}</div>
                </div>
            </router-link>
            <div class="mynotice_down">已经到底啦~</div>
        </div>
		<div v-else style='background:#f7f7f9;'>
            <img class="nodata" src="../../assets/images/master/nodata.png" />
        </div>
	</div>
</template>

<style>
	@import '../../assets/css/masterdetail.css';
	@import '../../assets/css/notice.css';
</style>
<script type="text/ecmascript-6">
import { formatTime } from '@/lib/utils';
import http from '@/lib/http';
  export default {
    data(){
      return{
            nodata:true,
            noticelist:[],
      }
    },
    components:{
      
	},
	created(){
		const that = this;
		// 公告部分
        http.post('/api.account/get_msg', {})
        .then(function (res) {
            if(res.code == 200) {
                if(res.data.length>0){
                    that.nodata = false;
                    var data = res.data;
                    data.forEach(item => {
                        that.noticelist.push({
                            id:item.id,
                            add_time: formatTime(item.add_time),
                            msg: item.msg,
                            status: item.status
                        })
                    });
                }else{
                    that.nodata = true;
                }
            }else{
                that.nodata = true;
            }
        })
	},
	methods:{
		
	}

  }
</script>