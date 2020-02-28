<template>
    <div class="calculator" v-if="isShow">
        <div class="cover" @click.stop="$emit('update:isShow', false)"></div>
        <div class="content">
            <div class="money">
                <div class="symbol">¥</div>
                <div class="expression">{{expression}}</div>
            </div>
            <div class="buttons">
                <button @click="calculateSingle">1</button>
                <button @click="calculateSingle">2</button>
                <button @click="calculateSingle">3</button>
                <button class="bgColorGrey" @click="remove">
                    <Icon name="backspace"></Icon>
                </button>
                <button @click="calculateSingle">4</button>
                <button @click="calculateSingle">5</button>
                <button @click="calculateSingle">6</button>
                <button class="bgColorGrey" @click="removeAll">C</button>
                <button @click="calculateSingle">7</button>
                <button @click="calculateSingle">8</button>
                <button @click="calculateSingle">9</button>
                <button class="ok" @click="checkAndLinkTo">ok</button>
                <button class="zero" @click="calculateSingle">0</button>
                <button @click="calculateSingle">.</button>


            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {formatFloat} from '@/lib/stringHelper';
    import {Component, Prop} from 'vue-property-decorator';

    @Component
    export default class Calculator extends Vue {

        @Prop(Boolean)
        isShow = false;

        expression = '0';
        checkAndLinkTo() {
            if (!isNaN(Number(this.expression))) {//判断是否数字
                this.$emit('update:isShow',false)
                this.$emit('onCalculatorOkClicked', Number(this.expression));
                // this.$router.push({path:'addtransaction', query: {money:Number(this.expression)}})
            }
        }

        calculateSingle(event: Event) {
            const input = event.target && (event.target as Node).textContent;
            if (input && '0123456789'.indexOf(input) >= 0) {
                if (this.expression === '0') {
                    this.expression = input;
                } else {
                    this.expression += input;
                }
                return;
            }
            if (input === '.') {
                if (this.expression.indexOf('.') < 0) {
                    this.expression += input;
                }
                return;
            }
            if (input === 'C') {
                this.expression = '0';
                return;
            }
        }

        remove() {
            if (this.expression.length === 1) {
                this.expression = '0';
            } else {
                this.expression = this.expression.substring(0, this.expression.length - 1);
            }
        }

        removeAll() {
            this.expression = '0';
        }
    }

</script>

<style lang="scss" scoped>
    @import "~@/assets/style/helper.scss";

    .calculator {
        position: relative;
    }

    .cover {
        background: rgba(0, 0, 0, 0.7);
        position: fixed;
        z-index: 200;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
    }

    .content {
        position: fixed;
        bottom: 0;
        width: 100%;
        z-index: 300;
        background-color: white;
    }

    .money {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        font-size: 2rem;
        line-height: 2;
        color: $color-green;

        .symbol {
            margin-left: 1.5rem;
        }

        .expression {
            flex-grow: 1;
            text-align: left;
            margin-left: 1.5rem;
        }
    }

    .buttons {
        button {
            width: 25%;
            float: left;
            font-size: 1.3rem;
            line-height: 3;
            border: none;
            background-color: white;
            box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05);
        }

        .bgColorGrey {
            background-color: $color-background-grey;
        }

        .zero {
            width: 50%;
        }

        .ok {
            float: right;
            line-height: 6;
            background-color: $color-green;
            color: white;
        }
    }
</style>