<template>
    <div class="cart-list">
        <scroll class="content" ref="scroll">
           <cart-list-item v-for="(item,index) in cartList" :item-info="item"  :key="index"></cart-list-item>
        </scroll>
    </div>
</template>

<script>
    import Scroll from "components/common/scroll/Scroll"
    import CartListItem from "./cartListItem"

    export default {
        name: "cartList",
        components:{
            Scroll,
            CartListItem
        },
        computed:{
            cartList(){
                return this.$store.state.cartList
            }
        },
        activated(){
            this.$refs.scroll.refresh()
        }

    }
</script>

<style scoped>

    .cart-list{
        height: calc(100% - 44px - 49px - 40px);
    }

    .content {
        height: 100%;
        overflow: hidden;
    }
</style>