<template>
    <LayoutWithBackAndTitle>
        <template v-slot:title>{{title}}</template>
        <template v-slot:icons>
            <div @click="showDeleteConfirmDialog=true"><Icon name="delete"/></div>
        </template>
        <div>
            <div class="groupTitle">
                <div class="date">共计{{transactions.length}}笔交易</div>
            </div>
            <ol class="groupContent">
                <li class="totalAmount">
                    <div class="left">总支出</div>
                    <div class="money">
                        <span v-if="totalAmount.expenditure > 0">-</span>¥{{totalAmount.expenditure}}
                    </div>
                </li>
                <li class="totalAmount">
                    <div class="left">总收入</div>
                    <div class="money income">
                        <span v-if="totalAmount.income < 0">-</span>¥{{totalAmount.income}}
                    </div>
                </li>
                <li class="totalAmount">
                    <div class="left">结余</div>
                    <div :class={money:true,income:notLessThanZero(totalAmount.balance)}>
                        <span v-if="totalAmount.balance < 0">-</span>¥{{totalAmount.balance >= 0 ? totalAmount.balance :
                        -totalAmount.balance}}
                    </div>
                </li>
            </ol>
        </div>
        <ol>
            <li v-for="(date,index) in dateArray" :key="index">
                <div class="groupTitle">
                    <div class="date">{{beautify(date)}}</div>
                    <div class="sum">{{sum(transactionsTable[date])}}</div>
                </div>
                <ol class="groupContent">
                    <li class="transaction" v-for="transaction in transactionsTable[date].reverse()"
                        :key="transaction.id" @click="onTransactionClicked(transaction.id)">
                        <div class="left">
                            <div class="category">
                                {{transaction.category}}
                            </div>
                            <div class="note">
                                {{transaction.note||{income:'收入',expenditure:'支出'}[transaction.type]}}
                            </div>
                        </div>
                        <div :class={money:true,income:isIncome(transaction.type)}>
                            <span v-if="transaction.type==='expenditure'">-</span>¥{{formatFloat(transaction.money,2)}}
                        </div>
                    </li>
                </ol>
            </li>
        </ol>
        <DeleteConfirmDialog :title="title" :isShow.sync="showDeleteConfirmDialog" v-on:deleteAllTransactions="deleteAllTransactions"/>
    </LayoutWithBackAndTitle>
</template>

<script lang="ts">
    import {Component, Prop} from 'vue-property-decorator';
    import Vue from 'vue';
    import {getQueryString} from '@/lib/urlHelper';
    import dateHelper from '@/lib/dateHelper';
    import {formatFloat} from '@/lib/stringHelper';
    import DeleteConfirmDialog from '@/components/transactions/DeleteConfirmDialog.vue';
    @Component({
        components: {DeleteConfirmDialog}
    })
    export default class Transactions extends Vue {
        scope = getQueryString('scope');

        showDeleteConfirmDialog = false;

        get title() {
            switch (this.scope) {
                case 'day':
                    return '今天交易';
                case 'week':
                    return '本周交易';
                case 'month':
                    return '本月交易';
                case 'year':
                    return '本年交易';
                default:
                    return '所有交易';
            }
        }

        get transactions(){
            return this.$store.getters.scopedTransactions(this.scope)
        }

        get transactionsTable() {
            return this.$store.getters.scopedTransactionsGroupedByDate(this.scope);
        }

        get dateArray() {
            return this.$store.getters.dateArray(this.scope);
        }

        get totalAmount() {
            return this.$store.getters.scopedTotalAmount(this.scope);
        }

        deleteAllTransactions(){
            this.$store.commit('deleteTransactionsByTransactions',this.transactions)
        }

        onTransactionClicked(id: number){
            this.$router.push({path: 'transaction', query: {id: id.toString()}});
        }

        notLessThanZero(num: number) {
            return num >= 0;
        }

        beautify(date: string) {
            return dateHelper.beautify(date);
        }

        isIncome(type: string) {
            return type === 'income' ? true : false;
        }

        sum(transactions: Transaction[]) {
            let res = 0;
            transactions.forEach((transaction) => {
                if (transaction.type === '支出') {
                    res -= Number(transaction.money);
                } else {
                    res += Number(transaction.money);
                }
            });
            if (res >= 0) {
                return '¥' + formatFloat(res, 2);
            } else {
                return '-¥' + formatFloat(-res, 2);
            }
        }

        formatFloat(value: number, n: number) {
            return formatFloat(value, n);
        }

        beforeCreate() {
            this.$store.commit('fetchTransactions');
            this.$store.commit('fetchCategories');
        }


    }
</script>


<style lang="scss" scoped>
    @import "~@/assets/style/helper.scss";

    .groupTitle {
        /*border:1px solid blue;*/
        text-align: left;
        display: flex;
        justify-content: space-between;
        padding: 0.3rem 1rem;
        color: $color-nav-grey;
    }

    .groupContent .totalAmount {
        padding: 1rem;
    }

    .groupContent > li {
        /*border:1px solid red;*/
        display: flex;
        justify-content: space-between;
        padding: 0.5rem 1rem;
        background-color: white;
        border-bottom: 1px solid $color-background-grey;
    }

    .transaction .left {
        display: flex;
        flex-direction: column;
        text-align: left;

        .note {
            font-size: 0.8rem;
            color: $color-nav-grey;
        }
    }

    .money {
        /*border: 1px solid purple;*/
        margin: auto 0;
    }

    .money.income {
        color: $color-green;
    }
</style>