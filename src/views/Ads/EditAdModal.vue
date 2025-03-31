<template>
    <v-dialog :model-value="modal" width="400px" @update:model-value="updateModal">
      <v-card class="pa-3">
        <v-row justify="center">
          <v-col cols="12">
            <v-card-title>
              <h1 class="text--primary">Edit Ad</h1>
            </v-card-title>
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-col cols="12">
            <v-card-text>
              <v-card-text>
                <v-text-field
                  name="title"
                  label="Title"
                  type="text"
                  v-model="editedTitle"
                ></v-text-field>
                <v-textarea
                  name="desc"
                  label="Description"
                  type="text"
                  v-model="editedDesc"
                  class="mb-3"
                ></v-textarea>
              </v-card-text>
            </v-card-text>
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-col cols="12">
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="onCancel">Cancel</v-btn>
              <v-btn color="success" @click="onSave">Save</v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </template>

  <script>
  export default {
    props: {
    ad: {
      type: Object,
      required: true,
    },
    modal: {
      type: Boolean,
      default: false,
    },
  },
    mounted() {
  console.log('EditAdModal: Компонент загружен!');
},
    data() {
      return {
        editedTitle: this.ad.title,
        editedDesc: this.ad.desc,
      };
    },
    methods: {
      onCancel() {
        this.editedTitle = this.ad.title;
        this.editedDesc = this.ad.desc;
        this.$emit('update:modal', false);
      },
      onSave() {
   if (this.editedTitle !== '' && this.editedDesc !== '') {
     const updatedAd = {
       ...this.ad,
       title: this.editedTitle,
       desc: this.editedDesc,
     };
     console.log('Данные для отправки родительскому компоненту:', updatedAd);
     this.$emit('updateAd', updatedAd);
     this.$emit('update:modal', false);
   }
 },
      updateModal(value) {
        this.$emit('update:modal', value);
      },
    },
  };
  </script>
