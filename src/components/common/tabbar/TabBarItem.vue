<template>
  <div id="tab-bar-item" @click="itemClick">
    <div class="item-icon" v-show="!isActive"><slot name="item-icon"></slot></div>
    <div class="item-active-icon" v-show="isActive"><slot name="item-icon-active"></slot></div>
    <div class="item-text" :style="activeStyle"><slot name="item-text"></slot></div>
  </div>

</template>

<script>
    export default {
        name: "TabBarItem",
      props:{
        path:String,
        activeColor:{
          default:"red",
          type:String
        }
      },
      data(){
          return {
            /*isActive:true,*/
          }
      },
      computed:{
        isActive() {
          return this.$route.path.indexOf(this.path) !== -1
        },
        activeStyle() {
          return this.isActive ? {color:this.activeColor}:{}
        }
      },

      methods:{
        itemClick(){
          this.$router.replace(this.path)
        }
      }
    }
</script>

<style scoped>
/*  #tab-bar-item {
    flex: 1;
  }

  .item-icon img, .item-active-icon img {
    width: 24px;
    height: 24px;
    margin-top: 5px;
    vertical-align: middle;
  }

  .item-text {
    font-size: 12px;
    margin-top: 3px;
    color: #333;
  }*/


#tab-bar-item {
  flex: 1;
}

.item-icon img, .item-active-icon img {
  width: 24px;
  height: 24px;
  margin-top: 5px;
  vertical-align: middle;
}

.item-text {
  font-size: 12px;
  margin-top: 3px;
  color: #333;
}
</style>
