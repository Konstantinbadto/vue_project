<template>
    <v-card>
      <v-img :src="ad.src" height="200px"></v-img>
      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0">{{ ad.title }}</h3>
          <div>{{ ad.desc }}</div>
        </div>
      </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text :to="'/ad/' + ad.id">Open</v-btn>
        <v-btn raised color="primary">Buy</v-btn>
      </v-card-actions>
    </v-card>
  </template>

  <script>
  export default {
    props: {
      ad: {
        type: Object,
        required: true
      }
    }
  };
  </script>s
