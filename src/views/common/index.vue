<template>
</template>

<script>
export default {
    created() {
        var appID = 'wxd4270c7f24a6f345' 
        var redirect = encodeURIComponent('http://qcred3.natappfree.cc/front/#/home')
        var url_userinfo 	= 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+appID+'&redirect_uri='+redirect+'&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect';
        location.replace(url_userinfo);
    },
}
</script>

