/* 通过mutations间接更新state的多个方法的对象 */

import { RECEIVE_ADDRESS, RECEIVE_CATEGORYS, RECEIVE_SHOPS } from './mutation-types'

import { reqAddress, reqFoodCategorys, reqShops } from '../api/index'

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
    }
}



