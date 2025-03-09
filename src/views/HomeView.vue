<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-carousel cycle height="400" hide-delimiters show-arrows-on-hover>
            <v-carousel-item
              v-for="ad in ads"
              :key="ad.id"
              :src="ad.src"
            >
            </v-carousel-item>
          </v-carousel>
        </v-col>
      </v-row>
    </v-container>

    <v-container>
      <v-row>
        <v-col
          v-for="ad in ads"
          :key="ad.id"
          cols="12"
          sm="6"
          md="3"
        >
          <v-card>
            <v-img :src="ad.src" height="200"></v-img>
            <v-card-title>{{ ad.title }}</v-card-title>
            <v-card-subtitle>{{ ad.desc }}</v-card-subtitle>
            <v-card-actions>
              <v-btn text>Open</v-btn>
              <v-btn color="primary">Buy</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ads: [
        {
          title: "First",
          desc: "First Desc",
          promo: true,
          src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
          id: "1"
        },
        {
          title: "Second",
          desc: "Second Desc",
          promo: true,
          src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
          id: "2"
        },
        {
          title: "Third",
          desc: "Thitd Desc",
          promo: true,
          src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
          id: "3"
        },
        {
          title: "Fourth",
          desc: "Fourth Desc",
          promo: true,
          src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg",
          id: "4"
        }
      ]
    };
  }
};
</script>
