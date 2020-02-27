<template>
    <LayoutWithBackAndTitle class="categories">
        <template v-slot:title>分类</template>
        <template v-slot:icons>
            <div @click="changeState(false)">
                <Icon v-if="!inDeleteState" name="multiSelect"></Icon>
            </div>
            <div @click="editCategory">
                <Icon v-if="showEdit" name="edit" ></Icon>
            </div>
            <div @click="changeState(false)">
                <Icon v-if="inDeleteState" name="delete"></Icon>
            </div>
        </template>
        <template v-slot:subtitle>
            <div class="tab">
                <div :class="{selected:currentTypeIndex===0}" @click="onTabClicked(0)">支出</div>
                <div :class="{selected:currentTypeIndex===1}" @click="onTabClicked(1)">收入</div>
            </div>
        </template>
        <main>
            <div class="categoriesWrapper">
                <div class="categoryWrapper" v-for="(category,index) in categories" :key="category" :index="index"
                     @click.self="onCategoryClicked(category,index)">
                    <Icon name="checked" class="categoryItem"></Icon>
                    <button class="category categoryItem">{{category}}</button>
                </div>
            </div>
        </main>
        <DialogWithCover :isShow.sync="showDeleteConfirm">
            <div class="deleteConfirmDialog">
                <h1 class="deleteConfirmDialog-title">
                    删除分类
                </h1>
                <div class="deleteConfirmDialog-content">
                    将删除{{selectedList.size}}个分类
                </div>
                <div class="deleteConfirmDialog-buttons">
                    <button @click="showDeleteConfirm=false">取消</button>
                    <button @click="deleteCategories">删除</button>
                </div>
            </div>
        </DialogWithCover>
    </LayoutWithBackAndTitle>
</template>

<script lang="ts">

    import {Component, Watch} from 'vue-property-decorator';
    import Vue from 'vue';

    @Component
    export default class Categories extends Vue {
        currentTypeIndex = 0;
        inDeleteState = false;
        selectedList = [] as string[];
        showDeleteConfirm = false;

        get categories() {
            if (this.currentTypeIndex === 0) {
                return this.$store.state.categories.expenditure;
            } else {
                return this.$store.state.categories.income;
            }
        }

        get type() {
            return ['expenditure', 'income'][this.currentTypeIndex];
        }

        get showEdit() {
            if(this.selectedList.length === 1){
                return true
            }
            return false;
        }

        editCategory(){
            return;
        }

        deleteCategories() {
            //TODO delete
            this.$store.commit('deleteCategories', {type: this.type, categories: this.selectedList});
            this.selectedList.splice(0,this.selectedList.length)
            this.showDeleteConfirm = false;
            this.inDeleteState = false;
        }


        changeState(fromTabChanged: boolean) {
            // console.log('~~~changeState')
            if (fromTabChanged === true) {
                this.inDeleteState = false;
                this.selectedList.splice(0,this.selectedList.length);
                return;
            }
            if (this.inDeleteState === false) {
                this.inDeleteState = true;
                return;
            }
            if (this.selectedList.length === 0) {
                this.inDeleteState = false;
                return;
            }
            this.showDeleteConfirm = true;
        }


        onCategoryClicked(category: string, index: number) {
            if (this.inDeleteState === false) {
                return;
            }
            if (event && event.target && (event.target as Element).className.indexOf('categorySelected') >= 0) {
                (event.target as Element).className = 'categoryWrapper categoryNotSelected';
                const index = this.selectedList.indexOf(category)
                this.selectedList.splice(index,1);
            } else if (event) {
                (event.target as Element).className = 'categoryWrapper categorySelected';
                this.selectedList.push(category);
            }
        }


        onTabClicked(typeIndex: number) {
            this.currentTypeIndex = typeIndex;
            this.changeState(true);
        }

        created() {
            this.$store.commit('fetchCategories');
        }

        @Watch('inDeleteState')
        onInDeleteStateChanged(val: boolean) {
            if (val === false) {
                document.querySelectorAll('.categories .categoryWrapper').forEach(node => {
                    node.classList.remove('categorySelected');
                    node.classList.remove('categoryNotSelected');
                });
            } else {
                document.querySelectorAll('.categories .categoryWrapper').forEach(node => {
                    node.classList.add('categoryNotSelected');
                });
            }
        }

    }
</script>

<style lang="scss" scoped>
    @import "~@/assets/style/helper.scss";

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

    .categoriesWrapper {
        overflow: auto;
        display: flex;
        flex-direction: column;
    }

    .categoryWrapper {
        background-color: white;
        padding-left: 1rem;
        padding-top: 1rem;
        padding-bottom: 1rem;
        border-top: 1px solid $color-background-grey;
        text-align: left;
        font-size: 1rem;
        display: flex;

        .icon {
            /*border:1px solid red;*/
            color: rgba(0, 0, 0, 0);
            font-size: 1.2rem;
        }

        .category {
            /*border:1px solid blue;*/
            margin-left: 0.5rem;
            font-size: 1rem;
        }
    }

    .categorySelected .icon {
        color: lightskyblue;
        /*font-size: 1.2rem;*/
    }

    .categoryNotSelected .icon {
        color: $color-background-grey;
    }

    .deleteConfirmDialog {
        z-index: 300;
        background-color: white;
        position: absolute;
        width: 80%;
        top: 50%;
        left: 10%;
        transform: translateY(-50%);
        padding: 1rem;
        text-align: left;

        .deleteConfirmDialog-title {
            margin-bottom: 1rem;
        }

        .deleteConfirmDialog-content {
            margin-bottom: 1rem;
        }

        .deleteConfirmDialog-buttons {
            display: flex;
            justify-content: space-around;

            button {
                width: 100%;
                padding: 1rem;
            }

            :first-child {
                color: $color-nav-grey;
            }

            :last-child {
                color: $color-green;
            }
        }
    }
</style>