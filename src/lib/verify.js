const checkPhone = phone => {
    const reg = /^1[34578][0-9]{9}$/;
    if(!reg.test(phone)) {
        return false;
    }else{
        return true;
    }
}

const checkIdcard = idcard => {
    const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if(!reg.test(idcard)) {
        return false;
    }else{
        return true;
    }
}

export {
    checkPhone,
    checkIdcard
}