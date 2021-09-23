<template>
  <div class="preorder">
    <van-nav-bar
      title="确认订单"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="container" :style="{height: height + 'px'}">
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
        <p>剩余行李位：<span class="value">{{detail.baggageCount}}</span></p>
      </div>
      <div class="info">
      <van-checkbox v-model="checked">是否需要行李位</van-checkbox>
      <van-button type="info" class="order-button" @click="confirm">确认订单</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { createOrder, singleCar } from '@/api/order'
export default {
  name: 'Preorder',
  data() {
    return {
      detail: {},
      checked: false,
      height: '100'
    }
  },
  created() {
    // this.detail = this.$route.query
    this.height = window.screen.height - 265 + 102 + 54 - 20
    this.singleCar(this.$route.query)
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
        cost: this.detail.price,
        baggageCount: this.checked ? 1 : 0
      }
      createOrder(request).then(res => {
        this.$router.push({
          path: '/order-detail',
          query: { orderId: res.data.orderId }
        })
      })
    },
    singleCar(data) {
      singleCar(data).then(res => {
        this.detail = res.data
      })
    }
  }
}
</script>

<style lang="scss">
.preorder{
  .van-checkbox__label{
    color: #aaaaab;
  }
}
</style>

<style lang="scss" scoped>
.preorder{
  .container{
    overflow: auto;
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
