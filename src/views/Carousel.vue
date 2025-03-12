<template>
  <v-carousel>
    <v-carousel-item
      v-for="ad in ads"
      :key="ad.id"
      :src="ad.src"
    >
      <div class="ad-link">
        <v-btn class="error" :to="'/ad/' + ad.id">{{ ad.title }}</v-btn>
      </div>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  props: {
    ads: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
.ad-link {
  position: absolute;
  bottom: 50px;
  left: 50%;
  background: rgba(0, 0, 0, 0.5);
  transform: translate(-50%, 0);
  padding: 5px 15px;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
}
</style>
