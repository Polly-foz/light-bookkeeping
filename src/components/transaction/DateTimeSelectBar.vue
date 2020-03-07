<template>
    <div>
        <el-date-picker
                v-model="date"
                type="datetime"
                :placeholder="originalDate"
                :default-value="originalDate"
                align="right"
                :picker-options="pickerOptions1"
                :editable="false"
                @change="$emit('pick',date)">
        </el-date-picker>
    </div>

</template>

<script lang="ts">
    import {Component, Prop} from 'vue-property-decorator';
    import Vue from 'vue';

    @Component
    export default class DataTimeSelectBar extends Vue {
        @Prop(String) originalDate: string | undefined;

        date = '';
        pickerOptions1 = {
            shortcuts: [{
                text: '今天',
                onClick(picker: Vue) {
                    picker.$emit('pick', new Date());
                }
            }, {
                text: '昨天',
                onClick(picker: Vue) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24);
                    picker.$emit('pick', date);
                }
            }, {
                text: '一周前',
                onClick(picker: Vue) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', date);
                }
            }]
        };
    }
</script>

<style lang="scss" scoped>
    .block {
        z-index: 300;
        background-color: white;
        position: absolute;
        width: 80%;
        top: 50%;
        left: 10%;
        transform: translateY(-50%);
    }
</style>