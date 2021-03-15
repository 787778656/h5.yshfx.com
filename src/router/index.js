import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '*',
      redirect: '/home',
    },
    {
      path: '/home',
      component: () => import('@/pages/index.vue'),
      redirect: '/home/home',
      children: [
        {
          path: 'home',
          name: 'home',
          component: () => import('@/pages/Home/home.vue'),
          meta: {
            title: '首页',
          },
        },
        {
          path: 'master',
          name: 'master',
          component: () => import('@/pages/Master/master.vue'),
          meta: {
            title: '跟随交易',
          },
        },
        {
          path: 'trade',
          name: 'trade',
          component: () => import('@/pages/Trade/trade.vue'),
          meta: {
            title: '我的交易',
          },
        },
        {
          path: 'mine',
          name: 'mine',
          component: () => import('@/pages/Mine/mine.vue'),
          meta: {
            title: '我',
          },
        },
      ]
    },
    {
      path: '/noticedetail',
      name: 'noticedetail',
      component: () => import('@/pages/Other/noticedetail.vue'),
      meta: {
        title: '公告',
      },
    },
    {
      path: '/notice',
      name: 'notice',
      component: () => import('@/pages/Other/notice.vue'),
      meta: {
        title: '消息中心',
      },
    },
    {
      path: '/protocol',
      name: 'protocol',
      component: () => import('@/pages/Other/protocol.vue'),
      meta: {
        title: '用户协议',
      },
    },
    {
      path: '/follow',
      name: 'follow',
      component: () => import('@/pages/Master/follow.vue'),
      meta: {
        title: '跟单',
      },
    },
    {
      path: '/masterdetail',
      name: 'masterdetail',
      component: () => import('@/pages/Master/masterdetail.vue'),
      meta: {
        title: '信号详情',
      },
    },
    {
      path: '/upsignal',
      name: 'upsignal',
      component: () => import('@/pages/Master/upsignal.vue'),
      meta: {
        title: '上传信号',
      },
    },
    {
      path: '/modify',
      name: 'modify',
      component: () => import('@/pages/Master/modify.vue'),
      meta: {
        title: '修改',
      },
    },
    {
      path: '/withdrawal',
      name: 'withdrawal',
      component: () => import('@/pages/Other/withdrawal.vue'),
      meta: {
        title: '提现',
      },
    },
    {
      path: '/recharge',
      name: 'recharge',
      component: () => import('@/pages/Other/recharge.vue'),
      meta: {
        title: '充值',
      },
    },
    {
      path: '/help',
      name: 'help',
      component: () => import('@/pages/Other/help.vue'),
      meta: {
        title: '常见问题',
      },
    },
    {
      path: '/question/:id',
      name: 'question',
      component: () => import('@/pages/Other/question.vue'),
      meta: {
        title: '问题详情',
      },
    },
    {
      path: '/aboutus',
      name: 'aboutus',
      component: () => import('@/pages/Other/aboutus.vue'),
      meta: {
        title: '关于我们',
      },
    },
    {
      path: '/Propaganda',
      name: 'Propaganda',
      component: () => import('@/pages/Other/Propaganda.vue'),
      meta: {
        title: '',
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/Other/login.vue'),
      meta: {
        title: '登录',
      },
    },
    {
      path: '/loginphone',
      name: 'loginphone',
      component: () => import('@/pages/Other/loginphone.vue'),
      meta: {
        title: '手机号登录',
      },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/pages/Other/register.vue'),
      meta: {
        title: '登录',
      },
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('@/pages/Other/contact.vue'),
      meta: {
        title: '联系我们',
      },
    },
    {
      path: '/agency',
      name: 'agency',
      component: () => import('@/pages/Other/agency.vue'),
      meta: {
        title: '永久VIP权限说明',
      },
    },
    {
      path: '/bindphone',
      name: 'bindphone',
      component: () => import('@/pages/Mine/bindphone.vue'),
      meta: {
        title: '绑定手机号',
      },
    },
    {
      path: '/bindwx',
      name: 'bindwx',
      component: () => import('@/pages/Mine/bindwx.vue'),
      meta: {
        title: '绑定微信',
      },
    },
    {
      path: '/bindchange',
      name: 'bindchange',
      component: () => import('@/pages/Mine/bindchange.vue'),
      meta: {
        title: '绑定手机/微信',
      },
    },
    {
      path: '/setting',
      name: 'setting',
      component: () => import('@/pages/Mine/setting.vue'),
      meta: {
        title: '账户信息',
      },
    },
    {
      path: '/allmt4',
      name: 'allmt4',
      component: () => import('@/pages/Mine/allmt4.vue'),
      meta: {
        title: '多MT4绑定',
      },
    },
    {
      path: '/invite',
      name: 'invite',
      component: () => import('@/pages/Mine/invite.vue'),
      meta: {
        title: '邀请好友',
      },
    },
    {
      path: '/maid',
      name: 'maid',
      component: () => import('@/pages/Mine/maid.vue'),
      meta: {
        title: '我的返佣',
      },
    },
    {
      path: '/feedback',
      name: 'feedback',
      component: () => import('@/pages/Mine/feedback.vue'),
      meta: {
        title: '用户反馈',
      },
    },
    {
      path: '/mysignal',
      name: 'mysignal',
      component: () => import('@/pages/Mine/mysignal.vue'),
      meta: {
        title: '我的信号',
      },
    },
    {
      path: '/vip',
      name: 'vip',
      component: () => import('@/pages/Mine/vip.vue'),
      meta: {
        title: '会员系统',
      },
    },
    {
      path: '/openup',
      name: 'openup',
      component: () => import('@/pages/Mine/openup.vue'),
      meta: {
        title: '开通vip',
      },
    },
    {
      path: '/redbag',
      name: 'redbag',
      component: () => import('@/pages/Mine/redbag.vue'),
      meta: {
        title: '我的红包',
      },
    },
    {
      path: '/maid_rule',
      name: 'maid_rule',
      component: () => import('@/pages/Mine/maid_rule.vue'),
      meta: {
        title: '奖励规则',
      },
    },
    {
      path: '/detail',
      name: 'detail',
      component: () => import('@/pages/Mine/detail.vue'),
      meta: {
        title: '明细',
      },
    },
    {
      path: '/lowerlevel',
      name: 'lowerlevel',
      component: () => import('@/pages/Mine/lowerlevel.vue'),
      meta: {
        title: '添加下级用户',
      },
    },
    {
      path: '/userlist',
      name: 'userlist',
      component: () => import('@/pages/Mine/userlist.vue'),
      meta: {
        title: '用户列表',
      },
    },
    {
      path: '/bindmt4',
      name: 'bindmt4',
      component: () => import('@/pages/Mine/bindmt4.vue'),
      meta: {
        title: '绑定MT4账户',
      },
    },
  ]
})
