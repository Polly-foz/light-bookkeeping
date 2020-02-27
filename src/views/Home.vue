<template>
    <LayoutWithNav>
        <template v-slot:title>主页</template>
        <template v-slot:icons><Icon name="search" class="icon"/></template>

        <div>{{$store.state.categories.income}}</div>
        <div>{{$store.state.categories.expenditure}}</div>
        <div>{{$store.state.transactions.cnt}}</div>
        <button @click="test">+1</button>

        <button v-on:click="isShow = true"><Icon name="addTransaction" class="addTransaction"/></button>
        <Calculator :is-show.sync="isShow" v-on:onOkClick="onOkClick"></Calculator>
    </LayoutWithNav>
</template>

<script>
    import Calculator from "@/components/Calculator";


    export default {
        name: "Home",
        data(){
            return{
                isShow:false,
            }
        },
        components: {Calculator},
        methods: {
            onOkClick(money){
                console.log(money)
                this.$router.push({path:'addTransaction', query: {money:money}})
            },
            test(){
                this.$store.commit("fetchCategories")
                // this.$store.commit("increment")
            }

        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/assets/style/helper.scss";

    .addTransaction{
        color: $color-green;
        font-size: 3rem;
        position: absolute;
        bottom: 12vh;
        right: 8vw;
        background-color: white;
        /*width: 3rem;*/
        /*height: 3rem;*/
        border-radius: 50%;
        box-shadow: 0 2px 2px 2px $color-background-grey;
    }
</style>