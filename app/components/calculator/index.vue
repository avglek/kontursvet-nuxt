<template>
  <section class="section" id="calculator">
    <div class="container ai-shell">
      <div class="ai-heading">
        <div>
          <div class="eyebrow">Онлайн-калькулятор</div>
          <h2 class="section-title">Примерьте оформление на свой дом</h2>
          <p>
            Посчитает стоимость светового оформления для вашего дома в три клика
          </p>
        </div>
      </div>
      <div class="ai-steps">
        <div class="ai-card">
          <div class="step-title">
            <span>01</span>
            <label
              >Введите периметр крыши:<input
                name="perimetr"
                placeholder="00"
                class="perimetr digital"
            /></label>
          </div>
          <div class="preview">
            <img
              id="uploaded-photo"
              src="/images/calc/05.png"
              alt="Пример фотографии объекта"
            />
          </div>
        </div>
        <div class="ai-card">
          <div class="step-title"><span>02</span> Выберите направление</div>
          <div class="mode-options">
            <div class="is-selected button" data-mode="flex">
              <strong>Flex neon</strong><span>Линии кровли и фасада</span>
            </div>
            <button type="button" data-mode="fringe">
              <strong>Бахрома</strong><span>Свет по карнизу</span></button
            ><button type="button" data-mode="complex">
              <strong>Комплексно</strong
              ><span>Дом, деревья и участок</span></button
            ><button type="button" data-mode="complex">
              <strong>Комплексно</strong
              ><span>Дом, деревья и участок</span></button
            ><button type="button" data-mode="complex">
              <strong>Комплексно</strong
              ><span>Дом, деревья и участок</span></button
            ><button type="button" data-mode="complex">
              <strong>Комплексно</strong><span>Дом, деревья и участок</span>
            </button>
          </div>
        </div>
      </div>
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
              placeholder="Например, Репино" /></label
          ><label
            >Контакт<input
              name="contact"
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
    </div>
  </section>
</template>

<script lang="ts" setup></script>

<style scoped>
.mode-options strong {
  display: block;
  font-size: 16px;
  margin-bottom: 4px;
}
.mode-options span {
  display: block;
  font-size: 13px;
  color: #8eb1c8;
}
.mode-options {
  padding: 17px;
  text-align: left;
  border: 1px solid var(--line);
  border-radius: 13px;
  background: #0b2946;
  color: #e7f1f7;
  transition: 0.2s;
}

.digital {
  max-width: 4rem;
  margin-left: 0.75rem;
}
.ai-steps {
  display: grid;
  grid-template-columns: 1fr 0.76fr;
  gap: 18px;
}
.lead-form {
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 12px;
  align-items: end;
}
.lead-form label {
  display: grid;
  gap: 7px;
  color: #c7dbe7;
  font-size: 13px;
}
.lead-form input {
  height: 49px;
}
.lead-form input,
.lead-form textarea,
.perimetr {
  width: 100%;
  border: 1px solid var(--line);
  border-radius: 9px;
  background: #061a2d;
  color: white;
  padding: 12px 13px;
}
.lead-form > .button {
  grid-column: 3;
  grid-row: 1/3;
}
</style>
