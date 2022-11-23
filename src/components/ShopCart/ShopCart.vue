<template>
  <div>
    <div class="shopcart">
      <!-- 购物车底部的总计 -->
      <div class="content">
        <div class="content-left" @click="toggleShow">
          <div class="logo-wrapper">
            <div class="logo" :class="{highlight: totalCount}">
              <i class="iconfont icon-icon-shopping_trolley" :class="{highlight: totalCount}"></i>
            </div>
            <div class="num" v-if="totalCount">{{totalCount}}</div>
          </div>
          <div class="price" :class="{highlight: totalCount}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{info.deliveryPrice}}元</div>
        </div>
        <div class="content-right">
          <div class="pay" :class="payClass">{{payText}}</div>
        </div>
      </div>
      <!-- 购物车列表 -->
      <transition name="move">
        <div class="shopcart-list" v-show="listShow">
            <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="clearCart">清空</span>
            </div>
            <div class="list-content">
            <ul>
                <li class="food" v-for="(food, index) in cartFoods" :key="index">
                <span class="name">{{food.name}}</span>
                <div class="price"><span>￥{{food.price}}</span></div>
                <div class="cartcontrol-wrapper">
                    <CartControl :food="food"/>
                </div>
                </li>
            </ul>
            </div>
        </div>
      </transition>
    </div>
    <div class="list-mask" v-show="listShow" @click="toggleShow"></div>
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
import BScroll from 'better-scroll'
import { MessageBox } from 'mint-ui'
import CartControl from '../CartControl/CartControl.vue'
export default {
  name: "ShopCart-Comp",
  data() {
    return {
        isShow: false
    }
  },
  components: {
    CartControl
  },
  computed: {
    ...mapState(['cartFoods', 'info']),
    ...mapGetters(['totalCount', 'totalPrice']),
    payClass(){
        const {totalPrice} = this
        const {minPrice} = this.info
        return totalPrice >= minPrice ? 'enough' : 'not-enough'
    },
    payText(){
        const {totalPrice} = this
        const {minPrice} = this.info
        if(totalPrice === 0){
            return `¥${minPrice}元起送`
        }else if(totalPrice < minPrice){
            return `还差${minPrice - totalPrice}元起送`
        }else{
            return `去结算`
        }
    },
    //购物车列表是否显示
    listShow: {
        get(){
            if(this.totalCount === 0){ //如果购物车为空，则不显示购物车列表
                return false
            }
            return this.isShow
        },
        set(){
            if(this.isShow){
                this.$nextTick(() => {
                    //在界面更新后创建BScroll(只能创建一个)
                    if(!this.scroll){ //第一次打开
                        this.scroll = new BScroll('.list-content', {
                            click: true
                        })
                    }else{ //后面再次打开
                    //通知scroll对象更新一下， 不然可能需要滑动两次才能生效华东的那个效果
                        this.scroll.refresh()
                    }
                })
            }
        }
    }
    // listShow(){
    //     if(this.totalCount===0) {
    //         // 将isShow 改为false
    //         this.isShow = false
    //         return false
    //     }
    //     if(this.isShow) { // 变为打开
    //         this.$nextTick(() => {
    //             // 在界面更新后创建BScroll(只能创建一个)
    //             /*
    //                 单例:
    //                 1. 在创建前, 判断是否存在,只有不存在, 才去创建
    //                 2. 创建后, 保存它
    //             */
    //             if(!this.scroll) { // 第一次打开
    //                 this.scroll = new BScroll('#listContent', {
    //                 click: true
    //                 })
    //             } else {// 后面打开
    //                 // 通知scroll 对象
    //                 this.scroll.refresh()
    //             }
    //         })
    //     }
    //         // 只需要看isShow
    //         return this.isShow
    // }
  },
  methods: {
    toggleShow(){
        //只有在总数量>0的时候才切换显示
        if(this.totalCount > 0){
            this.isShow = !this.isShow //通过 this.isShow 的修改，控制计算属性 lisShow，从而控制购物车列表的显隐
        }
        this.listShow = false // 主要目的创建 better-scroll 实例或者 refresh
    },
    clearCart(){
        MessageBox.confirm('确定清空购物车吗?').then(action => {
            this.$store.dispatch('clearCart')
            console.log('action-clearcart', action)
        }, action => {
            console.log('action-clearCart-cancel', action)
        })
    }
  },
};
</script>

