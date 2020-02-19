<template>
    <div class="tab-control">
        <div class="tab-control-item"
             :class="{active: currentIndex === index}"
             @click="itemClick(index)"
             v-for="(item, index) in titles">
            <span>{{item}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TabControl",
        data(){
          return {
              currentIndex:0
          }
        },
        props:{
            titles:{
                type:Array,
                default(){
                    return []
                }
            }
        },
        methods:{
            itemClick(index){
                this.currentIndex = index;
                this.$emit('itemClick', index)
            }
        }
    }
</script>

<style scoped>
    .tab-control {
        display: flex;
        text-align: center;
        font-size: 15px;
        height: 40px;
        line-height: 40px;
        margin-bottom: 10px;
        background-color: #fff;
    }

    .tab-control-item {
        flex: 1;
    }

    .tab-control-item span {
        padding: 5px;
    }

    .active {
        color: var(--color-tint);

    }

    .active span {
        border-bottom: 2px solid var(--color-tint);
    }

</style>