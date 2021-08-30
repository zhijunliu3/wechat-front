<template>
  <div class="trip">
    <van-nav-bar
    title="我的行程"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
    />
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh" :style="{height: height + 'px'}">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="item" v-for="(item, index) in list" :key="index" @click="clickTripDetail(item)">
          <p>线路名称：{{item.lineName}}<span class="float-right">车牌号：{{item.licensePlate}}</span></p>
          <p>开始时间：{{item.startTime}}</p>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getMyTrip } from '@/api/car'
export default {
  name: 'Trip',
  data() {
    return {
      height: 100,
      list: [],
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  created() {
    this.height = window.screen.height - 111
    // this.getMyTrip()
  },
  methods: {
    onLoad() {
      if (this.refreshing) {
        this.list = []
        this.refreshing = false
      }
      this.getMyTrip()
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.onLoad()
    },
    onClickLeft() {
      this.$router.push('/about')
    },
    getMyTrip() {
      getMyTrip().then(res => {
        res.data.forEach(element => {
          this.list.push(element)
        })
        this.loading = false
        if (!res.data.haveNextPage) {
          this.finished = true
        }
      })
    },
    clickTripDetail(item) {
      this.$router.push({ path: '/trip-detail', query: { timeTableId: item.timeTableId }})
    }
  }
}
</script>

<style lang="scss" scoped>
.trip{
  .item{
      margin-top: 5px;
      background-color: #fff;
      padding: 5px 10px;
      p{
        margin: 0;
        line-height: 20px;
        &:first-child{
          text-align: left;
          // border-bottom: 1px solid #cccccd;
        }
      }
      .float-right{
        float: right;
      }
    }

}
</style>
