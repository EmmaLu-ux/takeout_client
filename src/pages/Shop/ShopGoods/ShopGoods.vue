<template>
  <div>
    <div class="goods">
      <!-- 左侧导航 -->
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
        <!-- current -->
          <li class="menu-item" @click="clickMenuItem(index)" :class="{current: currentIndex === index}" v-for="(good, index) in goods" :key="index">
            <span class="text bottom-border-1px">
              <img class="icon" :src="good.icon" v-if="good.icon"/>
                {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <!-- 右侧内容展示 -->
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul ref="foodsUl">
          <li class="food-list-hook" v-for="(good, index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food, index) in good.foods" :key="index" @click="showFood(food)">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon"/>
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                    <span class="now" v-else>￥{{food.price}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <!-- 购物车 -->
      <ShopCart />
    </div>
    <!-- 食品详情 -->
    <Food :food="food" ref="food"/>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import {mapState} from 'vuex'
import CartControl from '../../../components/CartControl/CartControl.vue'
import Food from '../../../components/Food/Food.vue'
import ShopCart from '../../../components/ShopCart/ShopCart.vue'
export default {
  name: "ShopGoods-Comp",
  data() {
    return {
      scrollY: 0, // 右侧Y轴滑动的坐标
      tops: [], // 包含右侧所有分类小列表的top 值
      food: {}, //需要显示的food
    }
  },
  // 使用axios请求mockjs提供的接口
  mounted() {
    this.$store.dispatch('getShopGoods', () => { //goods 更新了, 界面还没有更新
      this.$nextTick(() => {
        this._initScroll()
        this._initTops()
      })
    })
  },
  computed: {
    ...mapState(['goods']),
    //产生一个index
    currentIndex(){
      //1. 获取到条件数据
      const {scrollY, tops} = this
      //根据条件数据计算产生一个结果
      const index = tops.findIndex((top, index) => {
        return scrollY >= top && scrollY < tops[index + 1]
      })
      //返回这个结果
      return index
    }
  },
  methods: {
    // 初始化scrollY
    _initScroll(){
      new BScroll('.menu-wrapper', {
        click: true
      })
      this.foodsScroll = new BScroll('.foods-wrapper', {
        probeType: 2, //滑动的惯性不包括在内
        click: true
      })
      this.foodsScroll.on('scroll', ({x, y}) => {
        this.scrollY = Math.abs(y)
        console.log(x, this.scrollY)
      })
      this.foodsScroll.on('scrollEnd', ({x, y}) => {
        this.scrollY = Math.abs(y)
        console.log('scrollEnd',x, this.scrollY)
      })
    },
    //初始化tops
    _initTops(){
      //1. 初始化tops
      const tops = []
      let top = 0
      //2. 收集top
      tops.push(top)
      //得到每个分类的标签元素
      const lis = this.$refs.foodsUl.getElementsByClassName('food-list-hook')
      // console.log(Array.prototype.slice.call(lis))
      Array.prototype.slice.call(lis).forEach(li => {
        // console.log(li.clientHeight)
        top += li.clientHeight * 1 //得到每个标签元素所在的高度
        tops.push(top)
      })
      //更新数据
      this.tops = tops
      // console.log('tops', tops)
    },
    //使右侧列表滑动到对应的位置
    clickMenuItem(index){
      // console.log('index', index)
      const scrollY = this.tops[index]
      this.scrollY = scrollY
      this.foodsScroll.scrollTo(0, -scrollY, 300)
    },
    //显示点击的food
    showFood(food){
      //设置food
      this.food = food
      //显示food组件
      this.$refs.food.toggleShow()
    }
  },
  components: {
    CartControl, Food, ShopCart
  }
};
</script>

<style lang="stylus">
  @import "../../../common/stylus/mixins.styl"
    .goods
      display: flex
      position: absolute
      top: 195px
      bottom: 46px
      width: 100%
      background: #fff;
      overflow: hidden
      .menu-wrapper
        flex: 0 0 80px
        width: 80px
        background: #f3f5f7
        .menu-item
          display: table
          height: 54px
          width: 56px
          padding: 0 12px
          line-height: 14px
          &.current
            position: relative
            z-index: 10
            margin-top: -1px
            background: #fff
            color: $green
            font-weight: 700
            .text
              border-none()
          .icon
            display: inline-block
            vertical-align: top
            width: 12px
            height: 12px
            margin-right: 2px
            background-size: 12px 12px
            background-repeat: no-repeat
          .text
            display: table-cell
            width: 56px
            vertical-align: middle
            bottom-border-1px(rgba(7, 17, 27, 0.1))
            font-size: 12px
      .foods-wrapper
        flex: 1
        .title
          padding-left: 14px
          height: 26px
          line-height: 26px
          border-left: 2px solid #d9dde1
          font-size: 12px
          color: rgb(147, 153, 159)
          background: #f3f5f7
        .food-item
          display: flex
          margin: 18px
          padding-bottom: 18px
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          &:last-child
            border-none()
            margin-bottom: 0
          .icon
            flex: 0 0 57px
            margin-right: 10px
          .content
            flex: 1
            .name
              margin: 2px 0 8px 0
              height: 14px
              line-height: 14px
              font-size: 14px
              color: rgb(7, 17, 27)
            .desc, .extra
              line-height: 10px
              font-size: 10px
              color: rgb(147, 153, 159)
            .desc
              line-height: 12px
              margin-bottom: 8px
            .extra
              .count
                margin-right: 12px
            .price
              font-weight: 700
              line-height: 24px
              .now
                margin-right: 8px
                font-size: 14px
                color: rgb(240, 20, 20)
              .old
                text-decoration: line-through
                font-size: 10px
                color: rgb(147, 153, 159)
            .cartcontrol-wrapper
              position: absolute
              right: 0
              bottom: 12px
</style>
