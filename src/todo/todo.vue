<template>
    <section class="real-app">
        <input 
            type="text"
            class="add-input"
            autofocus="autofocus"
            placeholder="接下去要做什么？"
            @keyup.enter="addTodo"
        >
    </section>
</template>

<script>
export default {
    methods:{
        addTodo(){

        }
    }
}
</script>

<style lang="less" scoped>
    .real-app{
        width: 600px;
        margin: 0 auto;
        box-shadow: 0 0 5px #666;
    }
    .add-input{
        position: relative;
        width: 100%;
        font-size: 24px;
        line-height: 1.4em;
        padding: 16px 16px 16px 60px;
        border: 1px solid #999;
        box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.5);
        box-sizing: border-box;
        box-shadow: inset 0 -2px 1px 0 rgba(0, 0, 0, 0.2);

    }
</style>

