<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">饿了么</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on: loginWay}" @click="loginWay=true">短信登录</a>
          <a href="javascript:;" :class="{on: !loginWay}" @click="loginWay=false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="login">
        <!-- 短信登录 -->
          <div :class="{on: loginWay}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone"/>
              <button :disabled="!rightPhone" class="get_verification" :class="{right_phone: rightPhone}" @click.prevent="getCode">
                {{computedTime > 0 ? computedTime + 's' : '获取验证码'}}
              </button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code"/>
            </section>
            <section class="login_hint">
              温馨提示：未注册饿了么外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <!-- 密码登录 -->
          <div :class="{on: !loginWay}">
            <section>
              <section class="login_message">
                <input
                  type="text"
                  maxlength="11"
                  placeholder="手机/邮箱/用户名"
                  v-model="name"
                />
              </section>
              <section class="login_verification">
                <input type="text" maxlength="8" placeholder="密码" v-if="showPwd" v-model="pwd"/>
                <input type="password" maxlength="8" placeholder="密码" v-else v-model="pwd"/>
                <div class="switch_button" :class="showPwd ? 'on' : 'false'" @click="showPwd = !showPwd">
                  <div class="switch_circle" :class="{right: showPwd}"></div>
                  <span class="switch_text">{{showPwd ? 'abc' : ''}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha"/>
                <img
                  class="get_verification"
                  src="http://localhost:4000/captcha"
                  alt="captcha"
                  @click="getCaptcha"
                  ref="captcha"
                />
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou"></i>
      </a>
    </div>
    <AlertTip :alertText="alertText" v-show="alertShow" @closeTip="closeTip"/>
  </section>
</template>

<script>
import AlertTip from '../../components/AlertTip/AlertTip.vue'
import {reqPwdLogin, reqSmsLogin, reqSendCode} from '../../api'
export default {
  name: "Login-Comp",
  data() {
    return {
      loginWay: true, //true代表短信登录，false代表密码登录
      phone: '', //手机号
      computedTime: 0 ,// 获取验证码的倒计时
      showPwd: false, //是否显示密码,true表示显示密码，false表示不显示密码
      pwd: '', //密码
      code: '', // 手机验证码
      name: '', //用户名
      captcha: '', // 图形验证码
      alertText: '', //提交表单后的表单验证的提示信息
      alertShow: false, //是否显示提示框
    }
  },
  components: {
    AlertTip
  },
  computed: {
    rightPhone(){
      return /^1\d{10}$/.test(this.phone)
    }
  },
  methods: {
    //异步获取短信验证码
    async getCode(){
      //进行倒计时
      if(!this.computedTime){
        this.computedTime = 60
        const intervalId = setInterval(() => {
          this.computedTime--
          if(this.computedTime <= 0){
            clearInterval(intervalId)
          }
        }, 1000)
      }
      //发送获取验证码的请求
      const result = await reqSendCode(this.phone)
      if(result.code === 1){ //手机验证码请求失败
        //显示提示
        this.showAlert(result.msg)
        //停止倒计时
        if(this.computedTime){
          this.computedTime = 0
          clearInterval(this.intervalId)
        }
      }
    },
    //显示提示框与其中的文本
    showAlert(alertText){
      this.alertShow = true
      this.alertText = alertText
    },
    //关闭提示框
    closeTip(){
      this.alertShow = false
    },
    //异步登录
    async login(){
      //前台表单验证
      let result
      if(this.loginWay){ //短信登录
        const {rightPhone, phone, code} = this
        if(!rightPhone){
          //手机号不正确
          this.showAlert('手机号码不正确')
          return 
        }else if(!/^\d{6}$/.test(code)){
          //手机验证码不正确
          this.showAlert('短信验证码不正确')
          return 
        }
        //发送异步请求
        result = await reqSmsLogin(phone, code)
      }else{ //密码登录
        const {name, pwd, captcha} = this
        if(!name){
          this.showAlert('请输入手机号/邮箱/用户名')
          return 
        }else if(!pwd){
          this.showAlert('请输入密码')
          return 
        }else if(!captcha){
          this.showAlert('请输入验证码')
          return 
        }
        //发送异步请求
        result = await reqPwdLogin({name, pwd, captcha})
      }
      if(!this.computedTime){
        this.computedTime = 60
        const intervalId = setInterval(() => {
          this.computedTime--
          if(this.computedTime <= 0){
            clearInterval(intervalId)
          }
        }, 1000)
      }
      //根据结果数据做出相应的处理
      if(result.code === 0){
        const user = result.data
        console.log('@', user)
        //将user保存到vuex中的state中（userInfo）
        this.$store.dispatch('recordUser', user)
        //跳转到个人中心页面
        this.$router.replace('/profile')
      }else{
        this.getCaptcha()
        this.showAlert(result.msg)
      }
    },
    //获取一个新的图片验证码
    getCaptcha(){
      //每次指定的src不一样
      this.$refs.captcha.src = "http://localhost:4000/captcha?time=" + Date.now()
    }
  },
};
</script>

<style lang="stylus">
    .loginContainer
      width 100%
      height 100%
      background #fff
      .loginInner
        padding-top 60px
        width 80%
        margin 0 auto
        .login_header
          .login_logo
            font-size 40px
            font-weight bold
            color #02a774
            text-align center
          .login_header_title
            padding-top 40px
            text-align center
            >a
              color #333
              font-size 14px
              padding-bottom 4px
              &:first-child
                margin-right 40px
              &.on
                color #02a774
                font-weight 700
                border-bottom 2px solid #02a774
        .login_content
          >form
            >div
              display none
              &.on
                display block
              input
                width 100%
                height 100%
                padding-left 10px
                box-sizing border-box
                border 1px solid #ddd
                border-radius 4px
                outline 0
                font 400 14px Arial
                &:focus
                  border 1px solid #02a774
              .login_message
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .get_verification
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  border 0
                  color #ccc
                  font-size 14px
                  background transparent
                  &.right_phone
                    color black
              .login_verification
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .switch_button
                  font-size 12px
                  border 1px solid #ddd
                  border-radius 8px
                  transition background-color .3s,border-color .3s
                  padding 0 6px
                  width 30px
                  height 16px
                  line-height 16px
                  color #fff
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  &.off
                    background #fff
                    .switch_text
                      float right
                      color #ddd
                  &.on
                    background #02a774
                  >.switch_circle
                    //transform translateX(27px)
                    position absolute
                    top -1px
                    left -1px
                    width 16px
                    height 16px
                    border 1px solid #ddd
                    border-radius 50%
                    background #fff
                    box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                    transition transform .3s
                    &.right
                      transform translateX(30px)
              .login_hint
                margin-top 12px
                color #999
                font-size 14px
                line-height 20px
                >a
                  color #02a774
            .login_submit
              display block
              width 100%
              height 42px
              margin-top 30px
              border-radius 4px
              background #4cd96f
              color #fff
              text-align center
              font-size 16px
              line-height 42px
              border 0
          .about_us
            display block
            font-size 12px
            margin-top 20px
            text-align center
            color #999
        .go_back
          position absolute
          top 5px
          left 5px
          width 30px
          height 30px
          >.iconfont
            font-size 20px
            color #999
</style>
