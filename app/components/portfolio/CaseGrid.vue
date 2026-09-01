<template>
  <section class="section" id="cases">
    <div class="shell">
      <div class="eyebrow">Портфолио</div>
      <h2>Реализованные объекты</h2>
      <p class="section-intro">
        Откройте любой кейс, чтобы посмотреть всю отобранную серию.
      </p>
      <div class="cards">
        <PortfolioCaseCard
          v-for="card in cards"
          :key="card.id"
          :id="card.id"
          :title="card.title"
          :link="card.link"
          :subTitle="card.subTitle"
          :description="card.description"
          :img="card.img"
        />
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
interface ICard {
  id: number;
  link: string;
  title: string;
  subTitle: string;
  description: string;
  img: {
    scr: string;
    alt: string;
  };
}

import cartsData from "@/assets/data/case-cards.json";

const cards = ref(cartsData);
</script>
<style></style>
