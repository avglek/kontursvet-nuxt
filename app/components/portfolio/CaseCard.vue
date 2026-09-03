<template>
  <a class="case-card" href="#" @click.prevent="openCase(card.id)">
    <img :src="card.img.src" :alt="card.img.alt" />
    <div class="case-card-body">
      <div class="eyebrow">{{ card.title }}</div>
      <h2>{{ card.subTitle }}</h2>
      <p>{{ card.description }}</p>
      <span class="card-link">Посмотреть фотографии ↓</span>
    </div>
  </a>
</template>

<script lang="ts" setup>
import { type ICard } from "~/shared/types/CardView";

const props = defineProps<{ card: ICard }>();
const card = props.card;

const router = useRouter()

const openCase = (id: number) => {
  router.push("/portfolio/" + id);
};
</script>

<style></style>
