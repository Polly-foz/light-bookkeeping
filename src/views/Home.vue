<template>
    <LayoutWithNav>
        <template v-slot:title>主页</template>
        <template v-slot:icons>
            <Icon name="search" class="icon"/>
        </template>
        <div>{{$store.getters.transactionsGroupedByDate}}</div>
<!--        <div>{{$store.getters.totalIncome}}</div>-->
<!--        <div>{{$store.getters.totalExpenditure}}</div>-->
<!--        <div>{{$store.getters.totalBalance}}</div>-->
<!--        <div>{{$store.getters.dayTransactions}}</div>-->
<!--        <div>{{$store.state.categories.income}}</div>-->
<!--        <div>{{$store.state.categories.expenditure}}</div>-->
<!--        <div>{{$store.state.transactions}}</div>-->
<!--        <button @click="test">+1</button>-->

        <button v-on:click="isShow = true">
            <Icon name="add" class="addTransaction"/>
        </button>
        <Calculator :is-show.sync="isShow" v-on:onOkClick="onOkClick"></Calculator>
    </LayoutWithNav>
</template>

<script lang="ts">
    import Calculator from '@/components/Calculator.vue';
    import {Component} from 'vue-property-decorator';
    import Vue from 'vue';

    @Component({
        components: {Calculator}
    })
    export default class Home extends Vue {
        isShow = false;

        onOkClick(money: string) {
            console.log(money);
            this.$router.push({path: 'addTransaction', query: {money: money}});
        }

        test() {
            this.$store.commit('fetchCategories');
            const transaction = {
                id: 1,
                type: "expenditure",
                money: 900,
                category: "生活用品",
                // note: "test"
            }
            this.$store.commit('editTransaction',transaction)
            // this.$store.commit('deleteTransaction',2)
        }
        beforeCreate(){
            this.$store.commit('fetchTransactions')
            this.$store.commit('fetchCategories')
        }

    }
</script>

<style lang="scss" scoped>
    @import "~@/assets/style/helper.scss";

    .addTransaction {
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