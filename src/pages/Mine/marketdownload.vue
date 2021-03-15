<template>
    <div>
        <div class="market_down">
            <div class="market_downimg">
                <img :src="img_path" alt="">
            </div>
            <div class="market_mark">
                <img class="cretip" src="../../assets/images/master/tips.png" alt="">
                <div class="crewatch">保存图片后可分享至朋友圈</div>
            </div>
        </div>
        <div class="market_downseat"></div>
        <button class="market_downsave">长按图片保存</button>

    </div>
</template>

<style>
@import '../../assets/css/create.css';
@import '../../assets/css/marketpic.css';
</style>

<script>
import http from '@/lib/http';
export default {
     data(){
        return{
            phonemsg:'',
            phonemsgbox:false,
            myid:'',
            img_path:''
        }
     },
     components:{
      
	},
	created(){
        const that = this;
        that.myid = that.$route.query.id;
        that.img_path = 'http://static.v.znforex.com/upload/image/'+that.$route.query.img;
        // console.log(that.$route.query.id)
	},
	mounted() {
		
	},
	methods:{
        downloadimg:function(id) {
            const that = this;
            
        },
    }
}

</script>


