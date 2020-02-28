<template>
    <div id="incomeAndExpenditure" class="home-pad">
        <h2 class="firstTitleName">收入支出</h2>
        <ol>
            <li>
                <hr>
                <div class="content" @click="toScopedTransactions('day')">
                    <div class="left">
                        <div class="scope">今天</div>
                        <div class="dateScope">{{today}}</div>
                    </div>
                    <div class="right">
                        <div class="income">¥{{dayAmount.income}}</div>
                        <div class="expenditure">-¥{{dayAmount.expenditure}}</div>
                    </div>
                </div>
            </li>
            <li>
                <hr>
                <div class="content" @click="toScopedTransactions('week')">
                    <div class="left">
                        <div class="scope">本周</div>
                        <div class="dateScope">{{firstDayOfWeek + "-" + lastDayOfWeek}}</div>
                    </div>
                    <div class="right">
                        <div class="income">¥{{weekAmount.income}}</div>
                        <div class="expenditure">-¥{{weekAmount.expenditure}}</div>
                    </div>
                </div>
            </li>
            <li>
                <hr>
                <div class="content" @click="toScopedTransactions('month')">
                    <div class="left">
                        <div class="scope">本月</div>
                        <div class="dateScope">{{firstDayOfMonth + "-" + lastDayOfMonth}}</div>
                    </div>
                    <div class="right">
                        <div class="income">¥{{monthAmount.income}}</div>
                        <div class="expenditure">-¥{{monthAmount.expenditure}}</div>
                    </div>
                </div>
            </li>
            <li>
                <hr>
                <div class="content" @click="toScopedTransactions('year')">
                    <div class="left">
                        <div class="scope">本年</div>
                        <div class="dateScope">{{firstDayOfYear + "-" + lastDayOfYear}}</div>
                    </div>
                    <div class="right">
                        <div class="income">¥{{yearAmount.income}}</div>
                        <div class="expenditure">-¥{{yearAmount.expenditure}}</div>
                    </div>
                </div>
            </li>
        </ol>
    </div>
</template>

<script lang="ts">

    import {Component} from 'vue-property-decorator';
    import Vue from 'vue';
    import dateHelper from '@/lib/dateHelper';

    @Component
    export default class IncomeAndExpenditure extends Vue {
        today = dateHelper.today();
        firstDayOfWeek = dateHelper.firstDayOfWeek();
        lastDayOfWeek = dateHelper.lastDayOfWeek();
        firstDayOfMonth = dateHelper.firstDayOfMonth();
        lastDayOfMonth = dateHelper.lastDayOfMonth();
        firstDayOfYear = dateHelper.firstDayOfYear();
        lastDayOfYear = dateHelper.lastDayOfYear();

        get dayAmount() {
            return this.$store.getters.scopedTotalAmount('day');
        }

        get weekAmount() {
            return this.$store.getters.scopedTotalAmount('week');
        }

        get monthAmount() {
            return this.$store.getters.scopedTotalAmount('month');
        }

        get yearAmount() {
            return this.$store.getters.scopedTotalAmount('year');
        }

        toScopedTransactions(scope: string){
            this.$router.push({path: 'transactions', query: {scope: scope}});
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/assets/style/helper.scss";

    #incomeAndExpenditure {
        .content {
            display: flex;
            justify-content: space-between;

            .dateScope {
                font-size: 0.8rem;
                color: $color-nav-grey;
            }

            .right {
                text-align: right;
                font-size: 0.9rem;

                .income {
                    color: $color-green;
                }
            }
        }

    }

</style>