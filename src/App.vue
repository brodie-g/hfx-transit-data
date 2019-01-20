<template>
    <div id="app">
        <h1 id="site-header">Halifax Bus Data</h1>
        <div id="nav">
            <router-link to="/">Home</router-link>
            |
            <router-link to="/about">About</router-link>
        </div>
        <router-view/>
    </div>
</template>

<style lang="scss">
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    #nav {
        padding: 30px;
        a {
            font-weight: bold;
            color: #1d33b9;
            &.router-link-exact-active {
                color: #347EE0;
            }
        }
    }
    h1#site-header {
        font-size: 42px;
    }
</style>
