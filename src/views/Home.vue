<template>
    <LayoutWithNav class="home">
        <template v-slot:title>主页</template>
        <template v-slot:icons>
            <div @click="showInitConfirmDialog=true">
                <Icon name="init" class="icon"/>
            </div>
        </template>
        <div class="main">
            <RecentTransactions/>
            <IncomeAndExpenditure/>
        </div>

        <button v-on:click="showCalculator = true">
            <Icon name="add" class="addTransaction"/>
        </button>

        <InitConfirmDialog :isShow.sync="showInitConfirmDialog" v-on:initConfirm="onInitConfirm"/>
        <Calculator :is-show.sync="showCalculator" v-on:onCalculatorOkClicked="onCalculatorOkClicked"></Calculator>
    </LayoutWithNav>
</template>

<script lang="ts">
    import Calculator from '@/components/Calculator.vue';
    import {Component} from 'vue-property-decorator';
    import Vue from 'vue';
    import RecentTransactions from '@/components/home/RecentTransactions.vue';
    import IncomeAndExpenditure from '@/components/home/IncomeAndExpenditure.vue';
    import InitConfirmDialog from '@/components/home/InitConfirmDialog.vue';

    @Component({
        components: {InitConfirmDialog, IncomeAndExpenditure, Calculator,RecentTransactions}
    })
    export default class Home extends Vue {
        showCalculator = false;
        showInitConfirmDialog = false;

        onInitConfirm(){
            this.$store.commit('initTransactions')
            this.$store.commit('initCategories')
        }

        onCalculatorOkClicked(money: number) {
            this.$router.push({path: 'addTransaction', query: {money: money.toString()}});
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

    .home{
        background-color: $color-background-grey;
        position: relative;
        .main{
            overflow: auto;
            .home-pad{
                /*color:blue;*/
                margin:1rem;
                padding: 1rem;
                text-align: left;
                box-shadow: 0 0 0 1px rgba(238,238,238,0.2);
                background-color: white;
            }
        }
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
        ::v-deep hr{
            background-color:$color-background-grey;
            height: 1px;
            border:none;
            margin: 0.5rem {
                left: 0;
                right: 0;
            };
        }
        ::v-deep .firstTitleName{
            margin-bottom: 0.5rem;
        }
    }
</style>