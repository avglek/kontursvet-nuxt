<template>
  <section class="section concept-case" :id="id">
    <div class="shell">
      <div class="case-heading">
        <div>
          <div class="eyebrow">{{ caseId }}</div>
          <h2>{{ title }}</h2>
        </div>
        <a href="#cases">К списку ↑</a>
      </div>
      <p class="section-intro">
        {{ description }}
      </p>
      <div class="facts-wrap">
        <div class="facts-task">
          <strong>Задача заказчика</strong>
          <p>
            {{ task }}
          </p>
        </div>
        <div class="facts-grid">
          <div class="fact fact-wide">
            <span class="fact-label">Объём работ</span>
            <ul>
              <li v-for="work in workList">{{ work }}</li>
            </ul>
          </div>
          <div class="fact">
            <span class="fact-label">Локация</span>
            <div class="fact-value">Гатчина</div>
          </div>
          <div class="fact">
            <span class="fact-label">Срок</span>
            <div class="fact-value">2 дня</div>
          </div>
          <div class="fact">
            <span class="fact-label">Команда</span>
            <div class="fact-value">бригада из 6 человек</div>
          </div>
          <div class="fact">
            <span class="fact-label">Период</span>
            <div class="fact-value">октябрь</div>
          </div>
          <div class="fact fact-wide">
            <span class="fact-label">Особенности монтажа</span>
            <div class="fact-value">
              Стандартный монтаж без дополнительных технических особенностей.
            </div>
          </div>
        </div>
      </div>
      <div class="meta">
        <span>Гатчина</span><span>два частных дома</span>
        <span
          >контурная подсветка flex neon, монтаж гирлянды «бахрома» и световых
          мотивов</span
        >
      </div>
      <div class="gallery">
        <figure>
          <img loading="lazy" src="" alt="Обложка" />
          <figcaption>Основной ракурс новой фотосерии объекта.</figcaption>
        </figure>
        <figure>
          <img loading="lazy" src="" alt="Общий вид" />
          <figcaption>
            Дополнительный общий ракурс показывает световое решение в
            пространстве.
          </figcaption>
        </figure>
        <figure>
          <img loading="lazy" scr="" alt="Дополнительный ракурс" />
          <figcaption>
            Кадр дополняет новую серию и раскрывает детали реализации.
          </figcaption>
        </figure>
        <figure>
          <img loading="lazy" src="" alt="Дополнительный ракурс" />
          <figcaption>
            Кадр дополняет новую серию и раскрывает детали реализации.
          </figcaption>
        </figure>
        <figure>
          <img loading="lazy" scr="" alt="Дополнительный ракурс" />
          <figcaption>
            Кадр дополняет новую серию и раскрывает детали реализации.
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import rawData from "@/assets/data/cards-view.json";
import type { ICardView } from "~/shared/types/CardView";

const id = defineProps({
  id: Number,
});

const cardViews = rawData as ICardView[];

console.log("id:", id);
</script>

<style></style>
