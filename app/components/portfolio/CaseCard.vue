<template>
  <a class="case-card" href="#" @click.prevent="openCase(id)">
    <img :src="img.src" :alt="img.alt" />
    <div class="case-card-body">
      <div class="eyebrow">{{ title }}</div>
      <h2>{{ subTitle }}</h2>
      <p>{{ description }}</p>
      <span class="card-link">Посмотреть фотографии ↓</span>
    </div>
  </a>
</template>

<script lang="ts" setup>
defineProps({
  id: Number,
  title: String,
  link: String,
  subTitle: String,
  description: String,
  img: {
    src: String,
    alt: String,
  },
});
const router = useRouter();

const openCase = (id) => {
  router.push("/portfolio/" + id);
};
</script>

<style></style>
