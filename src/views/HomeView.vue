<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-carousel cycle height="400" hide-delimiters show-arrows-on-hover>
            <v-carousel-item
	v-for="ad in promoAds"
	:key="ad.id"
	:src="ad.src">

              <div class="ad-link">
                <v-btn color="red" dark>{{ ad.title }}</v-btn>
              </div>
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
          md="6"
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
  computed:  {
	promoAds() {
		return this.$store.getters.promoAds
	},
	ads() {
		return this.$store.getters.ads
	}
}

};
</script>

<style scoped>
.ad-link {
  position: absolute;
  bottom: 20px;
  left: 0;
  width: 100%; /* Add this */
  display: flex; /* Add this */
  justify-content: center; /* Add this */
  align-items: center; /* Add this */
}
</style>
