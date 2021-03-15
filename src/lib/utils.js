const formatTime = date => {
    var newDate = new Date();
    newDate.setTime(date * 1000);
    const year = newDate.getFullYear()
    const month = newDate.getMonth() + 1
    const day = newDate.getDate()
    const hour = newDate.getHours()
    const minute = newDate.getMinutes()
    const second = newDate.getSeconds()
  
    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatTime_short = date => {
    var newDate = new Date();
    newDate.setTime(date * 1000);
    const year = newDate.getFullYear()
    const month = newDate.getMonth() + 1
    const day = newDate.getDate()
  
    return [year, month, day].map(formatNumber).join('-')
}
  
const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

// 保存本地缓存
const addProStorage = bn => {
    if(localStorage.getItem('product')) {
        let bnStr = localStorage.getItem('product');
        bnStr += `,${bn}`;
        localStorage.setItem('product',bnStr);
    }else{
        localStorage.setItem('product',bn);
    }
}

// 删除本地缓存
const delProStorage = bn => {
    if(localStorage.getItem('product')){
        let bnStr = localStorage.getItem('product');
        let bnArr = bnStr.split(',');
        bnArr.forEach((el,idx) => {
            if(el == bn) {
                bnArr.splice(idx,1);
            }
        });
        bnStr = bnArr.join(',');
        localStorage.setItem('product',bnStr);
    }
}

// 从url里获取参数
const GetQueryString = name => {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

// 获取结束时间
const getEndTimeStamp = (day,start) => {
    const sec = day * 24 *60 *60;
    return start + sec;
}

// 设定刷新时间范围
const getTimeRange = () => {
    var date = new Date();
    const day = date.getDay();
    const hour = date.getHours()
    const minute = date.getMinutes();

    // 只有周一至周五的8.30-15.30刷新
    if(day == 0 || day == 6) {
        return false;
    }else if(hour == 8 && minite < 30 || hour < 8) {
        return false;
    }else if(hour == 15 && minute > 30 || hour > 15) {
        return false;
    }
    return true;
}

//全局变量
const globalData = {
    token:localStorage.token,
    uid:localStorage.uid,
    nickname:localStorage.nickname,
    vipserver:localStorage.vipserver,
    current:localStorage.current,
    followsignal:localStorage.followsignal,
    mymt4id:localStorage.mymt4id,
    mymt4idselect:localStorage.mymt4idselect,
    zhmt4server:localStorage.zhmt4server,
    master_list:localStorage.master_list,
    mystatus:localStorage.mystatus,
    switchType:localStorage.switchType
}
  
export {
    formatTime,
    formatTime_short,
    addProStorage,
    delProStorage,
    getEndTimeStamp,
    GetQueryString,
    getTimeRange,
    globalData
}
