<template>
  <div class="trip-detail">
    <van-nav-bar
      title="行程详情"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="container">
      <div class="info">
        <p>路线名称：<span class="value">{{detail.lineName}}</span></p>
        <p>车牌号码：<span class="value">{{detail.licensePlate}}</span></p>
        <p>开始时间：<span class="value">{{detail.startTime}}</span></p>
      </div>
      <div class="info">
        <p v-for="(item, index) in detail.siteList" :key="index">站点{{index+1}}<span class="value">{{item.siteName}}</span></p>
      </div>
      <div class="info member">
        <van-row class="member-info-title">
          <van-col span="4">名称</van-col>
          <van-col span="7">联系电话</van-col>
          <van-col span="5">出发</van-col>
          <van-col span="5">到达</van-col>
          <van-col span="3">状态</van-col>
        </van-row>
        <van-row class="member-info" v-for="(item,index) in detail.tripMemberList" :key="index">
          <van-col span="4">{{item.clientName}}</van-col>
          <van-col span="7">{{item.contactNumber}}</van-col>
          <van-col span="5">{{item.fromSite}}</van-col>
          <van-col span="5">{{item.toSite}}</van-col>
          <van-col span="3">{{item.orderState}}</van-col>
        </van-row>
        <van-empty v-if="!detail.tripMemberList||detail.tripMemberList.length === 0" description="暂无乘客" />
        <van-button v-if="isShowButton" size="small" type="info" class="scan-button" @click="scanQRCode">扫描上车</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { tripDetail } from '@/api/car'
import { onCarOrder } from '@/api/order'
import { Toast } from 'vant'
export default {
  name: 'TripDetail',
  data() {
    return {
      timeTableId: '',
      detail: {},
      isShowButton: false
    }
  },
  created() {
    this.timeTableId = this.$route.query.timeTableId
    this.tripDetail()
  },
  mounted() {
    this.$wxConfig.init()
  },
  methods: {
    onClickLeft() {
      this.$router.push('/trip')
    },
    tripDetail() {
      tripDetail({ timeTableId: this.timeTableId }).then(res => {
        this.detail = res.data
        this.setIsShowButton(this.detail.tripMemberList)
      })
    },
    scanQRCode() {
      this.$wxConfig.scanQRCode(res => {
        if (res.errMsg === 'scanQRCode:ok') {
          const { orderId, timeTableId } = JSON.parse(res.resultStr)
          this.onCarOrder(orderId, timeTableId)
        }
      })
    },
    onCarOrder(orderId) {
      onCarOrder({ orderId }).then(res => {
        Toast.success('上车成功')
        this.tripDetail()
      })
    },
    setIsShowButton(memberList) {
      memberList.forEach(element => {
        if (element.orderState !== '已完成') {
          this.isShowButton = true
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.trip-detail{
  .container{
    padding: 10px;
    p{
      margin: 0;
    }
    .info{
      background-color: #fff;
      padding: 10px;
      border-radius: 5px;
      font-size: 14px;
      color: #aaaaab;
      line-height: 24px;
      .value{
        float: right;
        color: #333;
      }
      &:not(:first-child){
        margin-top: 10px;
      }
      .member-info-title{
        background-color: #ECF5FF;
      }
      .member-info{
        color: #333;
        font-size: 12px;
      }
    }
    .member{
      text-align: center;
      .scan-button{
        margin-top: 20px;
        width: 80%;
      }
    }
  }

}
</style>
