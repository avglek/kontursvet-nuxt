<template>
  <header class="site-header">
    <div class="container nav-row">
      <a class="brand" href="#top" aria-label="КонтурСвет — на главную"
        ><img src="/img/icon.png" alt="КонтурСвет — Архитектура света"
      /></a>
      <button
        class="mobile-toggle"
        type="button"
        aria-label="Открыть меню"
        aria-expanded="false"
        aria-controls="main-navigation"
      >
        <span></span><span></span>
      </button>
      <nav
        id="main-navigation"
        class="nav-links"
        aria-label="Основная навигация"
      >
        <a href="/#projects">Проекты</a><a href="/#solutions">Решения</a
        ><a href="/#cases">Кейсы</a><a href="/#process">Как работаем</a
        ><a href="/#contact">Контакты</a>
        <NuxtLink no-prefetch class="portfolio-nav-link" to="/portfolio"
          >Портфолио
          <!-- <span aria-hidden="true">↗</span> -->
        </NuxtLink>
        <NuxtLink class="button button-small button-ghost" href="/lead"
          >Отправить фото</NuxtLink
        >
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>
