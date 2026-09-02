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
import rawData from "@/assets/data/case-cards.json";
import type { ICard } from "~/shared/types/CardView";

const cards = rawData as ICard[];
</script>
<style></style>
