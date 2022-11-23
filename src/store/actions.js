/* 通过mutations间接更新state的多个方法的对象 */

import { RECEIVE_ADDRESS, RECEIVE_CATEGORYS, RECEIVE_SHOPS, RECEIVE_USER_INFO, RESET_USER_INFO, RECEIVE_GOODS, RECEIVE_INFO, RECEIVE_RATINGS, INCREMENT_FOOD_COUNT, DECREMENT_FOOD_COUNT, CLEAR_CART, RECEIVE_SEARCH_SHOPS } from './mutation-types'

import { reqAddress, reqFoodCategorys, reqLogout, reqShops, reqUserInfo, reqShopGoods, reqShopInfo, reqShopRatings, reqSearchShop } from '../api/index'

export default {
    //异步获取地址
    async getAddress({commit, state}){
        //发送异步ajax请求
        const geohash = state.latitude + ',' + state.longitude
        const result = await reqAddress(geohash)
        console.log(result)
        //提交一个mutation
        if(result.code === 0){
           const address = result.data
           commit(RECEIVE_ADDRESS, address)
        }
    },
    //异步获取食品分类数组
    async getCategorys({commit}){
        //发送异步ajax请求
        // const geohash = state.latitude + ',' + state.longitude
        const result = await reqFoodCategorys()
        console.log(result)
        //提交一个mutation
        if(result.code === 0){
           const categorys = result.data
           commit(RECEIVE_CATEGORYS, categorys)
        }
    },
    //获取商铺列表
    async getShops({commit, state}){
        //发送异步ajax请求
        const {longitude, latitude} = state
        const result = await reqShops(longitude, latitude)
        console.log(result)
        //提交一个mutation
        if(result.code === 0){
           const shops = result.data
           commit(RECEIVE_SHOPS, shops)
        }
    },
    //同步记录用户信息
    recordUser({commit}, userInfo){
        console.log('actions', userInfo)
        commit(RECEIVE_USER_INFO, userInfo)
    },
    //获取用户信息
    async getUserInfo({commit}){
        const result = await reqUserInfo()
        if(result.code === 0){
            const userInfo = result.data
            commit(RECEIVE_USER_INFO, userInfo)
        }
    },
    //异步登出
    async logout({commit}){
        const result = await reqLogout()
        if(result.code === 0){
            commit(RESET_USER_INFO)
        }
    },
    //获取商家的商品
    async getShopGoods({commit}, callback){
        const result = await reqShopGoods()
        if(result.code === 0){
            commit(RECEIVE_GOODS, result.data)
            callback && callback()
        }
    },
    //获取商品的评价
    async getShopRatings({commit}, callback){
        const result = await reqShopRatings()
        if(result.code === 0){
            commit(RECEIVE_RATINGS, result.data)
            callback && callback()
        }
    },
    //获取商家的基本信息
    async getShopInfo({commit}){
        const result = await reqShopInfo()
        if(result.code === 0){
            commit(RECEIVE_INFO, result.data)
        }
    },

    //同步更新食品数量
    updateFoodCount({commit}, {isAdd, food}){
        if(isAdd){
            // console.log('food in actions', food)
            commit(INCREMENT_FOOD_COUNT, food)
            console.log('action, add')
        }else{
            commit(DECREMENT_FOOD_COUNT, food)
        }
    },
    //清空购物车
    clearCart({commit}){
        commit(CLEAR_CART)
    },
    //获取搜索得到的商家列表
    async searchShops({commit, state}, keyWord){
        const geohash = state.latitude + ',' + state.longitude
        const result = await reqSearchShop(geohash, keyWord)
        if(result.code === 0){
            commit(RECEIVE_SEARCH_SHOPS, result.data)
        }
    },
}



