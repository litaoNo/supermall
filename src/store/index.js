import Vue from "vue";
import Vuex from "vuex"


//1.安装插件
Vue.use(Vuex)


//创建stroe对象
const store = new Vuex.Store({
    state:{
        cartList:[]
    },

    mutations:{

        addCounter(state,payload){
            payload.count++
        },

        addToCart(state,payload){
            payload.checked = true
            state.cartList.push(payload)
        }
    },

    actions:{
        addCart(context,payload){
            return new Promise((resolve,reject) => {
                //payload新添加的商品
                let oldProduct = null;
                for (let item of context.state.cartList){
                    if (item.iid === payload.iid){
                        oldProduct = item
                    }
                }

                //2.判断oldProduct
                if(oldProduct) {
                    /*oldProduct.count += 1*/
                    context.commit('addCounter',oldProduct)
                    resolve("当前商品数量+1")
                }else {
                    payload.count = 1
                    /*state.cartList.push(payload)*/
                    context.commit('addToCart',payload)
                    resolve("添加了新的商品")
                }
            })
        }
    }
})


//3.挂载vue实例
export default store