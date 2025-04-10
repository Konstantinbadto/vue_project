<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="mt-5" v-if="ad">
          <v-img height="400px" :src="ad.src" cover></v-img>
          <v-card-text>
            <h1 class="text--primary mb-3">{{ ad.title }}</h1>
            <p>{{ ad.desc }}</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="modal = true">Edit</v-btn>
            <buy-ad-modal :ad="ad"></buy-ad-modal>
          </v-card-actions>
          <edit-ad-modal :ad="ad" :modal="modal" @update:modal="modal = $event" @updateAd="onSaveAd"></edit-ad-modal>
        </v-card>
        <p v-else>Загрузка...</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import EditAdModal from './EditAdModal.vue';

export default {
  components: {
    EditAdModal,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      ad: null,
      modal: false, // Добавляем modal: false
    };
  },
  mounted() {
    console.log('AdView: Компонент загружен!');
    this.loadAd();
  },
  methods: {
    openEditDialog() {
    console.log('openEditDialog вызван!');
    this.isEditing = true;
  },
  onSaveAd(updatedAd) {
    console.log('AdView: Получены обновленные данные:', updatedAd);
    this.$store.dispatch('updateAd', updatedAd);
    this.modal = false;
  },
    loadAd() {
      const ad = this.$store.getters.adById(this.id);
      if (ad) {
        this.ad = ad;
        console.log('AdView: Данные ad:', this.ad); // Добавили лог
      } else {
        console.error('AdView: Объявление не найдено');
      }
    },
  },
};
</script>
