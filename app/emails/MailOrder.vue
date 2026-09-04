<template>
  <div>
    <h2>Заказчик: {{ lead.name }}</h2>
    <ul>
      <li>
        <h3>телефон: {{ lead.phone }}</h3>
      </li>
      <li>
        <h3>тип объекта: {{ lead.home }}</h3>
      </li>
      <li>
        <h3>где находится: {{ lead.location }}</h3>
      </li>
      <li>
        <h3>Коротко о задаче:</h3>
        <p>{{ lead.message }}</p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { type ILead } from '~~/shared/types/ILead';
defineProps<{
  lead: ILead;
}>();
</script>

<style></style>
