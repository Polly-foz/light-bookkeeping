<template>
    <DialogWithCover v-bind="$attrs" v-on="$listeners">
        <div class="deleteConfirmDialog">
            <h1 class="deleteConfirmDialog-title">
                删除分类
            </h1>
            <div class="deleteConfirmDialog-content">
                将删除{{selectedListLength}}个分类
            </div>
            <div class="deleteConfirmDialog-buttons">
                <button @click="$emit('update:isShow', false)">取消</button>
                <button @click="$emit('deleteCategories')">删除</button>
            </div>
        </div>
    </DialogWithCover>
</template>

<script>
    export default {
        name: "DeleteConfirmDialog",
        props: ['selectedListLength']
    }
</script>

<style lang="scss" scoped>
    @import "~@/assets/style/helper.scss";
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