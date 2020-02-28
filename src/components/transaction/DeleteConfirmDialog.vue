<template>
    <DialogWithCover v-bind="$attrs" v-on="$listeners">
        <div class="initConfirmDialog">
            <div class="content">
                你确定要删除这个交易？
            </div>
            <div class="buttons">
                <button @click="$emit('update:isShow', false)">取消</button>
                <button @click="onDeleteClicked">删除</button>
            </div>
        </div>
    </DialogWithCover>
</template>

<script lang="ts">

    import {Component} from 'vue-property-decorator';
    import Vue from 'vue';

    @Component
    export default class DeleteConfirmDialog extends Vue{
        onDeleteClicked(){
            this.$emit('deleteTransaction')
            this.$emit('update:isShow',false)
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/assets/style/helper.scss";
    .initConfirmDialog {
        z-index: 300;
        background-color: white;
        position: absolute;
        width: 80%;
        top: 50%;
        left: 10%;
        transform: translateY(-50%);
        text-align: left;
        padding: 0.5rem;
    }

    .content {
        padding:1rem;
    }

    .buttons {
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
</style>