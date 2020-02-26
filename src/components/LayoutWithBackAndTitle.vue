<template>
    <div class="layoutWithBackAndTitle">
        <header class="header">
            <div class="firstTitle">
                <div class="left">
                    <button class="back" @click="back">
                        <Icon name="back"></Icon>
                    </button>
                    <h1 class="firstTitleName">
                        <slot name="title"></slot>
                    </h1>
                </div>
                <div class="right">
                    <slot name="icons"></slot>
                </div>
            </div>
            <div class="subtitle">
                <slot name="subtitle"></slot>
            </div>
        </header>
        <main class="content">
            <slot/>
        </main>
    </div>

</template>

<script lang="ts">
    import vhCheck from 'vh-check';
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';

    @Component
    export default class LayoutWithBackAndTitle extends Vue {
        mounted() {
            vhCheck();
        }

        back() {
            // this.$router.push("home")
            this.$router.go(-1);
        }
    }
</script>

<style lang="scss" scoped>
    @import "@/assets/style/helper.scss";

    .layoutWithBackAndTitle {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
        flex-direction: column;
        flex-wrap: nowrap;
        height: calc(100vh - var(--vh-offset, 0px));
        background-color: $color-background-grey;
    }

    .header {
        background-color: $color-green;
        color: white;
    }

    .firstTitle {
        display: flex;
        justify-content: space-between;
        font-size: 1rem;
        padding: 1rem;
    }

    .firstTitleName {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-left: 1rem;
    }

    .left {
        display: flex;
        position: relative;

        .back {
            text-align: center;
            position: relative;
            top: 50%;
            transform: translateY(-50%);
            color: white;
            font-size: 1rem;
        }
    }

    .right {
        display: flex;
        justify-content: center;
        align-items: center;

        .icon {
            margin-left: 1rem;
            font-size: $font-size-title-icon;
        }
    }

    .content {
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        -ms-flex: 1;
        flex: 1;
        overflow: auto; /* winphone8和android4+ */
        -webkit-overflow-scrolling: touch; /* ios5+ */
        /*border: 1px solid red;*/
    }
</style>