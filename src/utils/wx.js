import Vue from 'vue'
import wx from 'weixin-js-sdk'
import request from '@/utils/request'

const wxConfig = {
  init() {
    request({
      url: '/wechat/portal/sign',
      method: 'post',
      data: { url: location.href }
    }).then(res => {
      const shareSign = res.data
      wx.config({
        debug: false,
        appId: shareSign.appId,
        timestamp: shareSign.timestamp,
        nonceStr: shareSign.nonceStr,
        signature: shareSign.signature,
        jsApiList: ['scanQRCode', 'chooseImage', 'openLocation', 'getLocation', 'chooseWXPay']
      })
    })

    wx.ready(function() {
      console.log('成功')
    })

    wx.error(function(res) {
      console.log('失败')
    })
  },
  checkJsApi(callback) {
    wx.checkJsApi({
      jsApiList: ['chooseImage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
      success: callback
    })
  },
  scanQRCode(callback) {
    wx.scanQRCode({
      needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
      scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
      success: callback
    })
  },
  openLocation(latitude, longitude, name, address) {
    wx.openLocation({
      latitude, // 纬度，浮点数，范围为90 ~ -90
      longitude, // 经度，浮点数，范围为180 ~ -180。
      name, // 位置名
      address, // 地址详情说明
      scale: 10, // 地图缩放级别,整型值,范围从1~28。默认为最大
      infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
    })
  },
  chooseWXPay(data, callback) {
    wx.chooseWXPay({
      timestamp: data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
      nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
      package: data.packageValue, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
      signType: data.signType, // 微信支付V3的传入RSA,微信支付V2的传入格式与V2统一下单的签名格式保持一致
      paySign: data.paySign, // 支付签名
      success: callback
    })
  }
}

Vue.prototype.$wxConfig = wxConfig
