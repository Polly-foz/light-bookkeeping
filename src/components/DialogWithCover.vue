<template>
    <div class="dialogWithCover" v-if="$attrs.isShow">
        <div class="cover" @click.stop="$emit('update:isShow', false)"></div>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "DialogWithCover",
    }
</script>

<style lang="scss" scoped>
    .dialogWithCover{
        /*position: relative;*/
    }
    .cover{
        background: rgba(0,0,0,0.7);
        position: fixed;
        z-index:200;
        width:100%;
        height:100%;
        top:0;
        left:0;
    }
</style>