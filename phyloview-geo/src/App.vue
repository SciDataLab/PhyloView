<template>
  <div v-cloak id="app">
    <router-view></router-view>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import router from "@/router/router";
import { useStore } from "@/store/index";
const store = useStore();
let getvalue = ref(null);
onMounted(() => {
});
</script>

<style>
[v-cloak] {
  display: none;
}

body {
  margin: 0;
}

#app {
  padding: 0;
  margin: 0;
}

</style>
