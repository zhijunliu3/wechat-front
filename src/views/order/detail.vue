<template>
  <div class="order-detail">
    <van-nav-bar
    title="订单详情"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
    />
    <div class="container">
      <div class="info">
        订单状态：<span class="danger">{{detail.orderState}}</span>
      </div>
      <div class="schedule-info">
        <van-row class="line-info">
          <van-col span="7" class="address">
            <p class="time">{{getSiteTime(detail.startTime)}}</p>
            <span>{{detail.fromSite}}</span>
          </van-col>
          <van-col span="10" class="car-info">
            <p class="top">{{detail.model}}</p>
            <p class="right-arrow">
              <i class="iconfont icon-arrow right-arrow"></i>
            </p>
            <p class="bottom">{{detail.licensePlate}}</p>
          </van-col>
          <van-col span="7" class="address">
            <p class="time">{{getSiteTime(detail.endTime)}}</p>
            <span>{{detail.toSite}}</span>
          </van-col>
        </van-row>
        <van-row class="seat-info">
          <!-- <span>乘车时间：2021-06-06 20:45:00</span> -->
          <span>座位号：{{detail.seatNo}}</span>
        </van-row>
      </div>
      <div class="info">
        <p>乘车人：<span class="value">{{detail.clientName}}</span></p>
        <p>联系电话：<span class="value">{{detail.contactNumber}}</span></p>
      </div>
      <div class="info">
        <p>司机名称：<span class="value">{{detail.driverName}}</span></p>
        <p>司机电话：<span class="value">{{detail.driverMobile}}</span></p>
        <p>应付款：<span class="value">￥{{detail.cost}}</span></p>
        <p>订单编号：<span class="value">{{detail.orderId}}</span></p>
      </div>
      <div class="info qr-code" v-if="detail.orderState === '已支付'">
        <p class="danger">注：请将此二维码给司机扫描，即可上车</p>
        <vue-qr v-if="isShowQr" ref="Qrcode" :text="text" qid="qrId"></vue-qr>
      </div>

      <div class="info" v-if="detail.orderState === '待支付'">
        <van-row class="button">
          <van-col span="12"><van-button  type="default" @click="cancelOrder">取消订单</van-button></van-col>
          <van-col span="12"><van-button  type="info" @click="payOrder">确定支付</van-button></van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>
<script>
import { cancelOrder, payOrder, orderDetail, wechatPay } from '@/api/order'
import { parseTime } from '@/utils'
import { Toast } from 'vant'
import { init, chooseWXPay, isIOS } from '@/utils/wx'
export default {
  name: 'OrderDetail',
  data() {
    return {
      detail: {},
      text: '',
      isShowQr: false
    }
  },
  created() {
    this.orderId = this.$route.query.orderId
    if (this.orderId) {
      this.orderDetail(this.orderId)
    }
  },
  mounted() {
    if (!isIOS()) {
      init()
    }
  },
  methods: {
    onClickLeft() {
      this.$router.push('/order')
    },
    cancelOrder() {
      cancelOrder({ orderId: this.detail.orderId }).then(res => {
        Toast.success('取消成功')
        this.orderDetail(this.orderId)
      })
    },
    payOrder() {
      wechatPay(this.detail.orderId).then(res => {
        chooseWXPay(res.data, () => {
          payOrder({ orderId: this.detail.orderId }).then(res => {
            Toast.success('支付成功')
            this.orderDetail(this.orderId)
          })
        })
      })
    },
    orderDetail(orderId) {
      orderDetail(orderId).then(res => {
        this.detail = res.data
        this.text = JSON.stringify({ orderId: this.orderId, timeTableId: this.detail.timeTableId })
        this.isShowQr = true
      })
    },
    getSiteTime(date) {
      return parseTime(date, '{h}:{i}')
    }
  }
}
</script>
<style lang="scss">
.order-detail{
  .van-button--normal{
    padding: 0 30px;
  }
}
</style>

<style lang="scss" scoped>
.order-detail{
  .container{
    padding: 10px;
    p{
      margin: 0;
    }
    .schedule-info{
      background-color: #fff;
      padding: 15px;
      margin-top: 5px;
      border-radius: 5px;
      .line-info{
        border-bottom: 1px solid #dddddf;
        padding-bottom: 5px;
        .address{
          text-align: center;
          .time{
            font-size: 20px;
            font-weight: 600;
            line-height: 30px;
            height: 30px;
          }
        }
        .car-info{
          position: relative;
          text-align: center;
          display: flex;
          justify-self: center;
          .top{
            top: 6px;
            width: 100%;
            position: absolute;
            font-size: 10px;
          }
          .bottom{
            width: 100%;
            top: 32px;
            position: absolute;
            font-size: 10px;
          }
          .right-arrow{
            width: 50%;
            left: 50%;
            transform: translateX(-60%);
            position: absolute;
            i{
              font-size: 50px;
            }
          }
        }
      }
      .seat-info{
        margin-top: 5px;
        span{
          &:last-child{
            float: right;
          }
        }
      }
    }
    .info{
      background-color: #fff;
      padding: 15px;
      margin-top: 10px;
      border-radius: 5px;
      font-size: 14px;
      color: #aaaaab;
      line-height: 24px;
      .value{
        float: right;
        color: #333;
      }
      .button{
        text-align: center;
      }
    }
    .qr-code{
      text-align: center;
    }
  }

}
</style>