<style lang="stylus">
    @import "../../common/stylus/mixins.styl"
    .shopcart
        position fixed
        left 0
        bottom 0
        z-index 50
        width 100%
        height 48px
        .content
            display flex
            background #141d27
            font-size 0
            color rgba(255, 255, 255, 0.4)
            .content-left
                flex 1
                .logo-wrapper
                    display inline-block
                    vertical-align top
                    position relative
                    top -10px
                    margin 0 12px
                    padding 6px
                    width 56px
                    height 56px
                    box-sizing border-box
                    border-radius 50%
                    background #141d27
                    .logo
                        width 100%
                        height 100%
                        border-radius 50%
                        text-align center
                        background #2b343c
                        &.highlight
                            background $green
                        .icon-icon-shopping_trolley
                            line-height 44px
                            font-size 24px
                            color #80858a
                            &.highlight
                                color #fff
                    .num
                        position absolute
                        top 0
                        right 0
                        width 24px
                        height 16px
                        line-height 16px
                        text-align center
                        border-radius 16px
                        font-size 9px
                        font-weight 700
                        color #ffffff
                        background rgb(240, 20, 20)
                        box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.4)
                .price
                    display inline-block
                    vertical-align top
                    margin-top 5px
                    line-height 24px
                    padding-right 12px
                    box-sizing border-box
                    font-size 16px
                    font-weight 700
                    color #fff
                    &.highlight
                        color #fff
                .desc
                    display inline-block
                    vertical-align bottom
                    margin-bottom 15px
                    margin-left -45px
                    font-size 10px
            .content-right
                flex 0 0 105px
                width 105px
                .pay
                    height 48px
                    line-height 48px
                    text-align center
                    font-size 12px
                    font-weight 700
                    color #fff
                    &.not-enough
                        background #2b333b
                    &.enough
                        background #00b43c
                        color #fff
        .ball-container
            .ball
                position fixed
                left 32px
                bottom 22px
                z-index 200
                transition all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
                .inner
                    width 16px
                    height 16px
                    border-radius 50%
                    background $green
                    transition all 0.4s linear
        .shopcart-list
            position absolute
            left 0
            top 0
            z-index -1
            width 100%
            transform translateY(-100%)
            &.move-enter-active, &.move-leave-active
                transition transform .2s
            &.move-enter, &.move-leave-to
                transform translateY(0)
            .list-header
                height 40px
                line-height 40px
                padding 0 18px
                background #f3f5f7
                border-bottom 1px solid rgba(7, 17, 27, 0.1)
                .title
                    float left
                    font-size 14px
                    color rgb(7, 17, 27)
                .empty
                    float right
                    font-size 12px
                    color rgb(0, 160, 220)
            .list-content
                padding 0 18px
                max-height 217px
                overflow hidden
                background #fff
                .food
                    position relative
                    padding 12px 0
                    box-sizing border-box
                    bottom-border-1px(rgba(7, 17, 27, 0.1))
                    .name
                        line-height 24px
                        font-size 14px
                        color rgb(7, 17, 27)
                    .price
                        position absolute
                        right 90px
                        bottom 12px
                        line-height 24px
                        font-size 14px
                        font-weight 700
                        color rgb(240, 20, 20)
                    .cartcontrol-wrapper
                        position absolute
                        right 0
                        bottom 6px
    .list-mask
        position fixed
        top 0
        left 0
        width 100%
        height 100%
        z-index 40
        opacity 1
        background rgba(7, 17, 27, 0.5)
        &.fade-enter-active, &.fade-leave-active
            transition all 0.5s
        &.fade-enter, &.fade-leave-to
            opacity 0
            background rgba(7, 17, 27, 0)
</style>
