<template>
  <header class="site-header">
    <div class="container nav-row">
      <a class="brand" href="#top" aria-label="КонтурСвет — на главную"
        ><img src="@/assets/img/icon.png" alt="КонтурСвет — Архитектура света"
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
        <NuxtLink to="/#projects">Проекты</NuxtLink
        ><NuxtLink to="/#solutions">Решения</NuxtLink
        ><NuxtLink to="/#cases">Кейсы</NuxtLink
        ><NuxtLink to="/#process">Как работаем</NuxtLink
        ><NuxtLink to="/#contact">Контакты</NuxtLink>
        <NuxtLink no-prefetch class="portfolio-nav-link" to="/portfolio"
          >Портфолио
          <!-- <span aria-hidden="true">↗</span> -->
        </NuxtLink>
        <a class="button button-small button-ghost" href="#try"
          >Отправить фото</a
        >
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>
