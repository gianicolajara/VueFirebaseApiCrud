<template lang="pug">
    div#app
      Navbar
      router-view
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import { mapActions } from "vuex";
export default {
  components: {
    Navbar,
  },
  methods: {
    ...mapActions(["cargarFirebase"]),
  },

  created() {
    /* this.cargarFirebase(); */
  },
};
</script>

<style lang="scss" scoped></style>
