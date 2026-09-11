<template>
  <div v-if="isBot">
    <b>Заказчик:</b> {{ lead.name }}<br />
    <b>телефон:</b
    ><a :href="`tel:+7${lead.phone.digital}`">{{ lead.phone.format }}</a
    ><br />
    <div v-if="lead.home"><b>тип объекта: </b> {{ lead.home }}<br /></div>
    <div v-if="lead.location">
      <b>где находится: </b> {{ lead.location }}<br />
    </div>
    <div v-if="lead.message">
      <b>Коротко о задаче:</b><br />
      {{ lead.name }}<br />
    </div>
  </div>
  <div v-else>
    <h2><b>Заказчик:</b> {{ lead.name }}</h2>
    <ul>
      <li>
        <h3><b>телефон:</b> {{ lead.phone }}</h3>
      </li>
      <li v-if="lead.home">
        <h3><b>тип объекта: </b>{{ lead.home }}</h3>
      </li>
      <li v-if="lead.location">
        <h3><b>где находится: </b>{{ lead.location }}</h3>
      </li>
      <li v-if="lead.message">
        <h3><b>Коротко о задаче:</b></h3>
        <p>{{ lead.message }}</p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { type ILead } from '~~/shared/types/ILead';
defineProps<{
  lead: ILead;
  isBot: boolean;
}>();
</script>

<style></style>
