<template>
    <LayoutWithBackAndTitle class="categories">
        <template v-slot:title>分类</template>
        <template v-slot:icons>
            <div @click="changeState(false)">
                <Icon v-if="!inSelectState" name="multiSelect"></Icon>
            </div>
            <div @click="showEditDialog = true">
                <Icon v-if="showEdit" name="edit"></Icon>
            </div>
            <div @click="changeState(false)">
                <Icon v-if="inSelectState" name="delete"></Icon>
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

        <EditDialog :selectedTransactionsLength="selectedTransactionsLength" :oldName="selectedList[0]" :isShow.sync="showEditDialog"
                    v-on:editCategory="editCategory"></EditDialog>
        <DeleteConfirmDialog :selectedTransactionsLength="selectedTransactionsLength" :selected-list-length="selectedList.length" :isShow.sync="showDeleteConfirm"
                             v-on:deleteCategories="deleteCategories"></DeleteConfirmDialog>
        <AddDialog :type="type" :isShow.sync="showAddDialog" v-on:addCategory="addCategory"></AddDialog>
        <button v-if="!inSelectState" @click="showAddDialog=true">
            <Icon name="add" class="addCategory"/>
        </button>
    </LayoutWithBackAndTitle>
</template>

<script lang="ts">

    import {Component, Watch} from 'vue-property-decorator';
    import Vue from 'vue';
    import DeleteConfirmDialog from '@/components/categories/DeleteConfirmDialog.vue';
    import EditDialog from '@/components/categories/EditDialog.vue';
    import AddDialog from '@/components/categories/AddDialog.vue';

    @Component({
        components: {DeleteConfirmDialog, EditDialog, AddDialog}
    })
    export default class Categories extends Vue {
        currentTypeIndex = 0;
        inSelectState = false;
        selectedList = [] as string[];
        showDeleteConfirm = false;
        showEditDialog = false;
        showAddDialog = false;

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
            if (this.selectedList.length === 1) {
                return true;
            }
            return false;
        }

        get selectedTransactionsLength() {
            return this.$store.getters.categoriesRelatedTransactionsAmount({
                categories: this.selectedList,
                type: this.type
            });
        }

        addCategory(name: string) {
            // console.log(newName);
            try {
                this.$store.commit('addCategory', {type: this.type, category: name});
                this.showAddDialog = false;
            } catch (error) {
                window.alert(error);
            }
            return;
        }

        editCategory(newName: string) {
            // console.log(newName);
            try {
                this.$store.commit('editCategory', {type: this.type, oldName: this.selectedList[0], newName: newName});
                this.showEditDialog = false;
                this.changeState(true);
            } catch (error) {
                window.alert(error);
            }
            return;
        }

        deleteCategories() {
            this.$store.commit('deleteCategories', {type: this.type, categories: this.selectedList});
            this.selectedList.splice(0, this.selectedList.length);
            this.showDeleteConfirm = false;
            this.inSelectState = false;
            this.$router.push('/home');
        }


        changeState(reset: boolean) {
            // console.log('~~~changeState')
            if (reset === true) {
                this.inSelectState = false;
                this.selectedList.splice(0, this.selectedList.length);
                return;
            }
            if (this.inSelectState === false) {
                this.inSelectState = true;
                return;
            }
            if (this.selectedList.length === 0) {
                this.inSelectState = false;
                return;
            }
            console.log('show delete confirm');
            this.showDeleteConfirm = true;
        }


        onCategoryClicked(category: string, index: number) {
            if (this.inSelectState === false) {
                return;
            }
            if (event && event.target && (event.target as Element).className.indexOf('categorySelected') >= 0) {
                (event.target as Element).className = 'categoryWrapper categoryNotSelected';
                const index = this.selectedList.indexOf(category);
                this.selectedList.splice(index, 1);
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

        @Watch('inSelectState')
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

    .addCategory {
        color: $color-green;
        font-size: 3rem;
        position: absolute;
        bottom: 5vh;
        right: 8vw;
        background-color: white;
        /*width: 3rem;*/
        /*height: 3rem;*/
        border-radius: 50%;
        box-shadow: 0 2px 2px 2px $color-background-grey;
    }

</style>