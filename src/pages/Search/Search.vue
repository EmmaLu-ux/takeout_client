<template>
  <div>
    <section class="search">
      <HeaderTop title="搜索" />
      <form class="search_form" @submit.prevent="search">
        <input type="search" placeholder="请输入商家名称" class="search_input" v-model="keyWord">
        <input type="submit" class="search_submit">
      </form>
      <section class="list" v-if="searchShops.length">
        <ul class="list_container">
        <!-- :to="{path:'/shop', query:{id:item.id}}" -->
          <router-link :to="'/shop?id=' + item.id" tag="li" v-for="item in searchShops" :key="item.id" class="list_li">
            <section class="item_left">
              <img :src="imgBaseUrl + item.image_path" class="restaurant_img">
            </section>
            <section class="item_right">
              <div class="item_right_text">
              <p><span>{{item.name}}</span></p>
              <p>月售{{item.month_sales||item.recent_order_num}} 单</p>
              <p>{{item.delivery_fee||item.float_minimum_order_amount}}元起送/ 距离{{item.distance}}</p>
              </div>
            </section>
            </router-link>
        </ul>
      </section>
      <div class="search_none" v-if="emptyResult">很抱歉！无搜索结果</div>
    </section>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";
export default {
  name: "Search-Comp",
  components: {
    HeaderTop,
  },
  data() {
    return {
      keyWord: '',
      imgBaseUrl: 'http://cangdu.org:8001/img/',
      emptyResult: false
    }
  },
  methods: {
    search(){
      const keyWord = this.keyWord.trim()
      if(keyWord){
        this.emptyResult = false
        this.$store.dispatch('searchShops', keyWord)
      }
    }
  },
  computed: {
    ...mapState(['searchShops'])
  },
  watch: {
    searchShops(value){
      if(!value.length){
        this.emptyResult = true
      }else{
        this.emptyResult = false
      }
    }
  }
};
</script>

<style lang="stylus">
  @import "../../common/stylus/mixins.styl"
  .search
    width 100%
    height 100%
    overflow hidden
    .search_form
      clearFix()
      margin-top 45px
      background-color #fff
      padding 12px 8px
      input
        height 35px
        padding 0 4px
        border-radius 2px
        font-weight bold
        outline none
        &.search_input
          float left
          width 79%
          border 4px solid #f2f2f2
          font-size 14px
          color #333
          background-color #f2f2f2
        &.search_submit
          float right
          width 18%
          border 4px solid #02a774
          font-size 16px
          color #fff
          background-color #02a774

    .list
      .list_container
        background-color: #fff;
        .list_li
          display: flex;
          justify-content: center;
          padding: 10px
          border-bottom: 1px solid $bc;
          .item_left
            margin-right: 10px
            .restaurant_img
              width 50px
              height 50px
              display block
          .item_right
            font-size 12px
            flex 1
            .item_right_text
              p
                line-height 12px
                margin-bottom 6px
                &:last-child
                  margin-bottom 0
    .search_none
      margin: 0 auto
      color: #333
      background-color: #fff
      text-align: center
      margin-top: 0.125rem
</style>
