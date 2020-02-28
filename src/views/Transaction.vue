<template>
    <LayoutWithBackAndTitle v-on:onBackClicked="onBackClicked">
        <template v-slot:title>{{{income:'收入',expenditure:'支出'}[transaction.type]}}</template>
        <template v-slot:icons>
            <div @click="showDeleteConfirmDialog=true">
                <Icon name="delete"/>
            </div>
        </template>
        <div class="main">
            <div class="money" @click="showCalculator=true">
                <span v-if="transaction.type==='expenditure'">-</span>¥{{formatFloat(money,2)}}
            </div>
            <ol>
                <li>
                    <div class="title">分类</div>
                    <div class="content" @click="showCategorySelectDialog=true">{{category}}</div>
                </li>
                <li>
                    <div class="title">日期</div>
                    <div class="content">{{date}}</div>
                </li>
                <li>
                    <div class="title">时间</div>
                    <div class="content">{{time}}</div>
                </li>
                <li>
                    <div class="title">备注</div>
                    <div :class={content:true,hint:note?false:true} @click="showNoteSettingDialog=true">
                        {{note?note:'点击添加备注'}}
                    </div>
                </li>
            </ol>
        </div>

        <Calculator :isShow.sync="showCalculator" v-on:onCalculatorOkClicked="onCalculatorOkClicked"></Calculator>
        <CategorySelectDialog :isShow.sync="showCategorySelectDialog" :category.sync="category"
                              :type="transaction.type"></CategorySelectDialog>
        <NoteSettingDialog :isShow.sync="showNoteSettingDialog" :note.sync="note"></NoteSettingDialog>
        <DeleteConfirmDialog :isShow.sync="showDeleteConfirmDialog"
                             v-on:deleteTransaction="deleteTransaction"></DeleteConfirmDialog>
    </LayoutWithBackAndTitle>
</template>

<script lang="ts">
    import {Component} from 'vue-property-decorator';
    import Vue from 'vue';
    import {getQueryString} from '@/lib/urlHelper';
    import {formatFloat} from '@/lib/stringHelper';
    import dateHelper from '@/lib/dateHelper';
    import DeleteConfirmDialog from '@/components/transaction/DeleteConfirmDialog.vue';
    import NoteSettingDialog from '@/components/transaction/NoteSettingDialog.vue';
    import CategorySelectDialog from '@/components/transaction/CategorySelectDialog.vue';
    import Calculator from '@/components/Calculator.vue';

    @Component({
        components: {Calculator, CategorySelectDialog, NoteSettingDialog, DeleteConfirmDialog}
    })
    export default class Transaction extends Vue {
        id = Number(getQueryString('id'));
        showDeleteConfirmDialog = false;
        showNoteSettingDialog = false;
        showCategorySelectDialog = false;
        showCalculator = false;
        date = dateHelper.date(this.transaction.date);
        time = dateHelper.time(this.transaction.date);
        note = this.transaction.note;
        category = this.transaction.category;
        money = this.transaction.money;


        get transaction() {
            return this.$store.getters.getTransactionById(this.id);
        }

        onCalculatorOkClicked(moneyStr: string){
            this.money = Number(moneyStr)
        }

        onBackClicked() {
            const newTransaction = {
                id: this.id,
                money: this.money,
                category: this.category,
                note: this.note
            };
            this.$store.commit('editTransaction', newTransaction);
        }

        deleteTransaction() {
            this.$store.commit('deleteTransaction', this.id);
            this.showDeleteConfirmDialog = false;
            this.$router.go(-1);
        }

        beforeCreate() {
            this.$store.commit('fetchCategories');
            this.$store.commit('fetchTransactions');
        }

        formatFloat(value: number, n: number) {
            return formatFloat(value, n);
        }

    }
</script>

<style lang="scss" scoped>
    @import "~@/assets/style/helper.scss";

    .main {
        width: 100%;
        height: 100%;
        background-color: white;
        text-align: left;
        padding: 1rem;

        .money {
            font-size: 2rem;
            margin-bottom: 1rem;
        }

        ol > li {
            border-top: 1px solid $color-background-grey;
            padding: 0.5rem 0;

            .title {
                font-size: 0.8rem;
                color: $color-nav-grey;
            }

            .content {

            }

            .content.hint {
                color: $color-hint-grey;
            }
        }

        ol:last-child {
            border-bottom: 1px solid $color-background-grey;
        }
    }


</style>