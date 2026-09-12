<template>
  <div class="p_lead-panel">
    <div>
      <div class="eyebrow">Передать вводные</div>
      <h3>Обсудить проект с Александром</h3>
      <p>Фото, локация и контакт — достаточно для первого разговора.</p>
    </div>
    <div class="lead-form">
      <button
        class="button button-primary"
        type="button"
        @click.prevent="handleOrder"
      >
        Подготовить заявку
      </button>
      <p class="form-notice" id="form-notice" role="status"></p>
    </div>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter();
const handleOrder = () => {
  router.push('/portfolio/#request');
};
</script>

<style>
.p_lead-panel {
  display: flex;
  margin-top: 28px;
  padding-top: 28px;
  border-top: 1px solid var(--line);
  align-items: center;
  justify-content: space-between;
  margin-left: 10rem;
  margin-right: 10rem;
}
.p_lead-panel h3 {
  font:
    600 28px/1.15 'Inter Display',
    sans-serif;
  margin: 11px 0 9px;
}
.p_lead-panel > div > p {
  color: var(--muted);
  font-size: 14px;
  margin: 0;
}
</style>
