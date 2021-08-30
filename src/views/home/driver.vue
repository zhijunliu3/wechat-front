<template>
  <div class="driver">
    <div class="home">
      <div class="title">拼猪猪代驾返程</div>
    </div>
    <van-button type="info" class="scan-button" @click="scanQRCode">扫描上车</van-button>
  </div>
</template>

<script>
import { onCarOrder } from '@/api/order'
import { Toast } from 'vant'
export default {
  name: 'Driver',
  data() {
    return {
      height: 100
    }
  },
  created() {
    this.height = window.screen.height - 100
  },
  mounted() {
    this.$wxConfig.init()
  },
  methods: {
    scanQRCode() {
      this.$wxConfig.scanQRCode(res => {
        if (res.errMsg === 'scanQRCode:ok') {
          const { orderId, timeTableId } = JSON.parse(res.resultStr)
          this.onCarOrder(orderId, timeTableId)
        }
      })
    },
    onCarOrder(orderId, timeTableId) {
      onCarOrder({ orderId }).then(res => {
        Toast.success('上车成功')
        this.$router.push({ path: '/trip-detail', query: { timeTableId }})
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.driver{
  text-align: center;
  .home{
    position: relative;
    height: 200px;
    background: url(../../assets/img/home.jpg) center no-repeat;
    background-size: cover;
    margin-bottom: 0;
    text-align: left;
    .title{
      width: 90%;
      position: absolute;
      top: 60px;
      left: 20px;
      color: #fff;
      font-size: 24px;
    }
  }
  .scan-button{
    margin-top: 20px;
    width: 80%;
  }
}
</style>
