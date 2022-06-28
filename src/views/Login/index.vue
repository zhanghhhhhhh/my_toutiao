<template>
  <div>
    <van-nav-bar title="登录">
      <van-icon name="cross" slot="left" />
    </van-nav-bar>
    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="[
          { required: true, message: '请输入手机号' },
          { pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/, message: '手机格式不对' },
        ]"
        ><MyIcon name='shouji' slot="left-icon"></MyIcon>
      </van-field>
      <van-field
        v-model="code"
        type="number"
        name="code"
        placeholder="请输入验证码"
        :rules="[
          { required: true, message: '请填写验证码' },
          { pattern: /^\d{6}$/, message: '验证码长度必须6位' },
        ]"
        ><MyIcon name='yanzhengma' slot="left-icon"></MyIcon>
        <template #button>
          <van-count-down
            v-if="isCountDownShow"
            :time="time"
            format=" ss s"
            @finish="isCountDownShow = false"
          />
          <van-button
            v-else
            size="small"
            class="yzm"
            native-type="button"
            @click="onSendSms"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button round block native-type="submit" class="login-btn"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { getSmsCode, login } from '@/api/user'
export default {
  created () { },
  data () {
    return {
      mobile: '13911111111', // 手机号
      code: '246810', // 短信验证码
      time: 5 * 1000,
      isCountDownShow: false

    }
  },
  methods: {
    async onSubmit (values) {
      console.log(values)
      try {
        const res = await login(values)
        console.log(res)
        this.$store.commit('setUser', res.data.data)
      } catch (err) {
        console.log(err)
      }
    },
    async onSendSms () {
      try {
        await this.$refs.form.validate('mobile')

        console.log('校验成功')
        this.isCountDownShow = true
        try {
          await getSmsCode(this.mobile)
          console.log('发送成功')
        } catch (err) {
          console.log(err)
          console.log('发送失败，请重试')
        }
      } catch (err) {
        console.log(err)
        console.log('校验失败')
        this.$toast.fail('手机号格式不对')
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped  lang = 'less'>
.toutiao {
  font-size: 37px;
}
.yzm {
  position: fixed;
  right: 10px;
  width: 152px;
  height: 46px;
  background-color: #ededed;
  border-radius: 23px;
  font-size: 22px;
  .van-button__text {
    zoom: 0.95;
  }
}
.login-btn {
  width: 694px;
  height: 88px;
  background-color: #6db4fb;
  border-radius: 10px;
  color: #fff;
}
.van-count-down {
  position: fixed;
  right: 19px;
}
</style>
