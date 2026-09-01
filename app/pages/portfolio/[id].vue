<template>
  <div>
    <PortfolioCaseCardView :id="id" />
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();

const id = route.params.id;
</script>

<style></style>
