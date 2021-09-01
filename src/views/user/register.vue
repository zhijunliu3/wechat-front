<template>
  <div class="register">
    <van-nav-bar
      title="用户注册"
    />
    <van-form ref="form" @submit="onSubmit">
      <van-field
        v-model="username"
        name="userName"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="mobile"
        label="手机号"
        name="mobile"
        placeholder="手机号"
        :rules="[{ pattern, message: '请输入正确的手机号' }]"
      />
      <van-row>
        <van-col span="16">
          <van-field
            v-model="verificationCode"
            name="verificationCode"
            label="验证码"
            placeholder="验证码"
            :rules="[{ required: true, message: '请填写验证码' }]"
          >
          </van-field>
        </van-col>
        <van-col span="8">
          <van-button class="verification-button" @click="sendVerifycode" :disabled="disabledCodeBtn" size="small" type="default" native-type="button">
            {{codeText}}
          </van-button>
        </van-col>
      </van-row>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
      <a style="float: right; margin-right: 16px;" @click="bind">已有用户，需要绑定用户请点击</a>
    </van-form>
  </div>
</template>
<script>
import { register, sendVerificationCode } from '@/api/user.js'
import { Toast } from 'vant'
export default {
  name: 'Register',
  data() {
    return {
      username: '',
      mobile: '',
      verificationCode: '',
      pattern: /^1[0-9]{10}$/,
      codeText: '发送验证码',
      disabledCodeBtn: false,
      openId: '',
      userType: ''
    }
  },
  created() {
    this.openId = this.$route.query.openId
    this.userType = this.$route.query.userType
  },
  methods: {
    onSubmit(values) {
      const request = {
        ...values,
        openId: this.openId,
        userType: this.userType
      }
      register(request).then(res => {
        this.$router.push({ path: '/common', query: this.$route.query })
      }).catch(err => {
        console.log(err)
      })
    },
    sendVerifycode() {
      this.$refs.form.validate('mobile').then(() => {
        this.countDown(120)
        console.log(this.mobile)
        sendVerificationCode(this.mobile, this.$route.query.userType).then(res => {
          Toast.success('发送成功')
        }).catch(err => {
          console.log(err)
        })
      })
    },
    countDown(time) {
      if (time === 0) {
        this.disabledCodeBtn = false
        this.codeText = '获取验证码'
        return
      } else {
        this.disabledCodeBtn = true
        this.codeText = '重新发送(' + time + ')'
        time--
      }
      setTimeout(() => {
        this.countDown(time)
      }, 1000)
    },
    bind() {
      this.$router.push({ path: '/bind', query: this.$route.query })
    }
  }
}
</script>

<style lang="scss" scoped>
.register{
  background-color: #fff;
  .verification-button{
    margin-top: 5px;
    margin-left: 10px;
  }
}
</style>
