<template lang="pug">
    div.button-state
        button(@click="accionBoton({estado: estado, numero: 10})") {{ buttonName }}
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    estado: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    buttonName() {
      return this.state ? "Aumentar" : "Disminuir";
    },
  },
  methods: {
    ...mapActions(["accionBoton"]),
  },
};
</script>

<style lang="scss" scoped></style>
