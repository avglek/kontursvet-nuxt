<template>
  <div>
    <h2>id: {{ id }}</h2>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();

const id = route.params.id;
</script>

<style></style>
