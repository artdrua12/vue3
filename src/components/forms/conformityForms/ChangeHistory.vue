<template>
    <div class="pa-7">
      <v-data-table :headers="headers" :items="items" hide-default-footer>
        <template #[`item.actions`]="{ item }">
          <div style="display: flex; justify-content: space-between">
            <v-icon class="me-2" size="20" color="orange" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon size="20" color="red" @click="deleteItem(item)"> mdi-delete </v-icon>
          </div>
        </template>
        <template #no-data> Документы отсутствуют </template>
      </v-data-table>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  const items = ref([])
  const headers = [
    {
      title: 'Вид изменения (наименование заявления)',
      value: 'text',
      align: 'start',
      sortable: false
    },
    { title: 'Дата изменения', value: 'date' },
    { title: 'Статус документа', value: 'status' },
    { title: 'Описание', value: 'description' }
  ]
  </script>
  