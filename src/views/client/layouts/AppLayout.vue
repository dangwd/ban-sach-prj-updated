<script setup>
import AppFooter from './AppFooter.vue';
import AppTopbar from './AppTopbar.vue';
</script>
<template>
    <Toast />
    <AppTopbar></AppTopbar>
    <body class="font-montserrat h-auto text-sm bg-white">
        <router-view></router-view>
    </body>
    <AppFooter></AppFooter>
</template>
