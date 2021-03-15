<template>
	<div class="phone_tipbox">
        <div class="cardsection">
            <div class="card_namebox">
                <div>手机号</div>
                <input type="number" maxlength="11" v-model="phone" placeholder="请输入您的手机号" />
            </div>
            <div class="card_namebox">
                <div>验证码</div>
                <input type="number" v-model="yzmcode" placeholder="请输入您的验证码" />
                <button class="yzmbtn" @click="getcode()" v-if="!countstate">获取验证码</button>
                <button class="yzmbtn2" v-else>重试（{{count}}s）</button>
            </div>
            <div class="card_namebox">
                <div>密码</div>
                <input type="text" v-model="mypwd" placeholder="请设置手机登录密码" />
                <img class="phoneicon" src="../../assets/images/sign/see.png" alt="">
                <img class="phoneicon" src="../../assets/images/sign/close.png" alt="">
            </div>
            <p class="phoneremark">密码为6-12位字符至少包含数字、字母符号</p>
            <button class="phonebtn" @click="submit()">绑&nbsp;&nbsp;定</button>
            <!-- <p class="phone_tip">提示：手机号已注册的用户，请至“公众号”→“服务”→“绑定微信”</p> -->
        </div>
        <div class="masterbomb" v-if="phonemsgbox">{{phonemsg}}</div>
        <!-- 绑定成功后，进入'首页'→'我'→'账号切换'，查看您的手机账号 -->

	</div>	
</template>

<style>
    @import '../../assets/css/masterdetail.css';
    
</style>

<script>
import http from '@/lib/http';
export default {
	data(){		
      return{
        phonemsgbox:false,
        phonemsg:'',
        phone:'',
        yzmcode:'',
        mypwd:'',
        count:60,
        countstate:false,
        uid:'',
      }
    },
    components:{
      
	},
	created(){
        const that = this;
        that.getUserinfo();
	},
	methods:{
        // 个人信息接口
        getUserinfo:function(){
            const that = this;
            http.post('/api.mobile/get_userinfo', {})
            .then(function (res) {                  
                if(res.code == 200) {                   
                    var item = res.result;
                    that.uid = item.uid;
                }
            })
        },
        // 获取验证码
        getcode:function(){
            const that = this;
            if(that.phone==''){
                that.phonemsg = '请输入手机号';
                that.phonemsgbox = true;
                setTimeout(() => {
                        that.phonemsgbox = false;
                }, 1000);
            }else if(that.phone.length!=11){
                that.phonemsg = '手机号错误';
                that.phonemsgbox = true;
                setTimeout(() => {
                    that.phonemsgbox = false;
                }, 1000);
            }else{
                             
                http.post('/api.mobile/get_smscode', {mobile:that.phone})
                .then(function (res) {        					
                    if(res.code == 200) {
                        that.countstate = true;
                        if (that.countstate) {
                            var dsq = setInterval(function () {                                
                                if (that.count > 0) {
                                   that.count--;
                                }
                                else {
                                    that.count = 60;
                                    that.countstate = false
                                    clearInterval(dsq);
                                }
                            }, 1000)
                            dsq;
                        }
                        that.countstate = true;
                    }else{
                        that.phonemsg = res.msg;
                        that.phonemsgbox = true;
                        setTimeout(() => {
                            that.phonemsgbox = false;
                        }, 1000);
                    }
                }).catch(function (err) {
                    that.phonemsg = "获取失败";
                    that.phonemsgbox = true;
                    setTimeout(() => {
                        that.phonemsgbox = false;
                    },1000)
                });
            }
        },
		submit:function(){
            const that = this;
            if(that.phone==''){
                that.phonemsg = '请输入手机号';
                that.phonemsgbox = true;
                setTimeout(() => {
                    that.phonemsgbox = false;
                }, 1000);
            }else if(that.phone.length!=11){
                that.phonemsg = '手机号错误';
                that.phonemsgbox = true;
                setTimeout(() => {
                    that.phonemsgbox = false;
                }, 1000);
            }else if(that.yzmcode==''){
                that.phonemsg = '验证码为空';
                that.phonemsgbox = true;
                setTimeout(() => {
                    that.phonemsgbox = false;
                }, 1000);
            }else if(that.mypwd.length < 6 || that.mypwd.length > 12 || that.mypwd==''){
                that.phonemsg = '请输入6-12位字符至少包含数字、字母符号';
                that.phonemsgbox = true;
                setTimeout(() => {
                    that.phonemsgbox = false;
                }, 1000);
            }else{
                if(that.uid==''){
                    http.post('/api.account/binging_mobile', {
                        login:that.phone,
                        verify:that.yzmcode,
                        password:that.mypwd
                        })
                    .then(function (res) {
                        console.log(res)  
                        that.phonemsg = res.msg;
                        that.phonemsgbox = true;
                        setTimeout(() => {
                            that.phonemsgbox = false;
                            window.location.href = res.url;
                            // that.$router.push({name:'home'});
                        }, 1000);
                    })
                }else{
                    http.post('/api.account/binging_mobile', {
                        login:that.phone,
                        verify:that.yzmcode,
                        password:that.mypwd,
                        uid:that.uid
                        })
                    .then(function (res) {
                        console.log(res)  
                        that.phonemsg = res.msg;
                        that.phonemsgbox = true;
                        setTimeout(() => {
                            that.phonemsgbox = false;
                            window.location.href = res.url;
                            // that.$router.push({name:'home'});
                        }, 1000);
                    })
                }
               
            }
        }
	}

}
</script>
