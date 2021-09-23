<template>
  <div>
    <van-nav-bar
    title="隐私协议"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
    />
    <div :style="{height: height + 'px'}">
      <p>隐私协议</p>
      <p>感谢您对拼拼猪的支持！</p>
      <p>感谢您使用拼拼猪代驾返程软件！</p>
      <p>感谢您使用拼拼猪作为返程的选择！</p>
    </div>

  </div>
</template>

<script>
export default {
  name: 'PrivateProtocol',
  data() {
    return {
      height: 100
    }
  },
  created() {
    this.height = window.screen.height - 265 + 102 + 54
  },
  methods: {
    onClickLeft() {
      this.$router.push('/register')
    }
  }
}
</script>
