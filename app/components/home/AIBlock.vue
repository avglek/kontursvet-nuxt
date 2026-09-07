<template>
  <section class="section" id="try">
    <div class="container ai-shell">
      <div class="ai-heading">
        <div>
          <div class="eyebrow">AI-примерка · frontend-концепт</div>
          <h2 class="section-title">Примерьте оформление на свой дом</h2>
          <p>
            Загрузите фотографию, выберите направление и посмотрите
            демонстрационный вариант.
          </p>
        </div>
        <span class="prototype-badge">API подключается позднее</span>
      </div>
      <div class="ai-steps">
        <div class="ai-card">
          <div class="step-title"><span>01</span> Загрузите фото дома</div>
          <div class="upload-preview">
            <img
              id="uploaded-photo"
              src="/images/home/11.webp"
              alt="Пример фотографии объекта"
            /><button type="button" id="choose-photo">Выбрать фото</button>
          </div>
          <input
            id="photo-input"
            class="visually-hidden"
            type="file"
            accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
          />
          <p class="field-error" id="file-error" role="alert"></p>
        </div>
        <div class="ai-card">
          <div class="step-title"><span>02</span> Выберите направление</div>
          <div class="mode-options">
            <button type="button" class="is-selected" data-mode="flex">
              <strong>Flex neon</strong
              ><span>Линии кровли и фасада</span></button
            ><button type="button" data-mode="fringe">
              <strong>Бахрома</strong><span>Свет по карнизу</span></button
            ><button type="button" data-mode="complex">
              <strong>Комплексно</strong><span>Дом, деревья и участок</span>
            </button>
          </div>
          <button
            type="button"
            class="button button-primary generate-button"
            id="generate-preview"
          >
            Показать концепцию →
          </button>
        </div>
        <div class="ai-card ai-result">
          <div class="step-title"><span>03</span> Визуальный preview</div>
          <div class="result-preview">
            <img
              id="concept-result"
              src="/images/home/ps-01.webp"
              alt="Демонстрационный вариант светового оформления"
            />
            <div class="result-status">Демо на примере из портфолио</div>
          </div>
          <p class="disclaimer">
            Предварительная визуальная концепция. Не является окончательным
            проектом.
          </p>
        </div>
      </div>
      <img
        class="preview-source"
        data-preview-mode="flex"
        src="/images/home/ps-01.webp"
        alt=""
      /><img
        class="preview-source"
        data-preview-mode="fringe"
        src="/images/home/ps-02.webp"
        alt=""
      /><img
        class="preview-source"
        data-preview-mode="complex"
        src="/images/home/ps-03.webp"
        alt=""
      />
      <HomeLeadForm />
    </div>
  </section>
</template>

<script lang="ts" setup></script>

<style></style>
