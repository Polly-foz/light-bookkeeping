<template>
    <DialogWithCover v-bind="$attrs" v-on="$listeners">
        <div class="addDialog">
            <h1 class="title">
                创建{{type==='expenditure'?'支出':'收入'}}分类
            </h1>
            <input class="note" type="text" v-model="category">
            <button @click="onCompleted">完成</button>
        </div>
    </DialogWithCover>
</template>

<script lang="ts">
    import {Component, Prop} from 'vue-property-decorator';
    import Vue from 'vue';

    @Component
    export default class AddDialog extends Vue {
        @Prop(String) readonly type: string | undefined;

        category = '';

        onCompleted() {
            this.$emit('addCategory', this.category);
            this.category = '';
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