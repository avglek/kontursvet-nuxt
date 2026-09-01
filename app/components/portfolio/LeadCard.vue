<template>
  <section class="lead-section" id="request">
    <div class="shell">
      <div class="lead-card">
        <div class="lead-copy">
          <div class="eyebrow">Предварительная оценка</div>
          <h2>Обсудим ваш объект</h2>
          <p>
            Оставьте контакты и приложите фотографии. Специалист КонтурСвет
            уточнит задачу и предложит следующий шаг.
          </p>
          <div class="lead-steps">
            <div class="lead-step">
              <b>01</b><span>Получаем фотографии и адрес объекта</span>
            </div>
            <div class="lead-step">
              <b>02</b><span>Уточняем задачу и желаемый эффект</span>
            </div>
            <div class="lead-step">
              <b>03</b><span>Готовим предварительную оценку</span>
            </div>
          </div>
        </div>
        <form class="lead-form" data-concept-form>
          <div class="field">
            <label>Имя</label
            ><input
              name="name"
              autocomplete="name"
              required
              placeholder="Как к вам обращаться"
            />
          </div>
          <div class="field">
            <label>Телефон</label
            ><input
              name="phone"
              type="tel"
              autocomplete="tel"
              required
              placeholder="+7 ___ ___-__-__"
            />
          </div>
          <div class="field">
            <label>Тип объекта</label
            ><select name="object">
              <option>Частный дом</option>
              <option>Коммерческий объект</option>
              <option>Территория или участок</option>
              <option>Другое</option>
            </select>
          </div>
          <div class="field">
            <label>Где находится объект</label
            ><input name="location" placeholder="Город или район" />
          </div>
          <div class="field field-wide">
            <label>Коротко о задаче</label
            ><textarea
              name="message"
              placeholder="Что хотите подсветить и к какому сроку"
            ></textarea>
          </div>
          <div class="field field-wide">
            <label>Фотографии объекта</label
            ><input name="photos" type="file" accept="image/*" multiple />
          </div>
          <label class="check"
            ><input type="checkbox" required /><span
              >Согласен на обработку данных для обратной связи</span
            ></label
          >
          <button class="submit-button" type="submit">
            Получить предварительную оценку
          </button>
          <p class="form-note">
            В демонстрационном файле отправка отключена. Канал получения заявок
            подключается после согласования контактов.
          </p>
          <p class="form-status" aria-live="polite"></p>
        </form>
      </div>
    </div>
  </section>
</template>
