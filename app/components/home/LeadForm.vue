<template>
  <div class="lead-panel">
    <div>
      <div class="eyebrow">Передать вводные</div>
      <h3>Обсудить проект с Александром</h3>
      <p>Фото, локация и контакт — достаточно для первого разговора.</p>
    </div>
    <form class="lead-form" id="lead-form">
      <label
        >Город / район<input
          name="location"
          required
          placeholder="Например, Репино" /></label
      ><label
        >Контакт<input
          name="contact"
          required
          placeholder="Телефон или Telegram" /></label
      ><label class="lead-wishes"
        >Пожелания<textarea
          name="wishes"
          rows="2"
          placeholder="Что хотите оформить"
        ></textarea></label
      ><button class="button button-primary" type="submit">
        Подготовить заявку
      </button>
      <p class="form-notice" id="form-notice" role="status"></p>
    </form>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
