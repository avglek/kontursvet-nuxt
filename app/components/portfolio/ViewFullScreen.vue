<template>
  <div>
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="isFullSize"
          class="lightbox-overlay"
          @click.self="isFullSize = false"
        >
          <button class="close-btn" @click="isFullSize = false">&times;</button>
          <NuxtImg
            placeholder="blur"
            :src="imageSrc"
            alt="Полный размер"
            class="fullsize-img"
          />
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
const imageSrc = ref('/path-to-image.jpg');
const isFullSize = ref(false);
</script>

<style scoped>
.preview-img {
  max-width: 300px;
  cursor: pointer;
  transition: opacity 0.2s;
}
.preview-img:hover {
  opacity: 0.8;
}

/* Стили обертки */
.lightbox-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  padding: 20px;
}

.fullsize-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 4px;
}

.close-btn {
  position: absolute;
  top: 20px;
  right: 30px;
  background: none;
  border: none;
  color: white;
  font-size: 40px;
  cursor: pointer;
}

/* Анимация плавного появления */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
