<template>
	<div>
		<div class="ticedetail">
            <div class="ticedetail_box">
                <div class="ticedetail_top">
                    <div class="ticedetail_title">系统消息</div>
                    <div class="ticedetail_time">{{time}}</div>
                </div>
                <div class="ticedetail_text">{{msg}}</div>
            </div>
        </div>
	</div>
</template>

<style>
	@import '../../assets/css/notice.css';
</style>
<script type="text/ecmascript-6">
import { formatTime } from '@/lib/utils';
import http from '@/lib/http';
  export default {
    data(){
      return{
          time:'',
          msg:''
      }
    },
    components:{
      
	},
	created(){
        const that = this;
        that.time = that.$route.query.time;
        that.msg = that.$route.query.msg;
		// 公告部分
        http.post('/api.account/read_msg', {id:that.$route.query.id})
        .then(function (res) {
            if(res.code == 200) {
                // that.msg = res.
            }
        })
	},
	methods:{
		
	}

  }
</script>