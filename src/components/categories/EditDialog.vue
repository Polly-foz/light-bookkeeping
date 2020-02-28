<template>
    <DialogWithCover v-bind="$attrs" v-on="$listeners">
        <div class="addDialog">
            <h1 class="title">
                重命名
            </h1>
            <div class="content">
                将影响{{selectedTransactionsLength}}个交易
            </div>
            <input class="note" type="text" :placeholder="oldName" v-model="newName">
            <button @click="onCompleted">完成</button>
        </div>
    </DialogWithCover>
</template>

<script lang="ts">
    import {Component, Prop} from 'vue-property-decorator';
    import Vue from 'vue';

    @Component
    export default class EditDialog extends Vue {
        @Prop(String) readonly oldName: string | undefined;
        @Prop(Number) readonly selectedTransactionsLength: number | undefined;

        newName = '';

        onCompleted() {
            this.$emit('editCategory', this.newName);
            this.newName = '';
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/assets/style/helper.scss";

    .addDialog {
        z-index: 300;
        background-color: white;
        position: absolute;
        width: 80%;
        top: 50%;
        left: 10%;
        transform: translateY(-50%);
        padding: 1rem;
        text-align: left;

        .title {
            margin-bottom: 1rem;
        }
        .content{
            margin-bottom: 1rem;
        }
        .note {
            width: 100%;
            border-bottom: 1px solid $color-green;
            line-height: 2rem;
        }

        button {
            color: $color-green;
            width: 100%;
            padding: 1rem;
        }
    }

</style>