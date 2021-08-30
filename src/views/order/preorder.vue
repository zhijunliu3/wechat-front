<template>
  <div class="preorder">
    <van-nav-bar
      title="确认订单"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="container">
      <div class="info">
        <p>出发站：<span class="value">{{detail.startSiteName}}</span></p>
        <p>到达站：<span class="value">{{detail.endSiteName}}</span></p>
        <p>出发时间：<span class="value">{{detail.startTime}}</span></p>
        <p>预到达时间：<span class="value">{{detail.endTime}}</span></p>
      </div>
      <div class="info">
        <p>车型：<span class="value">{{detail.model}}</span></p>
        <p>车牌：<span class="value">{{detail.licensePlate}}</span></p>
      </div>
      <div class="info">
        <p>价格：<span class="value">￥{{detail.price}}</span></p>
        <p>剩余座位：<span class="value">{{detail.seatCount}}</span></p>
      </div>
      <div class="info">
      <van-button type="info" class="order-button" @click="confirm">确认订单</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { createOrder } from '@/api/order'
export default {
  name: 'Preorder',
  data() {
    return {
      detail: {}
    }
  },
  created() {
    this.detail = this.$route.query
  },
  methods: {
    onClickLeft() {
      this.$router.push('/schedule')
    },
    confirm() {
      this.createOrder()
    },
    createOrder() {
      const request = {
        timeTableId: this.detail.timeTableId,
        fromSiteId: this.detail.startSiteId,
        toSiteId: this.detail.endSiteId,
        fromSite: this.detail.startSiteName,
        toSite: this.detail.endSiteName,
        cost: this.detail.price
      }
      createOrder(request).then(res => {
        this.$router.push({
          path: '/order-detail',
          query: { orderId: res.data.orderId }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.preorder{
  .container{
    padding: 10px;
    .info{
      background-color: #fff;
      padding: 10px;
      margin-top: 5px;
      border-radius: 5px;
      font-size: 14px;
      color: #aaaaab;
      line-height: 24px;
      .value{
        float: right;
        color: #333;
      }
      .order-button{
        width: 100%;
        margin-top: 10px;
      }
    }
  }
}
</style>
