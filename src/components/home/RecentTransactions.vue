<template>
    <div id="recentTransactions" class="home-pad" v-if="show">
        <h2 class="firstTitleName">{{title}}</h2>
        <ol>
            <li v-for="(transaction,index) in transactions" :key="index" @click="onTransactionClicked(transaction.id)">
                <hr>
                <div class="content">
                    <div class="firstLine">
                        <div class="category">{{transaction.category}}</div>
                        <div :class={money:true,isIncome:isIncome(transaction.type)}><span
                                v-if="transaction.type === 'expenditure'">-</span>¥{{transaction.money}}
                        </div>
                    </div>
                    <div class="secondLine">
                        <div class="note">{{transaction.note||transaction.type}}</div>
                        <div class="time">{{beautifyTime(transaction.date)}}</div>
                    </div>
                </div>
            </li>
        </ol>
        <hr>
        <router-link to="/transactions">
            <div class="allTransactions">所有交易</div>
        </router-link>
    </div>
</template>

<script lang="ts">

    import {Component} from 'vue-property-decorator';
    import Vue from 'vue';
    import dayjs from 'dayjs';
    import dateHelper from '@/lib/dateHelper';

    @Component
    export default class RecentTransactions extends Vue {

        get date() {
            const x = this.$store.getters.dateArray().sort();
            if (!x || x.length === 0) {
                return null;
            } else {
                return x[x.length - 1];
            }
        }

        get show() {
            if (this.date) {
                return true;
            }
            return false;
        }

        get title() {
            const now = dayjs();
            if (now.isSame(this.date, 'day')) {
                return '今日交易';
            } else if (now.subtract(1, 'day').isSame(this.date, 'day')) {
                return '昨日交易';
            } else if (now.subtract(2, 'day').isSame(this.date, 'day')) {
                return '前日交易';
            } else if (now.isSame(this.date, 'year')) {
                return '今年交易';
            }
            return '最近交易';
        }

        get transactions() {
            return this.$store.state.transactions.transactions.filter((transaction: Transaction) => {
                return dayjs(transaction.date).isSame(dayjs(this.date), 'day');
            }).reverse();
        }

        beautifyTime(date: string) {
            switch (this.title) {
                case '今日交易':
                case '昨日交易':
                case '前日交易':
                    return dateHelper.time(date);
                default:
                    return dateHelper.chineseDate(date);
            }
        }

        isIncome(str: string) {
            return str === 'income';
        }

        onTransactionClicked(id: number) {
            this.$router.push({path: 'transaction', query: {id: id.toString()}});
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/assets/style/helper.scss";

    #recentTransactions {
        .content {
            display: flex;
            flex-direction: column;

            .firstLine {
                display: flex;
                justify-content: space-between;
            }

            .secondLine {
                display: flex;
                justify-content: space-between;
                font-size: 0.8rem;
                color: $color-nav-grey;
            }
        }

        .allTransactions {
            margin-top: 0.5rem;
            color: $color-green;
            font-size: 0.9rem;
        }

        .money.isIncome {
            color: $color-green;
        }
    }

</style>