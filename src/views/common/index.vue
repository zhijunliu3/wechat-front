<template>
  <div v-if="!openId" class="common" :style="{height: height + 'px'}">
    <van-row>
      <van-col span="24" class="button">
        <van-button type="info" @click="jump(1)">我是乘客</van-button>
      </van-col>
      <van-col span="24" class="button">
        <van-button type="info" @click="jump(2)">我是司机</van-button>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import { login } from '@/api/user.js'
import { oauth2Url, APPID } from '@/config'
export default {
  name: 'Common',
  data() {
    return {
      wxUrl: 'https://open.weixin.qq.com/connect/oauth2/authorize',
      openId: this.$route.query.openId
    }
  },
  created() {
    this.height = window.screen.height - 100
    if (this.$route.query.openId) {
      this.$store.dispatch(`user/userType`, this.$route.query.userType)
      this.login(this.$route.query)
    }
  },
  methods: {
    login(data) {
      login(data).then(res => {
        if (res.errorCode !== '0') {
          if (this.$route.query.userType === '1') {
            this.$router.push({ path: '/register', query: this.$route.query })
          } else if (this.$route.query.userType === '2') {
            this.$router.push({ path: '/bind', query: this.$route.query })
          }
        } else {
          this.$store.dispatch('user/setInfo', res.data).then(res => {
            this.$router.push({ path: '/home' })
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    jump(type) {
      const url = `${this.wxUrl}?appid=${APPID}&redirect_uri=${encodeURI(oauth2Url + '?type=' + type)}&response_type=code&scope=snsapi_base#wechat_redirect`
      window.location = url
    }
  }
}
</script>

<style lang="scss" scoped>
.common{
  display: flex;
  justify-content: center;
  align-items: center;
  .button{
    text-align: center;
    &:not(:first-child){
      margin-top: 50px;
    }
  }
}
</style>
