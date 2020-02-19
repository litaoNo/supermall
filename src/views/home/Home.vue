<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="center">购物街</div>
        </nav-bar>

        <scroll class="content" ref="scroll"
                :probe-type="3"
                @scroll="contentScroll"
                :pull-up-load="true"
                @pullUpLoad="loadMore">
            <home-swiper :banners="banners"></home-swiper>
            <recommend-view :recommends="recommend"></recommend-view>
            <feature-view></feature-view>
            <tab-control class="tab-control" :titles="['流行','精选','新款']" @itemClick="tabClick"></tab-control>
            <goods-list :goods="goods[currentType].list"></goods-list>
        </scroll>
        <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>

    </div>
</template>

<script>
    import NavBar from "components/common/navbar/NavBar"
    import HomeSwiper from "./childComps/HomeSwiper"
    import RecommendView from "./childComps/RecommendView"
    import FeatureView from "./childComps/FeatureView"
    import TabControl from "components/content/tabControl/TabControl"
    import GoodsList from "components/content/goods/GoodsList"
    import Scroll from "components/common/scroll/Scroll"
    import BackTop from "components/content/backTop/BackTop"

    import {getMultidata,getHomeGoods} from "network/home"

    export default {
        name: "Home",
        components: {
            NavBar,
            HomeSwiper,
            RecommendView,
            FeatureView,
            TabControl,
            GoodsList,
            Scroll,
            BackTop
        },
        data() {
            return {
                banners: null,
                recommend: null,
                goods: {
                    'pop': {page: 0, list: []},
                    'new': {page: 0, list: []},
                    'sell': {page: 0, list: []}
                },
                currentType: 'pop',
                isShowBackTop:false
            }
        },
        created() {
            this.getMultidata();
            this.getHomeGoods('pop');
            this.getHomeGoods('new');
            this.getHomeGoods('sell');

        },
        methods: {
            getMultidata() {
                getMultidata().then(res => {
                    this.banners = res.data.data.banner.list
                    //console.log(res)
                    this.recommend = res.data.data.recommend.list
                }).catch(err => {
                    console.log(err)
                })
            },

            getHomeGoods(type){
                const page = this.goods[type].page + 1;
                getHomeGoods(type,page).then( res => {
                    this.goods[type].list.push(...res.data.data.list)
                    this.goods[type].list.page += 1;

                    this.$refs.scroll.finishPullUp()
                })
            },

            tabClick(index) {
                switch (index) {
                    case 0:
                        this.currentType = 'pop'
                        break
                    case 1:
                        this.currentType = 'new'
                        break
                    case 2:
                        this.currentType = 'sell'
                        break
                }
            },

            backClick(){
                this.$refs.scroll.scrollTo(0,0,500)
            },

            contentScroll(position){
                this.isShowBackTop = - position.y > 1000
            },

            loadMore(){
                this.getHomeGoods(this.currentType)
            }
        }
    }
</script>

<style scoped>
    .home-nav {
        background-color: var(--color-tint);
        color: #fff;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 9;
    }

    #home {
        padding-top: 44px;
    }

    .tab-control {
        position: sticky;
        top: 44px;
        z-index: 9;
    }

    .content {
        position: absolute;
        left: 0;
        right: 0;
        top:44px;
        bottom: 49px;
        overflow: hidden;
    }
</style>
