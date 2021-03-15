<template>
    <div class="agency">
        <div class="agency_header">永久VIP权限说明</div>
        <p class="agency_h1">
            <span style="display: block;">通过社区里面合作经纪商开户链接办理账户（如下所示）免费跟单合作请联系客服</span>
        　　<span style="display: block;">1、资金1000美金以上获得VIP1跟单权限；权限包括：单一信号跟随+风控工具；（推荐优质信号，可自行交易）。</span>
        　　<span style="display: block;">2、资金5000美金以上获得VIP2跟单权限；权限包括：多信号组合跟随+反向跟单+风控工具；（推荐优质信号，可自行交易）</span>
        </p>
        <p class="agency_h2">
            <span class="agency_h3">亿思汇免责声明：</span>
            有关亿思汇社交平台永久VIP权限并非强制要求，纯为用户自由选择；亿思汇不接触客户资金，所有交易均通过购买VIP跟单服务和开户经纪商完成。亿思汇不保证用户盈利，且不承担任何责任。
            用户须知从事外汇和差价合约等金融产品的杠杆交易具有高风险，损失有可能超过本金，请量力而行，入市前需充分了解潜在的风险。
            交易杠杆化产品并不适合所有投资者，在交易前请考虑您的经验水平，经济能力和投资目标，如有必要请寻求独立财务建议。
        </p>
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
    </div>	
</template>

<style>
    .agency{background-color: #fff;border-bottom: 1px solid #dedfe0;padding: 1rem 0.8rem;text-align: left;font-size: 0.72rem;}
    .agency_header{font-weight: bold;font-size: 0.8rem;text-align: center;margin-bottom: 0.5rem;}
    .agency_h1{font-weight: bold;text-indent: 2em;}
    .agency_h2{text-indent: 2em;margin-top: 0.5rem;}
    .agency_h3{font-weight: bold;}
    .agency_agree{width: 100%;height: 1rem;margin: 0.5rem 0px;}
    .agency_agree>img{width: 0.8rem;height: 0.8rem;float: left;margin-right: 0.5rem;margin-top: 0.1rem;}
    .agency_href1{text-decoration: underline;}
    .agency_website{margin-bottom: 0.3rem;}
    .agency_website3{text-indent: 2em;}
    .agency_website2{margin-bottom: 1rem;}
    .agency_href2{color: #611987;text-decoration: underline;}
    .agency_btn{width: 6rem;height: 1.7rem;margin: 1.5rem auto;display: block;background-color: #611987;color: #fff;border-radius: 4px;line-height: 1.7rem;text-align: center;}

    .broker{margin-top: 1rem;}
    .broker>ul>li{border-bottom: 1px solid #dedfe0;height: 3rem;width: 100%;padding: .5rem 0;}
    .broker>ul>li>img{width: 3rem;height: 3rem;float: left;}
    .broker>ul>li>span{margin-left: 1rem;line-height: 3rem;float: left;}
    .broker>ul>li>button{width: 4rem;height: 1.6rem;margin-top: .5rem;border: 1px solid #611987;background: transparent;color: #611987;
        float: right;border-radius: .8rem;}
</style>
<script>
import http from '@/lib/http';
export default {
	data(){		
      return{
        isShow:false,
        phonemsg:'暂无消息',
        phonemsgbox:false,
      }
    },
    components:{
      
	},
	created(){
        const that = this;
		
	},
	methods:{
		
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
      window.location.href = 'https://portal.trademaxgl.com/register?node=Mjk2MDE=&language=zh';
    },
	}

}
</script>
