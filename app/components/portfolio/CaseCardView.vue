<template>
  <section class="section concept-case" :id="card?.name">
    <div class="shell">
      <div class="case-heading">
        <div>
          <div class="eyebrow">{{ card?.case }}</div>
          <h2>{{ card?.title }}</h2>
        </div>
        <NuxtLink to="/portfolio">К списку ↑</NuxtLink>
      </div>
      <p class="section-intro">
        {{ card?.description }}
      </p>
      <div class="facts-wrap" v-if="card?.task">
        <div class="facts-task">
          <strong>Задача заказчика</strong>
          <p>
            {{ card?.task }}
          </p>
        </div>
        <div class="facts-grid">
          <div class="fact fact-wide">
            <span class="fact-label">Объём работ</span>
            <ul>
              <li v-for="work in card?.works">{{ work }}</li>
            </ul>
          </div>
          <div class="fact">
            <span class="fact-label">Локация</span>
            <div class="fact-value">{{ card?.location }}</div>
          </div>
          <div class="fact">
            <span class="fact-label">Срок</span>
            <div class="fact-value">{{ card?.term }}</div>
          </div>
          <div class="fact">
            <span class="fact-label">Команда</span>
            <div class="fact-value">{{ card?.team }}</div>
          </div>
          <div class="fact">
            <span class="fact-label">Период</span>
            <div class="fact-value">{{ card?.period }}</div>
          </div>
          <div class="fact fact-wide">
            <span class="fact-label">Особенности монтажа</span>
            <div class="fact-value">
              {{ card?.features }}
            </div>
          </div>
        </div>
      </div>
      <div class="meta">
        <span>{{ card?.meta[0] }}</span
        ><span> {{ card?.meta[1] }}</span>
        <span> {{ card?.meta[2] }}</span>
      </div>
      <div class="gallery">
        <figure v-for="photo in card?.photos">
          <img loading="lazy" :src="photo.src" :alt="photo.alt" />
          <figcaption>{{ photo.figcaption }}</figcaption>
        </figure>
      </div>
      <NuxtLink class="link" to="/portfolio">К списку ↑</NuxtLink>
    </div>
  </section>
</template>

<script lang="ts" setup>
import rawData from "@/assets/data/cards-view.json";
import rawPhotos from "~/assets/data/photo-view.json";
import { type ICardView, type IPhoto } from "~/shared/types/CardView";

const props = defineProps<{
  id: number;
}>();

const cardViews: ICardView[] = <ICardView[]>rawData;
const photos: IPhoto[] = <IPhoto[]>rawPhotos;
const id: number = props.id;

const card = cardViews[id - 1];
card!.photos = photos[id - 1]?.gallery;
</script>

<style scoped>
.link {
  color: var(--accent);
  text-decoration: none;
  white-space: nowrap;
  margin-top: 1.5rem;
  display: flex;
  justify-content: end;
}
</style>
