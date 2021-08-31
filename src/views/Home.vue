<template lang="pug">
  div.home
    HelloWorld(msg="Esto es Home")
    h1(:style="colorContador") Mi contador : {{ contador }}
    ButtonState(estado = true)
    ButtonState(estado = false)
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Button from "@/components/Button.vue";
import ButtonState from "@/components/ButtonState.vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "Home",
  components: {
    HelloWorld,
    Button,
    ButtonState,
  },
  methods: {
    ...mapActions(["accionIncrementar", "accionDisminuir"]),
  },
  computed: {
    ...mapState(["contador"]),
    colorContador() {
      return [this.contador > 100 ? { color: "green" } : { color: "red" }];
    },
  },
};
</script>
