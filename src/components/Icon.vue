<template>
    <svg class="icon" aria-hidden="true">
        <use :xlink:href="'#' + name"/>
    </svg>
</template>

<script lang="ts">
    const requireAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().map(requireContext)
    // eslint-disable-next-line
    const req = require.context('@/assets/icons', true, /\.svg$/)
    requireAll(req)

    export default {
        name: "Icon",
        props:["name"]
    }
</script>

<style scoped>
    .icon {
        width: 1em; height: 1em;
        /*vertical-align: -0.15em;*/
        fill: currentColor;
        /*overflow: hidden;*/
    }
</style>