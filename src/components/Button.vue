<template lang="pug">
    div.button
        button(@click="accion") {{msg}}
</template>

<script>
export default {
  name: "Button",
  props: {
    msg: {
      type: String,
      default: "Sin Nombre",
    },
  },
  methods: {
    accion() {
      this.$emit("accion");
    },
  },
};
</script>

<style lang="scss" scoped></style>
