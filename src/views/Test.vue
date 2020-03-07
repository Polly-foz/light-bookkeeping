<template>
    <div>
        <div class="block">
            <div>{{value1}}</div>
            <span class="demonstration">默认</span>
            <el-date-picker
                    v-model="value1"
                    type="datetime"
                    placeholder="选择日期时间">
            </el-date-picker>
        </div>
        <div class="block">
            <div>{{value2}}</div>
            <span class="demonstration">带快捷选项</span>
            <el-date-picker
                    v-model="value2"
                    type="datetime"
                    placeholder="选择日期时间"
                    align="right"
                    :picker-options="pickerOptions1">
            </el-date-picker>
        </div>
        <div class="block">
            <div>{{value3}}</div>
            <span class="demonstration">设置默认时间</span>
            <el-date-picker
                    v-model="value3"
                    type="datetime"
                    placeholder="选择日期时间"
                    default-time="12:00:00">
            </el-date-picker>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component} from 'vue-property-decorator';
    import Vue from 'vue';

    @Component
    export default class Test extends Vue {
        value1 = '';
        value2 = '';
        value3 = '';
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
        }
    }
</script>

<style scoped>

</style>