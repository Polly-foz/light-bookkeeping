<template>
    <ol class="timeScopeBar">
        <li :class="{selected:timeScope==='day'}" @click="onClicked('day')">按天</li>
        <li :class="{selected:timeScope==='month'}" @click="onClicked('month')">按月</li>
        <li :class="{selected:timeScope==='year'}" @click="onClicked('year')">按年</li>
        <li :class="{selected:timeScope==='all'}" @click="onClicked('all')">总计</li>
    </ol>
</template>

<script lang="ts">
    import {Component, Prop} from 'vue-property-decorator';
    import Vue from 'vue';

    @Component
    export default class TimeScopeBar extends Vue {
        @Prop(String) timeScope: string | undefined;

        onClicked(scope: string) {
            this.timeScope = scope;
            this.$emit('update:timeScope', scope);
        }

    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/style/helper.scss';

    .timeScopeBar {
        display: flex;
        justify-content: space-around;
        line-height: 2.5rem;
        background-color: $color-green;
        color: rgba(255, 255, 255, 0.5);
        .selected {
            color: white;
            border-bottom: 2px solid white;
        }
    }
</style>