<template>
    <LayoutWithBackAndTitle class="addTransaction">
        <template v-slot:title>添加交易</template>
        <template v-slot:icons>
            <div class="saveIcon" @click="onSave">
                <Icon name="tick"></Icon>
            </div>
        </template>
        <div class="tab" id="addTransaction-tab">
            <div :class="{selected:currentTypeIndex===0}" @click="currentTypeIndex=0">支出</div>
            <div :class="{selected:currentTypeIndex===1}" @click="currentTypeIndex=1">收入</div>
        </div>

        <main>
            <div class="moneyWrapper inputWrapper" @click="showCalculator=true">
                <span v-if="currentTypeIndex===0">-</span>
                <span>¥{{money}}</span>
            </div>

            <div class="inputWrapper" @click="showCategoryDialog=true">
                <div class="inputTitle categoryTitle">分类</div>
                <div class="category" @click="showCategoryDialog=true">{{category}}</div>
            </div>

            <div class="inputWrapper">
                <label>
                    <div class="inputTitle">备注</div>
                    <input type="text" class="note" placeholder="添加备注" v-model="note">
                </label>
            </div>
        </main>

        <button class="saveButton" @click="onSave">保存</button>
        <Calculator :is-show.sync="showCalculator" v-on:onOkClick="onOkClick"></Calculator>
        <CategorySelectDialog :type="type" :isShow.sync="showCategoryDialog"
                              v-on:update:category="(category)=>this.category=category"></CategorySelectDialog>
    </LayoutWithBackAndTitle>
</template>

<script lang="ts">
    import Calculator from '@/components/Calculator.vue';
    import Vue from 'vue';
    import {Component, Watch} from 'vue-property-decorator';
    import CategorySelectDialog from '@/components/add-transaction/CategorySelectDialog.vue';
    import {getQueryString} from '@/lib/urlHelper';

    // 下面的代码解决弹出键盘时，按钮向上移动
    const h = document.body.scrollHeight;
    window.onresize = function () {
        const x = document.querySelector('.addTransaction .saveButton') as HTMLElement;
        if (x) {
            x.style.display = document.body.scrollHeight < h ? 'none' : 'block';
        }
    };

    @Component({
        components: {Calculator, CategorySelectDialog}
    })
    export default class AddTransaction extends Vue {
        money = getQueryString('money');
        currentTypeIndex = 0;
        showCalculator = false;
        category = this.$store.state.categories[this.type][0];
        note = '';
        showCategoryDialog = false;

        get type() {
            return ['expenditure', 'income'][this.currentTypeIndex];
        }

        onOkClick(money: string) {
            this.money = money;
            this.showCalculator = false;
        }

        onSave() {
            this.$router.go(-1);
            // console.log(transactionsModel.fetch())
        }

        beforeCreate() {
            this.$store.commit('fetchCategories');
            //test
            // this.$store.commit('addCategory',{type:'expenditure',category:'cola'})
            // this.$store.commit('editCategory',{type:'expenditure',oldName:'cola',newName:'hhh'})
        }

        @Watch('currentTypeIndex')
        onCurrentTypeIndexChanged(val: number, oldVal: number) {
            this.category = this.$store.state.categories[this.type][0];
        }

    }
</script>

<style lang="scss" scoped>
    @import "~@/assets/style/helper.scss";

    .addTransaction {
        position: relative;
    }

    .saveIcon {
        /*border: 1px solid red;*/
        line-height: 1rem;
    }

    .tab {
        background-color: $color-green;
        display: flex;
        justify-content: space-around;
        color: rgba(255, 255, 255, 0.5);
        line-height: 3rem;

        div {
            padding-left: 1rem;
            padding-right: 1rem;
        }
    }

    .selected {
        color: white;
        border-bottom: 2px solid white;
    }

    .saveButton {
        font-size: 1.2rem;
        line-height: 3rem;
        background-color: orange;
        color: white;
        width: 90%;
        box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.1);
        position: absolute;
        bottom: 1rem;
        left: 50%;
        transform: translateX(-50%);
    }

    main {
        background-color: white;

    }

    .inputWrapper {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        text-align: left;
        border-top: 1px solid $color-background-grey;
        margin-left: 5%;
        margin-right: 5%;
        padding-bottom: 0.5rem;
        padding-top: 0.5rem;
    }

    .moneyWrapper {
        font-size: 2rem;
        display: block;
    }

    .inputTitle {
        color: $color-nav-grey;
        font-size: 0.8rem;
    }

    .note {
        width: 100%;
        line-height: 2;
        boreder: none;
        font-size: 1rem;
    }
</style>