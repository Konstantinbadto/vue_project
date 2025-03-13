<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="mt-5">
          <v-img
            height="400px"
            :src="ad ? ad.src : ''"
            cover
          ></v-img>
          <v-card-text>
            <h1 class="text--primary mb-3">{{ ad ? ad.title : '' }}</h1>
            <p>{{ ad ? ad.desc : '' }}</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="warning" color="orange" @click="openEditDialog">
              Edit
            </v-btn>
            <v-btn class="success" color="green">Buy</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Edit Dialog -->
    <v-dialog v-model="isEditing" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">Edit Ad</v-card-title>
        <v-card-text>
          <v-text-field label="Title" v-model="editedAd.title"></v-text-field>
          <v-textarea label="Description" v-model="editedAd.desc"></v-textarea>
          <!-- Добавьте поле для редактирования изображения, если нужно -->
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-grey" text @click="closeEditDialog">Cancel</v-btn>
          <v-btn color="primary" @click="saveAd">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isEditing: false,
      editedAd: {
        title: '',
        desc: '',
        src: '',
        id: ''
      },
    };
  },
  computed: {
    ad() {
      const id = this.id;
      const ad = this.$store.getters.adById(id);
      if (ad) {
        this.editedAd = { ...ad }; // Initialize editedAd with ad data
      }
      return ad;
    },
  },
  methods: {
    openEditDialog() {
      this.isEditing = true;
    },
    closeEditDialog() {
      this.isEditing = false;
    },
    saveAd() {
      this.$store.commit('updateAd', this.editedAd);
      this.isEditing = false;
    },
  },
};
</script>
