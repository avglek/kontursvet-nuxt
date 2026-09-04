<template>
  <section class="section" id="cases">
    <div class="shell">
      <div class="eyebrow">Портфолио</div>
      <h2>Реализованные объекты</h2>
      <p class="section-intro">
        Откройте любой кейс, чтобы посмотреть всю отобранную серию.
      </p>
      <div class="cards">
        <PortfolioCaseCard v-for="card in cards" :key="card.id" :card="card" />
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import rawData from '@/assets/data/case-cards.json';
import type { ICard } from '~/types/CardView';

const cards: ICard[] = rawData as ICard[];
</script>
<style></style>
