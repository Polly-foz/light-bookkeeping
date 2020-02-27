<template>
    <DialogWithCover v-bind="$attrs" v-on="$listeners">
        <div class="categorySelectDialog">
            <h1 class="firstTitleName">分类</h1>
            <input class="searchKey" type="text" placeholder="搜索或创建分类" v-model="category">
            <div class="categoriesWrapper">
                <button v-for="tag in categories" v-bind:key="tag" class="category" @click="selectCategory">{{tag}}
                </button>
            </div>
            <button class="addCategories" v-if="showAdd" @click="addCategory">添加标签</button>
            <router-link to="categories" v-if="showManage" class="manageCategoriesWrapper">
                <div class="manageCategoriesButton">管理分类</div>
            </router-link>
        </div>
    </DialogWithCover>
</template>

<script lang="ts">
    import {Component, Prop, Watch} from 'vue-property-decorator';
    import Vue from 'vue';

    @Component
    export default class CategorySelectDialog extends Vue {
        @Prop(String) readonly type: string | undefined;

        category = '';
        showAdd = false;
        showManage = true;
        categories = this.$store.state.categories.expenditure;

        beforeCreate() {
            this.$store.commit('fetchCategories');
        }

        updated(){
            if(Boolean(this.$attrs.isShow) === false){
                this.category = '';
            }
        }

        selectCategory(event: Event) {
            this.$emit('update:isShow', false);
            if (event.target) {
                this.$emit('update:category', (event.target as Node).textContent);
            }
        }

        addCategory() {
            console.log('尝试添加标签');
            //TODO add category
            const res = false;
            if (!res) {
                window.alert('添加失败，该标签已存在');
            }
            this.category = '';
        }

        @Watch('category')
        onCategoryChanged(val: string) {
            if (val === '') {
                this.categories = this.type && this.$store.state.categories[this.type];
            } else {
                this.categories = this.type &&
                    this.$store.state.categories[this.type]
                        .filter((item: string) => item.indexOf(val)>=0)
            }
        }

        @Watch('type')
        onTypeChanged(val: string){
            this.categories = this.type && this.$store.state.categories[this.type];
        }
    }

    /*export default {
        name: "CategorySelectDialog",
        data(){
            return{
                category: '',
                categories: categoriesModel.fetch()[categoriesModel.constants.EXPENDITURE],
                showAdd:false,
                showManage:true,
            }
        },
        props:["typeIndex"],
        methods:{

        },
        watch:{
            typeIndex(newv,oldv){
                this.updateTags(categoriesModel.fetch()[categoriesModel.constants.TYPES[this.typeIndex]])
            },
            category(newv,oldv){
                if(newv === ''){
                    this.updateTags()
                }else {
                    this.updateTags(categoriesModel.fetch()[categoriesModel.constants.TYPES[this.typeIndex]].filter(item => item.indexOf(newv) >= 0))
                }
            },
            categories(newv,oldv){
                if(newv.length === 0){
                    this.showAdd = true
                    this.showManage = false
                }else{
                    this.showAdd = false
                    this.showManage = true
                }
            }
        },
        created(){
            return null;
        },
        mounted(){
            return null;
        },
        updated(){
           return null;
        },
        destroyed(){
            return null;
        }
    }*/
</script>

<style lang="scss" scoped>
    @import "@/assets/style/helper.scss";

    .categorySelectDialog {
        z-index: 300;
        position: absolute;
        width: 90%;
        left: 50%;
        top: 3rem;
        bottom: 3rem;
        transform: translateX(-50%);
        background-color: white;
        display: flex;
        flex-direction: column;
        text-align: left;
        padding: 1rem;
    }

    .searchKey {
        margin-top: 1rem;
        margin-bottom: 1rem;
        line-height: 2rem;
    }

    .categoriesWrapper {
        overflow: auto;
        display: flex;
        flex-direction: column;
    }

    .category {
        padding-top: 1rem;
        padding-bottom: 1rem;
        border-top: 1px solid $color-background-grey;
        text-align: left;
        font-size: 1rem;
    }

    .categoriesWrapper:last-child {
        border-bottom: 1px solid $color-background-grey;
    }

    .manageCategoriesWrapper {
        display: flex;
        justify-content: center;
    }

    .manageCategoriesButton {
        color: $color-green;
        padding: 0.5rem;
        font-size: 1rem;
        /*border: 1px solid red;*/
    }

</style>