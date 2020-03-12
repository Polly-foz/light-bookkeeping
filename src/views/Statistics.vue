<template>
    <LayoutWithNav>
        <template v-slot:title>统计</template>
        <TimeScopeBar :timeScope.sync="timeScope"></TimeScopeBar>
<!--        <TypeOrCategoryBar :typeOrCategory.sync="typeOrCategory"></TypeOrCategoryBar>-->

        <div id="incomeChart" class="chart"></div>
        <div id="expenditureChart" class="chart"></div>

    </LayoutWithNav>
</template>

<script lang="ts">

    import {Component, Watch} from 'vue-property-decorator';
    import Vue from 'vue';
    import TimeScopeBar from '@/components/statistics/TimeScopeBar.vue';
    // import TypeOrCategoryBar from '@/components/statistics/TypeOrCategoryBar.vue';
    //@ts-ignore
    import echarts from 'echarts';

    @Component({
        components: {
            TimeScopeBar,
            // TypeOrCategoryBar
        }
    })
    export default class Statistics extends Vue {
        timeScope = 'day';
        // typeOrCategory = 'type';

        @Watch('timeScope')
        onTimeScopeChanged(val: string, oldVal: string) {
            this.renderBars();
        }

        // @Watch('typeOrCategory')
        // onTypeOrCategoryChanged(val: string, oldVal: string) {
        //     setTimeout(this.renderBars,0);
        // }

        get transactions() {
            const timeScope = this.timeScope === 'all' ? '' : this.timeScope;
            return this.$store.getters.scopedTransactions(timeScope);
        }

        get incomeCategories() {
            return this.$store.state.categories.income;
        }

        get incomeGroupedByCategories() {
            const map = new Map();
            const ret = [];
            let i = 0;
            for (const category of this.incomeCategories) {
                map.set(category, i);
                ret.push(0);
                i++;
            }
            for (const transaction of this.transactions) {
                // const trans = (transaction as unknown as Transaction);
                if (transaction.type !== 'income') {
                    continue;
                }
                ret[map.get(transaction.category)] += transaction.money;
            }
            return ret;
        }

        get expenditureCategories() {
            return this.$store.state.categories.expenditure;
        }

        get expenditureGroupedByCategories() {
            const map = new Map();
            const ret = [];
            let i = 0;
            for (const category of this.expenditureCategories) {
                map.set(category, i);
                ret.push(0);
                i++;
            }
            for (const transaction of this.transactions) {
                // const trans = (transaction as unknown as Transaction);
                if (transaction.type !== 'expenditure') {
                    continue;
                }
                ret[map.get(transaction.category)] += transaction.money;
            }
            return ret;
        }

        get amountByCategories(){
            const map = new Map();
            for (const category of this.expenditureCategories) {
                map.set(category, [{value:0,name:'收入'},{value:0,name:'支出'}]);
            }
            for (const transaction of this.transactions) {
                const index = transaction.type === 'income'?0:1;
                map.get(transaction.category)[index].value += transaction.money;
            }
            return map;
        }


        renderBars() {
            const myChart = echarts.init(document.getElementById('incomeChart'));

            // 指定图表的配置项和数据
            const option = {
                title: {
                    text: '收入'
                },
                color:["#bbded6"],
                tooltip: {},
                xAxis: {
                    data: this.incomeCategories
                },
                yAxis: {},
                series: [{
                    name: '收入',
                    type: 'bar',
                    data: this.incomeGroupedByCategories
                }]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);

            const expenditureChart = echarts.init(document.getElementById('expenditureChart'));

            // 指定图表的配置项和数据
            const expenditureOption = {
                title: {
                    text: '支出'
                },
                color:["#ffb6b9"],
                tooltip: {},
                xAxis: {
                    data: this.expenditureCategories
                },
                yAxis: {},
                series: [{
                    name: '支出',
                    type: 'bar',
                    data: this.expenditureGroupedByCategories
                }]
            };

            // 使用刚指定的配置项和数据显示图表。
            expenditureChart.setOption(expenditureOption);
        }

        beforeCreate() {
            this.$store.commit('fetchTransactions');
            this.$store.commit('fetchCategories');
        }

        mounted() {
            this.renderBars();
        }
    }
</script>

<style lang="scss" scoped>

    .chart {
        /*border: 1px solid blue;*/
        width: 100vw;
        height: 50vh;
    }
</style>