<template>
  <div>
    <ul>
      <li><b>Заказчик:</b> {{ lead.name }}</li>
      <li><b>телефон:</b> {{ lead.phone.format }}</li>
      <li v-if="lead.home"><b>тип объекта: </b>{{ lead.home }}</li>
      <li v-if="lead.location"><b>где находится: </b>{{ lead.location }}</li>
      <li v-if="lead.message">
        <b>Коротко о задаче:</b>
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
