<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="center">购物街</div>
        </nav-bar>
        <tab-control :titles="['流行','精选','新款']" @itemClick="tabClick" ref="tabControl1"
                     class="tab-control" v-show="isTabFixed"></tab-control>

        <scroll class="content" ref="scroll"
                :probe-type="3"
                @scroll="contentScroll"
                :pull-up-load="true"
                @pullUpLoad="loadMore">
            <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
            <recommend-view :recommends="recommend"></recommend-view>
            <feature-view></feature-view>
            <tab-control :titles="['流行','精选','新款']" @itemClick="tabClick" ref="tabControl2"></tab-control>
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
    import {debounce} from "common/utils";
    import {itemImgLIstenerMixin} from "../../common/mixin";

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
        mixins:[itemImgLIstenerMixin],
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
                isShowBackTop:false,
                isTabFixed:false,
                tabOffsetTop:0,
                saveY:0,

            }
        },
        created() {
            this.getMultidata();
            this.getHomeGoods('pop');
            this.getHomeGoods('new');
            this.getHomeGoods('sell');

        },

        mounted(){
/*            let newRefresh = debounce(this.$refs.scroll.refresh,50);
            this.itemImgListener = ()=>{
                newRefresh()
            }
            this.$bus.$on("itemImageLoad",this.itemImgListener)*/
        },

        activated(){
            this.$refs.scroll.scrollTo(0,this.saveY,0)
            this.$refs.scroll.refresh()
        },

        deactivated(){
            this.saveY = this.$refs.scroll.getScrollY()

            //2.取消全局事件的监听
            this.$bus.$off('itemImageLoad',this.itemImgListener)
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

                this.$refs.tabControl1.currentIndex = index
                this.$refs.tabControl2.currentIndex = index
            },

            backClick(){
                this.$refs.scroll.scrollTo(0,0,500)
            },

            contentScroll(position){
                this.isShowBackTop = - position.y > 1000
                this.isTabFixed = - position.y > this.tabOffsetTop
            },

            loadMore(){
                this.getHomeGoods(this.currentType)
            },

            swiperImageLoad(){
                this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
            }
        }
    }
</script>

<style scoped>
    .home-nav {
        background-color: var(--color-tint);
        color: #fff;
/*        position: fixed;
        left: 0;
        right: 0;
        top: 0;*/
        /*z-index: 9;*/
    }

    .tab-control {
        position: relative;
        z-index: 9;
    }

    #home {
        /*padding-top: 44px;*/
        height: 100vh;
        position: relative;
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
