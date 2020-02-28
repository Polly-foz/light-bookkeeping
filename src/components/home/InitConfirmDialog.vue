<template>
    <DialogWithCover v-bind="$attrs" v-on="$listeners">
        <div class="initConfirmDialog">
            <div class="content">
                将初始化一批交易（供测试用）和分类
            </div>
            <div class="buttons">
                <button @click="$emit('update:isShow', false)">取消</button>
                <button @click="onConfirmClicked">确认</button>
            </div>
        </div>
    </DialogWithCover>
</template>

<script>
    export default {
        name: "InitConfirmDialog",
        methods: {
            onConfirmClicked() {
                this.$emit('update:isShow')
                this.$emit('initConfirm')
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

        .title {
            margin-bottom: 1rem;
        }

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