<template>
    <DialogWithCover v-bind="$attrs" v-on="$listeners">
        <div class="initConfirmDialog">
            <h1 class="title">
                删除分类
            </h1>
            <div class="content">
                将删除{{selectedListLength}}个分类和{{selectedTransactionsLength}}个交易
            </div>
            <div class="buttons">
                <button @click="$emit('update:isShow', false)">取消</button>
                <button @click="$emit('deleteCategories')">删除</button>
            </div>
        </div>
    </DialogWithCover>
</template>

<script>
    export default {
        name: "DeleteConfirmDialog",
        props: ['selectedListLength','selectedTransactionsLength']
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

        .title {
            margin-bottom: 1rem;
        }

        .content {
            margin-bottom: 1rem;
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
    }
</style>