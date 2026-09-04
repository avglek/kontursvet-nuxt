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
        <fieldset :disabled="isFormDisabled">
          <form
            class="p_lead-form"
            data-concept-form
            @submit.prevent="handleSubmit"
          >
            <div class="field">
              <label>Имя</label
              ><input
                v-model="form.name"
                name="name"
                autocomplete="name"
                required
                placeholder="Как к вам обращаться"
              />
            </div>
            <div class="field">
              <label>Телефон</label
              ><input
                v-model="form.phone"
                name="phone"
                type="tel"
                autocomplete="tel"
                required
                placeholder="+7 ___ ___-__-__"
              />
            </div>
            <div class="field">
              <label>Тип объекта</label
              ><select name="object" v-model="form.home">
                <option>Частный дом</option>
                <option>Коммерческий объект</option>
                <option>Территория или участок</option>
                <option>Другое</option>
              </select>
            </div>
            <div class="field">
              <label>Где находится объект</label
              ><input
                v-model="form.location"
                name="location"
                placeholder="Город или район"
              />
            </div>
            <div class="field field-wide">
              <label>Коротко о задаче</label
              ><textarea
                v-model="form.message"
                name="message"
                placeholder="Что хотите подсветить и к какому сроку"
              ></textarea>
            </div>
            <div class="field field-wide">
              <label>Фотографии объекта</label
              ><input
                name="photos"
                type="file"
                accept="image/*"
                multiple
                @change="handleFileChange"
                ref="fileInput"
              />
            </div>
            <label class="check"
              ><input type="checkbox" required v-model="form.check" /><span
                >Согласен на обработку данных для обратной связи</span
              ></label
            >
            <button class="submit-button" type="submit" :disabled="!form.check">
              Получить предварительную оценку
            </button>
            <p class="form-note">
              В демонстрационном файле отправка отключена. Канал получения
              заявок подключается после согласования контактов.
            </p>
            <p class="form-status" aria-live="polite"></p>
          </form>
        </fieldset>
      </div>
    </div>
  </section>
</template>

<style scoped>
.lead-section {
  padding: 24px 0 96px;
}

.lead-card {
  display: grid;
  grid-template-columns: minmax(0, 0.82fr) minmax(0, 1.18fr);
  background: linear-gradient(140deg, #102945 0%, #071a31 72%);
  border: 1px solid rgba(22, 168, 224, 0.32);
  box-shadow: 0 28px 90px rgba(0, 0, 0, 0.22);
}

.lead-copy {
  padding: 54px;
  border-right: 1px solid var(--line);
}

.lead-copy h2 {
  font-size: clamp(2rem, 3.7vw, 3.4rem);
  line-height: 1.08;
  margin: 0.28em 0;
}

.lead-copy p {
  color: var(--muted);
  font-size: 1.08rem;
}

.lead-steps {
  display: grid;
  gap: 12px;
  margin-top: 32px;
}

.lead-step {
  display: flex;
  gap: 12px;
  color: var(--muted);
}

.lead-step b {
  color: var(--accent);
}

.p_lead-form {
  padding: 48px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
</style>

<script lang="ts" setup>
import type { ILead } from '#shared/types/ILead';
import { ref } from 'vue';

const form = reactive({
  name: '',
  phone: '',
  home: '',
  location: '',
  message: '',
  check: false,
});
const fileInput = ref(null);
const isFormDisabled = ref(false);

let selectedFile: File[] = [];

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files?.length > 0) {
    selectedFile = Array.from(target.files);
  }
};

const handleSubmit = async () => {
  form.check = false;
  isFormDisabled.value = true;
  const body: ILead = {
    name: form.name,
    phone: form.phone,
    home: form.home,
    message: form.message,
    location: form.location,
  };

  const formData = new FormData();

  selectedFile.forEach((file) => {
    formData.append('files', file);
  });

  formData.append('json', JSON.stringify(body));

  // const keys = Object.keys(body);
  // keys.forEach((key) => {
  //   formData.append(key, body[key as keyof ILead]);
  // });

  try {
    const response = await $fetch('/api/send-email', {
      method: 'POST',
      body: formData, // Nuxt cleanly handles FormData inputs
    });
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log('Upload successful:', response);
  } catch (error) {
    console.error('Upload failed:', error);
  } finally {
    isFormDisabled.value = false;
    clearForm();
  }
};

const clearForm = () => {
  form.check = false;
  form.home = '';
  form.location = '';
  form.message = '';
  form.name = '';
  form.phone = '';

  if (fileInput.value) {
    fileInput.value.value = '';
  }
  selectedFile = [];
};
</script>
