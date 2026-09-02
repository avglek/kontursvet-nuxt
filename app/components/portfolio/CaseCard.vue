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
import { type ICard } from "~/shared/types/CardView";

const props: ICard = defineProps<ICard>();

const router = useRouter();

const openCase = (id: number) => {
  router.push("/portfolio/" + id);
};
</script>

<style></style>
