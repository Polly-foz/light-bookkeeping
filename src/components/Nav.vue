<template>
    <nav>
        <router-link to="/home" class="item" active-class="selected">
            <Icon name="home" class="icon"/>
            主页
        </router-link>
        <router-link to="/statistics" class="item" active-class="selected">
            <Icon name="statistics" class="icon"/>
            统计
        </router-link>
    </nav>
</template>

<script>
    export default {
        name: "Nav"
    }
</script>

<style lang="scss" scoped>
    @import "~@/assets/style/helper.scss";
    nav{
        display: flex;
        box-shadow: 0 0 0 1px rgba(0,0,0,0.2);
        justify-content: space-around;
        padding-top: 0.8rem;
        padding-bottom: 0.8rem;
        background-color: white;
        > .item{
            display: flex;
            flex-direction: column;
            align-items: center;
            font-size: 0.8rem;
            color: $color-nav-grey;
            line-height: 1;
            > .icon{
                font-size: 1.3rem;
                margin-bottom: 0.1rem;
            }
        }
        > .item.selected{
            color: $color-green;
        }
    }
</style>