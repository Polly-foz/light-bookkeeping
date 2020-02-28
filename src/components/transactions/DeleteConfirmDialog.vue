<template>
    <DialogWithCover v-bind="$attrs" v-on="$listeners">
        <div class="initConfirmDialog">
            <div class="content">
                确认要删除{{title}}吗？
            </div>
            <div class="buttons">
                <button @click="$emit('update:isShow', false)">取消</button>
                <button @click="onDeleteClicked">删除</button>
            </div>
        </div>
    </DialogWithCover>
</template>

<script>
    export default {
        name: "DeleteConfirmDialog",
        props: ['selectedListLength', 'selectedTransactionsLength','title'],
        methods: {
            onDeleteClicked() {
                this.$emit('deleteAllTransactions')
                this.$emit('update:isShow')
            }
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
        padding: 1rem;
        text-align: left;

        .content {
            margin-bottom: 1rem;
            padding: 0.5rem;
        }

        .buttons {
            display: flex;
            justify-content: space-around;

            button {
                width: 100%;
                padding: 0.5rem;
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