<template>
  <div class="order">
    <van-nav-bar
    title="我的订单"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
    >
    </van-nav-bar>
    <van-tabs v-model="active">
      <van-tab class="container" title="待支付">
        <order-list type="waitPay"></order-list>
      </van-tab>
      <van-tab title="已支付">
        <order-list type="paid"></order-list>
      </van-tab>
      <van-tab title="已取消">
        <order-list type="cancel"></order-list>
      </van-tab>
      <van-tab title="已完成">
        <order-list type="finish"></order-list>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import OrderList from './list'
export default {
  name: 'Order',
  components: { OrderList },
  data() {
    return {
      active: 0
    }
  },
  created() {
    this.height = window.screen.height - 155
  },
  methods: {
    onClickLeft() {
      this.$router.push('/about')
    }
  }
}
</script>
<style lang="scss" scoped>
.order{
  .container{

  }
}
</style>
