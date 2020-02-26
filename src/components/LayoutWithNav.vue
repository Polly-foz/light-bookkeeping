<template>
    <div class="layoutWithNav">
        <header class="header">
            <h1>
                <slot name="title"></slot>
            </h1>
            <div class="iconWrapper">
                <slot name="icons"></slot>
            </div>
        </header>
        <main class="content">
            <slot/>
        </main>
        <Nav/>
    </div>
</template>

<script>
    import vhCheck from 'vh-check'
    export default {
        name: "LayoutWithNav",
        mounted(){
            vhCheck()
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/assets/style/helper.scss";
    .layoutWithNav{
        display:-webkit-box;
        display:-webkit-flex;
        display:-ms-flexbox;
        display:flex;
        -webkit-box-orient:vertical;
        -webkit-flex-direction:column;
        -ms-flex-direction:column;
        flex-direction:column;
        flex-direction: column;
        flex-wrap: nowrap;
        height: calc(100vh - var(--vh-offset, 0px));
        .header{
            background-color: $color-green;
            color:white;
            display: flex;
            justify-content: space-between;
            font-size: 1rem;
            padding: 1rem;
            h1{
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
            }
            .iconWrapper{
                display: flex;
                justify-content: center;
                align-items: center;
                .icon{
                    margin-left: 1rem;
                    font-size: $font-size-title-icon;
                }
            }
        }
        .content{
            -webkit-box-flex:1;
            -webkit-flex:1;
            -ms-flex:1;
            flex:1;
            overflow:auto;/* winphone8和android4+ */
            -webkit-overflow-scrolling: touch; /* ios5+ */
            /*border: 1px solid red;*/
        }
        > Nav{

        }
    }
</style>