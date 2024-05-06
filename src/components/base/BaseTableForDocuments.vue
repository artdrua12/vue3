<template>
  <div>
    <base-modal
      v-model:isOpen="isOpen"
      title="Добавление доумента"
      icon="mdi-file-document-plus-outline"
    >
      <div>
        <base-autocomplete
          v-model:value="dataItem.docName"
          label="Наименование объекта технического регулирования*"
          class="all"
        ></base-autocomplete>
        <base-textfield
          label="Наименование документа, подтверждающего соответствие"
        ></base-textfield>
        <base-textfield label="Номер документа"></base-textfield>
        <base-datefield label="Дата документа*"></base-datefield>
        <base-datefield label="Срок действия с*"></base-datefield>
        <base-datefield label="Срок действия по*"></base-datefield>
        <base-autocomplete label="Наименование организации, выдавшей документ"></base-autocomplete>
        <base-textfield label="Происхождение документа"></base-textfield>
      </div>
    </base-modal>

    <v-data-table
      :headers="headers"
      :items="desserts"
      :sort-by="[{ key: 'calories', order: 'asc' }]"
      hede-details
    >
      <template #top>
        <v-toolbar flat>
          <v-btn
            class="mb-2"
            color="#2c4957"
            prepend-icon="mdi-file-document-plus-outline"
            dark
            @click="isOpen = true"
          >
            Добавить документ
          </v-btn>

          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template #no-data> Документы отсутствуют </template>
    </v-data-table>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BaseAutocomplete from './BaseAutocomplete.vue'
import BaseTextfield from './BaseTextfield.vue'
import BaseDatefield from './BaseDatefield.vue'

const isOpen = ref(false)
const dataItem = ref({
  technicalRegulationObjectKindCode: '',
  docName: ''
})
</script>

<script>
import BaseModal from './BaseModal.vue'

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        title: 'Объекты технического регулирования',
        value: 'technicalRegulationObjectKindCode',
        align: 'start',
        sortable: false
      },
      { title: 'Наименование документа, подтверждающего соответствие', value: 'docName' },
      { title: 'Номер документа', value: 'docNumber' },
      { title: 'Дата документа', value: 'updateDateTime' },
      {
        title: 'Наименование организации, выдавшей документ',
        value: 'businessEntity.businessEntityName'
      },
      { title: 'Срок действия с', value: 'validityPeriodDetails.startDateTime' },
      { title: 'Срок действия по', value: 'validityPeriodDetails.endDateTime' },
      { title: 'Происхождение документа', value: 'businessEntity.unifiedCountry' },
      { title: 'Действия', value: 'actions', sortable: false }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    },
    defaultItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    }
  },

  created() {
    this.initialize()
  },

  methods: {
    initialize() {
      this.desserts = [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7
        }
      ]
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    }
  }
}
</script>
