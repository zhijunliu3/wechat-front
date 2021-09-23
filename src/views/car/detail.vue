<template>
  <div class="trip-detail">
    <van-nav-bar
      title="行程详情"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="container" :style="{height: height + 'px'}">
      <div class="info">
        <p>路线名称：<span class="value">{{detail.lineName}}</span></p>
        <p>车牌号码：<span class="value">{{detail.licensePlate}}</span></p>
        <p>开始时间：<span class="value">{{detail.startTime}}</span></p>
      </div>
      <h3>乘客信息</h3>
      <div class="member-info" v-for="(item, index) in detail.tripMemberList" :key="index">
        <p class="top">
          <span>{{item.fromSite}} - {{item.toSite}}</span>
          <span class="status danger">{{item.orderState}}</span>
        </p>
        <van-row>
          <van-col span="12">
            <p class="bottom">
              <span>名称：</span>
              <span>{{item.clientName}}</span>
            </p>
            <p class="bottom">
              <span>电话：</span>
              <span>{{item.contactNumber}}</span>
            </p>
          </van-col>
          <van-col span="12" class="upload-button" v-if="item.orderState === '已支付'">
            <van-button color="#1989fa" round type="primary" size="small" @click="clickUpload(item)">上传图片</van-button>
          </van-col>
        </van-row>
      </div>
      <van-empty v-if="!detail.tripMemberList||detail.tripMemberList.length === 0" description="暂无乘客" />
      <div class="member">
        <van-button v-if="isShowButton" size="small" type="info" class="scan-button" @click="scanQRCode">扫描上车</van-button>
      </div>
      <h3>站点信息</h3>
      <div class="info">
        <van-row>
          <van-col :span="8">
            <van-steps :active="-1" inactive-color="#07c160" direction="vertical">
              <van-step v-for="(item, index) in detail.siteList" :key="index">{{item.siteName}}</van-step>
            </van-steps>
          </van-col>
          <van-col :span="16">
            <van-form @submit="onSubmit">
              <van-field
                readonly
                clickable
                name="picker"
                :value="startSite"
                label="出发地"
                placeholder="选择出发地"
                :rules="[{ required: true, message: '请选择出发地' }]"
                @click="clickSite('start')"
              />
              <van-field
                readonly
                clickable
                name="picker"
                :value="endSite"
                label="到达地"
                placeholder="选择到达地"
                :rules="[{ required: true, message: '请选择到达地' }]"
                @click="clickSite('end')"
              />
              <div style="margin: 16px;">
                <van-button size="small" block type="info" native-type="submit">点击生成下单二维码</van-button>
              </div>
            </van-form>
            <vue-qr v-if="isShowQr" ref="Qrcode" :text="text" qid="qrId"></vue-qr>
          </van-col>
        </van-row>
        <!-- <p v-for="(item, index) in detail.siteList" :key="index">站点{{index+1}}<span class="value">{{item.siteName}}</span></p> -->
      </div>
      <!-- <div class="info member">

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
      </div> -->
      <!-- <van-uploader v-model="fileList" :before-read="beforeRead" @delete="deleteImage" :max-count="1" :preview-image="true" /> -->
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :title="title"
          :columns="columns"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </van-popup>

      <van-popup
        v-model="show"
        closeable
        position="bottom"
        :style="{ height: '30%' }"
      >
        <div style="padding: 20px 10px">
          <div class="title">说明原因</div>
          <van-uploader v-model="fileList" :before-read="beforeRead" @delete="deleteImage" :max-count="1" :preview-image="true" />
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
import { tripDetail } from '@/api/car'
import { onCarOrder, deleteImage } from '@/api/order'
import { Toast } from 'vant'
import { init, scanQRCode, isIOS } from '@/utils/wx'
import request from '@/utils/request'
import { baseUrl } from '@/config'
import ImageCompressor from 'image-compressor.js'
export default {
  name: 'TripDetail',
  data() {
    return {
      timeTableId: '',
      detail: {},
      isShowButton: false,
      startSite: '',
      endSite: '',
      columns: [],
      showPicker: false,
      title: '开始站点',
      flag: '',
      isShowQr: false,
      text: '',
      baseUrl: baseUrl,
      fileList: [],
      show: false,
      order: '',
      height: '100'
    }
  },
  created() {
    this.timeTableId = this.$route.query.timeTableId
    this.height = window.screen.height - 265 + 102 + 54 - 20
    this.tripDetail()
  },
  mounted() {
    if (!isIOS()) {
      init()
    }
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
      scanQRCode(res => {
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
    },
    clickSite(flag) {
      this.flag = flag
      this.isShowQr = false
      if (flag === 'start') {
        this.columns = this.detail.siteList.map(item => item.siteName)
        this.columns.pop()
        this.title = '出发地'
        this.endSite = ''
      } else if (flag === 'end') {
        if (!this.startSite) {
          Toast.fail('请先选择到达地')
          return
        }
        const indexOf = this.detail.siteList.map(item => item.siteName).indexOf(this.startSite)
        this.columns = this.detail.siteList.filter((item, index) => {
          if (index > indexOf) {
            return item
          }
        }).map(item => item.siteName)
        this.title = '到达地'
      }
      this.showPicker = true
    },
    onSubmit() {
      this.text = JSON.stringify({ startSiteName: escape(this.startSite), endSiteName: escape(this.endSite), timeTableId: this.detail.timeTableId })
      console.log(this.text)
      this.isShowQr = true
    },
    onConfirm(value) {
      this[this.flag + 'Site'] = value
      this.showPicker = false
    },
    clickUpload(item) {
      this.fileList = item.imageIdList.map(element => {
        return {
          url: baseUrl + '/bu/image/getBuImage?id=' + element,
          message: element,
          isImage: true
        }
      })
      this.order = item
      this.show = true
    },
    beforeRead(file) {
      console.log(file)
      console.log(file.size)
      if (file.size > 1048576) {
        console.log('压缩图片')
        new ImageCompressor(file, {
          quality: 0.4,
          checkOrientation: false,
          maxWidth: 1024,
          maxHeight: 1024,
          success: (result) => {
            this.uploadImage(result)
            console.log(this.order.orderId)
          },
          error: (e) => {
            console.log(e.message)
          }
        })
      } else {
        this.uploadImage(file)
      }
      return
    },
    deleteImage(file) {
      deleteImage(file.message)
    },
    uploadImage(file) {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('imageType', 'order')
      formData.append('bizNo', this.order.orderId)
      formData.append('imageDesc', '订单')
      request({
        url: '/bu/image/add',
        method: 'post',
        data: formData
      }).then(res => {
        this.fileList.push({ url: baseUrl + '/bu/image/getBuImage?id=' + res.data, message: res.data, isImage: true })
        this.tripDetail()
      }).catch(err => {
        console.log(err)
        this.fileList = []
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.trip-detail{
  .container{
    overflow: auto;
    h3{
      margin: 5px 0;
    }
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
    .member-info{
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
      .upload-button{
        text-align: right;
        margin-top: 10px;
      }

    }
  }
  .title{
    font-size: 18px;
    text-align: center;
  }
}
</style>
