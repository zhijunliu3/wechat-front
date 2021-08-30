<template>
  <div class="order-list">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh" :style="{height: height + 'px'}">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div class="info" @click="viewDetail(item)" v-for="(item, index) in list" :key="index">
            <p class="top">
              <span>{{item.fromSite}} - {{item.toSite}}</span>
              <span class="status danger">{{orderStatus[type]}}</span>
            </p>
            <div>
              <p class="bottom">
                <span>出发时间：</span>
                <span>{{item.startTime}}</span>
              </p>
              <p class="bottom">
                <span>座位号：</span>
                <span>{{item.seatNo}}</span>
              </p>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
  </div>
</template>

<script>
import { waitPayOrderList, paidOrderList, finishOrderList, cancelOrderList } from '@/api/order'
export default {
  name: 'OrderList',
  props: {
    type: {
      type: String,
      default: 'waitPay'
    }
  },
  data() {
    return {
      height: 100,
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      params: {
        pageNo: 1,
        pageSize: 10
      },
      orderStatus: {
        waitPay: '待支付',
        paid: '已支付',
        cancel: '已取消',
        finish: '已完成'
      }
    }
  },
  created() {
    this.height = window.screen.height - 155
  },
  methods: {
    onLoad() {
      if (this.refreshing) {
        this.list = []
        this.refreshing = false
      }
      this[`${this.type}OrderList`]()
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.onLoad()
    },
    viewDetail(item) {
      this.$router.push({ path: '/order-detail', query: { orderId: item.orderId }})
    },
    waitPayOrderList() {
      waitPayOrderList(this.params).then(res => {
        this.handleResult(res)
      })
    },
    paidOrderList() {
      paidOrderList(this.params).then(res => {
        this.handleResult(res)
      })
    },
    finishOrderList() {
      finishOrderList(this.params).then(res => {
        this.handleResult(res)
      })
    },
    cancelOrderList() {
      cancelOrderList(this.params).then(res => {
        this.handleResult(res)
      })
    },
    handleResult(res) {
      res.data.data.forEach(element => {
        this.list.push(element)
      })
      this.loading = false
      if (!res.data.haveNextPage) {
        this.finished = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.order-list{
  padding: 10px;
    overflow: auto;
    .info{
      padding: 10px 15px;
      background-color: #fff;
      border-radius: 5px;
      &:not(:first-child){
        margin-top: 5px;
      }
      p{
        margin: 0;
      }
      .top{
        height: 30px;
        line-height: 30px;
        font-size: 16px;
        border-bottom: 1px solid #dddddf;
        .status{
          float: right;
        }
      }
      .bottom{
        height: 20px;
        line-height: 20px;
        font-size: 12px;
        color: #aaaaab;
        &:first-child{
          margin-top: 5px;
        }
      }
    }
}
</style>
