/* 包含多个基于state的getter计算属性的对象 */

export default {
    totalCount(state){
        return state.cartFoods.reduce((preTotal, food) => preTotal + food.count, 0)
    },
    totalPrice(state){
        return state.cartFoods.reduce((preTotal, food) => preTotal + food.price * food.count , 0)
    },
    positiveSize(state){
        console.log(state.ratings)
        return state.ratings.reduce((preTotal, rating) => {
            return preTotal + ((rating.rateType * 1) === 0 ? 1 : 0)
        }, 0)
    },
}