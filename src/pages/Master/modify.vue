<template>
    <div>
        <ul class="modify">
            <li>
                <div class="modify_name">服务器</div>
                <div class="modify_text">{{mt4server}}</div>
                <img class="modify_lock" src="../../assets/images/master/lock.png" alt="">
            </li>
            <li>
                <div class="modify_name">名称</div>
                <div class="modify_text">{{sign_name}}</div>
                <img class="modify_lock" src="../../assets/images/master/lock.png" alt="">
            </li>
            <li>
                <div class="modify_name">账号</div>
                <div class="modify_text">{{mt4id}}</div>
                <img class="modify_lock" src="../../assets/images/master/lock.png" alt="">
            </li>
            <li>
                <div class="modify_name">密码</div>
                <input class="modify_inp" v-model="mt4pwd" type="text" placeholder="请输入MT4观摩密码">
            </li>
        </ul>
        <button class="modifybtn" @click="submit()">确&nbsp;认&nbsp;修&nbsp;改</button>
        <div class="loginbomb" v-if="phonemsgbox">{{phonemsg}}</div>
    </div>
</template>

<style>
    .modify{background-color: #fff;border-top: 1px solid #dedfe0;border-bottom: 1px solid #dedfe0;padding: 0 0.5rem;}
    .modify>li{border-bottom: 1px solid #dedfe0;height: 2.2rem;}
    .modify>li:last-child{border: none;}
    .modify_name{width: 20%;line-height: 2.2rem;text-align: left;float: left;}
    .modify_text{width: 50%;float: left;line-height: 2.2rem;text-align: left;}
    .modify_lock{width: 0.8rem;height: 0.8rem;float: right;margin-top: 0.7rem;}
    .modify_inp{width: 50%;height: 1.4rem;line-height: 1.4rem;margin-top: 0.4rem;float: left;font-size: 0.8rem;border: none;outline: none;}
    .modifybtn{width: 90%;height: 2.3rem;background-color: #FF8A00;color: #fff;border: none;outline: none;margin-top: 4rem;border-radius: 4px;}
    .loginbomb{padding: 0.5rem 1rem;width:6rem;background-color: rgba(0, 0, 0, 0.5);color: white;position: fixed;top: 40%;border-radius: 4px;
    left: 0px;right: 0px;margin: 0 auto;z-index: 11;}
</style>

<script>
import http from '@/lib/http';
import { globalData } from '@/lib/utils';
export default {
    data(){
        return{
            mt4server:'',
            sign_name:'',
            mt4id:'',
            mt4pwd:'',
            phonemsgbox:false,
            phonemsg:'',
        }
    },
    created(){
        const that = this;
        that.mt4server = that.$route.query.mt4server
        that.sign_name = that.$route.query.sign_name;
        that.mt4id = that.$route.query.mt4id;
    },
    mounted() {        
        
    },
    methods: {
        submit:function(){
            const that = this;
            if(that.mt4pwd==""){
                that.phonemsg = '请输入密码';
                that.phonemsgbox = true;
                setTimeout(() => {
                that.phonemsgbox = false;
                }, 1000);
            }else{
                http.post('/api.signal/edit_master_signal', {mt4id:that.mt4id,mt4pwd:that.mt4pwd})
				.then(function (res) {						        					
					if(res.code == 200) {
                        that.phonemsg = res.msg;
						that.phonemsgbox = true;
						setTimeout(() => {
                            that.phonemsgbox = false;
                            that.$router.push({path:'/mysignal',query:{}});
						}, 1000);
					}else{
						that.phonemsg = res.msg;
						that.phonemsgbox = true;
						setTimeout(() => {
                            that.phonemsgbox = false;
						}, 1000);
					}
				}).catch(function (err) {
					that.phonemsg = "下架失败";
					that.phonemsgbox = true;
					setTimeout(() => {
						that.phonemsgbox = false;
					},1000)
					// console.log(err);
				});
            }
        }
    }
}
</script>
