<template>
    <DialogWithCover v-bind="$attrs" v-on="$listeners">
        <div class="noteSettingDialog">
            <h1 class="title">
                备注
            </h1>
            <input class="note" type="text" value="note" v-model="note_">
            <button @click="onOkClicked">完成</button>
        </div>
    </DialogWithCover>
</template>

<script lang="ts">

    import {Component, Prop} from 'vue-property-decorator';
    import Vue from 'vue';

    @Component
    export default class NoteSettingDialog extends Vue {
        @Prop(String) note: string | undefined;

        note_ = this.note;

        onOkClicked(){
            this.$emit('update:note',this.note_)
            this.$emit('update:isShow',false)
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/assets/style/helper.scss";

    .noteSettingDialog {
        z-index: 300;
        background-color: white;
        position: absolute;
        width: 80%;
        top: 50%;
        left: 10%;
        transform: translateY(-50%);
        text-align: left;
        padding: 0.5rem;

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