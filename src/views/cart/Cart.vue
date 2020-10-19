<template>
    <div class="cart">
        <nav-bar>
            <div slot="center">购物车1({{cartLength}})</div>
        </nav-bar>
        <!--商品的列表-->
        <cart-list></cart-list>
        <!--底部汇总-->
        <cart-bottom-bar></cart-bottom-bar>
    </div>
</template>

<script>
    import NavBar from "components/common/navbar/NavBar"
    import CartList from "./childComps/cartList"
    import CartBottomBar from "./childComps/cartBottomBar"


    export default {
        name: "Cart",
        components:{
            NavBar,
            CartList,
            CartBottomBar

        },
        computed:{
            cartLength(){
                return this.$store.state.cartList.length
            },

        },



    }
</script>

<style scoped>
    .nav-bar{
        background-color: var(--color-tint);
        color: #ffffff;
    }

    .cart{
        height: 100vh;

    }
</style>
